import { useState } from "react";

export default function AddJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [benefits, setBenefits] = useState("");
  const [logo, setLogo] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Job title is required.";
    if (!company) newErrors.company = "Company name is required.";
    if (!location) newErrors.location = "Location is required.";
    if (!description) newErrors.description = "Job description is required.";
    if (!category) newErrors.category = "Category is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    console.log({
      title,
      company,
      location,
      description,
      category,
      salary,
      requirements,
      responsibilities,
      benefits,
      logo,
    });

    setSuccessMessage("Job posted successfully!");
    resetForm();
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const resetForm = () => {
    setTitle("");
    setCompany("");
    setLocation("");
    setDescription("");
    setCategory("");
    setSalary("");
    setRequirements("");
    setResponsibilities("");
    setBenefits("");
    setLogo(null);
    setErrors({});
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="max-w-3xl w-full bg-gray-800 p-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Job Posting</h2>
        {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Job Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="Enter job title"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="Enter company name"
            />
            {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="Enter job location"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Job Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              rows="4"
              placeholder="Enter job description"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select a category</option>
              <option value="software">Software</option>
              <option value="marketing">Marketing</option>
              <option value="design">Design</option>
              <option value="sales">Sales</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Salary Range</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              placeholder="Enter salary range"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Requirements</label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              rows="3"
              placeholder="Enter job requirements"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Responsibilities</label>
            <textarea
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              rows="3"
              placeholder="Enter job responsibilities"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Benefits</label>
            <textarea
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
              rows="3"
              placeholder="Enter job benefits"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Company Logo</label>
            <input
              type="file"
              onChange={(e) => setLogo(e.target.files[0])}
              className="mt-1 block w-full text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
