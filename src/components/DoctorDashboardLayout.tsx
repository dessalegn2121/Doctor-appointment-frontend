import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import {
  Menu,
  X,
  LayoutDashboard,
  User,
  Calendar,
  Users,
  FileText,
  Pill,
  TestTube,
  Clock,
  MessageSquare,
  Bell,
  Star,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const DoctorDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/doctor-dashboard",
    },
    {
      label: "My Profile",
      icon: User,
      path: "/doctor-dashboard/profile",
    },
    {
      label: "Appointments",
      icon: Calendar,
      path: "/doctor-dashboard/appointments",
    },
    {
      label: "Patients",
      icon: Users,
      path: "/doctor-dashboard/patients",
    },
    {
      label: "Medical Records",
      icon: FileText,
      path: "/doctor-dashboard/medical-records",
    },
    {
      label: "Prescriptions",
      icon: Pill,
      path: "/doctor-dashboard/prescriptions",
    },
    {
      label: "Lab Reports",
      icon: TestTube,
      path: "/doctor-dashboard/lab-reports",
    },
    {
      label: "Schedule",
      icon: Clock,
      path: "/doctor-dashboard/schedule",
    },
    {
      label: "Messages",
      icon: MessageSquare,
      path: "/doctor-dashboard/messages",
    },
    {
      label: "Notifications",
      icon: Bell,
      path: "/doctor-dashboard/notifications",
    },
    {
      label: "Reviews",
      icon: Star,
      path: "/doctor-dashboard/reviews",
    },
    {
      label: "Reports",
      icon: BarChart3,
      path: "/doctor-dashboard/reports",
    },
    {
      label: "Settings",
      icon: Settings,
      path: "/doctor-dashboard/settings",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-[#103f78] text-white shadow-lg transition-all duration-300 ease-in-out fixed h-full overflow-y-auto left-0 top-0 z-50`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold">Tepi Doctor App</h1>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-white/10 rounded"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center justify-between px-4 py-4 rounded-2xl hover:bg-white/10 transition-colors duration-200 text-lg font-semibold"
              >
                <span className="flex items-center gap-4">
                  <Icon size={20} />
                  {sidebarOpen && <span>{item.label}</span>}
                </span>
                {sidebarOpen && <span className="text-xl">-&gt;</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout button stays in the top action bar */}
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300 overflow-auto w-full h-screen`}>
        {/* Page Content */}
        <div className="p-6">
          <div className="mb-6 flex justify-end">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboardLayout;
