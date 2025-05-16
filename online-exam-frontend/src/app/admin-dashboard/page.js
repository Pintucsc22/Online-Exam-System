'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      fetchExams();
    }
  }, []);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://192.168.194.128:5000/api/exams', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setExams(data);
      } else {
        console.error('Unexpected response:', data);
        setExams([]);
      }
    } catch (err) {
      console.error('Error fetching exams', err);
      setError('Failed to load exams.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExam = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // Basic validation
    if (!title || !description || !startTime || !duration) {
      setError('All fields are required.');
      return;
    }

    try {
      const res = await fetch('http://192.168.194.128:5000/api/exams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, startTime, duration })
      });

      const data = await res.json();
      console.log('Create exam response:', data);

      if (res.ok) {
        setTitle('');
        setDescription('');
        setStartTime('');
        setDuration('');
        setMessage('Exam created successfully!');
        fetchExams();
      } else {
        setError(data?.error || 'Failed to create exam.');
      }
    } catch (err) {
      console.error('Error creating exam', err);
      setError('Something went wrong while creating the exam.');
    }
  };

  const handleDeleteExam = async (id) => {
    setMessage('');
    setError('');
    try {
      const res = await fetch(`http://192.168.194.128:5000/api/exams/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        setMessage('Exam deleted successfully.');
        fetchExams();
      } else {
        setError('Failed to delete exam.');
      }
    } catch (err) {
      console.error('Error deleting exam', err);
      setError('Something went wrong while deleting the exam.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Admin Dashboard</h1>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleCreateExam} style={{ marginBottom: '2rem' }}>
        <h2>Create Exam</h2>
        <input
          type="text"
          placeholder="Exam Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br /><br />
        <textarea
          placeholder="Exam Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        /><br /><br />
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        /><br /><br />
        <input
          type="number"
          placeholder="Duration (in minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Create Exam</button>
      </form>

      <h2>Existing Exams</h2>
      {loading ? (
        <p>Loading exams...</p>
      ) : exams.length === 0 ? (
        <p>No exams created yet.</p>
      ) : (
        exams.map((exam) => (
          <div key={exam._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{exam.title}</h3>
            <p>{exam.description}</p>
            <p>Start Time: {new Date(exam.startTime).toLocaleString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p>Duration: {exam.duration} minutes</p>
            <button onClick={() => handleDeleteExam(exam._id)}>Delete</button>
            <button onClick={() => router.push(`/admin-dashboard/${exam._id}/questions`)}>Manage Questions</button>
          </div>
        ))
      )}
    </div>
  );
}

