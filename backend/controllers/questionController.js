let questions = {}; // examId -> [questions]

exports.getQuestions = (req, res) => {
  const { examId } = req.params;
  res.json(questions[examId] || []);
};

exports.addQuestion = (req, res) => {
  const { examId } = req.params;
  const { questionText, options, correctAnswer } = req.body;

  const newQuestion = {
    id: Date.now().toString(),
    questionText,
    options,
    correctAnswer
  };

  if (!questions[examId]) questions[examId] = [];
  questions[examId].push(newQuestion);

  res.status(201).json(newQuestion);
};

exports.deleteQuestion = (req, res) => {
  const { examId, questionId } = req.params;
  if (questions[examId]) {
    questions[examId] = questions[examId].filter(q => q.id !== questionId);
  }
  res.json({ message: 'Question deleted successfully' });
};

exports.submitExam = (req, res) => {
  const { examId } = req.params;
  const { answers } = req.body;

  const examQuestions = questions[examId] || [];
  let score = 0;

  answers.forEach(answer => {
    const question = examQuestions.find(q => q.id === answer.questionId);
    if (question && question.correctAnswer === answer.selectedOption) {
      score++;
    }
  });

  res.json({ score, total: examQuestions.length });
};

