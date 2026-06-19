import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/admin.css";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/appointments");
      let filtered = res.data;
      if (filter !== "all") {
        filtered = res.data.filter((apt) => apt.status === filter);
      }
      setAppointments(filtered);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "#f59e0b",
      approved: "#10b981",
      completed: "#06b6d4",
      cancelled: "#ef4444",
      rejected: "#dc2626",
    };
    return colors[status] || "#999";
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/appointments/${id}`, { status: newStatus });
      fetchAppointments();
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Error updating appointment");
    }
  };

  return (
    <div className="admin-content">
      <div className="content-header">
        <h3>📅 Appointment Management</h3>
      </div>

      {/* Filter */}
      <div className="search-filter">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="search-input"
          style={{ maxWidth: "200px" }}
        >
          <option value="all">All Appointments</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Appointments Table */}
      <div className="table-container">
        {loading ? (
          <p className="loading">Loading appointments...</p>
        ) : appointments.length === 0 ? (
          <p className="no-data">No appointments found</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt._id}>
                  <td>{apt.patientId?.name || "N/A"}</td>
                  <td>{apt.doctorId?.name || "N/A"}</td>
                  <td>
                    {new Date(apt.appointmentDate).toLocaleDateString()} {apt.timeSlot || "N/A"}
                  </td>
                  <td>{apt.reason || "N/A"}</td>
                  <td>
                    <span className="status-badge" style={{ backgroundColor: getStatusColor(apt.status) + "20", color: getStatusColor(apt.status) }}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="action-buttons">
                    <select
                      value={apt.status}
                      onChange={(e) => handleStatusChange(apt._id, e.target.value)}
                      className="status-select"
                      style={{ padding: "6px 10px", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer" }}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminAppointments;
