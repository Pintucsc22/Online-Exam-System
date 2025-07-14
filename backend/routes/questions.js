// const express = require('express');
// const router = express.Router();
// const verifyToken = require('../middleware/auth');
// const { getQuestions, addQuestion, deleteQuestion, submitExam } = require('../controllers/questionController');

// router.get('/:examId/questions', verifyToken, getQuestions);
// router.post('/:examId/questions', verifyToken, addQuestion);
// router.delete('/:examId/questions/:questionId', verifyToken, deleteQuestion);
// router.post('/:examId/submit', verifyToken, submitExam);

// module.exports = router;

const express = require('express');
const router = express.Router({ mergeParams: true });
const verifyToken = require('../middleware/auth');
const { getQuestions, addQuestion, deleteQuestion, submitExam } = require('../controllers/questionController');

// Since in index.js => app.use('/api/exams/:examId/questions', questionRoutes)
// Here we only need:
router.get('/', verifyToken, getQuestions);
router.post('/', verifyToken, addQuestion);
router.delete('/:questionId', verifyToken, deleteQuestion);
router.post('/submit', verifyToken, submitExam);

module.exports = router;
