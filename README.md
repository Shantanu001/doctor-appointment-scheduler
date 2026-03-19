# DocSchedule - Doctor Appointment Scheduler

A premium full-stack web application built with Next.js 14, MongoDB, and Tailwind CSS.

## Features
- **Role-based Authentication**: Secure login and registration for Patients and Doctors.
- **Patient Dashboard**: Discover doctors by specialization and book appointments with real-time double-booking prevention.
- **Doctor Dashboard**: Manage incoming requests, view patient details, and update appointment statuses (Confirm/Reject).
- **Modern UI**: Glassmorphism, smooth animations, and responsive design.
- **Secure**: Password hashing with bcrypt, JWT authentication via HTTP-only cookies, and Zod input validation.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, Lucide (via SVG icons)
- **Backend**: Next.js API Routes, Mongoose (MongoDB)
- **Auth**: JWT, bcryptjs, Middleware
- **Validation**: Zod
- **Notifications**: React Hot Toast

## Getting Started

### 1. Prerequisites
- Node.js 18+
- MongoDB instance (Local or Atlas)

### 2. Environment Variables
Create a `.env.local` file in the root:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### 3. Installation
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure
- `/app`: Next.js App Router (Pages & API)
- `/components`: Reusable UI components
- `/models`: Mongoose schemas
- `/lib`: Utilities (DB, Auth, Validations)
## Deployment

### GitHub Pages (Full Functionality)
The app has been refactored to use **Browser Storage (localStorage)**, making it fully functional even on static hosts like GitHub Pages!

1.  **Push to `develop` branch**: The GitHub Action will automatically build and deploy.
2.  **Enable GitHub Pages**: In your Repo Settings > Pages, set the source to **GitHub Actions**.

### Features include:
- Persistent data across sessions (stored in your browser).
- Role-based login and registration.
- Appointment booking with conflict prevention.
- Dashboard for both Patients and Doctors.



