import apiClient from './apiClient';

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),
  register: (data: any) =>
    apiClient.post('/auth/register', data),
  logout: () =>
    apiClient.post('/auth/logout', {}),
};

// Patient Profile API
export const patientAPI = {
  getProfile: () =>
    apiClient.get('/patient/profile'),
  updateProfile: (data: any) =>
    apiClient.put('/patient/profile', data),
  changePassword: (currentPassword: string, newPassword: string) =>
    apiClient.post('/patient/change-password', { currentPassword, newPassword }),
  getDashboard: () =>
    apiClient.get('/patient/dashboard'),
  getDepartments: () =>
    apiClient.get('/patient/departments'),
};

// Patient Appointments API
export const appointmentAPI = {
  bookAppointment: (data: any) =>
    apiClient.post('/patient/appointments/book', data),
  getAppointments: (status?: string) =>
    apiClient.get('/patient/appointments', { params: { status } }),
  getAppointmentDetails: (appointmentId: string) =>
    apiClient.get(`/patient/appointments/${appointmentId}`),
  cancelAppointment: (appointmentId: string) =>
    apiClient.delete(`/patient/appointments/${appointmentId}`),
};

// Doctors API
export const doctorsAPI = {
  getDoctors: (params?: string | { specialization?: string; department?: string }) => {
    const query = typeof params === 'string' ? { specialization: params } : params;
    return apiClient.get('/doctors', { params: query });
  },
  getDoctorDetails: (doctorId: string) =>
    apiClient.get(`/doctors/${doctorId}`),
  searchDoctors: (query: string) =>
    apiClient.get('/doctors/search', { params: { q: query } }),
};

// Medical Records API
export const medicalRecordsAPI = {
  getMedicalRecords: () =>
    apiClient.get('/patient/medical-records'),
};

// Prescriptions API
export const prescriptionsAPI = {
  getPrescriptions: () =>
    apiClient.get('/patient/prescriptions'),
};

// Notifications API
export const notificationsAPI = {
  getNotifications: () =>
    apiClient.get('/patient/notifications'),
  markAsRead: (notificationId: string) =>
    apiClient.put(`/patient/notifications/${notificationId}/read`, {}),
};

// Messages API
export const messagesAPI = {
  getConversations: () =>
    apiClient.get('/patient/conversations'),
  getMessages: (conversationId: string) =>
    apiClient.get(`/patient/messages/${conversationId}`),
  sendMessage: (conversationId: string, receiverId: string, message: string) =>
    apiClient.post('/patient/messages', { conversationId, receiverId, message }),
  startConversation: (doctorId: string) =>
    apiClient.post('/patient/conversations/start', { doctorId }),
};
