'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function UserExamPage() {
  const { examId } = useParams();
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    async function fetchQuestions() {
      try {
        const res = await fetch(`http://192.168.194.128:5000/api/exams/${examId}/questions`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error('Failed to fetch questions');

        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (examId) {
      fetchQuestions();
    }
  }, [examId, router]);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const payload = {
        answers: Object.entries(answers).map(([questionId, selectedOption]) => ({
          questionId,
          selectedOption
        }))
      };

      const res = await fetch(`http://192.168.194.128:5000/api/exams/${examId}/questions/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to submit exam');

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (result) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Result</h2>
        <p>Your Score: {result.score} / {result.total}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Exam Questions</h1>

      {questions.map((q, idx) => (
        <div key={q.id} className="mb-4">
          <p className="font-semibold">Q{idx + 1}: {q.questionText}</p>
          {q.options.map((opt, i) => (
            <label key={i} className="block">
              <input
                type="radio"
                name={q.id}
                value={opt}
                checked={answers[q.id] === opt}
                onChange={() => handleOptionChange(q.id, opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      >
        Submit
      </button>
    </div>
  );
}
