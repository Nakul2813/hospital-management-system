import nodemailer from "nodemailer";

let transporter;

const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
};

const baseWrapper = (title, bodyHtml) => `
  <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; background:#f8fafc;">
    <div style="background:#ffffff; border-radius: 16px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
      <h2 style="color:#1e40af; margin-top:0;">${title}</h2>
      ${bodyHtml}
      <p style="color:#94a3b8; font-size:12px; margin-top:32px; border-top:1px solid #e2e8f0; padding-top:16px;">
        Smart Hospital Management System — this is an automated message, please do not reply.
      </p>
    </div>
  </div>
`;

const sendEmail = async ({ to, subject, html }) => {
  const mail = getTransporter();
  await mail.sendMail({
    from: process.env.EMAIL_FROM || '"Smart Hospital" <no-reply@smarthospital.com>',
    to,
    subject,
    html,
  });
};

export const sendVerificationEmail = async (email, name, verifyUrl) => {
  await sendEmail({
    to: email,
    subject: "Verify your Smart Hospital account",
    html: baseWrapper(
      "Confirm your email",
      `<p>Hi ${name},</p>
       <p>Thanks for registering with Smart Hospital. Please confirm your email address to activate your account.</p>
       <p style="text-align:center; margin: 24px 0;">
         <a href="${verifyUrl}" style="background:#2563eb; color:#fff; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:600;">Verify Email</a>
       </p>
       <p style="color:#64748b; font-size:13px;">This link expires in 24 hours. If you didn't create this account, you can ignore this email.</p>`
    ),
  });
};

export const sendPasswordResetEmail = async (email, name, resetUrl) => {
  await sendEmail({
    to: email,
    subject: "Reset your Smart Hospital password",
    html: baseWrapper(
      "Password reset request",
      `<p>Hi ${name},</p>
       <p>We received a request to reset your password. Click below to choose a new one.</p>
       <p style="text-align:center; margin: 24px 0;">
         <a href="${resetUrl}" style="background:#2563eb; color:#fff; padding:12px 28px; border-radius:8px; text-decoration:none; font-weight:600;">Reset Password</a>
       </p>
       <p style="color:#64748b; font-size:13px;">This link expires in 1 hour. If you didn't request this, please ignore this email — your password will remain unchanged.</p>`
    ),
  });
};

export const sendOTPEmail = async (email, name, otp, purpose) => {
  const purposeLabel = {
    login: "log in",
    verify_email: "verify your email",
    reset_password: "reset your password",
  }[purpose] || "verify your identity";

  await sendEmail({
    to: email,
    subject: `Your Smart Hospital verification code: ${otp}`,
    html: baseWrapper(
      "Your verification code",
      `<p>Hi ${name},</p>
       <p>Use the code below to ${purposeLabel}:</p>
       <p style="text-align:center; margin: 24px 0; font-size:32px; font-weight:700; letter-spacing:8px; color:#1e40af;">${otp}</p>
       <p style="color:#64748b; font-size:13px;">This code expires in 10 minutes. Never share this code with anyone.</p>`
    ),
  });
};

export const sendWelcomeEmail = async (email, name, role) => {
  await sendEmail({
    to: email,
    subject: "Welcome to Smart Hospital",
    html: baseWrapper(
      "Welcome aboard 🎉",
      `<p>Hi ${name},</p>
       <p>Your ${role} account has been created successfully. You can now log in and access your dashboard.</p>`
    ),
  });
};

export default sendEmail;
