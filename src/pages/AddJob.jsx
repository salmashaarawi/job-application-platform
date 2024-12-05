import { useState, useEffect } from "react";
import axios from "axios";

export default function AddJob() {
  const [recID, setRecID] = useState("");
  const [jname, setJname] = useState("");
  const [desc, setDesc] = useState("");
  const [pdate, setPdate] = useState("");
  const [questions, setQuestions] = useState([""]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Predefined prompts
  const jobTypes = ["Full-time", "Part-time", "Internship", "Freelance"];
  const fields = ["IT", "Marketing", "Finance", "Healthcare", "Education"];
  const durations = ["1 month", "3 months", "6 months", "1 year", "Permanent"];

  useEffect(() => {
    // Automatically set Recruiter ID from localStorage
    const userId = localStorage.getItem("userId");
    if (userId) {
      setRecID(userId);
    } else {
      setErrorMessage("Unauthorized. Please log in.");
    }
  }, []);

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddPrompt = (prompt) => {
    setDesc((prevDesc) => (prevDesc ? `${prevDesc}, ${prompt}` : prompt));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      recID,
      jname,
      desc,
      pdate,
      questions: questions.filter((q) => q.trim() !== ""), // Exclude empty questions
    };

    try {
      const token = localStorage.getItem("token"); // Fetch token for authorization
      const response = await axios.post("/jobs/jobs", jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage("Job added successfully!");
      setErrorMessage("");
      console.log("Job added:", response.data);

      // Reset form
      setJname("");
      setDesc("");
      setPdate("");
      setQuestions([""]);
    } catch (error) {
      console.error("Error adding job:", error);
      setErrorMessage("Failed to add job. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Job</h2>
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium">Recruiter ID</label>
          <input
            type="text"
            value={recID}
            disabled // Make the field read-only
            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-gray-500 border border-gray-600 focus:outline-none cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Job Name</label>
          <input
            type="text"
            value={jname}
            onChange={(e) => setJname(e.target.value)}
            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Enter job name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            rows="3"
            placeholder="Enter job description"
            required
          />
          {/* Prompts Section */}
          <div className="mt-4">
            <h4 className="text-sm font-bold">Add Prompts:</h4>
            <div className="mb-2">
              <strong>Job Types:</strong>
              {jobTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => handleAddPrompt(type)}
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
                  onClick={() => handleAddPrompt(field)}
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
                  onClick={() => handleAddPrompt(duration)}
                  className="ml-2 bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-md"
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Posting Date</label>
          <input
            type="date"
            value={pdate}
            onChange={(e) => setPdate(e.target.value)}
            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Questions</label>
          {questions.map((question, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="flex-grow px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder={`Enter question ${index + 1}`}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Question
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
