# API Documentation

Base URL: `http://localhost:5000/api/v1`

All responses follow this shape:
```json
{ "success": true, "message": "...", "data": { ... } }
```
Errors:
```json
{ "success": false, "message": "...", "errors": ["..."] }
```

## Auth — `/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register patient/doctor/admin/reception |
| POST | `/auth/login` | Public | Email + password login, returns tokens |
| POST | `/auth/refresh` | Public (refresh cookie) | Rotate access token |
| POST | `/auth/logout` | Public | Clear auth cookies |
| POST | `/auth/logout-all` | Private | Invalidate all sessions for user |
| GET | `/auth/me` | Private | Get current logged-in user |
| POST | `/auth/verify-email` | Public | Verify email with token from email link |
| POST | `/auth/resend-verification` | Public | Resend verification email |
| POST | `/auth/forgot-password` | Public | Request password reset email |
| POST | `/auth/reset-password` | Public | Reset password using token |
| POST | `/auth/change-password` | Private | Change password (logged in) |
| POST | `/auth/send-otp` | Public | Send 6-digit OTP to email |
| POST | `/auth/verify-otp` | Public | Verify OTP (login / verify_email / reset_password) |

### POST /auth/register
```json
{
  "firstName": "Rohan",
  "lastName": "Mehta",
  "email": "rohan@example.com",
  "password": "Secure@123",
  "phone": "+91-9876543210",
  "role": "patient",
  "gender": "male"
}
```
For `role: "doctor"`, also include `specialization` (required) and `licenseNumber`.

### POST /auth/login
```json
{ "email": "patient@hospital.com", "password": "Patient@123", "rememberMe": true }
```
Returns `accessToken` + `refreshToken` in body AND sets them as httpOnly cookies.
Frontend can use either the cookie flow or Authorization header (`Bearer <accessToken>`).

### POST /auth/refresh
Uses `refreshToken` cookie automatically, or pass `{ "refreshToken": "..." }` in body.

### Role-based access
Once authenticated, `req.user.role` is one of `patient | doctor | admin | reception`.
Protected routes in future stages will use:
```js
router.get("/admin/stats", authenticate, authorize("admin"), controller);
```

---
*This file will grow as Stage 3+ modules (Appointments, Medical Records, Billing, Pharmacy, Lab) are added.*
