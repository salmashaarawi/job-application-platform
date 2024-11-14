import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import JobListing from './pages/RecruiterJobPosting';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import AddJob from './pages/AddJob';
import ApplyJobs from './pages/ApplyJobs';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/SideBar';
import Register from './pages/Register';

function App() {
  console.log("Stored token:", localStorage.getItem('token'));
  return (
    <Router>
      <div className="flex min-h-screen w-full bg-gray-900">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 w-full min-h-screen bg-gray-900 text-white">
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <PrivateRoute>
                  <JobListing />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <PrivateRoute>
                  <Notifications />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-job"
              element={
                <PrivateRoute>
                  <AddJob />
                </PrivateRoute>
              }
            />
            <Route
              path="/apply-jobs"
              element={
                <PrivateRoute>
                  <ApplyJobs />
                </PrivateRoute>
              }
            />
            {/* Redirect to login for undefined routes */}
            <Route path="*" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
