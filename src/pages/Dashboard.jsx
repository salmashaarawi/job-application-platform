import { Link } from "react-router-dom";
import { useState } from "react";

export default function Dashboard() {
  // Sample data for metrics and recent activities (mocked for now)
  const [metrics] = useState({
    totalJobsPosted: 8,
    totalApplications: 23,
    newApplicants: 5,
  });

  const recentJobs = [
    { id: 1, title: "Software Engineer", company: "TechCorp" },
    { id: 2, title: "Product Manager", company: "Innovate Ltd." },
  ];

  const recentApplications = [
    { id: 1, applicant: "Alice Johnson", jobTitle: "Software Engineer" },
    { id: 2, applicant: "Mark Spencer", jobTitle: "Product Manager" },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-md space-y-8">
      <h2 className="text-3xl font-bold text-center mb-6">Dashboard</h2>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-gray-800 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Total Jobs Posted</h3>
          <p className="text-4xl font-bold mt-2">{metrics.totalJobsPosted}</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">Total Applications</h3>
          <p className="text-4xl font-bold mt-2">{metrics.totalApplications}</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold">New Applicants</h3>
          <p className="text-4xl font-bold mt-2">{metrics.newApplicants}</p>
        </div>
      </div>

      {/* Recent Job Postings */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Recent Job Postings</h3>
        <ul className="space-y-4">
          {recentJobs.map((job) => (
            <li key={job.id} className="p-4 bg-gray-800 rounded-lg shadow-md">
              <p className="text-lg font-bold">{job.title}</p>
              <p className="text-sm text-gray-400">{job.company}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Applications */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Recent Applications</h3>
        <ul className="space-y-4">
          {recentApplications.map((application) => (
            <li key={application.id} className="p-4 bg-gray-800 rounded-lg shadow-md">
              <p className="text-lg font-bold">{application.applicant}</p>
              <p className="text-sm text-gray-400">Applied for: {application.jobTitle}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center space-x-4 mt-8">
        <Link
          to="/add-job"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Job
        </Link>
        <Link
          to="/profile"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Update Profile
        </Link>
        <Link
          to="/jobs"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          View Jobs
        </Link>
      </div>
    </div>
  );
}
