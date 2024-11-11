export default function JobListing() {
    const jobs = [
      { id: 1, title: 'Software Engineer', company: 'TechCorp', location: 'New York' },
      { id: 2, title: 'Product Manager', company: 'Innovate Ltd.', location: 'San Francisco' },
    ];
  
    return (
      <div className="w-full min-h-screen flex flex-col items-left space-y-4">
        <h1 className="text-2xl font-bold mt-8">Job Listings</h1>
        <ul className="mt-4 space-y-4">
          {jobs.map(job => (
            <li key={job.id} className="max-w-md w-full border border-gray-700 bg-gray-800 p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p>{job.company} - {job.location}</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Apply Now</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  