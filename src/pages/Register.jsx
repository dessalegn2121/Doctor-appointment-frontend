import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../auth/AuthProvider";
import "../styles/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    role: "",
    password: "",
    confirmPassword: "",
    qualification: "",
    specialization: "",
    experience: "",
    licenseNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";

    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    else if (!/^[0-9]{10,}$/.test(formData.phone.replace(/\D/g, ""))) newErrors.phone = "Invalid phone number";

    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.role) newErrors.role = "Role is required";

    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    else {
      const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
      if (age < 18) newErrors.dob = "Must be at least 18 years old";
    }

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        dob: formData.dob,
        role: formData.role,
        password: formData.password,
      };

      // Add doctor-specific fields if registering as doctor
      if (formData.role === "doctor") {
        submitData.qualification = formData.qualification;
        submitData.specialization = formData.specialization;
        submitData.experience = formData.experience;
        submitData.licenseNumber = formData.licenseNumber;
      }

      const res = await api.post("/auth/register", submitData);
      login(res.data.token);
      
      // Redirect based on role
      const redirectPath = formData.role === "doctor" ? "/doctor-dashboard" : "/patient";
      navigate(redirectPath);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const pwd = formData.password;
    if (!pwd) return { strength: 0, text: "", color: "" };
    if (pwd.length < 6) return { strength: 1, text: "Weak", color: "#ef4444" };
    if (pwd.length < 10) return { strength: 2, text: "Fair", color: "#f97316" };
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return { strength: 3, text: "Strong", color: "#22c55e" };
    return { strength: 2, text: "Fair", color: "#f97316" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <section className="register-section">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1>Patient Registration</h1>
            <p>Create your account to book appointments</p>
          </div>

          {error && <div className="alert alert-error"><span>⚠️</span> {error}</div>}

          <form onSubmit={handleSubmit} className="register-form">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <div className={`input-wrapper ${focusedField === "name" ? "focused" : ""} ${errors.name ? "error" : ""}`}>
                <span className="input-icon">👤</span>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  className="form-input"
                />
              </div>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address <span className="required">*</span>
              </label>
              <div className={`input-wrapper ${focusedField === "email" ? "focused" : ""} ${errors.email ? "error" : ""}`}>
                <span className="input-icon">✉️</span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="form-input"
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <div className={`input-wrapper ${focusedField === "phone" ? "focused" : ""} ${errors.phone ? "error" : ""}`}>
                <span className="input-icon">📱</span>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="10-digit phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField(null)}
                  className="form-input"
                />
              </div>
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            {/* Gender & DOB Row */}
            <div className="form-row">
              {/* Gender */}
              <div className="form-group">
                <label htmlFor="gender" className="form-label">
                  Gender <span className="required">*</span>
                </label>
                <div className={`input-wrapper ${focusedField === "gender" ? "focused" : ""} ${errors.gender ? "error" : ""}`}>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("gender")}
                    onBlur={() => setFocusedField(null)}
                    className="form-input"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {errors.gender && <span className="error-message">{errors.gender}</span>}
              </div>

              {/* Date of Birth */}
              <div className="form-group">
                <label htmlFor="dob" className="form-label">
                  Date of Birth <span className="required">*</span>
                </label>
                <div className={`input-wrapper ${focusedField === "dob" ? "focused" : ""} ${errors.dob ? "error" : ""}`}>
                  <span className="input-icon">📅</span>
                  <input
                    id="dob"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("dob")}
                    onBlur={() => setFocusedField(null)}
                    className="form-input"
                  />
                </div>
                {errors.dob && <span className="error-message">{errors.dob}</span>}
              </div>
            </div>

            {/* Role */}
            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Register as <span className="required">*</span>
              </label>
              <div className={`input-wrapper ${focusedField === "role" ? "focused" : ""} ${errors.role ? "error" : ""}`}>
                <span className="input-icon">👥</span>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("role")}
                  onBlur={() => setFocusedField(null)}
                  className="form-input"
                >
                  <option value="">Select Role</option>
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {errors.role && <span className="error-message">{errors.role}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password <span className="required">*</span>
              </label>
              <div className={`input-wrapper ${focusedField === "password" ? "focused" : ""} ${errors.password ? "error" : ""}`}>
                <span className="input-icon">🔐</span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="form-input"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className="strength-fill"
                      style={{
                        width: `${(passwordStrength.strength / 3) * 100}%`,
                        backgroundColor: passwordStrength.color,
                      }}
                    ></div>
                  </div>
                  <span className="strength-text" style={{ color: passwordStrength.color }}>
                    Strength: {passwordStrength.text}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password <span className="required">*</span>
              </label>
              <div className={`input-wrapper ${focusedField === "confirmPassword" ? "focused" : ""} ${errors.confirmPassword ? "error" : ""}`}>
                <span className="input-icon">🔐</span>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("confirmPassword")}
                  onBlur={() => setFocusedField(null)}
                  className="form-input"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showConfirmPassword ? "👁️‍🗨️" : "👁️"}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-register"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span> Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Sign In Here
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative side */}
        <div className="register-side">
          <div className="side-content">
            <h2>Join Our Platform</h2>
            <ul className="benefits-list">
              <li>✅ Easy appointment booking</li>
              <li>✅ Access to expert doctors</li>
              <li>✅ Secure health records</li>
              <li>✅ 24/7 customer support</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

