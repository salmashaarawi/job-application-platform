import { useState, useEffect } from "react";
import axios from "axios";

export default function JobListing() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [editingJob, setEditingJob] = useState(null);

  const jobTypes = ["Full-time", "Part-time", "Internship", "Freelance"];
  const fields = ["IT", "Marketing", "Finance", "Healthcare", "Education"];
  const durations = ["1 month", "3 months", "6 months", "1 year", "Permanent"];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) {
          setError("Unauthorized. Please log in.");
          return;
        }

        const response = await axios.get("/jobs/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userJobs = response.data.filter((job) => job.recID === userId);
        setJobs(userJobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load job postings.");
      }
    };

    fetchJobs();
  }, []);

  const handleEdit = (job) => {
    setEditingJob(job);
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

      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.jID === jID ? editingJob : job))
      );

      alert("Job updated successfully.");
      setEditingJob(null);
    } catch (err) {
      console.error("Error updating job:", err);
      alert("Failed to update the job.");
    }
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
  };

  const handlePromptAdd = (prompt) => {
    setEditingJob((prevJob) => ({
      ...prevJob,
      desc: prevJob.desc ? `${prevJob.desc}, ${prompt}` : prompt,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Your Job Postings</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.jID} className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-2">{job.jname}</h3>
            <p className="text-sm text-gray-400 mb-4">{job.desc}</p>
            <p className="text-gray-400 mb-4">Posted on: {job.pdate}</p>
            <button
              onClick={() => handleEdit(job)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Edit
            </button>
          </div>
        ))}
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

            {/* Prompts Section */}
            <div className="mb-4">
              <h4 className="text-sm font-bold">Add Prompts:</h4>
              <div className="mb-2">
                <strong>Job Types:</strong>
                {jobTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handlePromptAdd(type)}
                    className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="mb-2">
                <strong>Fields:</strong>
                {fields.map((field) => (
                  <button
                    key={field}
                    onClick={() => handlePromptAdd(field)}
                    className="ml-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                  >
                    {field}
                  </button>
                ))}
              </div>
              <div className="mb-2">
                <strong>Durations:</strong>
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => handlePromptAdd(duration)}
                    className="ml-2 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md"
                  >
                    {duration}
                  </button>
                ))}
              </div>
            </div>

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
