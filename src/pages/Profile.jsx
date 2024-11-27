import  { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false); // Toggle between view and edit modes
  const [error, setError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');

        // Check if token exists
        if (!token) {
          setError('User is not authenticated.');
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
        setUserType(response.data.userType);

      } catch (err) {
        console.error("Error fetching profile:", err);
        setError('Failed to load profile information.');
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');

      const updatedProfile = {
        firstName,
        lastName,
        email,
        userType,
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
    } catch (err) {
      console.error("Error updating profile:", err);
      setError('Failed to update profile information.');
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
          <div>
            <label>User Type</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600"
            >
              <option value="applicant">Applicant</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>
          <button
            onClick={handleSave}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save
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
          <p><strong>First Name:</strong> {profile.firstName}</p>
          <p><strong>Last Name:</strong> {profile.lastName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>User Type:</strong> {profile.userType}</p>
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
