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
import DoctorDashboardHome from "./pages/DoctorDashboardHome.jsx";
import DoctorDashboardProfile from "./pages/DoctorDashboardProfile.jsx";
import DoctorPatientsNew from "./pages/DoctorPatientsNew.jsx";
import DoctorPrescriptions from "./pages/DoctorPrescriptions.jsx";
import DoctorLabReports from "./pages/DoctorLabReports.jsx";
import DoctorSchedule from "./pages/DoctorSchedule.jsx";
import DoctorMedicalRecords from "./pages/DoctorMedicalRecords.jsx";
import DoctorReviews from "./pages/DoctorReviews.jsx";
import DoctorReports from "./pages/DoctorReports.jsx";
import DoctorMessages from "./pages/DoctorMessages.jsx";
import DoctorNotifications from "./pages/DoctorNotifications.jsx";
import DoctorSettings from "./pages/DoctorSettings.jsx";
import DoctorDashboardLayout from "./components/DoctorDashboardLayout.jsx";

// Patient Dashboard Pages
import PatientDashboardHome from "./pages/PatientDashboardHome.jsx";
import PatientProfile from "./pages/PatientProfile.jsx";
import PatientDoctors from "./pages/PatientDoctors.jsx";
import PatientAppointmentsPage from "./pages/PatientAppointments.jsx";
import BookAppointmentPage from "./pages/BookAppointmentPage.jsx";
import PatientMedicalRecords from "./pages/PatientMedicalRecords.jsx";
import PatientPrescriptions from "./pages/PatientPrescriptions.jsx";
import PatientNotifications from "./pages/PatientNotifications.jsx";
import PatientMessages from "./pages/PatientMessages.jsx";
import PatientSettings from "./pages/PatientSettings.jsx";
import { PatientSidebar } from "./components/PatientSidebar.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./auth/AuthProvider";
import { useNavigate } from "react-router-dom";

function PublicShell() {
  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(circle_at_top_left,_#e0f2fe_0,_transparent_45%),radial-gradient(circle_at_bottom_right,_#ede9fe_0,_transparent_50%),#f8fafc]">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
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
    <div className="min-h-screen bg-slate-100">
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
