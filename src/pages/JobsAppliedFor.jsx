import { useEffect, useState } from "react";
import axios from "axios";

export default function ApplicationsList() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          setError("Unauthorized. Please log in.");
          return;
        }

        // Fetch all jobs
        const jobsResponse = await axios.get(`/jobs/jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter jobs that have applications for the current user
        const jobsWithApplications = await Promise.all(
          jobsResponse.data.map(async (job) => {
            try {
              const applicationsResponse = await axios.get(
                `/jobs/jobs/${job.jID}/applications`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              // Find applications matching the current user's ID
              const userApplications = applicationsResponse.data.filter(
                (app) => app.uID === userId
              );

              return userApplications.map((app) => ({
                ...app,
                job, // Add job details to the application
              }));
            } catch (err) {
              console.error(
                `Error fetching applications for job: ${job.jID}`,
                err
              );
              return [];
            }
          })
        );

        // Flatten the array of applications
        const allUserApplications = jobsWithApplications.flat();
        setApplications(allUserApplications);
        setError("");
      } catch (err) {
        console.error("Error fetching jobs or applications:", err);
        setError("Failed to load applications. Please try again.");
      }
    };

    fetchApplications();
  }, []);

  const handleDelete = async (appID) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        const token = localStorage.getItem("token");

        await axios.delete(`/jobs/applications/${appID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
      <h2 className="text-3xl font-bold text-center mb-6">Your Applications</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {applications.length > 0 ? (
        <div className="space-y-6">
          {applications.map((app) => (
            <div
              key={app.appID}
              className={`p-6 rounded-lg shadow-md ${
                app.status === "Accepted"
                  ? "bg-green-700"
                  : app.status === "Rejected"
                  ? "bg-red-700"
                  : "bg-gray-800"
              }`}
            >
              <h3 className="text-2xl font-semibold mb-2">{app.job.jname}</h3>
              <p className="text-sm text-gray-400 mb-4">{app.job.desc}</p>
              <p className="text-gray-400 mb-2">
                <strong>Status:</strong> {app.status}
              </p>
              <p className="text-gray-400 mb-2">
                <strong>Applied on:</strong> {app.sd}
              </p>
              <div className="mt-4">
                <h4 className="font-semibold">Your Answers:</h4>
                <ul className="list-disc pl-6">
                  {Object.entries(app.qAnswers).map(([question, answer]) => (
                    <li key={question}>
                      <strong>{question}:</strong> {answer}
                    </li>
                  ))}
                </ul>
              </div>
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
        <p className="text-center text-gray-400">
          You have not applied for any jobs yet.
        </p>
      )}
    </div>
  );
}
