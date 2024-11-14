import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';



export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}


// Define PropTypes for the PrivateRoute component
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
