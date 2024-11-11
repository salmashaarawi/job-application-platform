import { useState } from "react";

export default function ApplyJobs() {
  // Mock data for job listings
  const [jobs] = useState([
    { id: 1, title: "Software Engineer", company: "TechCorp", location: "New York", description: "Develop and maintain software applications." },
    { id: 2, title: "Product Manager", company: "Innovate Ltd.", location: "San Francisco", description: "Manage product lifecycle and roadmap." },
  ]);

  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleApply = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      alert("Application submitted successfully!");
    } else {
      alert("You have already applied for this job.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Job Listings</h2>

      <div className="space-y-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="p-6 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
              <p className="text-sm text-gray-400 mb-2">{job.company} - {job.location}</p>
              <p className="text-gray-300 mb-4">{job.description}</p>
              <button
                onClick={() => handleApply(job.id)}
                className={`px-4 py-2 rounded-md transition duration-200 ${
                  appliedJobs.includes(job.id) ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={appliedJobs.includes(job.id)}
              >
                {appliedJobs.includes(job.id) ? "Applied" : "Apply"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No job postings available at the moment.</p>
        )}
      </div>
    </div>
  );
}
