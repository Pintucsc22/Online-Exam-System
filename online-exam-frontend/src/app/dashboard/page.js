'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (!token) {
      router.push('/login');
    } else {
      setRole(storedRole);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    router.push('/login');
  };

  const goToAdminDashboard = () => {
    router.push('/admin-dashboard');
  };

  const goToUserDashboard = () => {
    router.push('/user-dashboard');
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1677187301535-b46cec7b2cc8?q=80&w=923&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 bg-white/90 p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-blue-800">Welcome to Dashboard</h1>
        <p className="text-gray-700 mb-6">This is a protected route</p>

        {/* Buttons */}
        <div className="space-y-4 mb-6">
          <button
            onClick={goToAdminDashboard}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full"
          >
            Go to Admin Dashboard
          </button>
          <button
            onClick={goToUserDashboard}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition w-full"
          >
            Go to User Dashboard
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

