import React, { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const roleToPath = {
  admin: "/admin",
  doctor: "/doctor-dashboard",
  patient: "/patient/dashboard",
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isAuthenticated = useMemo(() => Boolean(user), [user]);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo-circle">TG</div>
          <div className="navbar-text">
            <span className="navbar-title">Tepi General Hospital</span>
            <span className="navbar-subtitle">Doctor Appointment System</span>
          </div>
        </Link>

        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
          >
            Doctors
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
          >
            Contact
          </NavLink>

          {!isAuthenticated && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => `nav-link ${isActive ? "nav-link-active" : ""}`}
              >
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-outline btn-sm navbar-auth-pill">
                Register
              </NavLink>
            </>
          )}

          {isAuthenticated && user && (
            <>
              <NavLink
                to={roleToPath[user.role] ?? "/"}
                className="btn btn-outline btn-sm navbar-auth-pill"
              >
                Dashboard
              </NavLink>
              <button onClick={handleLogout} className="btn btn-primary btn-sm navbar-auth-pill" type="button">
                Logout
              </button>
            </>
          )}
        </nav>

        <button
          className="navbar-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          type="button"
        >
          <span className="sr-only">Open main menu</span>
          <span className="navbar-toggle-bar" />
        </button>
      </div>

      {isOpen && (
        <nav className="mobile-nav">
          <div className="mobile-nav-inner">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "mobile-nav-link-active" : "mobile-nav-link-muted"}`
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "mobile-nav-link-active" : "mobile-nav-link-muted"}`
              }
              onClick={() => setIsOpen(false)}
            >
              Doctors
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "mobile-nav-link-active" : "mobile-nav-link-muted"}`
              }
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "mobile-nav-link-active" : "mobile-nav-link-muted"}`
              }
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>

            {!isAuthenticated && (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? "mobile-nav-link-active" : "mobile-nav-link-muted"}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="mobile-nav-link mobile-nav-link-muted"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}

            {isAuthenticated && user && (
              <>
                <NavLink
                  to={roleToPath[user.role] ?? "/"}
                  className="mobile-nav-link mobile-nav-link-active"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="mobile-nav-link mobile-nav-link-active"
                  type="button"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;

