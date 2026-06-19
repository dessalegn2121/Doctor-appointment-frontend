import React, { useEffect, useState } from "react";
import { Calendar, Clock, User, Phone, CheckCircle, XCircle, AlertCircle, Edit2, Eye } from "lucide-react";
import { doctorDashboardAPI } from "../services/doctorDashboardAPI";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({ status: "", notes: "" });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const statuses = ["all", "pending", "approved", "completed", "cancelled", "rejected"];

  const applyLocalFallback = () => {
    setAppointments([]);
    setTotal(0);
    setMessage("");
  };

  const fetchAppointments = async (status = "all", pageNum = 1) => {
    try {
      setLoading(true);
      const params: any = { page: pageNum, limit: 10 };
      if (status !== "all") params.status = status;

      const res = await doctorDashboardAPI.getAppointments(params);
      setAppointments(res.data.appointments || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      applyLocalFallback();
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments(selectedStatus, page);
  }, [selectedStatus, page]);

  const handleStatusUpdate = async () => {
    if (!selectedAppointment) return;

    try {
      await doctorDashboardAPI.updateAppointmentStatus(selectedAppointment._id, updateData);
      setMessage("Appointment updated successfully!");
      setUpdateModal(false);
      setShowDetailModal(false);
      fetchAppointments(selectedStatus, page);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("Failed to update appointment");
      console.error(err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={16} />;
      case "approved":
        return <CheckCircle size={16} />;
      case "pending":
        return <AlertCircle size={16} />;
      case "cancelled":
      case "rejected":
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  if (loading && appointments.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-[#f3f7fc] min-h-screen -m-6 p-6">
      {message && (
        <div className="p-4 rounded-2xl bg-green-50 text-green-800 border border-green-200">
          {message}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex gap-3 flex-wrap">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => {
                setSelectedStatus(status);
                setPage(1);
              }}
              className={`px-5 py-3 rounded-xl font-medium transition text-lg ${
                selectedStatus === status
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden min-h-[240px]">
        {appointments.length === 0 ? (
          <div className="p-16 text-center text-gray-500 flex flex-col items-center justify-center min-h-[240px]">
            <Calendar size={56} className="mx-auto mb-4 opacity-40" />
            <p className="text-2xl">No appointments found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Patient</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Date & Time</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Reason</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt: any) => (
                  <tr key={apt._id} className="border-b hover:bg-gray-50 transition">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-gray-900">{apt.patientId?.name || "Unknown"}</p>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Phone size={14} />
                          {apt.patientId?.phone}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {new Date(apt.appointmentDate).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock size={14} />
                            {apt.timeSlot}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-700 max-w-xs truncate">{apt.reason}</p>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          apt.status
                        )}`}
                      >
                        {getStatusIcon(apt.status)}
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => {
                          setSelectedAppointment(apt);
                          setShowDetailModal(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {total > 10 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {Math.ceil(total / 10)}
          </span>
          <button
            onClick={() => setPage(Math.min(Math.ceil(total / 10), page + 1))}
            disabled={page === Math.ceil(total / 10)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Appointment Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-4">Patient Information</h4>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-600">Name:</span>{" "}
                      <span className="font-medium">{selectedAppointment.patientId?.name}</span>
                    </p>
                    <p>
                      <span className="text-gray-600">Email:</span>{" "}
                      <span className="font-medium">{selectedAppointment.patientId?.email}</span>
                    </p>
                    <p>
                      <span className="text-gray-600">Phone:</span>{" "}
                      <span className="font-medium">{selectedAppointment.patientId?.phone}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-4">Appointment Information</h4>
                  <div className="space-y-2">
                    <p>
                      <span className="text-gray-600">Date:</span>{" "}
                      <span className="font-medium">
                        {new Date(selectedAppointment.appointmentDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p>
                      <span className="text-gray-600">Time:</span>{" "}
                      <span className="font-medium">{selectedAppointment.timeSlot}</span>
                    </p>
                    <p>
                      <span className="text-gray-600">Status:</span>{" "}
                      <span
                        className={`inline-block px-2 py-1 rounded font-medium text-sm ${getStatusColor(
                          selectedAppointment.status
                        )}`}
                      >
                        {selectedAppointment.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Reason for Appointment</h4>
                <p className="text-gray-700">{selectedAppointment.reason}</p>
              </div>

              {selectedAppointment.notes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Notes</h4>
                  <p className="text-gray-700">{selectedAppointment.notes}</p>
                </div>
              )}

              {["pending", "approved"].includes(selectedAppointment.status) && (
                <button
                  onClick={() => {
                    setUpdateData({ status: selectedAppointment.status, notes: selectedAppointment.notes || "" });
                    setUpdateModal(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium w-full justify-center"
                >
                  <Edit2 size={16} />
                  Update Status
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {updateModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Update Appointment</h3>
              <button
                onClick={() => setUpdateModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={updateData.status}
                  onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={updateData.notes}
                  onChange={(e) => setUpdateData({ ...updateData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add any notes..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setUpdateModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusUpdate}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;

