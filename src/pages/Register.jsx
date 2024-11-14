import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('applicant'); // Default to applicant
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Send registration request to the API
      const response = await axios.post('/api/register', {
        firstName,
        lastName,
        email,
        passwordHash: password, // Assuming plain password if backend hashes it
        userType,
      });

      console.log("Registration successful:", response.data);

      // Redirect to the login page
      navigate('/login');
    } catch (err) {
      console.error("Registration error:", err);
      setError('Failed to register. Please check your details and try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500"
            required
          >
            <option value="Candidate">Candidate</option>
            <option value="Recruiter">Recruiter</option>
            <option value="Admin">Admin</option>

          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}
