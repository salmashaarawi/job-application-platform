import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Login to get token
      const loginResponse = await axios.post("/api/login", {
        email,
        password,
      });

      const token = loginResponse.data;
      localStorage.setItem("token", token); // Store token in localStorage

      // Fetch user details using the token
      const userDetailsResponse = await axios.get(`/api/users/${token}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userDetails = userDetailsResponse.data;

      // Store user details in localStorage
      localStorage.setItem("userType", userDetails.userType);
      localStorage.setItem("userId", userDetails.userId);

      console.log("Login successful. User details:", userDetails);

      // Redirect to the dashboard
      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password");
    }
  };


  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
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
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
        >
          Login
        </button>{" "}
        <div>
          {/* Existing login form code */}
          <p className="mt-4 text-center">
            Create an account?{" "}
            <Link to="/register" className="text-blue-500 underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
