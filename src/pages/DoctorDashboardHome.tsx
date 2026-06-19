import React from "react";
import { 
  Users, Calendar, CheckCircle, Clock, Pill, Bell, 
  TrendingUp, Activity, Award, AlertCircle, ArrowUpRight, ArrowDownRight 
} from "lucide-react";
import { doctorDashboardAPI } from "../services/doctorDashboardAPI";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";

const DoctorDashboardHome = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["doctor-dashboard-home"],
    queryFn: async () => {
      const [overviewRes, weeklyRes, monthlyRes] = await Promise.all([
        doctorDashboardAPI.getDashboardOverview(),
        doctorDashboardAPI.getChartData("weekly"),
        doctorDashboardAPI.getChartData("monthly"),
      ]);

      return {
        overview: overviewRes.data,
        weekly: weeklyRes.data,
        monthly: monthlyRes.data,
      };
    },
  });

  const overview = data?.overview;
  const weeklyChart = data?.weekly || [];
  const monthlyChart = data?.monthly || [];

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600"></div>
          </div>
          <p className="text-gray-600 font-semibold text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="font-bold text-red-800 text-lg">Error Loading Dashboard</h3>
              <p className="text-red-700 text-sm mt-2">{error}</p>
              <p className="text-red-600 text-xs mt-3 flex items-center gap-2">
                <span>💡</span> Check your browser console (F12) for more details
              </p>
            </div>
            </div>
          </div>
      </div>
    );
  }

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  const statCards = [
    {
      id: 1,
      label: "Total Patients",
      value: overview?.totalPatients || 0,
      icon: Users,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
      trend: "+12%",
      trendUp: true,
    },
    {
      id: 2,
      label: "Today's Appointments",
      value: overview?.todayAppointments || 0,
      icon: Calendar,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
      trend: "+5",
      trendUp: true,
    },
    {
      id: 3,
      label: "Upcoming",
      value: overview?.upcomingAppointments || 0,
      icon: Clock,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      borderColor: "border-yellow-200",
      trend: "+8",
      trendUp: true,
    },
    {
      id: 4,
      label: "Completed",
      value: overview?.completedAppointments || 0,
      icon: CheckCircle,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
      borderColor: "border-emerald-200",
      trend: "+24",
      trendUp: true,
    },
    {
      id: 5,
      label: "Pending",
      value: overview?.pendingAppointments || 0,
      icon: AlertCircle,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      borderColor: "border-orange-200",
      trend: "-3",
      trendUp: false,
    },
    {
      id: 6,
      label: "Total Prescriptions",
      value: overview?.totalPrescriptions || 0,
      icon: Pill,
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      borderColor: "border-pink-200",
      trend: "+7",
      trendUp: true,
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back, Doctor</h1>
        <p className="text-gray-600">Here's what's happening with your practice today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={`${stat.bgColor} border-2 ${stat.borderColor} rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-2">{stat.label}</p>
                  <h3 className="text-4xl font-bold text-gray-900 mb-3">{stat.value}</h3>
                  <div className="flex items-center gap-2">
                    {stat.trendUp ? (
                      <ArrowUpRight className="text-green-600" size={16} />
                    ) : (
                      <ArrowDownRight className="text-red-600" size={16} />
                    )}
                    <span
                      className={`text-sm font-semibold ${
                        stat.trendUp ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.trend} from last month
                    </span>
                  </div>
                </div>
                <div className={`${stat.iconColor} p-3 rounded-lg bg-white`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 hover:shadow-md transition-shadow">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "View Appointments", to: "/doctor-dashboard/appointments", color: "bg-blue-600" },
            { label: "View Patients", to: "/doctor-dashboard/patients", color: "bg-emerald-600" },
            { label: "Create Prescription", to: "/doctor-dashboard/prescriptions", color: "bg-purple-600" },
            { label: "Add Medical Record", to: "/doctor-dashboard/medical-records", color: "bg-orange-600" },
            { label: "Update Schedule", to: "/doctor-dashboard/schedule", color: "bg-slate-800" },
          ].map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className={`${action.color} text-white rounded-xl px-4 py-4 text-center font-semibold shadow-sm hover:shadow-md hover:opacity-95 transition`}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="text-blue-600" size={24} />
              Weekly Appointments
            </h2>
              <p className="text-gray-500 text-sm mt-1">Last 7 days performance</p>
          </div>
          {weeklyChart.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="appointments" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>

        {/* Monthly Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="text-green-600" size={24} />
              Monthly Trend
            </h2>
            <p className="text-gray-500 text-sm mt-1">Completed appointments</p>
          </div>
          {monthlyChart.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-gray-500">No data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Appointments */}
      {overview?.recentAppointments && overview.recentAppointments.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Appointments</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Patient Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Time</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {overview.recentAppointments.map((apt: any) => (
                  <tr key={apt._id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-900 font-medium">{apt.patientId?.name || "Unknown"}</td>
                    <td className="py-4 px-6 text-gray-600">
                      {new Date(apt.appointmentDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{apt.timeSlot || "N/A"}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          apt.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : apt.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : apt.status === "approved"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Notifications */}
      {overview?.recentNotifications && overview.recentNotifications.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Bell className="text-orange-600" size={24} />
            Recent Notifications
          </h2>
          <div className="space-y-4">
            {overview.recentNotifications.map((notif: any) => (
              <div
                key={notif._id}
                className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{notif.title || "Notification"}</p>
                    <p className="text-gray-600 text-sm mt-1">{notif.message}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      {new Date(notif.createdAt).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboardHome;
