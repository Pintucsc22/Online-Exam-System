// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [duration, setDuration] = useState('');
//   const [exams, setExams] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

//   useEffect(() => {
//     if (!token) {
//       router.push('/');
//     } else {
//       fetchExams();
//     }
//   }, [token, router]);

//   const fetchExams = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch('http://192.168.194.128:5000/api/exams', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setExams(data);
//       } else {
//         setExams([]);
//         setError('Unexpected response while fetching exams.');
//       }
//     } catch (err) {
//       console.error('Error fetching exams', err);
//       setError('Failed to load exams.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateExam = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     if (!title || !description || !startTime || !duration) {
//       setError('All fields are required.');
//       return;
//     }

//     try {
//       const res = await fetch('http://192.168.194.128:5000/api/exams', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ title, description, startTime, duration })
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setTitle('');
//         setDescription('');
//         setStartTime('');
//         setDuration('');
//         setMessage('Exam created successfully!');
//         fetchExams();
//       } else {
//         setError(data?.error || 'Failed to create exam.');
//       }
//     } catch (err) {
//       console.error('Error creating exam', err);
//       setError('Something went wrong while creating the exam.');
//     }
//   };

//   const handleDeleteExam = async (id) => {
//     setMessage('');
//     setError('');
//     try {
//       const res = await fetch(`http://192.168.194.128:5000/api/exams/${id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (res.ok) {
//         setMessage('Exam deleted successfully.');
//         fetchExams();
//       } else {
//         setError('Failed to delete exam.');
//       }
//     } catch (err) {
//       console.error('Error deleting exam', err);
//       setError('Something went wrong while deleting the exam.');
//     }
//   };

//   return (
//     <div className="p-8 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

//       {message && <p className="text-green-600">{message}</p>}
//       {error && <p className="text-red-600">{error}</p>}

//       <form onSubmit={handleCreateExam} className="space-y-4 mb-8">
//         <h2 className="text-2xl font-semibold mb-2">Create Exam</h2>
//         <input
//           type="text"
//           placeholder="Exam Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <textarea
//           placeholder="Exam Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="datetime-local"
//           value={startTime}
//           onChange={(e) => setStartTime(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <input
//           type="number"
//           placeholder="Duration (in minutes)"
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//           className="w-full border p-2 rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Create Exam
//         </button>
//       </form>

//       <h2 className="text-xl font-semibold mb-4">Existing Exams</h2>
//       {loading ? (
//         <p>Loading exams...</p>
//       ) : exams.length === 0 ? (
//         <p>No exams created yet.</p>
//       ) : (
//         exams.map((exam) => (
//           <div key={exam._id} className="border p-4 rounded mb-4">
//             <h3 className="text-lg font-bold">{exam.title}</h3>
//             <p>{exam.description}</p>
//             <p>Start Time: {new Date(exam.startTime).toLocaleString()}</p>
//             <p>Duration: {exam.duration} minutes</p>
//             <div className="space-x-2 mt-2">
//               <button
//                 onClick={() => handleDeleteExam(exam._id)}
//                 className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => router.push(`/admin-dashboard/${exam._id}/questions`)}
//                 className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//               >
//                 Manage Questions
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
