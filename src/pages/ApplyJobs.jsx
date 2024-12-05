import { useEffect, useState } from "react";
import axios from "axios";

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]); // Jobs after filtering
  const [filter, setFilter] = useState(""); // Filter input
  const [error, setError] = useState("");
  const [applicationData, setApplicationData] = useState({
    url: "", // For CV link
    rnotes: "", // For recruiter notes
  });
  const [showQuestions, setShowQuestions] = useState(null); // To handle applying modal

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/jobs/jobs");
        setJobs(response.data);
        setFilteredJobs(response.data); // Initially display all jobs
        setError("");
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Failed to load jobs. Please try again.");
      }
    };

    fetchJobs();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);

    // Filter jobs based on the description matching the filter text
    const filtered = jobs.filter((job) =>
      job.desc.toLowerCase().includes(value)
    );
    setFilteredJobs(filtered);
  };

  const handleApply = async (job) => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userId");

    const applicationPayload = {
      uID: userID,
      job: { jID: job.jID },
      url: applicationData.url, // CV link
      status: "Applied",
      rnotes: applicationData.rnotes, // Recruiter notes
      sd: new Date().toISOString().split("T")[0],
      qAnswers: applicationData,
    };

    try {
      const response = await axios.post(
        `/jobs/applications`,
        applicationPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Application submitted successfully:", response.data);
      alert("Application submitted successfully!");
      setApplicationData({ url: "", rnotes: "" }); // Reset the additional fields
      setShowQuestions(null);
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Failed to apply for the job. Please try again.");
    }
  };

  const handleInputChange = (field, value) => {
    setApplicationData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-8 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Jobs</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Filter Section */}
      <div className="mb-6">
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Filter by job type or field (e.g., 'full-time', 'developer')"
          className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none"
        />
      </div>

      <div className="space-y-6">
        {filteredJobs.map((job) => (
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
              onClick={() => setShowQuestions(job)}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Modal for questions */}
      {showQuestions && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg w-1/3">
            <h3 className="text-xl font-bold mb-4">Answer Questions</h3>
            <form>
              {/* Map Questions */}
              {showQuestions.questions.map((question, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium">
                    {question}
                  </label>
                  <input
                    type="text"
                    value={applicationData[question] || ""}
                    onChange={(e) =>
                      handleInputChange(question, e.target.value)
                    }
                    className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none"
                  />
                </div>
              ))}
              {/* Additional Fields */}
              <div className="mb-4">
                <label className="block text-sm font-medium">CV Link</label>
                <input
                  type="url"
                  value={applicationData.url}
                  onChange={(e) => handleInputChange("url", e.target.value)}
                  placeholder="Enter a link to your CV"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Notes</label>
                <textarea
                  value={applicationData.rnotes}
                  onChange={(e) => handleInputChange("rnotes", e.target.value)}
                  placeholder="Enter notes for the recruiter"
                  className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none"
                  rows="3"
                />
              </div>
            </form>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => setShowQuestions(null)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                onClick={() => handleApply(showQuestions)}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
