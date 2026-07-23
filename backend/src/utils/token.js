import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m" }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id, tokenVersion: user.tokenVersion || 0 },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d" }
  );
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};

/**
 * Generates a random token for email verification / password reset,
 * and its SHA-256 hash for safe DB storage (raw token is emailed, hash is stored).
 */
export const generateRandomTokenPair = () => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  return { rawToken, hashedToken };
};

export const hashToken = (rawToken) => {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};
