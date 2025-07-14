'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const router = useRouter();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('http://192.168.194.128:5000/api/exams', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch exams');
        return res.json();
      })
      .then(data => {
        setExams(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [router]);

  if (loading) return <p className="p-6 text-center">Loading exams...</p>;
  if (error) return <p className="p-6 text-center text-red-600">Error: {error}</p>;
  if (exams.length === 0) return <p className="p-6 text-center">No exams available</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Exams</h1>
      {exams.map((exam) => (
        <div
          key={exam.id}
          className="p-4 border rounded mb-4 cursor-pointer hover:bg-gray-100 transition"
          onClick={() => router.push(`/user-dashboard/${exam.id}`)}
        >
          <h2 className="text-xl font-semibold">{exam.title}</h2>
          <p className="text-gray-700 mb-1">{exam.description || 'No description'}</p>
          <p className="text-sm text-gray-500">
            Duration: {exam.duration} minutes | Starts: {new Date(exam.startTime).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

