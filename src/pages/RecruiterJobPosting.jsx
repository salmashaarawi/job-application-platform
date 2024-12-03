import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function JobListing() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // Use userId as recID
        if (!token || !userId) {
          setError("Unauthorized. Please log in.");
          return;
        }

        // Fetch jobs posted by the recruiter (current user)
        const response = await axios.get(`/jobs/jobs?recID=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(response.data); // Update state with fetched jobs
        setError("");
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load job postings.");
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (id) => {
    console.log(`Editing job with id: ${id}`);
    // Navigate to edit page or show an edit form
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        const token = localStorage.getItem("token");
        
        // Make DELETE request to remove job
        await axios.delete(`/jobs/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update state to remove deleted job
        setJobs(jobs.filter((job) => job.jID !== id));
        alert("Job deleted successfully.");
      } catch (err) {
        console.error("Error deleting job:", err);
        alert("Failed to delete the job. Please try again.");
      }
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
                  onClick={() => handleEdit(job.jID)}
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
    </div>
  );
}
