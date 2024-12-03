import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  // Fetch user type from localStorage
  const userType = localStorage.getItem("userType");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen fixed bg-gray-800 text-white p-4">
      <nav className="flex flex-col space-y-4">
        {/* Links for all users */}
        <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
          Dashboard
        </Link>
        <Link to="/profile" className="hover:bg-gray-700 p-2 rounded">
          Profile
        </Link>
        <Link to="/notifications" className="hover:bg-gray-700 p-2 rounded">
          Notifications
        </Link>

        {/* Links for Recruiters */}
        {userType === "Recruiter" && (
          <>
            <Link to="/jobs" className="hover:bg-gray-700 p-2 rounded">
              Job Postings
            </Link>
            <Link to="/add-job" className="hover:bg-gray-700 p-2 rounded">
              Add Job
            </Link>
          </>
        )}

        {/* Links for Candidates */}
        {userType === "Candidate" && (
          <Link to="/apply-jobs" className="hover:bg-gray-700 p-2 rounded">
            Apply for Jobs
          </Link>
        )}

        {/* Logout button */}
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
