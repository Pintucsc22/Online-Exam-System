const express = require('express');
const router = express.Router({ mergeParams: true }); // Needed to access :examId

const {
  addQuestionToExam,
  getQuestionsByExam,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
} = require('../controllers/questionController');

const authMiddleware = require('../middleware/authMiddleware');

// Apply auth middleware to all routes
router.use(authMiddleware);

// POST: Add a new question to an exam
router.post('/', addQuestionToExam);

// GET: Get all questions for a given exam
router.get('/', getQuestionsByExam);

// GET: Get a single question by ID
router.get('/:questionId', getQuestionById);

// PUT: Update a question by ID
router.put('/:questionId', updateQuestionById);

// DELETE: Delete a question by ID
router.delete('/:questionId', deleteQuestionById);

module.exports = router;

