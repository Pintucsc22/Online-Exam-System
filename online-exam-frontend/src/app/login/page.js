'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://192.168.194.128:5000/api/auth/login', {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      alert('Login successful!');
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1677187301535-b46cec7b2cc8?q=80&w=923&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Login form */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>

        {error && <p className="text-red-600 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right text-sm mb-4 text-blue-600 hover:underline cursor-pointer">
            Forgot password?
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm text-gray-700 mt-6">
          Don’t have an account?{' '}
          <span
            onClick={() => router.push('/register')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Register here
          </span>
        </div>
      </div>
    </div>
  );
}

