import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api.jsx";
import AppointmentForm from "../components/AppointmentForm.jsx";

// Booking page: show doctor summary and embed appointment form
const BookAppointment = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loadingDoctor, setLoadingDoctor] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoadingDoctor(true);
      try {
        const res = await api.get(`/doctors/${id}`);
        setDoctor(res.data);
      } catch (error) {
        console.error("Failed to load doctor", error);
      } finally {
        setLoadingDoctor(false);
      }
    };
    load();
  }, [id]);

  const handleBook = async (isoDate) => {
    setMessage("");
    setSubmitting(true);
    try {
      await api.post("/appointments", { doctorId: id, appointmentDate: isoDate });
      setMessage("Appointment booked successfully.");
      setTimeout(() => navigate("/patient"), 800);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to book appointment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingDoctor) {
    return (
      <section className="loading-text">Loading doctor...</section>
    );
  }
  if (!doctor) {
    return (
      <section className="empty-text">Doctor not found.</section>
    );
  }

  return (
    <section className="book-page">
      <div className="book-layout">
        <div className="book-doctor-summary">
          <h2 className="book-doctor-title">
            {doctor.name}
          </h2>
          <p className="book-doctor-specialization">
            {doctor.specialization}
          </p>
          <p className="book-doctor-hospital">{doctor.hospital}</p>
          <div className="book-doctor-meta">
            <p>
              Fee:{" "}
              <span className="badge-soft">
                {doctor.consultationFee} ETB
              </span>
            </p>
            <p>
              Available:{" "}
              {Array.isArray(doctor.availableDays)
                ? doctor.availableDays.join(", ")
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {message && (
            <div className="book-alert">{message}</div>
          )}
          <AppointmentForm
            doctor={doctor}
            onSubmit={handleBook}
            loading={submitting}
          />
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;

