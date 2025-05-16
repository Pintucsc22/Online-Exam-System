const express = require('express');
const router = express.Router();
const {
  createExam,
  getExams,
  getExamById,
  updateExam,
  deleteExam,
  submitExam,    // <-- add submitExam here
} = require('../controllers/examController');

const authMiddleware = require('../middleware/authMiddleware');
const questionRoutes = require('./questionRoutes');

router.use(authMiddleware);

router.post('/', createExam);
router.get('/', getExams);
router.get('/:id', getExamById);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);

// Mount question routes
router.use('/:examId/questions', questionRoutes);

// Add submit exam route here:
router.post('/:examId/submit', submitExam);

module.exports = router;

