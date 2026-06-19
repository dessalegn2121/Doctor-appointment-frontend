import { useState, useEffect } from "react";
import api from "../services/api";

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/departments");
      setDepartments(res.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to load departments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/admin/departments/${editingId}`, formData);
      } else {
        await api.post("/admin/departments", formData);
      }
      setFormData({ name: "", description: "" });
      setEditingId(null);
      setShowForm(false);
      fetchDepartments();
    } catch (err) {
      setError("Failed to save department");
      console.error(err);
    }
  };

  const handleEdit = (dept) => {
    setFormData({ name: dept.name, description: dept.description });
    setEditingId(dept._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await api.delete(`/admin/departments/${id}`);
        fetchDepartments();
      } catch (err) {
        setError("Failed to delete department");
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: "", description: "" });
    setEditingId(null);
  };

  if (loading) return <div className="admin-content"><p>Loading departments...</p></div>;

  return (
    <div className="admin-content">
      <div className="content-header">
        <h3>Manage Departments</h3>
        <button
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Department"}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {showForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Department Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-success">
                {editingId ? "Update" : "Create"}
              </button>
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.length > 0 ? (
              departments.map((dept) => (
                <tr key={dept._id}>
                  <td>{dept.name}</td>
                  <td>{dept.description || "N/A"}</td>
                  <td className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(dept)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(dept._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No departments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDepartments;
