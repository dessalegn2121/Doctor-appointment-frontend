import React from 'react';
import { usePatientAppointments, useCancelAppointment } from '../hooks/usePatient';
import { Calendar, Clock, User, Trash2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
const PatientAppointments = () => {
    const { data, isLoading, error } = usePatientAppointments();
    const { mutate: cancelAppointment, isPending } = useCancelAppointment();
    const appointments = data?.data || [];
    const upcomingAppointments = appointments.filter((apt) => new Date(apt.appointmentDate) >= new Date());
    const pastAppointments = appointments.filter((apt) => new Date(apt.appointmentDate) < new Date());
    const handleCancel = (appointmentId) => {
        if (window.confirm('Are you sure you want to cancel this appointment?')) {
            cancelAppointment(appointmentId);
        }
    };
    if (error) {
        return (<div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center space-x-4">
        <AlertCircle className="text-red-600" size={24}/>
        <div>
          <h3 className="font-semibold text-red-900">Error loading appointments</h3>
          <p className="text-red-700 text-sm">Please refresh the page and try again</p>
        </div>
      </div>);
    }
    return (<div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
        <h1 className="text-3xl font-bold">Appointments</h1>
        <p className="text-blue-100">Manage your appointments</p>
      </div>

      {/* Book New Appointment Button */}
      <Link to="/patient/appointments/book" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
        + Book New Appointment
      </Link>

      {isLoading ? (<div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading appointments...</p>
          </div>
        </div>) : (<>
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Appointments</h2>
            {upcomingAppointments.length > 0 ? (<div className="space-y-4">
                {upcomingAppointments.map((apt) => (<div key={apt._id} className="border border-blue-200 rounded-lg p-6 hover:shadow-lg transition">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="text-blue-600" size={20}/>
                          <span className="font-semibold text-lg">{apt.doctorId?.name}</span>
                        </div>
                        <p className="text-gray-600">{apt.doctorId?.specialization}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="text-blue-600" size={20}/>
                          <span>{new Date(apt.appointmentDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="text-blue-600" size={20}/>
                          <span>{apt.timeSlot}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Reason:</p>
                      <p className="text-gray-800">{apt.reason}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${apt.status === 'pending'
                        ? 'bg-yellow-200 text-yellow-800'
                        : apt.status === 'approved'
                            ? 'bg-green-200 text-green-800'
                            : 'bg-gray-200 text-gray-800'}`}>
                        {apt.status?.toUpperCase()}
                      </span>
                      {apt.status !== 'completed' && apt.status !== 'cancelled' && (<button onClick={() => handleCancel(apt._id)} disabled={isPending} className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition disabled:text-gray-400">
                          <Trash2 size={20}/>
                          <span>Cancel</span>
                        </button>)}
                    </div>
                  </div>))}
              </div>) : (<p className="text-center py-6 text-gray-500">No upcoming appointments</p>)}
          </div>

          {/* Past Appointments */}
          {pastAppointments.length > 0 && (<div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Appointment History</h2>
              <div className="space-y-4">
                {pastAppointments.map((apt) => (<div key={apt._id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="text-gray-400" size={20}/>
                          <span className="font-semibold">{apt.doctorId?.name}</span>
                        </div>
                        <p className="text-gray-600">{apt.doctorId?.specialization}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="text-gray-400" size={20}/>
                          <span>{new Date(apt.appointmentDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="text-gray-400" size={20}/>
                          <span>{apt.timeSlot}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${apt.status === 'completed'
                        ? 'bg-green-200 text-green-800'
                        : 'bg-red-200 text-red-800'}`}>
                      {apt.status?.toUpperCase()}
                    </span>
                  </div>))}
              </div>
            </div>)}
        </>)}
    </div>);
};
export default PatientAppointments;
