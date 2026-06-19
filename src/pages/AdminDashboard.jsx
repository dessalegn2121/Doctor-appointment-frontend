import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import api from "../services/api";
import "../styles/admin.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isIndexPage = location.pathname === "/admin";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (isIndexPage) {
      const fetchStats = async () => {
        try {
          const res = await api.get("/admin/dashboard/stats");
          setStats(res.data);
        } catch (error) {
          console.error("Error fetching stats:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchStats();
    }
  }, [isIndexPage]);

  const menuItems = [
    { label: "Dashboard", icon: "📊", path: "/admin" },
    { label: "Doctors", icon: "👨‍⚕️", path: "/admin/doctors" },
    { label: "Patients", icon: "👥", path: "/admin/patients" },
    { label: "Appointments", icon: "📅", path: "/admin/appointments" },
    { label: "Departments", icon: "🏥", path: "/admin/departments" },
    { label: "Settings", icon: "⚙️", path: "/admin/settings" },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h1>🏥 MediHub</h1>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} className="menu-item">
              <span className="menu-icon">{item.icon}</span>
              {sidebarOpen && <span className="menu-label">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            {sidebarOpen ? "🚪 Logout" : "🚪"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header - Show different titles based on route */}
        <header className="admin-header">
          <div className="header-left">
            <h2>
              {isIndexPage
                ? "Admin Dashboard"
                : location.pathname.includes("doctors")
                ? "Doctors"
                : location.pathname.includes("patients")
                ? "Patients"
                : location.pathname.includes("appointments")
                ? "Appointments"
                : location.pathname.includes("departments")
                ? "Departments"
                : location.pathname.includes("settings")
                ? "Settings"
                : "Admin"}
            </h2>
          </div>
          <div className="header-right">
            <div className="search-box">
              <input type="text" placeholder="Search..." />
            </div>
            <div className="notifications">
              <button className="notification-btn">🔔</button>
              <button className="profile-btn">👤</button>
            </div>
          </div>
        </header>

        {/* Stats Overview - Only show on index page */}
        {isIndexPage && !loading && stats && (
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👨‍⚕️</div>
              <div className="stat-content">
                <h3>Total Doctors</h3>
                <p className="stat-number">{stats.totalDoctors}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-content">
                <h3>Total Patients</h3>
                <p className="stat-number">{stats.totalPatients}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <h3>Total Appointments</h3>
                <p className="stat-number">{stats.totalAppointments}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📆</div>
              <div className="stat-content">
                <h3>Today's Appointments</h3>
                <p className="stat-number">{stats.todayAppointments}</p>
              </div>
            </div>

            <div className="stat-card status-pending">
              <div className="stat-icon">⏳</div>
              <div className="stat-content">
                <h3>Pending</h3>
                <p className="stat-number">{stats.pendingAppointments}</p>
              </div>
            </div>

            <div className="stat-card status-approved">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>Approved</h3>
                <p className="stat-number">{stats.approvedAppointments}</p>
              </div>
            </div>

            <div className="stat-card status-completed">
              <div className="stat-icon">🏁</div>
              <div className="stat-content">
                <h3>Completed</h3>
                <p className="stat-number">{stats.completedAppointments}</p>
              </div>
            </div>

            <div className="stat-card status-cancelled">
              <div className="stat-icon">❌</div>
              <div className="stat-content">
                <h3>Cancelled</h3>
                <p className="stat-number">{stats.cancelledAppointments}</p>
              </div>
            </div>
          </section>
        )}

        {/* Page content will be rendered by child routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;

