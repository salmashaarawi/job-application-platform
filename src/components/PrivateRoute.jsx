/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';





export default function PrivateRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType'); // Fetch user type from localStorage

  // Redirect to login if no token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Restrict access if userType is not in the allowedRoles
  if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render the children if everything is okay
  return children;
}
// Define PropTypes for the PrivateRoute component
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

