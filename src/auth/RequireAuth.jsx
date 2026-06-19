import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const roleToPath = {
  admin: "/admin",
  doctor: "/doctor-dashboard",
  patient: "/patient",
};

export function RequireAuth({ allowedRoles, children }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={roleToPath[user.role] ?? "/"} replace />;
  }

  return <>{children}</>;
}

