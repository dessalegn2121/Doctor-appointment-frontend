import React, { useEffect, useState, useMemo } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtitle = useMemo(() => {
    if (loading) return "Loading appointments...";
    if (!appointments.length) return "No appointments yet.";
    return `You have ${appointments.length} appointment(s).`;
  }, [appointments.length, loading]);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCancel = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (e) {
      console.error("Failed to cancel appointment", e);
    }
  };

  return (
    <>
      <div className="dashboard-page-header">
        <div className="dashboard-page-title">My Appointments</div>
        <div className="dashboard-page-subtitle">{subtitle}</div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="appointments-list">
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          appointments.map((a) => (
            <div key={a._id} className="appointment-card">
              <div className="appointment-info">
                <div className="appointment-title">
                  {a.doctorId.name} - {a.doctorId.specialization}
                </div>
                <div className="appointment-meta">
                  {a.doctorId.hospital} -{" "}
                  {new Date(a.appointmentDate).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div className="appointment-actions">
                <span className="appointment-status">{a.status}</span>
                {a.status === "pending" && (
                  <button
                    type="button"
                    className="btn btn-danger-outline btn-sm"
                    onClick={() => handleCancel(a._id)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {!loading && appointments.length === 0 && (
        <div style={{ marginTop: "1rem" }}>
          <Link to="/doctors" className="btn btn-primary">
            Browse Doctors
          </Link>
        </div>
      )}
    </>
  );
}

