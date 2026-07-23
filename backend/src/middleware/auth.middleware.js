import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/token.js";
import User from "../models/User.js";

/**
 * Verifies the access token (from Authorization header or cookie),
 * loads the current user, and rejects if the token predates a password change.
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  const headerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;
  const token = headerToken || req.cookies?.accessToken;

  if (!token) {
    throw ApiError.unauthorized("Authentication required. Please log in.");
  }

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw ApiError.unauthorized("Access token expired");
    }
    throw ApiError.unauthorized("Invalid access token");
  }

  const user = await User.findById(decoded.id);
  if (!user) throw ApiError.unauthorized("User no longer exists");
  if (!user.isActive) throw ApiError.forbidden("Account has been deactivated");
  if (user.changedPasswordAfter(decoded.iat)) {
    throw ApiError.unauthorized("Password was recently changed. Please log in again.");
  }

  req.user = user;
  next();
});

/**
 * Restricts access to one or more roles. Use after `authenticate`.
 * Usage: authorize("admin"), authorize("admin", "doctor")
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw ApiError.unauthorized("Authentication required");
    }
    if (!allowedRoles.includes(req.user.role)) {
      throw ApiError.forbidden(
        `Access denied. This action requires one of these roles: ${allowedRoles.join(", ")}`
      );
    }
    next();
  };
};

/**
 * Optional auth: attaches req.user if a valid token is present, but does not
 * reject the request if absent/invalid. Useful for public-with-personalization routes.
 */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  const headerToken = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;
  const token = headerToken || req.cookies?.accessToken;

  if (!token) return next();

  try {
    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.id);
    if (user && user.isActive) req.user = user;
  } catch {
    // silently ignore invalid token for optional auth
  }
  next();
});
