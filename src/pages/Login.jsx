import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api.js";
import { useAuth } from "../auth/AuthProvider";

const Login = () => {
  const roleToPath = {
    admin: "/admin",
    doctor: "/doctor-dashboard",
    patient: "/patient",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      const loggedInRole = res.data.user.role;

      login(token);
      navigate(roleToPath[loggedInRole] ?? "/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-card">
        <h2>Login</h2>
        <p className="auth-description">Sign in to your account to access your personalized dashboard and manage your appointments</p>
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary full-width" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="auth-footer">
          New patient? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

