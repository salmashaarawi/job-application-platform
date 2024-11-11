export default function Notifications() {
    const notifications = [
      { id: 1, message: 'Your application for Software Engineer has been received.' },
      { id: 2, message: 'New job posting: Frontend Developer at WebWorks.' },
    ];
  
    return (
      <div>
        <h1 className="text-2xl font-bold">Notifications</h1>
        <ul className="mt-4 space-y-2">
          {notifications.map(notification => (
            <li key={notification.id} className="border p-4 rounded shadow">
              {notification.message}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  