# NexumCare - Premium Doctor Scheduling Platform

A high-end, production-ready full-stack medical appointment scheduler built with **Next.js 14**, **MongoDB (Mongoose)**, and **Tailwind CSS**.

## ✨ Features
- **Modern Rebranded UI**: Powered by the **NexumCare** design system with glassmorphism and smooth animations.
- **Role-based Authentication**: Secure JWT-powered sessions (Edge-compatible) for Patients and Doctors.
- **Patient Journey**: Discover medical specialists, book slots with real-time double-booking prevention, and manage upcoming visits.
- **Doctor Command Center**: Approve or Reject requests, track patient history, and manage daily agendas.
- **Edge Runtime Support**: Optimized Middleware for fast, server-side authentication checks.
- **Secure Architecture**: Password hashing (BCRYPT), HTTP-only cookies, and Zod schema validation.

## 🛠 Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend**: Next.js API Routes (Node.js & Edge Runtime)
- **Database**: MongoDB Atlas via Mongoose
- **Security**: JWT (jose), bcryptjs, Middleware
- **Validation**: Zod
- **UX**: React Hot Toast, Custom Dashboards

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- MongoDB Atlas Cluster (or local instance)

### 2. Environment Variables
Create a `.env.local` file in the root:
```env
MONGODB_URI=mongodb+srv://... (Your Connection String)
JWT_SECRET=your_secure_secret_key
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Installation & Setup
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to experience **NexumCare**.

## 📁 Project Structure
- `/app`: Next.js App Router (Public/Auth/Dashboard Pages & API)
- `/components`: Premium UI components & Dashboards
- `/models`: Mongoose schemas (User, Appointment)
- `/lib`: Edge-compatible JWT logic, Auth utilities, & MongoDB connection logic
- `/context`: Global Auth state management

## 🌐 Deployment
This application is optimized for **Vercel**. 

1. Push your code to GitHub.
2. Link your repository in the Vercel dashboard.
3. Add your `MONGODB_URI` and `JWT_SECRET` in the Vercel Project Settings.
4. Add `0.0.0.0/0` to your MongoDB Atlas IP Access List to allow Vercel to connect.

---
© 2026 **NexumCare Healthcare**. All rights reserved.
