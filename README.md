# Smart Hospital Management System

A full-stack, role-based Hospital Management System.

## Status: Incremental Build

This project is being built in complete, working layers rather than all at once,
so every piece that exists is fully functional (no stubs, no TODOs, no fake handlers).

### Build Plan
- [x] Stage 1: Project scaffold, Docker, env config
- [x] Stage 2: Backend auth system (JWT + refresh tokens, role-based: patient/doctor/admin/reception)
- [ ] Stage 3: Core backend modules (Appointments, Medical Records, Billing, Pharmacy, Lab) — REST APIs beyond auth
- [x] Stage 4: Frontend shell (Vite + React 19 + Tailwind + Redux + routing + auth pages)
- [x] Stage 5: Role dashboards (Patient, Doctor, Admin, Reception) — fully built with sample data, ready to wire to Stage 3 APIs
- [x] Stage 6: Landing page, dark mode toggle, charts/analytics, responsive design

**Where things stand:** Auth (register/login/JWT/refresh/password reset/OTP/email verification) is fully wired
end-to-end between frontend and backend. All 4 dashboards and ~20 sub-pages are built and functional with
realistic sample data and working local UI interactions (forms, modals, search/filter tables, chat, charts).
The remaining step is Stage 3: building out real REST endpoints for appointments/records/billing/pharmacy/lab
and swapping the frontend's sample data for live API calls (the `services/` folder and Redux pattern already
used for auth make this a mechanical extension, not a redesign).

## Tech Stack
**Frontend:** React 19, Vite, Tailwind CSS, React Router, Axios, React Hook Form, Framer Motion, Recharts, Redux Toolkit
**Backend:** Node.js, Express.js, MongoDB, Mongoose
**Auth:** JWT + Refresh Tokens, bcrypt
**Realtime:** Socket.io
**Validation:** Zod

## Quick Start

### Option A: Docker (recommended, includes MongoDB)
```bash
cp backend/.env.example backend/.env
docker compose up --build
```
Backend: http://localhost:5000
Frontend: http://localhost:5173

### Option B: Manual
```bash
# Backend
cd backend
cp .env.example .env   # edit MONGO_URI if not using Docker's mongo
npm install
npm run seed            # creates sample admin/doctor/patient/reception users
npm run dev              # runs on http://localhost:5000

# Frontend (separate terminal)
cd frontend
npm install
npm run dev              # runs on http://localhost:5173, proxies /api to the backend
```

Then open http://localhost:5173, register or log in with a seeded account, and you'll land in the
role-appropriate dashboard (Patient / Doctor / Admin / Reception).

## Seeded Test Accounts
After running `npm run seed` (backend):

| Role | Email | Password |
|---|---|---|
| Admin | admin@hospital.com | Admin@123 |
| Doctor | dr.sharma@hospital.com | Doctor@123 |
| Patient | patient@hospital.com | Patient@123 |
| Reception | reception@hospital.com | Reception@123 |

## Folder Structure
```
hospital-management-system/
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection, env loader
│   │   ├── controllers/     # Route handlers (business logic)
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Express routers
│   │   ├── middleware/      # auth, role guard, error handler, rate limit
│   │   ├── validations/     # Zod schemas
│   │   ├── services/        # email, token, cloudinary helpers
│   │   ├── utils/           # ApiError, ApiResponse, asyncHandler
│   │   └── sockets/         # Socket.io setup (Stage 3+)
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Button, Input, Card, DataListPage, etc.
│   │   │   ├── layout/      # Sidebar, Topbar, DashboardLayout, ProtectedRoute
│   │   │   └── landing/     # Hero, Services, Departments, Testimonials, etc.
│   │   ├── pages/
│   │   │   ├── public/      # Landing, NotFound
│   │   │   ├── auth/        # Login, Register, ForgotPassword, ResetPassword, VerifyEmail
│   │   │   ├── patient/     # 7 pages: dashboard, appointments, records, prescriptions, lab, billing, messages
│   │   │   ├── doctor/      # 6 pages: dashboard, patients, schedule, prescriptions, records, messages
│   │   │   ├── admin/       # 9 pages: dashboard, doctors, patients, departments, beds, pharmacy, billing, analytics, settings
│   │   │   └── reception/   # 5 pages: dashboard, register, appointments, queue, billing
│   │   ├── redux/           # store.js, slices/authSlice.js, slices/uiSlice.js
│   │   ├── services/        # api.js (axios + refresh interceptor), auth.service.js
│   │   ├── hooks/           # useAuth.js
│   │   └── App.jsx, main.jsx, index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── docs/
│   └── API.md
├── docker-compose.yml
└── README.md
```

## API Documentation
See [docs/API.md](docs/API.md) for full endpoint reference.

## Deployment

Deploy the frontend to Vercel as a project with `frontend` set as its **Root Directory**. The
frontend-specific `vercel.json` provides the single-page app fallback. In the Vercel project's
environment variables, set `VITE_API_URL` to the public backend API URL, including `/api/v1`.

Deploy `backend` to a Node.js host that supports persistent servers (such as Render or Railway),
then set its `CLIENT_URL` environment variable to the Vercel frontend URL. Configure its MongoDB,
JWT, cookie, email, and Cloudinary environment variables from `backend/.env.example` as needed.
