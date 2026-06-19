import React, { useState } from "react";
import "../styles/dashboard.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: null, text: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: "error", text: "Please fill in all fields." });
      return;
    }
    // No backend contact endpoint yet; keep UX responsive.
    setStatus({ type: "success", text: "Message received. Our team will reach out shortly." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <div className="dashboard-page-header">
        <div className="dashboard-page-title">Contact Us</div>
        <div className="dashboard-page-subtitle">Get help, ask questions, or request support.</div>
      </div>

      {status.type === "error" && <div className="alert alert-error">{status.text}</div>}
      {status.type === "success" && <div className="alert">{status.text}</div>}

      <div className="dashboard-info-grid">
        <div className="dashboard-info-card">
          <h3 className="dashboard-info-title">Clinic Support</h3>
          <p className="dashboard-info-text">
            For appointment questions, scheduling help, or general inquiries, you can contact our
            hospital support team.
          </p>

          <div style={{ marginTop: "0.9rem" }}>
            <div className="appointment-meta">Location: Tepi, Ethiopia</div>
            <div className="appointment-meta">Phone: +251 900 000 000</div>
            <div className="appointment-meta">Email: tepi.hospital@email.com</div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <h3 className="dashboard-info-title" style={{ marginTop: 0 }}>
              Hours
            </h3>
            <p className="dashboard-info-text">
              Monday to Friday, 8:00 AM to 5:00 PM. Emergency requests should be handled by
              calling the clinic directly.
            </p>
          </div>
        </div>

        <div className="dashboard-info-card">
          <h3 className="dashboard-info-title">Send a Message</h3>
          <form onSubmit={handleSubmit} className="auth-form" style={{ marginTop: "0.5rem" }}>
            <div className="form-group">
              <label htmlFor="contactName">Full Name</label>
              <input
                id="contactName"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                type="text"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactEmail">Email</label>
              <input
                id="contactEmail"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                type="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactMessage">Message</label>
              <textarea
                id="contactMessage"
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                required
                rows={5}
                style={{ resize: "vertical" }}
                className="form-input"
              />
            </div>

            <button className="btn btn-primary full-width" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

