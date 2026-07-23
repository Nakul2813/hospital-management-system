import User from "../models/User.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import { Reception, Admin } from "../models/StaffProfiles.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateRandomTokenPair,
  hashToken,
  generateOTP,
  cookieOptions,
} from "../utils/token.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendOTPEmail,
  sendWelcomeEmail,
} from "../services/email.service.js";

const roleModelMap = {
  patient: Patient,
  doctor: Doctor,
  reception: Reception,
  admin: Admin,
};

const issueTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return { accessToken, refreshToken };
};

const setAuthCookies = (res, accessToken, refreshToken, rememberMe) => {
  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 min
  });
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
  });
};

/**
 * @route POST /api/v1/auth/register
 * Public registration. Admin accounts should generally be seeded/created by
 * an existing admin (see admin.controller) rather than open self-registration,
 * but we allow it here for demo/setup purposes with isSuperAdmin always false.
 */
export const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, phone, role, gender, dateOfBirth, specialization, licenseNumber } =
    req.body;

  const existing = await User.findOne({ email });
  if (existing) throw ApiError.conflict("An account with this email already exists");

  if (role === "doctor" && !specialization) {
    throw ApiError.badRequest("Specialization is required for doctor accounts");
  }

  const Model = roleModelMap[role] || Patient;

  const userData = {
    firstName,
    lastName,
    email,
    password,
    phone,
    gender,
    dateOfBirth,
  };

  if (role === "doctor") {
    userData.specialization = specialization;
    userData.licenseNumber = licenseNumber;
  }
  if (role === "admin") {
    userData.isSuperAdmin = false;
  }

  const user = await Model.create(userData);

  // Email verification token
  const { rawToken, hashedToken } = generateRandomTokenPair();
  user.emailVerificationTokenHash = hashedToken;
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save({ validateBeforeSave: false });

  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${rawToken}`;

  try {
    await sendVerificationEmail(user.email, user.firstName, verifyUrl);
  } catch (err) {
    console.error("Failed to send verification email:", err.message);
    // Registration still succeeds; user can request a resend later.
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: user.toSafeObject() },
        "Registration successful. Please check your email to verify your account."
      )
    );
});

/**
 * @route POST /api/v1/auth/login
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw ApiError.unauthorized("Invalid email or password");
  if (!user.isActive) throw ApiError.forbidden("This account has been deactivated. Contact support.");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw ApiError.unauthorized("Invalid email or password");

  const { accessToken, refreshToken } = issueTokens(user);
  setAuthCookies(res, accessToken, refreshToken, rememberMe);

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: user.toSafeObject(),
        accessToken,
        refreshToken,
      },
      "Login successful"
    )
  );
});

/**
 * @route POST /api/v1/auth/refresh
 * Rotates the access token using a valid refresh token (cookie or body).
 */
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!incomingToken) throw ApiError.unauthorized("Refresh token missing");

  let decoded;
  try {
    decoded = verifyRefreshToken(incomingToken);
  } catch {
    throw ApiError.unauthorized("Invalid or expired refresh token. Please log in again.");
  }

  const user = await User.findById(decoded.id);
  if (!user) throw ApiError.unauthorized("User no longer exists");
  if (!user.isActive) throw ApiError.forbidden("Account has been deactivated");
  if ((user.tokenVersion || 0) !== decoded.tokenVersion) {
    throw ApiError.unauthorized("Refresh token has been revoked. Please log in again.");
  }

  const { accessToken, refreshToken } = issueTokens(user);
  setAuthCookies(res, accessToken, refreshToken, true);

  return res
    .status(200)
    .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed"));
});

/**
 * @route POST /api/v1/auth/logout
 * Clears cookies. Bumping tokenVersion invalidates all outstanding refresh tokens
 * for this user (used here as a simple logout; call logoutAllDevices for that explicitly).
 */
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  return res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
});

/**
 * @route POST /api/v1/auth/logout-all
 * Invalidates all refresh tokens for the current user across all devices.
 */
export const logoutAllDevices = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $inc: { tokenVersion: 1 } });
  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);
  return res.status(200).json(new ApiResponse(200, null, "Logged out from all devices"));
});

/**
 * @route GET /api/v1/auth/me
 */
export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { user: req.user.toSafeObject() }, "Current user fetched"));
});

/**
 * @route POST /api/v1/auth/verify-email
 */
export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const hashedToken = hashToken(token);

  const user = await User.findOne({
    emailVerificationTokenHash: hashedToken,
    emailVerificationExpires: { $gt: new Date() },
  }).select("+emailVerificationTokenHash +emailVerificationExpires");

  if (!user) throw ApiError.badRequest("Verification link is invalid or has expired");

  user.isEmailVerified = true;
  user.emailVerificationTokenHash = undefined;
  user.emailVerificationExpires = undefined;
  await user.save({ validateBeforeSave: false });

  try {
    await sendWelcomeEmail(user.email, user.firstName, user.role);
  } catch (err) {
    console.error("Failed to send welcome email:", err.message);
  }

  return res.status(200).json(new ApiResponse(200, null, "Email verified successfully"));
});

/**
 * @route POST /api/v1/auth/resend-verification
 */
export const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw ApiError.notFound("No account found with this email");
  if (user.isEmailVerified) throw ApiError.badRequest("Email is already verified");

  const { rawToken, hashedToken } = generateRandomTokenPair();
  user.emailVerificationTokenHash = hashedToken;
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save({ validateBeforeSave: false });

  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${rawToken}`;
  await sendVerificationEmail(user.email, user.firstName, verifyUrl);

  return res.status(200).json(new ApiResponse(200, null, "Verification email resent"));
});

