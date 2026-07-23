import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const registerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Invalid email address"),
  password: passwordSchema,
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s-()]{7,20}$/, "Invalid phone number")
    .optional(),
  role: z.enum(["patient", "doctor", "admin", "reception"]).default("patient"),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
  dateOfBirth: z.string().optional(),
  // Doctor-specific (required only when role === 'doctor', enforced in controller)
  specialization: z.string().trim().optional(),
  licenseNumber: z.string().trim().optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional().default(false),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: passwordSchema,
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

export const verifyOTPSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  purpose: z.enum(["login", "verify_email", "reset_password"]),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: passwordSchema,
});
