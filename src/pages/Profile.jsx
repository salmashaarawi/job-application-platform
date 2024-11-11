import { useState } from "react";

export default function Profile() {
  // Mock profile data (could be fetched from a database in a real app)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    location: "New York",
    profilePicture: null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);
  const [successMessage, setSuccessMessage] = useState("");

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedProfile(profile);
    setSuccessMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    setEditedProfile({ ...editedProfile, profilePicture: e.target.files[0] });
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    setSuccessMessage("Profile updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>
      {successMessage && <p className="text-green-500 mb-4 text-center">{successMessage}</p>}

      <div className="flex justify-center mb-6">
        <img
          src={profile.profilePicture ? URL.createObjectURL(profile.profilePicture) : "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-gray-600"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Name</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedProfile.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          ) : (
            <p className="text-lg text-white">{profile.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Email</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedProfile.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          ) : (
            <p className="text-lg text-white">{profile.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Location</label>
          {isEditing ? (
            <input
              type="text"
              name="location"
              value={editedProfile.location}
              onChange={handleInputChange}
              className="mt-1 block w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
            />
          ) : (
            <p className="text-lg text-white">{profile.location}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300">Profile Picture</label>
          {isEditing ? (
            <input
              type="file"
              onChange={handleProfilePictureChange}
              className="mt-1 block w-full text-white"
            />
          ) : (
            <p className="text-lg text-white">Uploaded Picture</p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Save
            </button>
            <button
              onClick={handleEditToggle}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEditToggle}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
