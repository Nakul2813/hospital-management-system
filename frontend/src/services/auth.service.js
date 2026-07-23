import api from "./api";

export const authService = {
  register: (payload) => api.post("/auth/register", payload).then((r) => r.data),
  login: (payload) => api.post("/auth/login", payload).then((r) => r.data),
  logout: () => api.post("/auth/logout").then((r) => r.data),
  logoutAll: () => api.post("/auth/logout-all").then((r) => r.data),
  getMe: () => api.get("/auth/me").then((r) => r.data),
  verifyEmail: (token) => api.post("/auth/verify-email", { token }).then((r) => r.data),
  resendVerification: (email) => api.post("/auth/resend-verification", { email }).then((r) => r.data),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }).then((r) => r.data),
  resetPassword: (payload) => api.post("/auth/reset-password", payload).then((r) => r.data),
  changePassword: (payload) => api.post("/auth/change-password", payload).then((r) => r.data),
  sendOTP: (email, purpose) => api.post("/auth/send-otp", { email, purpose }).then((r) => r.data),
  verifyOTP: (payload) => api.post("/auth/verify-otp", payload).then((r) => r.data),
};
