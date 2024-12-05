import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function JobListing() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]); // To store applications for a specific job
  const [error, setError] = useState("");
  const [editingJob, setEditingJob] = useState(null); // For tracking the job being edited
  const [selectedJobID, setSelectedJobID] = useState(null); // Job ID for viewing applications

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // Logged-in user ID
        if (!token || !userId) {
          setError("Unauthorized. Please log in.");
          return;
        }

        const response = await axios.get("/jobs/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter jobs by current user's recID
        const userJobs = response.data.filter((job) => job.recID === userId);
        setJobs(userJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load job postings.");
      }
    };

    fetchJobs();
  }, []);

  const fetchApplications = async (jobID) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/jobs/jobs/${jobID}/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const applicationsWithUserDetails = await Promise.all(
        response.data.map(async (app) => {
          try {
            const userResponse = await axios.get(`/users/${app.uID}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            return { ...app, userName: userResponse.data.name };
          } catch (err) {
            console.error(
              `Error fetching user details for uID: ${app.uID}`,
              err
            );
            return { ...app, userName: "Unknown User" };
          }
        })
      );

      setApplications(applicationsWithUserDetails);
      setSelectedJobID(jobID); // Set the current job ID
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to load applications.");
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job); // Set the selected job for editing
  };

  const handleSave = async () => {
    if (!editingJob) return;

    try {
      const token = localStorage.getItem("token");
      const { jID, jname, desc, pdate, questions } = editingJob;

      await axios.put(
        `/jobs/jobs/${jID}`,
        { jname, desc, pdate, questions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the local state with the edited job
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.jID === jID ? editingJob : job))
      );

      alert("Job updated successfully.");
      setEditingJob(null); // Exit edit mode
    } catch (err) {
      console.error("Error updating job:", err);
      alert("Failed to update the job.");
    }
  };

  const handleCancelEdit = () => {
    setEditingJob(null); // Cancel edit mode
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`/jobs/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(jobs.filter((job) => job.jID !== id));
        alert("Job deleted successfully.");
      } catch (err) {
        console.error("Error deleting job:", err);
        alert("Failed to delete the job.");
      }
    }
  };

  const handleStatusChange = async (appID, newStatus) => {
    try {
      const token = localStorage.getItem("token");
  
      // Log the appID to ensure it is valid
      console.log("Updating status for appID:", appID);
  
      // Update the status using the correct URL format
      await axios.put(
        `/jobs/applications/${appID}`, // Adjusted to match the correct URL format
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update local application state
      setApplications((prevApplications) =>
        prevApplications.map((app) =>
          app.appID === appID ? { ...app, status: newStatus } : app
        )
      );
  
      alert("Status updated successfully.");
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update the status.");
    }
  };
  

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Your Job Postings</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.jID} className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">{job.jname}</h3>
              <p className="text-sm text-gray-400 mb-4">{job.desc}</p>
              <p className="text-gray-400 mb-4">Posted on: {job.pdate}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(job)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.jID)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
                <button
                  onClick={() => fetchApplications(job.jID)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
                >
                  View Applications
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">
            No job postings available.{" "}
            <Link to="/add-job" className="text-blue-500 underline">
              Add a new job
            </Link>
          </p>
        )}
      </div>

      {selectedJobID && (
        <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">
            Applications for Job ID: {selectedJobID}
          </h2>
          {applications.length > 0 ? (
            <ul className="list-disc pl-6">
              {applications.map((app) => (
                <li key={app.appID}>
                  {/* <p>
                    <strong>Name:</strong> {app.userName}
                  </p> */}
                  <p>
                    <strong>Status:</strong>
                    <select
                      value={app.status}
                      onChange={(e) =>
                        handleStatusChange(app.appID, e.target.value)
                      }
                      className="ml-2 bg-gray-700 text-white px-2 py-1 rounded-md"
                    >
                      <option value="Applied">Applied</option>
                      <option value="Interview Pending">
                        Interview Pending
                      </option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </p>
                  <p>
                    <strong>Notes:</strong> {app.rnotes}
                  </p>
                  <p>
                    <strong>Answers:</strong>
                  </p>
                  <ul className="pl-4">
                    {Object.entries(app.qAnswers).map(([question, answer]) => (
                      <li key={question}>
                        <strong>{question}:</strong> {answer}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No applications available for this job.</p>
          )}
        </div>
      )}

      {/* Editing Job Modal */}
      {editingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Edit Job</h2>
            <label className="block text-sm font-medium mb-2">Job Title</label>
            <input
              type="text"
              value={editingJob.jname}
              onChange={(e) =>
                setEditingJob({ ...editingJob, jname: e.target.value })
              }
              className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white border border-gray-600"
            />
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={editingJob.desc}
              onChange={(e) =>
                setEditingJob({ ...editingJob, desc: e.target.value })
              }
              className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white border border-gray-600"
            ></textarea>

            {/* Prompts Section */}
            <div className="mb-4">
              <h4 className="text-sm font-bold">Add Prompts:</h4>

              <div className="mb-2">
                <strong>Job Types:</strong>
                {["Full-time", "Part-time", "Internship", "Freelance"].map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() =>
                        setEditingJob((prevJob) => ({
                          ...prevJob,
                          desc: prevJob.desc
                            ? `${prevJob.desc}, ${type}`
                            : type,
                        }))
                      }
                      className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                    >
                      {type}
                    </button>
                  )
                )}
              </div>

              <div className="mb-2">
                <strong>Fields:</strong>
                {["IT", "Marketing", "Finance", "Healthcare", "Education"].map(
                  (field) => (
                    <button
                      key={field}
                      onClick={() =>
                        setEditingJob((prevJob) => ({
                          ...prevJob,
                          desc: prevJob.desc
                            ? `${prevJob.desc}, ${field}`
                            : field,
                        }))
                      }
                      className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                    >
                      {field}
                    </button>
                  )
                )}
              </div>

              <div className="mb-2">
                <strong>Durations:</strong>
                {["1 month", "3 months", "6 months", "1 year", "Permanent"].map(
                  (duration) => (
                    <button
                      key={duration}
                      onClick={() =>
                        setEditingJob((prevJob) => ({
                          ...prevJob,
                          desc: prevJob.desc
                            ? `${prevJob.desc}, ${duration}`
                            : duration,
                        }))
                      }
                      className="ml-2 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md"
                    >
                      {duration}
                    </button>
                  )
                )}
              </div>
            </div>

            <label className="block text-sm font-medium mb-2">
              Posted Date
            </label>
            <input
              type="date"
              value={editingJob.pdate}
              onChange={(e) =>
                setEditingJob({ ...editingJob, pdate: e.target.value })
              }
              className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white border border-gray-600"
            />
            <label className="block text-sm font-medium mb-2">Questions</label>
            <textarea
              value={editingJob.questions.join("\n")}
              onChange={(e) =>
                setEditingJob({
                  ...editingJob,
                  questions: e.target.value.split("\n"),
                })
              }
              className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white border border-gray-600"
            ></textarea>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
