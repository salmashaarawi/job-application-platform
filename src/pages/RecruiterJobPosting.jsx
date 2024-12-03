import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function JobListing() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [editingJob, setEditingJob] = useState(null); // For tracking the job being edited

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); 
        if (!token || !userId) {
          setError("Unauthorized. Please log in.");
          return;
        }

        const response = await axios.get(`/jobs/jobs?recID=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load job postings.");
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    setEditingJob(job); // Set the selected job for editing
  };

  const handleSave = async () => {
    if (!editingJob) return;

    try {
      const token = localStorage.getItem("token");
      const { jID, jname, desc, pdate, questions } = editingJob;

      await axios.put(`/jobs/jobs/${jID}`, {
        jname,
        desc,
        pdate,
        questions,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={editingJob.desc}
              onChange={(e) =>
                setEditingJob({ ...editingJob, desc: e.target.value })
              }
              className="w-full px-4 py-2 mb-4 rounded-md bg-gray-700 text-white border border-gray-600"
            ></textarea>
            <label className="block text-sm font-medium mb-2">Posted Date</label>
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
