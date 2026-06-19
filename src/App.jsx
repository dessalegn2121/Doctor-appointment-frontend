import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { RequireAuth } from "./auth/RequireAuth";
import "./index.css";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Doctors from "./pages/Doctors.jsx";
import DoctorProfile from "./pages/DoctorProfile.jsx";
import BookAppointment from "./pages/BookAppointment.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminDoctors from "./pages/AdminDoctors.jsx";
import AdminPatients from "./pages/AdminPatients.jsx";
import AdminAppointments from "./pages/AdminAppointments.jsx";
import AdminDepartments from "./pages/AdminDepartments.jsx";
import AdminSettings from "./pages/AdminSettings.jsx";
import DoctorAppointments from "./pages/DoctorAppointments.jsx";
import DoctorPatients from "./pages/DoctorPatients.jsx";
import PatientAppointments from "./pages/PatientAppointments.jsx";
import { SidebarLayout } from "./components/SidebarLayout.jsx";
import Contact from "./pages/Contact.jsx";

// Doctor Dashboard Pages
import DoctorDashboardHome from "./pages/DoctorDashboardHome.tsx";
import DoctorDashboardProfile from "./pages/DoctorDashboardProfile.tsx";
import DoctorPatientsNew from "./pages/DoctorPatientsNew.tsx";
import DoctorPrescriptions from "./pages/DoctorPrescriptions.tsx";
import DoctorLabReports from "./pages/DoctorLabReports.tsx";
import DoctorSchedule from "./pages/DoctorSchedule.tsx";
import DoctorMedicalRecords from "./pages/DoctorMedicalRecords.tsx";
import DoctorReviews from "./pages/DoctorReviews.tsx";
import DoctorReports from "./pages/DoctorReports.tsx";
import DoctorMessages from "./pages/DoctorMessages.tsx";
import DoctorNotifications from "./pages/DoctorNotifications.tsx";
import DoctorSettings from "./pages/DoctorSettings.tsx";
import DoctorDashboardLayout from "./components/DoctorDashboardLayout.tsx";

// Patient Dashboard Pages
import PatientDashboardHome from "./pages/PatientDashboardHome.tsx";
import PatientProfile from "./pages/PatientProfile.tsx";
import PatientDoctors from "./pages/PatientDoctors.tsx";
import PatientAppointmentsPage from "./pages/PatientAppointments.tsx";
import BookAppointmentPage from "./pages/BookAppointment.tsx";
import PatientMedicalRecords from "./pages/PatientMedicalRecords.tsx";
import PatientPrescriptions from "./pages/PatientPrescriptions.tsx";
import PatientNotifications from "./pages/PatientNotifications.tsx";
import PatientMessages from "./pages/PatientMessages.tsx";
import PatientSettings from "./pages/PatientSettings.tsx";
import { PatientSidebar } from "./components/PatientSidebar.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./auth/AuthProvider";
import { useNavigate } from "react-router-dom";

function PublicShell() {
  return (
    <div className="app-root">
      <Navbar />
      <main className="app-main">
        <div className="app-container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function DoctorLayout() {
  return (
    <SidebarLayout role="doctor">
      <Outlet />
    </SidebarLayout>
  );
}

function PatientDashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <PatientSidebar />
      <main className="min-h-screen overflow-y-auto p-4 md:p-6 lg:ml-64">
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 1000 * 60 * 5 },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route element={<PublicShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/book/:id"
          element={
            <RequireAuth allowedRoles={["patient"]}>
              <BookAppointment />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route
        path="/admin"
        element={
          <RequireAuth allowedRoles={["admin"]}>
            <AdminDashboard />
          </RequireAuth>
        }
      >
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="patients" element={<AdminPatients />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="departments" element={<AdminDepartments />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="contact" element={<Contact />} />
      </Route>

      <Route
        path="/doctor-dashboard"
        element={
          <RequireAuth allowedRoles={["doctor"]}>
            <DoctorDashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<DoctorDashboardHome />} />
        <Route path="profile" element={<DoctorDashboardProfile />} />
        <Route path="appointments" element={<DoctorAppointments />} />
        <Route path="patients" element={<DoctorPatientsNew />} />
        <Route path="medical-records" element={<DoctorMedicalRecords />} />
        <Route path="prescriptions" element={<DoctorPrescriptions />} />
        <Route path="lab-reports" element={<DoctorLabReports />} />
        <Route path="schedule" element={<DoctorSchedule />} />
        <Route path="messages" element={<DoctorMessages />} />
        <Route path="notifications" element={<DoctorNotifications />} />
        <Route path="reviews" element={<DoctorReviews />} />
        <Route path="reports" element={<DoctorReports />} />
        <Route path="settings" element={<DoctorSettings />} />
      </Route>

      <Route
        path="/doctor"
        element={<Navigate to="/doctor-dashboard" replace />}
      />

      <Route
        path="/patient"
        element={
          <RequireAuth allowedRoles={["patient"]}>
            <PatientDashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<PatientDashboardHome />} />
        <Route path="profile" element={<PatientProfile />} />
        <Route path="doctors" element={<PatientDoctors />} />
        <Route path="appointments" element={<PatientAppointmentsPage />} />
        <Route path="appointments/book" element={<BookAppointmentPage />} />
        <Route path="medical-records" element={<PatientMedicalRecords />} />
        <Route path="prescriptions" element={<PatientPrescriptions />} />
        <Route path="notifications" element={<PatientNotifications />} />
        <Route path="messages" element={<PatientMessages />} />
        <Route path="settings" element={<PatientSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </QueryClientProvider>
  );
}
