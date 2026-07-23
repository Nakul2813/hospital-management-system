import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    country: { type: String, trim: true, default: "India" },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },
    phone: {
      type: String,
      trim: true,
      match: [/^[+]?[\d\s-()]{7,20}$/, "Please provide a valid phone number"],
    },
    role: {
      type: String,
      enum: ["patient", "doctor", "admin", "reception"],
      required: true,
      default: "patient",
      index: true,
    },
    avatar: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
    },
    dateOfBirth: { type: Date },
    address: addressSchema,

    // Auth / security
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    tokenVersion: { type: Number, default: 0 }, // bump to invalidate all refresh tokens

    emailVerificationTokenHash: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },

    passwordResetTokenHash: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },

    otpHash: { type: String, select: false },
    otpExpires: { type: Date, select: false },
    otpPurpose: { type: String, select: false }, // 'login' | 'verify_email' | 'reset_password'

    lastLoginAt: { type: Date },
    passwordChangedAt: { type: Date },

    // Soft delete
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, discriminatorKey: "role" }
);

userSchema.index({ email: 1, deletedAt: 1 });
userSchema.index({ role: 1, isActive: 1 });

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  if (!this.isNew) {
    this.passwordChangedAt = new Date(Date.now() - 1000);
  }
  next();
});

// Exclude soft-deleted docs from normal finds by default
userSchema.pre(/^find/, function (next) {
  if (this.getFilter().includeDeleted) {
    delete this.getFilter().includeDeleted;
    return next();
  }
  this.where({ deletedAt: null });
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
  if (!this.passwordChangedAt) return false;
  const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
  return jwtTimestamp < changedTimestamp;
};

userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.emailVerificationTokenHash;
  delete obj.passwordResetTokenHash;
  delete obj.otpHash;
  delete obj.__v;
  return obj;
};

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.set("toJSON", { virtuals: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
