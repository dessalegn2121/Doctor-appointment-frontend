import { useEffect, useState } from "react";
import api from "../services/api.js";

// Patient appointments page: list, status, and ability to cancel
const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.error("Failed to load appointments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleCancel = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Failed to cancel appointment", error);
    }
  };

  return (
    <section className="dashboard-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">My Appointments</h2>
          <p className="page-subtitle">
            Review upcoming and past appointments with Tepi General Hospital doctors.
          </p>
        </div>
      </div>

      <div className="dashboard-info-grid">
        <div className="dashboard-info-card">
          <h3 className="dashboard-info-title">About this dashboard</h3>
          <p className="dashboard-info-text">
            This page helps you manage your healthcare visits at Tepi General Hospital. Use it to
            keep track of your appointments, confirm your visit details, and stay organized for
            upcoming consultations.
          </p>
          <p className="dashboard-info-text">
            For privacy, appointment details should appear only for the currently logged-in
            patient account.
          </p>
          {loading ? (
            <p className="loading-text">Loading appointments...</p>
          ) : (
            <p className="dashboard-info-note">
              Loaded appointments: <span className="badge">{appointments.length}</span>
            </p>
          )}
          {appointments.length > 0 && (
            <p className="dashboard-info-note">
              You can manage or cancel your appointments from this dashboard.
            </p>
          )}
        </div>

        <div className="dashboard-map-card">
          <h3 className="dashboard-info-title">Location: Tepi, Ethiopia</h3>
          <div className="map-embed">
            <iframe
              title="Tepi, Ethiopia map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Tepi%2C%20Ethiopia&output=embed"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

