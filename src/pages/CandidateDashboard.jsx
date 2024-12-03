import  { useEffect, useState } from 'react';
import axios from 'axios';

export default function CandidateDashboard() {
  const [jobListings, setJobListings] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch available job listings
        const jobsResponse = await axios.get('/api/jobs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobListings(jobsResponse.data);

        // Fetch applied jobs for the candidate
        const appliedJobsResponse = await axios.get(`/api/user/${token}/applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppliedJobs(appliedJobsResponse.data);

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError('Failed to load dashboard data.');
      }
    };

    fetchJobData();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">Candidate Dashboard</h2>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Available Job Listings</h3>
        {jobListings.length > 0 ? (
          <ul className="space-y-4">
            {jobListings.map((job) => (
              <li key={job.id} className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-xl font-semibold">{job.title}</h4>
                <p className="text-sm text-gray-400">{job.company} - {job.location}</p>
                <p className="text-gray-300">{job.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No available job listings at the moment.</p>
        )}
      </section>

      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Your Applied Jobs</h3>
        {appliedJobs.length > 0 ? (
          <ul className="space-y-4">
            {appliedJobs.map((application) => (
              <li key={application.id} className="p-4 bg-gray-700 rounded-lg">
                <h4 className="text-xl font-semibold">{application.jobTitle}</h4>
                <p className="text-sm text-gray-400">Status: {application.status}</p>
                <p className="text-gray-300">Applied on: {new Date(application.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have not applied to any jobs yet.</p>
        )}
      </section>
    </div>
  );
}
