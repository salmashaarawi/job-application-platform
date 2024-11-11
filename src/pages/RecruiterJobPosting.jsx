import { useState } from "react";
import { Link } from "react-router-dom";

export default function JobListing() {
  // Mock data for job postings
  const [jobs, setJobs] = useState([
    { id: 1, title: "Software Engineer", company: "TechCorp", location: "New York", description: "Develop and maintain software." },
    { id: 2, title: "Product Manager", company: "Innovate Ltd.", location: "San Francisco", description: "Oversee product development." },
  ]);

  const handleEdit = (id) => {
    // Navigate to the edit job page or show an edit form (for now, just logging)
    console.log(`Editing job with id: ${id}`);
  };

  const handleDelete = (id) => {
    // Confirm delete and update job list (mock deletion for now)
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Your Job Postings</h2>

      <div className="space-y-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{job.company} - {job.location}</p>
              <p className="text-gray-300 mb-4">{job.description}</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(job.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No job postings available. <Link to="/add-job" className="text-blue-500 underline">Add a new job</Link>.</p>
        )}
      </div>
    </div>
  );
}
