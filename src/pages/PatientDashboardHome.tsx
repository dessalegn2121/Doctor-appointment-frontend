import React, { useEffect, useRef, useState } from 'react';
import { usePatientDashboard } from '../hooks/usePatient';
import { Calendar, CheckCircle, Pill, FileText, Bell, AlertCircle, User, Users, MessageSquare, Settings, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookAppointmentPage from './BookAppointment.tsx';

const PatientDashboardHome: React.FC = () => {
  const { data, isLoading, error } = usePatientDashboard();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const bookingSectionRef = useRef<HTMLDivElement | null>(null);

  const openBookingForm = () => {
    setShowBookingForm(true);
  };

  useEffect(() => {
    if (showBookingForm) {
      bookingSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showBookingForm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center space-x-4">
        <AlertCircle className="text-red-600" size={24} />
        <div>
          <h3 className="font-semibold text-red-900">Error loading dashboard</h3>
          <p className="text-red-700 text-sm">Please refresh the page and try again</p>
        </div>
      </div>
    );
  }

  const dashboard = data?.data;

  const quickActions = [
    { to: '/patient/profile', label: 'My Profile', icon: User, color: 'bg-slate-900 text-white hover:bg-slate-800' },
    { label: 'Book Appointment', icon: Calendar, color: 'bg-blue-600 text-white hover:bg-blue-700', action: openBookingForm },
    { to: '/patient/appointments', label: 'My Appointments', icon: ClipboardList, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
    { to: '/patient/doctors', label: 'Find Doctors', icon: Users, color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
    { to: '/patient/medical-records', label: 'Medical Records', icon: FileText, color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
    { to: '/patient/prescriptions', label: 'Prescriptions', icon: Pill, color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
    { to: '/patient/messages', label: 'Messages', icon: MessageSquare, color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200' },
    { to: '/patient/notifications', label: 'Notifications', icon: Bell, color: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
    { to: '/patient/settings', label: 'Settings', icon: Settings, color: 'bg-slate-100 text-slate-700 hover:bg-slate-200' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome, {dashboard?.patient?.name}! 👋
        </h1>
        <p className="text-blue-100">Here's your healthcare overview</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/patient/profile"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            <User size={18} />
            View Profile
          </Link>
          <button
            type="button"
            onClick={openBookingForm}
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Calendar size={18} />
            Book Appointment
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Upcoming Appointments</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {dashboard?.dashboardStats?.upcomingCount || 0}
              </p>
            </div>
            <Calendar className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Completed Appointments</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {dashboard?.dashboardStats?.completedCount || 0}
              </p>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Prescriptions</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">0</p>
            </div>
            <Pill className="text-purple-600" size={32} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Medical Records</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">0</p>
            </div>
            <FileText className="text-orange-600" size={32} />
          </div>
        </div>
      </div>

      {/* Navigation Hub */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Patient Navigation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const isActionButton = typeof action.action === 'function';

            if (isActionButton) {
              return (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.action}
                  className={`flex items-center justify-between rounded-xl px-4 py-4 font-semibold transition ${action.color}`}
                >
                  <span>{action.label}</span>
                  <Icon size={20} />
                </button>
              );
            }

            return (
              <Link
                key={action.to}
                to={action.to}
                className={`flex items-center justify-between rounded-xl px-4 py-4 font-semibold transition ${action.color}`}
              >
                <span>{action.label}</span>
                <Icon size={20} />
              </Link>
            );
          })}
        </div>
      </div>

      {showBookingForm && (
        <div ref={bookingSectionRef} id="book-appointment" className="bg-white rounded-lg shadow p-6 border border-blue-100">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Book an Appointment</h2>
              <p className="text-sm text-gray-600">Open the booking form without leaving the dashboard.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowBookingForm(false)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Close
            </button>
          </div>
          <BookAppointmentPage />
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button
              type="button"
              onClick={openBookingForm}
              className="block w-full rounded-lg bg-blue-600 py-3 text-center text-white transition hover:bg-blue-700"
            >
              📅 Book Appointment
            </button>
            <Link
              to="/patient/doctors"
              className="block w-full text-center bg-blue-100 text-blue-600 py-3 rounded-lg hover:bg-blue-200 transition"
            >
              👨‍⚕️ View Doctors
            </Link>
            <Link
              to="/patient/medical-records"
              className="block w-full text-center bg-blue-100 text-blue-600 py-3 rounded-lg hover:bg-blue-200 transition"
            >
              📋 View Medical Records
            </Link>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Appointments</h2>
          {dashboard?.upcomingAppointments?.length > 0 ? (
            <div className="space-y-3">
              {dashboard.upcomingAppointments.slice(0, 3).map((apt: any) => (
                <div
                  key={apt._id}
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{apt.doctorId?.name}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(apt.appointmentDate).toLocaleDateString()} at {apt.timeSlot}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-200 text-yellow-800 text-sm rounded-full">
                    {apt.status}
                  </span>
                </div>
              ))}
              <Link
                to="/patient/appointments"
                className="text-center text-blue-600 hover:text-blue-800 font-semibold text-sm"
              >
                View All →
              </Link>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6">No upcoming appointments</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardHome;
