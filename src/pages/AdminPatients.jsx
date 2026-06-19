import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/admin.css";

const AdminPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPatients();
  }, [search]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/patients", {
        params: { search },
      });
      setPatients(res.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        await api.delete(`/admin/patients/${id}`);
        fetchPatients();
      } catch (error) {
        console.error("Error deleting patient:", error);
        alert("Error deleting patient");
      }
    }
  };

  return (
    <div className="admin-content">
      <div className="content-header">
        <h3>👥 Patient Management</h3>
      </div>

      {/* Search */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search patients by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Patients Table */}
      <div className="table-container">
        {loading ? (
          <p className="loading">Loading patients...</p>
        ) : patients.length === 0 ? (
          <p className="no-data">No patients found</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Blood Group</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.bloodGroup || "N/A"}</td>
                  <td>{patient.address || "N/A"}</td>
                  <td>
                    <span className={`status-badge status-${patient.status}`}>{patient.status}</span>
                  </td>
                  <td className="action-buttons">
                    <button className="btn-edit" title="View Details">
                      👁️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(patient._id)}
                      title="Delete"
                    >
                      🗑️
                    </button>
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

export default AdminPatients;

