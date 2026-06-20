import apiClient from './apiClient';
// Auth API
export const authAPI = {
    login: (email, password) => apiClient.post('/auth/login', { email, password }),
    register: (data) => apiClient.post('/auth/register', data),
    logout: () => apiClient.post('/auth/logout', {}),
};
// Patient Profile API
export const patientAPI = {
    getProfile: () => apiClient.get('/patient/profile'),
    updateProfile: (data) => apiClient.put('/patient/profile', data),
    changePassword: (currentPassword, newPassword) => apiClient.post('/patient/change-password', { currentPassword, newPassword }),
    getDashboard: () => apiClient.get('/patient/dashboard'),
    getDepartments: () => apiClient.get('/patient/departments'),
};
// Patient Appointments API
export const appointmentAPI = {
    bookAppointment: (data) => apiClient.post('/patient/appointments/book', data),
    getAppointments: (status) => apiClient.get('/patient/appointments', { params: { status } }),
    getAppointmentDetails: (appointmentId) => apiClient.get(`/patient/appointments/${appointmentId}`),
    cancelAppointment: (appointmentId) => apiClient.delete(`/patient/appointments/${appointmentId}`),
};
// Doctors API
export const doctorsAPI = {
    getDoctors: (params) => {
        const query = typeof params === 'string' ? { specialization: params } : params;
        return apiClient.get('/doctors', { params: query });
    },
    getDoctorDetails: (doctorId) => apiClient.get(`/doctors/${doctorId}`),
    searchDoctors: (query) => apiClient.get('/doctors/search', { params: { q: query } }),
};
// Medical Records API
export const medicalRecordsAPI = {
    getMedicalRecords: () => apiClient.get('/patient/medical-records'),
};
// Prescriptions API
export const prescriptionsAPI = {
    getPrescriptions: () => apiClient.get('/patient/prescriptions'),
};
// Notifications API
export const notificationsAPI = {
    getNotifications: () => apiClient.get('/patient/notifications'),
    markAsRead: (notificationId) => apiClient.put(`/patient/notifications/${notificationId}/read`, {}),
};
// Messages API
export const messagesAPI = {
    getConversations: () => apiClient.get('/patient/conversations'),
    getMessages: (conversationId) => apiClient.get(`/patient/messages/${conversationId}`),
    sendMessage: (conversationId, receiverId, message) => apiClient.post('/patient/messages', { conversationId, receiverId, message }),
    startConversation: (doctorId) => apiClient.post('/patient/conversations/start', { doctorId }),
};
