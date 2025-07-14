// const express = require('express');
// const router = express.Router();
// const verifyToken = require('../middleware/auth');
// const { getExams, createExam, deleteExam, getExamById } = require('../controllers/examController');

// // Get all exams
// router.get('/', verifyToken, getExams);

// // Get a single exam by ID  ✅ ADD THIS
// router.get('/:id', verifyToken, getExamById);

// // Create a new exam
// router.post('/', verifyToken, createExam);

// // Delete an exam by ID
// router.delete('/:id', verifyToken, deleteExam);

// module.exports = router;
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { getExams, createExam, deleteExam, getExamById } = require('../controllers/examController');

router.get('/', verifyToken, getExams);
router.post('/', verifyToken, createExam);
router.get('/:id', verifyToken, getExamById);  // ✅ New route to fetch single exam
router.delete('/:id', verifyToken, deleteExam);

module.exports = router;

