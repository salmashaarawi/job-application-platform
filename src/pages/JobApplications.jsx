import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function JobApplications() {
  const { jID } = useParams(); // Get job ID from the URL
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized. Please log in.");
          return;
        }

        // Fetch applications for this specific job
        const response = await axios.get(`/jobs/jobs/${jID}/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setApplications(response.data); // Save applications in state
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications. Please try again.");
      }
    };

    fetchApplications();
  }, [jID]);

  const handleDelete = async (appID) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/applications/${appID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Remove application from state
        setApplications(applications.filter((app) => app.appID !== appID));
        alert("Application deleted successfully.");
      } catch (err) {
        console.error("Error deleting application:", err);
        alert("Failed to delete the application.");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">
        Applications for Job: {jID}
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {applications.length > 0 ? (
        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app.appID} className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">Applicant ID: {app.uID}</h3>
              <p className="text-gray-400 mb-2">Status: {app.status}</p>
              <p className="text-gray-400 mb-2">
                Submission Date: {app.sd}
              </p>
              <h4 className="text-md font-semibold mt-4">Answers:</h4>
              <ul className="list-disc pl-6">
                {Object.entries(app.qAnswers).map(([question, answer]) => (
                  <li key={question}>
                    <strong>{question}:</strong> {answer}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleDelete(app.appID)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Delete Application
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No applications found.</p>
      )}
    </div>
  );
}
