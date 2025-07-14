'use client';
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Homepage() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // ✅ UPDATED: Destructure token, userId, and role from response
      const { token, userId, role } = response.data;

      // ✅ UPDATED: Store token, userId, and role in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role);

      alert('Login successful!');
      setShowLogin(false);

      // ✅ UPDATED: Navigate based on role
      if (role === 'admin') {
        router.push('/admin-dashboard');
      } else if (role === 'user') {
        router.push('/user-dashboard');
      } else {
        setError('Unknown user role. Please contact admin.');
      }

    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <main className="p-4">
      <div className="flex justify-between w-full">
        <div className="flex items-center gap-4">
          <i className="fa-solid fa-stairs text-xl text-blue-500"></i>
          <h1 className="text-xl text-blue-700">
            Never Stop Learning
          </h1>
          <p className="ml-9 text-green-700 text-xl font-bold italic">
            "The beautiful thing about learning is that no one can take it away from you."
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowLogin(!showLogin)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold"
        >
          Login
        </button>

        {showLogin && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white shadow-md rounded p-6 max-w-sm w-full relative">
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
              >
                &times;
              </button>

              <h2 className="text-xl font-bold mb-4">Login</h2>

              {error && <p className="text-red-500 mb-2">{error}</p>}

              <form onSubmit={handleLogin}>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                  placeholder="you@example.com"
                  required
                />

                <label className="block mb-2 text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                  placeholder="••••••••"
                  required
                />

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <div>
        <img src="/image1.jpg" alt="Image 1" className="h-[600px] w-full" />
      </div>

      <div className="bg-gradient-to-br from-purple-700 to-purple-900 h-[500px] flex justify-center items-center w-full gap-4">
        <div className="flex gap-6">
          <div className="text-center">
            <img src="/image1.jpg" alt="Image 1" className="h-[300px] w-auto p-6 rounded-4xl" />
            <p className="text-base font-bold text-green-400">You are topper</p>
          </div>
          <div className="text-center">
            <img src="/image2.jpg" alt="Image 2" className="h-[300px] w-auto p-6 rounded-4xl" />
            <p className="text-base font-bold text-green-400">Don't watch the clock; do what it does. Keep going</p>
          </div>
          <div className="text-center">
            <img src="/image3.png" alt="Image 3" className="h-[300px] w-auto p-6 rounded-4xl" />
            <p className="text-base font-bold text-green-400">Believe you can and you're halfway there</p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">© 2025 Online Exam System</p>
            <p className="text-sm">All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
              <i className="fab fa-facebook-square text-2xl"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a href="https://www.linkedin.com/in/pintugarai993/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a href="https://github.com/Pintucsc22/Online-Exam-System" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
              <i className="fa-brands fa-github text-2xl"></i>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
