import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function DoctorPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/appointments/patients");
      setPatients(res.data);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <div className="dashboard-page-header">
        <div className="dashboard-page-title">My Patients</div>
        <div className="dashboard-page-subtitle">Patients who have appointments with you.</div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="dashboard-info-card">
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          <div className="appointments-list">
            {patients.map((p) => (
              <div key={p._id} className="appointment-card">
                <div className="appointment-info">
                  <div className="appointment-title">{p.name}</div>
                  <div className="appointment-meta">{p.email}</div>
                  <div className="appointment-meta">
                    Joined{" "}
                    {new Date(p.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            {!loading && patients.length === 0 && <p className="loading-text">No patients yet.</p>}
          </div>
        )}
      </div>
    </>
  );
}

