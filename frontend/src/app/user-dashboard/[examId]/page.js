'use client';

import React, { useEffect, useState } from 'react';

export default function UserExamPage({ params }) {
  const examId = params.examId;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = 'http://192.168.194.128:5000/api';

  // Fetch questions on mount
  useEffect(() => {
    async function fetchQuestions() {
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/exams/${examId}/questions`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        if (!res.ok) {
          throw new Error(`Failed to fetch questions: ${res.statusText}`);
        }
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchQuestions();
  }, [examId]);

  function handleSelect(questionId, selectedOption) {
    setAnswers(prev => ({ ...prev, [questionId]: selectedOption }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const answersArray = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption,
    }));

    try {
      const res = await fetch(`${API_BASE}/exams/${examId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({ answers: answersArray }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(data);
      } else {
        setError(data.message || 'Submission failed');
      }
    } catch (err) {
      setError('Error submitting exam: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: '1rem' }}>
      <h1>Exam Questions</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {questions.length === 0 && !error && <p>Loading questions...</p>}

        {questions.map((q, i) => (
          <div
            key={q._id}
            style={{ marginBottom: '1.5rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}
          >
            <p>
              <strong>Q{i + 1}.</strong> {q.questionText}
            </p>

            {q.options.map((option, idx) => (
              <label key={idx} style={{ display: 'block', marginBottom: '0.25rem' }}>
                <input
                  type="radio"
                  name={q._id}
                  value={option}
                  checked={answers[q._id] === option}
                  onChange={() => handleSelect(q._id, option)}
                  required
                />
                {' '}{option}
              </label>
            ))}
          </div>
        ))}

        <button type="submit" disabled={loading || questions.length === 0}>
          {loading ? 'Submitting...' : 'Submit Exam'}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Result</h2>
          <p>
            You scored <strong>{result.score}</strong> out of <strong>{result.total}</strong>.
          </p>
        </div>
      )}
    </div>
  );
}

