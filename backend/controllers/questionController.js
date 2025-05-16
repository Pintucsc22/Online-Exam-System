const Exam = require('../models/Exam');
const Question = require('../models/Question');

// Add question
const addQuestionToExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const newQuestion = new Question({ ...req.body, exam: examId });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add question', error: err.message });
  }
};

// Get all questions for an exam
const getQuestionsByExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const questions = await Question.find({ exam: examId });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get questions' });
  }
};

// Get a single question by ID
const getQuestionById = async (req, res) => {
  try {
    const { questionId } = req.params;
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get question' });
  }
};

// Update a question by ID
const updateQuestionById = async (req, res) => {
  try {
    const { questionId } = req.params;
    const updatedQuestion = await Question.findByIdAndUpdate(questionId, req.body, { new: true });
    if (!updatedQuestion) return res.status(404).json({ message: 'Question not found' });
    res.json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update question' });
  }
};

// Delete a question by ID
const deleteQuestionById = async (req, res) => {
  try {
    const { questionId } = req.params;
    const deletedQuestion = await Question.findByIdAndDelete(questionId);
    if (!deletedQuestion) return res.status(404).json({ message: 'Question not found' });
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete question' });
  }
};

module.exports = {
  addQuestionToExam,
  getQuestionsByExam,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
};

