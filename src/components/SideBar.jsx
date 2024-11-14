import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen fixed bg-gray-800 text-white p-4">
      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>
        <Link to="/jobs" className="hover:bg-gray-700 p-2 rounded">
          Job Postings
        </Link>
        <Link to="/profile" className="hover:bg-gray-700 p-2 rounded">
          Profile
        </Link>
        <Link to="/notifications" className="hover:bg-gray-700 p-2 rounded">
          Notifications
        </Link>
        <Link to="/add-job" className="hover:bg-gray-700 p-2 rounded">
          Add Job
        </Link>
        <Link to="/apply-jobs" className="hover:bg-gray-700 p-2 rounded">
          Apply for Jobs
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
