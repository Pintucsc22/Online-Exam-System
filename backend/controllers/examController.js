const Exam = require('../models/Exam');
const Question = require('../models/Question');

// Create a new exam
const createExam = async (req, res) => {
  try {
    const { title, description, startTime, duration } = req.body;
    const userId = req.user.id; // ✅ from auth middleware

    console.log('✅ createExam req.user:', req.user); // 🔍 Debugging log

    const newExam = new Exam({
      title,
      description,
      startTime,
      duration,
      user: userId, // ✅ Required to associate exam with logged-in user
    });

    const savedExam = await newExam.save();
    res.status(201).json(savedExam);
  } catch (err) {
    console.error('❌ Error in createExam:', err);
    res.status(500).json({ error: 'Failed to create exam' });
  }
};

// Get all exams for the logged-in user
const getExams = async (req, res) => {
  try {
    console.log('✅ getExams req.user:', req.user);
    const userId = req.user.id;
    const exams = await Exam.find({ user: userId }).sort({ startTime: -1 });
    res.json(exams);
  } catch (err) {
    console.error('❌ Error in getExams:', err);
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
};

// Get a single exam by id (only if owned by user)
const getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    if (exam.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch exam' });
  }
};

// Update an exam by id (only if owned by user)
const updateExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    if (exam.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updates = req.body;
    Object.assign(exam, updates);

    const updatedExam = await exam.save();
    res.json(updatedExam);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update exam' });
  }
};

// Delete an exam by id (only if owned by user)
const deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    if (exam.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await exam.remove();
    res.json({ message: 'Exam deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete exam' });
  }
};

// Submit an exam answers and calculate score
const submitExam = async (req, res) => {
  const { examId } = req.params;
  const { answers } = req.body;

  try {
    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: 'Answers must be an array' });
    }

    const questions = await Question.find({ exam: examId });

    let score = 0;
    answers.forEach(answer => {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      if (question && question.correctAnswer === answer.selectedOption) {
        score++;
      }
    });

    res.status(200).json({
      message: 'Exam submitted successfully',
      score,
      total: questions.length,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting exam', error: err.message });
  }
};

module.exports = {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
  submitExam,
};

