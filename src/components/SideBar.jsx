import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen fixed bg-gray-800 text-white p-4">
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/jobs" className="hover:bg-gray-700 p-2 rounded">Job Listings</Link>
        <Link to="/profile" className="hover:bg-gray-700 p-2 rounded">Profile</Link>
        <Link to="/notifications" className="hover:bg-gray-700 p-2 rounded">Notifications</Link>
        <Link to="/add-job" className="hover:bg-gray-700 p-2 rounded">Add Job</Link> {/* New Link */}
      </nav>
    </aside>
  );
}
