import { useEffect, useState } from "react";
import axios from "axios";

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/jobs/jobs");
        setJobs(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again.");
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Jobs</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.jID} className="p-6 bg-gray-700 rounded-md shadow-md">
            <h3 className="text-xl font-bold">{job.jname}</h3>
            <p className="text-sm text-gray-400">Posted on: {job.pdate}</p>
            <p className="mt-2">{job.desc}</p>
            <div className="mt-4">
              <h4 className="font-semibold">Questions:</h4>
              <ul className="list-disc pl-6">
                {job.questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={() => handleApply(job.jID)}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  async function handleApply(jobID) {
    // Example implementation for applying to a job
    try {
      const response = await axios.post(`/applications`, {
        jobID, // Replace with appropriate payload structure
      });
      console.log("Application submitted successfully:", response.data);
      alert("Application submitted successfully!");
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Failed to apply for the job. Please try again.");
    }
  }
}
