import { useState, useEffect } from "react";
import api from "../services/api";
import "../styles/admin.css";

const AdminDoctors = () => {
  const specializationOptions = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "General Medicine",
    "Gynecology",
    "ENT",
    "Oncology",
  ];

  const departmentOptions = [
    "General Medicine",
    "Cardiology",
    "Pediatrics",
    "Orthopedics",
    "Neurology",
    "Dermatology",
    "Gynecology",
  ];

  const qualificationOptions = [
    "MBBS",
    "MD",
    "MS",
    "BDS",
    "DM",
    "MDS",
    "FRCS",
    "FCPS",
    "PhD",
  ];

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    qualification: "",
    specialization: "",
    experience: "",
    department: "",
    licenseNumber: "",
    address: "",
    consultationFee: "",
    password: "",
    profileImage: "",
    description: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, [page, search]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/doctors", {
        params: { page, limit: 10, search },
      });
      setDoctors(res.data.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      qualification: "",
      specialization: "",
      experience: "",
      department: "",
      licenseNumber: "",
      address: "",
      consultationFee: "",
      password: "",
      profileImage: "",
      description: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Clean data: don't send empty profileImage
      const dataToSend = { ...formData };
      if (!dataToSend.profileImage) {
        delete dataToSend.profileImage;
      }
      
      if (editingId) {
        await api.put(`/admin/doctors/${editingId}`, dataToSend);
      } else {
        await api.post("/admin/doctors", dataToSend);
      }
      setShowForm(false);
      resetForm();
      fetchDoctors();
    } catch (error) {
      console.error("Error saving doctor:", error);
      alert(error.response?.data?.message || "Error saving doctor");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/admin/doctors/${id}`);
        fetchDoctors();
      } catch (error) {
        console.error("Error deleting doctor:", error);
      }
    }
  };

  return (
    <div className="admin-content">
      <div className="content-header">
        <h3>👨‍⚕️ Doctor Management</h3>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Add Doctor
        </button>
      </div>

      {/* Search and Filter */}
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search doctors..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="search-input"
        />
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h4>{editingId ? "Edit Doctor" : "Add New Doctor"}</h4>
              <button className="close-btn" onClick={() => setShowForm(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="doctor-form">
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-row">
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Qualification</option>
                  {qualificationOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Specialization</option>
                  {specializationOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <input
                  type="number"
                  name="experience"
                  placeholder="Experience (years)"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departmentOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                <input
                  type="text"
                  name="licenseNumber"
                  placeholder="License Number"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                />
                <input
                  type="number"
                  name="consultationFee"
                  placeholder="Consultation Fee"
                  value={formData.consultationFee}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
              ></textarea>

              <div className="form-row">
                <label className="field-label" htmlFor="doctor-photo">Doctor Photo</label>
                <input
                  id="doctor-photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </div>

              {formData.profileImage && (
                <div className="photo-preview-box">
                  <img src={formData.profileImage} alt="Doctor preview" className="photo-preview" />
                </div>
              )}

              <textarea
                name="description"
                placeholder="Short doctor description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
              ></textarea>

              {!editingId && (
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              )}

              <div className="form-actions">
                <button type="submit" className="btn-success">
                  Save
                </button>
                <button type="button" className="btn-cancel" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Doctors Table */}
      <div className="table-container">
        {loading ? (
          <p className="loading">Loading doctors...</p>
        ) : doctors.length === 0 ? (
          <p className="no-data">No doctors found</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phone}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.experience} yrs</td>
                  <td>
                    <span className={`status-badge status-${doctor.status}`}>{doctor.status}</span>
                  </td>
                  <td className="action-buttons">
                    <button 
                      className="btn-edit" 
                      title="Edit"
                      onClick={() => {
                        setEditingId(doctor._id);
                                setFormData({
                          name: doctor.name,
                          email: doctor.email,
                          phone: doctor.phone,
                          gender: doctor.gender,
                          dob: doctor.dob,
                          qualification: doctor.qualification,
                          specialization: doctor.specialization,
                          experience: doctor.experience,
                          department: doctor.department,
                          licenseNumber: doctor.licenseNumber,
                          address: doctor.address,
                          consultationFee: doctor.consultationFee,
                          password: "",
                          profileImage: doctor.profileImage || "",
                          description: doctor.description || "",
                        });
                        setShowForm(true);
                      }}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(doctor._id)}
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

export default AdminDoctors;

