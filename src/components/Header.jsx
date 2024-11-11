import { Link } from 'react-router-dom';
export default function Header() {
    return (
      <header className="w-full fixed top-0 left-0 bg-blue-600 p-4 text-white shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold">Job App Platform</h1>
        <div className="flex space-x-4">
          <Link to="/notifications" className="hover:underline">Notifications</Link>
          <Link to="/profile" className="hover:underline">Profile</Link>
          <button className="bg-red-500 px-3 py-1 rounded">Logout</button>
        </div>
      </header>
    );
  }
  