/**
 * @route POST /api/v1/auth/forgot-password
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  // Do not reveal whether the email exists
  if (!user) {
    return res
      .status(200)
      .json(new ApiResponse(200, null, "If an account exists with this email, a reset link has been sent"));
  }

  const { rawToken, hashedToken } = generateRandomTokenPair();
  user.passwordResetTokenHash = hashedToken;
  user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000);
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}`;

  try {
    await sendPasswordResetEmail(user.email, user.firstName, resetUrl);
  } catch (err) {
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw ApiError.internal("Failed to send reset email. Please try again later.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, "If an account exists with this email, a reset link has been sent"));
});

/**
 * @route POST /api/v1/auth/reset-password
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = hashToken(token);

  const user = await User.findOne({
    passwordResetTokenHash: hashedToken,
    passwordResetExpires: { $gt: new Date() },
  }).select("+passwordResetTokenHash +passwordResetExpires");

  if (!user) throw ApiError.badRequest("Reset link is invalid or has expired");

  user.password = password;
  user.passwordResetTokenHash = undefined;
  user.passwordResetExpires = undefined;
  user.tokenVersion = (user.tokenVersion || 0) + 1; // invalidate old sessions
  await user.save();

  return res.status(200).json(new ApiResponse(200, null, "Password reset successfully. Please log in."));
});

/**
 * @route POST /api/v1/auth/change-password
 * For logged-in users changing their password from their profile.
 */
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");
  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) throw ApiError.unauthorized("Current password is incorrect");

  user.password = newPassword;
  user.tokenVersion = (user.tokenVersion || 0) + 1;
  await user.save();

  res.clearCookie("accessToken", cookieOptions);
  res.clearCookie("refreshToken", cookieOptions);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Password changed successfully. Please log in again."));
});

/**
 * @route POST /api/v1/auth/send-otp
 * Sends a one-time password for login / verification / reset flows.
 */
export const sendOTP = asyncHandler(async (req, res) => {
  const { email, purpose } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json(new ApiResponse(200, null, "If an account exists, an OTP has been sent"));
  }

  const otp = generateOTP();
  user.otpHash = hashToken(otp);
  user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  user.otpPurpose = purpose;
  await user.save({ validateBeforeSave: false });

  await sendOTPEmail(user.email, user.firstName, otp, purpose);

  return res.status(200).json(new ApiResponse(200, null, "OTP sent to your email"));
});

/**
 * @route POST /api/v1/auth/verify-otp
 */
export const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp, purpose } = req.body;

  const user = await User.findOne({ email }).select("+otpHash +otpExpires +otpPurpose");
  if (!user) throw ApiError.badRequest("Invalid or expired OTP");

  if (
    !user.otpHash ||
    user.otpHash !== hashToken(otp) ||
    user.otpPurpose !== purpose ||
    !user.otpExpires ||
    user.otpExpires < new Date()
  ) {
    throw ApiError.badRequest("Invalid or expired OTP");
  }

  user.otpHash = undefined;
  user.otpExpires = undefined;
  user.otpPurpose = undefined;

  if (purpose === "verify_email") {
    user.isEmailVerified = true;
  }
  await user.save({ validateBeforeSave: false });

  if (purpose === "login") {
    const { accessToken, refreshToken } = issueTokens(user);
    setAuthCookies(res, accessToken, refreshToken, false);
    return res
      .status(200)
      .json(new ApiResponse(200, { user: user.toSafeObject(), accessToken, refreshToken }, "OTP verified. Logged in."));
  }

  return res.status(200).json(new ApiResponse(200, null, "OTP verified successfully"));
});
