import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['patient', 'doctor']),
  specialization: z.string().optional(),
}).refine((data) => {
  if (data.role === 'doctor' && !data.specialization) {
    return false;
  }
  return true;
}, {
  message: "Specialization is required for doctors",
  path: ["specialization"],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const appointmentSchema = z.object({
  doctorId: z.string().min(1, 'Doctor is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  timeSlot: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  notes: z.string().optional(),
});
