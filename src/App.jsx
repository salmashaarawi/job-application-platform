import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/SideBar';
import Dashboard from './pages/Dashboard';
import JobListing from './pages/RecruiterJobPosting';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import AddJob from './pages/AddJob'; // Import the AddJob component
import ApplyJobs from './pages/ApplyJobs';

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen w-full bg-gray-900">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 w-full min-h-screen bg-gray-900 text-white">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/jobs" element={<JobListing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/add-job" element={<AddJob />} /> {/* Add route */}
            <Route path="/apply-jobs" element={<ApplyJobs />} />

          </Routes>
        </main>
      </div>
    </Router>
  );
}
