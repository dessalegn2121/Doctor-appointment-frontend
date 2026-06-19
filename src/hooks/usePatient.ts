import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  patientAPI,
  appointmentAPI,
  doctorsAPI,
  medicalRecordsAPI,
  prescriptionsAPI,
  notificationsAPI,
  messagesAPI,
} from '../services/patientAPI';

// Patient Profile Queries
export const usePatientProfile = () => {
  return useQuery({
    queryKey: ['patient-profile'],
    queryFn: () => patientAPI.getProfile(),
  });
};

export const useUpdatePatientProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => patientAPI.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient-profile'] });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({ currentPassword, newPassword }: any) =>
      patientAPI.changePassword(currentPassword, newPassword),
  });
};

// Dashboard Query
export const usePatientDashboard = () => {
  return useQuery({
    queryKey: ['patient-dashboard'],
    queryFn: () => patientAPI.getDashboard(),
  });
};

export const useDepartments = () => {
  return useQuery({
    queryKey: ['patient-departments'],
    queryFn: () => patientAPI.getDepartments(),
  });
};

// Appointments Queries
export const useBookAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => appointmentAPI.bookAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient-appointments'] });
      queryClient.invalidateQueries({ queryKey: ['patient-dashboard'] });
    },
  });
};

export const usePatientAppointments = (status?: string) => {
  return useQuery({
    queryKey: ['patient-appointments', status],
    queryFn: () => appointmentAPI.getAppointments(status),
  });
};

export const useAppointmentDetails = (appointmentId: string | null) => {
  return useQuery({
    queryKey: ['appointment-details', appointmentId],
    queryFn: () => appointmentAPI.getAppointmentDetails(appointmentId || ''),
    enabled: !!appointmentId,
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (appointmentId: string) => appointmentAPI.cancelAppointment(appointmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient-appointments'] });
      queryClient.invalidateQueries({ queryKey: ['patient-dashboard'] });
    },
  });
};

// Doctors Query
export const useDoctors = (specialization?: string) => {
  return useQuery({
    queryKey: ['doctors', specialization],
    queryFn: () => doctorsAPI.getDoctors(specialization),
  });
};

export const useDoctorsByDepartment = (department?: string) => {
  return useQuery({
    queryKey: ['doctors-by-department', department],
    queryFn: () => doctorsAPI.getDoctors({ department }),
    enabled: !!department,
  });
};

export const useDoctorDetails = (doctorId: string | null) => {
  return useQuery({
    queryKey: ['doctor-details', doctorId],
    queryFn: () => doctorsAPI.getDoctorDetails(doctorId || ''),
    enabled: !!doctorId,
  });
};

// Medical Records Query
export const useMedicalRecords = () => {
  return useQuery({
    queryKey: ['medical-records'],
    queryFn: () => medicalRecordsAPI.getMedicalRecords(),
  });
};

// Prescriptions Query
export const usePrescriptions = () => {
  return useQuery({
    queryKey: ['prescriptions'],
    queryFn: () => prescriptionsAPI.getPrescriptions(),
  });
};

// Notifications Queries
export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationsAPI.getNotifications(),
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) => notificationsAPI.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

// Messages Queries
export const useConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: () => messagesAPI.getConversations(),
  });
};

export const useMessages = (conversationId: string | null) => {
  return useQuery({
    queryKey: ['messages', conversationId],
    queryFn: () => messagesAPI.getMessages(conversationId || ''),
    enabled: !!conversationId,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) =>
      messagesAPI.sendMessage(data.conversationId, data.receiverId, data.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};

export const useStartConversation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (doctorId: string) => messagesAPI.startConversation(doctorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
  });
};
