import { useState, useEffect } from "react";
import api from "../services/api";

const AdminSettings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    appName: "",
    appEmail: "",
    phone: "",
    address: "",
    about: "",
    workingHours: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/settings");
      setSettings(res.data);
      setFormData(res.data || {});
      setError(null);
    } catch (err) {
      setError("Failed to load settings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess(null);
      await api.put("/admin/settings", formData);
      setSuccess("Settings updated successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to update settings");
      console.error(err);
    }
  };

  if (loading) return <div className="admin-content"><p>Loading settings...</p></div>;

  return (
    <div className="admin-content">
      <div className="content-header">
        <h3>Application Settings</h3>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="settings-container">
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-section">
            <h4>General Settings</h4>
            <div className="form-group">
              <label>Application Name</label>
              <input
                type="text"
                name="appName"
                value={formData.appName || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Application Email</label>
              <input
                type="email"
                name="appEmail"
                value={formData.appEmail || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Working Hours</label>
              <input
                type="text"
                name="workingHours"
                value={formData.workingHours || ""}
                onChange={handleChange}
                placeholder="e.g., 9:00 AM - 6:00 PM"
              />
            </div>

            <div className="form-group">
              <label>About Us</label>
              <textarea
                name="about"
                value={formData.about || ""}
                onChange={handleChange}
                rows={5}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-success">
              Save Settings
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setFormData(settings)}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
