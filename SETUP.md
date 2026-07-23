# Hospital Management System - Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB Atlas account

### Installation & Running

#### 1. Backend Setup
```bash
cd backend
npm install

# Update .env with your MongoDB connection string
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital_management

npm run seed        # Create test accounts
npm run dev         # Start backend on port 3000
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev         # Start frontend on port 5173
```

#### 3. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api/v1

### Test Accounts
After running `npm run seed`:

| Role | Email | Password |
|---|---|---|
| Admin | admin@hospital.com | Admin@123 |
| Doctor | dr.sharma@hospital.com | Doctor@123 |
| Patient | patient@hospital.com | Patient@123 |
| Reception | reception@hospital.com | Reception@123 |

### Environment Variables
Create `.env` in the `backend` folder:
```
NODE_ENV=development
PORT=3000
CLIENT_URL=http://localhost:5173
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital_management
JWT_ACCESS_SECRET=your_secret_key_min_32_chars
JWT_REFRESH_SECRET=your_secret_key_min_32_chars
```

## Features
✅ JWT Authentication with Refresh Tokens
✅ Role-based Access Control (Patient, Doctor, Admin, Reception)
✅ Patient Dashboard with appointments, records, prescriptions, billing
✅ Doctor Dashboard with patient management and scheduling
✅ Admin Dashboard with analytics and system management
✅ Reception Dashboard for patient registration and queue management
✅ MongoDB Atlas integration
✅ Email notifications
✅ Rate limiting and security middleware

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS, Redux Toolkit
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT + Refresh Tokens, bcrypt
- **Validation**: Zod

## Project Structure
```
hospital-management-system/
├── backend/          # Express.js server
│   ├── src/
│   │   ├── config/   # Database config
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── validations/
│   ├── server.js
│   └── seed.js
├── frontend/         # React application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── services/
│   └── vite.config.js
└── docker-compose.yml
```

## Deployment Notes
- Update `.env` with production MongoDB credentials
- Configure CORS for production domain
- Set secure JWT secrets in production
- Enable rate limiting in production
