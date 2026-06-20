import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
// Add token to requests
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("TEPI_JWT");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));
// Doctor Dashboard API calls
export const doctorDashboardAPI = {
    // Dashboard Overview
    getDashboardOverview: () => apiClient.get("/doctor-dashboard/overview"),
    getChartData: (chartType) => apiClient.get(`/doctor-dashboard/chart-data?chartType=${chartType}`),
    // Profile
    getProfile: () => apiClient.get("/doctor-dashboard/profile"),
    updateProfile: (data) => apiClient.put("/doctor-dashboard/profile", data),
    uploadProfilePicture: (profileImage) => apiClient.post("/doctor-dashboard/profile/picture", { profileImage }),
    changePassword: (data) => apiClient.post("/doctor-dashboard/password", data),
    // Appointments
    getAppointments: (params) => apiClient.get("/doctor-dashboard/appointments", { params }),
    updateAppointmentStatus: (appointmentId, data) => apiClient.put(`/doctor-dashboard/appointments/${appointmentId}/status`, data),
    // Patients
    getPatients: (params) => apiClient.get("/doctor-dashboard/patients", { params }),
    getPatientDetails: (patientId) => apiClient.get(`/doctor-dashboard/patients/${patientId}`),
    // Medical Records
    createMedicalRecord: (data) => apiClient.post("/doctor-dashboard/medical-records", data),
    // Prescriptions
    createPrescription: (data) => apiClient.post("/doctor-dashboard/prescriptions", data),
    getPrescriptions: (params) => apiClient.get("/doctor-dashboard/prescriptions", { params }),
    // Lab Reports
    getLabReports: (params) => apiClient.get("/doctor-dashboard/lab-reports", { params }),
    updateLabReportStatus: (reportId, data) => apiClient.put(`/doctor-dashboard/lab-reports/${reportId}`, data),
    // Messages
    getMessages: (params) => apiClient.get("/doctor-dashboard/messages", { params }),
    sendMessage: (data) => apiClient.post("/doctor-dashboard/messages", data),
    // Notifications
    getNotifications: (params) => apiClient.get("/doctor-dashboard/notifications", { params }),
    markNotificationAsRead: (notificationId) => apiClient.put(`/doctor-dashboard/notifications/${notificationId}/read`),
    // Reviews
    getReviews: (params) => apiClient.get("/doctor-dashboard/reviews", { params }),
    // Schedule
    getSchedule: () => apiClient.get("/doctor-dashboard/schedule"),
    updateSchedule: (data) => apiClient.put("/doctor-dashboard/schedule", data),
    // Reports
    generateConsultationReport: (data) => apiClient.post("/doctor-dashboard/reports/consultation", data),
    // Settings
    getSettings: () => apiClient.get("/doctor-dashboard/settings"),
    updateSettings: (data) => apiClient.put("/doctor-dashboard/settings", data),
};
export default apiClient;
