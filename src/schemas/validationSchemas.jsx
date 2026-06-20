import { z } from 'zod';
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});
export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    phone: z.string().min(10, 'Phone must be at least 10 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});
export const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone must be at least 10 characters'),
    gender: z.enum(['male', 'female', 'other']).optional(),
    dob: z.string().optional(),
    address: z.string().optional(),
    bloodGroup: z.string().optional(),
});
export const changePasswordSchema = z.object({
    currentPassword: z.string().min(6, 'Current password must be at least 6 characters'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords don't match",
    path: ["confirmPassword"],
});
export const bookAppointmentSchema = z.object({
    doctorId: z.string().min(1, 'Doctor is required'),
    departmentId: z.string().min(1, 'Department is required'),
    appointmentDate: z.string().min(1, 'Appointment date is required'),
    timeSlot: z.string().min(1, 'Time slot is required'),
    reason: z.string().min(10, 'Reason must be at least 10 characters'),
});
export const sendMessageSchema = z.object({
    message: z.string().min(1, 'Message cannot be empty').max(1000, 'Message is too long'),
});
