'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function QuestionsPage() {
  const { examId } = useParams();
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [examTitle, setExamTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    async function fetchData() {
      try {
        const examRes = await fetch(`http://192.168.194.128:5000/api/exams/${examId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!examRes.ok) throw new Error('Failed to fetch exam');

        const examData = await examRes.json();
        setExamTitle(examData.title);

        const questionsRes = await fetch(`http://192.168.194.128:5000/api/exams/${examId}/questions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!questionsRes.ok) throw new Error('Failed to fetch questions');

        const questionsData = await questionsRes.json();
        setQuestions(questionsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    if (examId) fetchData();
  }, [examId, router]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    if (!questionText.trim()) {
      setError('Question text is required');
      return;
    }
    if (options.some((opt) => !opt.trim())) {
      setError('All options are required');
      return;
    }
    if (!correctAnswer.trim()) {
      setError('Correct answer is required');
      return;
    }
    if (!options.includes(correctAnswer)) {
      setError('Correct answer must be one of the options');
      return;
    }

    try {
      const res = await fetch(`http://192.168.194.128:5000/api/exams/${examId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          questionText,
          options,
          correctAnswer,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to add question');
      }

      const newQuestion = await res.json();
      setQuestions((prev) => [...prev, newQuestion]);

      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (questionId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    if (!confirm('Are you sure you want to delete this question?')) return;

    try {
      const res = await fetch(`http://192.168.194.128:5000/api/exams/${examId}/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete question');
      }

      setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    } catch (err) {
      console.error(err);
      alert('Error deleting question: ' + err.message);
    }
  };

  if (loading) return <p className="p-6 text-center">Loading questions...</p>;
  if (error) return <p className="p-6 text-center text-red-600">Error: {error}</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Questions for: {examTitle}</h1>

      <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded shadow-sm bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Add Question</h2>

        <label className="block mb-2">
          Question Text
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </label>

        <div className="grid grid-cols-2 gap-4 mb-4">
          {options.map((opt, idx) => (
            <label key={idx} className="block">
              Option {idx + 1}
              <input
                type="text"
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </label>
          ))}
        </div>

        <label className="block mb-4">
          Correct Answer
          <input
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Must match one of the options exactly"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Question
        </button>
      </form>

      {questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="border p-4 rounded relative">
              <p className="font-medium">
                Q{idx + 1}. {q.questionText}
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {q.options.map((option, i) => (
                  <li key={i}>
                    {option} {option === q.correctAnswer && <strong>(✔ correct)</strong>}
                  </li>
                ))}
              </ul>
              <button
                className="text-red-600 mt-2"
                onClick={() => handleDelete(q.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
