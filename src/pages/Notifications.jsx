import { useState } from "react";

export default function Notifications() {
  // Mock data for notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Application Received", content: "John Doe applied for Software Engineer", timestamp: "2 hours ago", isRead: false },
    { id: 2, title: "Job Post Approved", content: "Your posting for Product Manager has been approved", timestamp: "1 day ago", isRead: true },
    { id: 3, title: "Application Withdrawn", content: "Alice Smith withdrew her application for Frontend Developer", timestamp: "3 days ago", isRead: false },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-center mb-6">Notifications</h2>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-md ${notification.isRead ? "bg-gray-800" : "bg-blue-800"} `}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{notification.title}</h3>
                  <p className="text-gray-300">{notification.content}</p>
                  <p className="text-gray-500 text-sm">{notification.timestamp}</p>
                </div>
                <div className="flex space-x-2">
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-200"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notification.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No notifications available.</p>
        )}
      </div>
    </div>
  );
}
