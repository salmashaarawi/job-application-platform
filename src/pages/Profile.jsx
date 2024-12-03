import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false); // Toggle between view and edit modes
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("User is not authenticated.");
          return;
        }

        // Fetch user profile from the API
        const response = await axios.get(`/api/users/${token}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(response.data);
        // Set form values with fetched profile data
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile information.");
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const updatedProfile = {
        firstName,
        lastName,
        email,
      };

      // Update the profile using the API
      await axios.put(`/api/users/${token}`, updatedProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the local profile data and exit edit mode
      setProfile(updatedProfile);
      setEditMode(false);
      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile information.");
    }
  };

  const handlePasswordUpdate = async () => {
    if (!currentPassword && !newPassword && !confirmPassword) {
      // No password change requested
      setSuccess("Profile updated successfully without changing password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (!currentPassword) {
      setError("Current password is required to change your password.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Update the password using the API
      await axios.post(
        `/api/users/${token}/update-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Password updated successfully.");
      setError("");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Error updating password:", err);
      setError(
        "Failed to update password. Please check your current password."
      );
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {success && <p className="text-green-500 mb-4">{success}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {editMode ? (
        <div>
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600"
            />
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Update Password</h3>
            <div>
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div>
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <button
              onClick={handlePasswordUpdate}
              className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Update Password
            </button>
          </div>
          <button
            onClick={handleSave}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save Profile
          </button>
          <button
            onClick={handleEditToggle}
            className="mt-2 w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <p>
            <strong>First Name:</strong> {profile.firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {profile.lastName}
          </p>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <button
            onClick={handleEditToggle}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
