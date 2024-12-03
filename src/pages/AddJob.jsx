import { useState } from "react";
import axios from "axios";

export default function AddJob() {
  const [recID, setRecID] = useState("");
  const [jname, setJname] = useState("");
  const [desc, setDesc] = useState("");
  const [pdate, setPdate] = useState("");
  const [questions, setQuestions] = useState([""]); // Initialize with one question
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]); // Add an empty question
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the job data
    const jobData = {
      recID,
      jname,
      desc,
      pdate,
      questions: questions.filter((q) => q.trim() !== ""), // Exclude empty questions
    };

    try {
      // Make the API call to the second API (jobs endpoint)
      const response = await axios.post("/jobs", jobData);
      setSuccessMessage("Job added successfully!");
      setErrorMessage("");
      console.log("Job added:", response.data);

      // Reset form
      setRecID("");
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
            onChange={(e) => setRecID(e.target.value)}
            className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            placeholder="Enter recruiter ID"
            required
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
