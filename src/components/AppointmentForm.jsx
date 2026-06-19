import { useState } from "react";

// Simple date/time selector for booking an appointment with a doctor
const AppointmentForm = ({ doctor, onSubmit, loading }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !time) return;
    const appointmentDate = new Date(`${date}T${time}:00`);
    onSubmit(appointmentDate.toISOString());
  };

  return (
    <form
      className="appointment-form"
      onSubmit={handleSubmit}
    >
      <h3 className="appointment-form-title">Book Appointment</h3>
      <p className="appointment-form-subtitle">
        Doctor: <span className="font-semibold">{doctor?.name}</span>
      </p>
      <div className="appointment-form-fields">
        <div className="form-field">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            className="form-input"
          />
        </div>
      </div>
      <button
        className="btn btn-primary btn-full btn-sm"
        type="submit"
        disabled={loading}
      >
        {loading ? "Booking..." : "Confirm Appointment"}
      </button>
    </form>
  );
};

export default AppointmentForm;

