/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const userType = localStorage.getItem("userType"); // Get user type from localStorage

  if (!userType || !allowedRoles.includes(userType)) {
    // If no userType or user doesn't have access, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children; // Render the children if access is allowed
}
