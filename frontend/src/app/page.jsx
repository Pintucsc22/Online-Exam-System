"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [openChat, setOpenChat] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Registration form states
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regRole, setRegRole] = useState("");

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
          role: regRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      alert("✅ Registration successful! Please login.");
      setOpenChat(false);
      setShowLogin(true);
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role); // Assuming backend sends "role"

      if (data.role === "admin") {
        router.push("/admin-dashboard");
      } else {
        router.push("/user-dashboard");
      }
    } catch (err) {
      alert("❌ " + err.message);
    }
  };

  return (
    <main className="min-h-screen p-4 bg-black">
      <div className="flex items-center w-full p-4">
        <img
          src="/image1.jpg"
          className="rounded-full object-cover w-20 h-20 ml-[10px]"
          alt="Logo"
        />
        <div className="ml-auto space-x-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold"
            onClick={() => {
              setOpenChat(!openChat);
              setShowLogin(false);
            }}
          >
            Register Yourself
          </button>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold"
            onClick={() => {
              setShowLogin(!showLogin);
              setOpenChat(false);
            }}
          >
            Login
          </button>
        </div>
      </div>

      {/* ✅ Registration Chat Form */}
      {openChat && (
        <div className="fixed bottom-4 right-4 w-80 bg-white border border-gray-300 shadow-xl rounded-lg z-50 flex flex-col">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg font-bold">
            Registration Chat
          </div>
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="bg-gray-100 p-2 rounded-lg">
              <label className="text-sm font-medium">👤 What's your name?</label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="Enter name"
                className="mt-1 w-full p-2 border rounded"
              />
            </div>
            <div className="bg-gray-100 p-2 rounded-lg">
              <label className="text-sm font-medium">📧 Your email?</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="Enter email"
                className="mt-1 w-full p-2 border rounded"
              />
            </div>
            <div className="bg-gray-100 p-2 rounded-lg">
              <label className="text-sm font-medium">🔐 Create a password</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="Enter password"
                className="mt-1 w-full p-2 border rounded"
              />
            </div>
            <div className="bg-gray-100 p-2 rounded-lg">
              <label className="text-sm font-medium">🧑‍💼 Are you an Admin or User?</label>
              <select
                value={regRole}
                onChange={(e) => setRegRole(e.target.value)}
                className="mt-1 w-full p-2 border rounded"
              >
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
          <div className="p-3 border-t">
            <button
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleRegister}
            >
              ✅ Register
            </button>
          </div>
        </div>
      )}

      {/* ✅ Login Chat Form */}
      {showLogin && (
        <div className="fixed bottom-4 right-4 w-80 bg-white border border-gray-300 shadow-xl rounded-lg z-50 flex flex-col">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg font-bold">
            Login Chat
          </div>
          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="bg-gray-100 p-2 rounded-lg">
              <label className="text-sm font-medium">📧 Your email?</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter email"
                className="mt-1 w-full p-2 border rounded"
              />
            </div>
            <div className="bg-gray-100 p-2 rounded-lg">
              <label className="text-sm font-medium">🔐 Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter password"
                className="mt-1 w-full p-2 border rounded"
              />
            </div>
          </div>
          <div className="p-3 border-t">
            <button
              className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleLogin}
            >
              🔓 Login
            </button>
          </div>
        </div>
      )}

      {/* Page content */}
      <div className="relative w-full h-screen">
        <div className="absolute top-0 left-0 w-[35%] h-full">
          <img
            src="/profile.png"
            className="w-full h-full object-cover"
            alt="Profile"
          />
        </div>
        <div className="relative z-10 w-[40%] h-full left-[30%] flex flex-col justify-center px-10 text-white bg-opacity-50">
          <h1 className="text-4xl font-bold mb-4">Welcome to My World</h1>
          <h1 className="text-3xl mb-2">Never Stop Learning!</h1>
          <p className="text-lg italic">
            "The beautiful thing about learning is that no one can take it away from you."
          </p>
          <p className="text-lg italic">
            Hi, I'm Pintu Garai. I have a background in Computer Science and a strong
            interest in DevOps and system administration. I'm familiar with tools like
            VS Code, VMware, and Linux, and I enjoy learning new technologies and solving
            technical problems.
          </p>
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
