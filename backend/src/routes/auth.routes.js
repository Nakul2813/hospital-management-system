import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authLimiter, sensitiveLimiter } from "../middleware/rateLimit.middleware.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  verifyOTPSchema,
  changePasswordSchema,
} from "../validations/auth.validation.js";
import { z } from "zod";

const router = Router();

// Public routes
router.post("/register", authLimiter, validate(registerSchema), authController.register);
router.post("/login", authLimiter, validate(loginSchema), authController.login);
router.post("/refresh", authController.refreshAccessToken);
router.post("/logout", authController.logout);

router.post("/verify-email", validate(verifyEmailSchema), authController.verifyEmail);
router.post(
  "/resend-verification",
  sensitiveLimiter,
  validate(z.object({ email: z.string().email() })),
  authController.resendVerificationEmail
);

router.post("/forgot-password", sensitiveLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.post("/reset-password", authLimiter, validate(resetPasswordSchema), authController.resetPassword);

router.post(
  "/send-otp",
  sensitiveLimiter,
  validate(z.object({ email: z.string().email(), purpose: z.enum(["login", "verify_email", "reset_password"]) })),
  authController.sendOTP
);
router.post("/verify-otp", authLimiter, validate(verifyOTPSchema), authController.verifyOTP);

// Protected routes
router.use(authenticate);
router.get("/me", authController.getCurrentUser);
router.post("/logout-all", authController.logoutAllDevices);
router.post("/change-password", validate(changePasswordSchema), authController.changePassword);

export default router;
