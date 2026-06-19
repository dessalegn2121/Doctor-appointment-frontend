import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

import "../styles/dashboard.css";

const roleLabel = {
  admin: "Admin",
  doctor: "Doctor",
  patient: "Patient",
};

export function SidebarLayout({ role, children }) {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const navItems = (() => {
    if (role === "admin") {
      return [
        { to: "/admin", label: "Dashboard" },
        { to: "/admin/doctors", label: "Doctors" },
        { to: "/admin/patients", label: "Patients" },
        { to: "/admin/contact", label: "Contact" },
      ];
    }
    if (role === "doctor") {
      return [
        { to: "/doctor-dashboard/appointments", label: "Appointments" },
        { to: "/doctor-dashboard/patients", label: "Patients" },
        { to: "/doctor-dashboard/messages", label: "Messages" },
      ];
    }
    return [
      { to: "/patient", label: "Appointments" },
      { to: "/patient/contact", label: "Contact" },
    ];
  })();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <div className="dashboard-layout">
      <div className="dashboard-mobile-bar">
        <button
          type="button"
          className="dashboard-mobile-menu"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open navigation menu"
        >
          Menu
        </button>
      </div>

      {open && <div className="dashboard-overlay" onClick={() => setOpen(false)} />}

      <aside className={`dashboard-sidebar ${open ? "open" : ""}`} aria-label="Sidebar navigation">
        <div className="dashboard-sidebar-header">
          <div className="dashboard-sidebar-title">Tepi Doctor App</div>
          <div className="dashboard-sidebar-subtitle">
            {roleLabel[role] ?? "User"}
            {user?.id ? ` - ${user.id}` : ""}
          </div>
        </div>

        <nav className="dashboard-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === `/${role}`}
              className={({ isActive }) => `sidebar-link ${isActive ? "sidebar-link-active" : ""}`}
              onClick={() => setOpen(false)}
            >
              <span>{item.label}</span>
              <span aria-hidden="true">{'->'}</span>
            </NavLink>
          ))}
        </nav>

        <div className="dashboard-sidebar-footer">
          <button type="button" className="sidebar-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="dashboard-content">{children}</main>
    </div>
  );
}

