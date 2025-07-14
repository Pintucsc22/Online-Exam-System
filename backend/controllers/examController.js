// let exams = [];

// // Get all exams
// exports.getExams = (req, res) => {
//   res.json(exams);
// };

// // Get a specific exam by ID ✅
// exports.getExamById = (req, res) => {
//   const examId = req.params.id;
//   const exam = exams.find(e => e.id === examId);

//   if (!exam) {
//     return res.status(404).json({ error: 'Exam not found' });
//   }

//   res.json(exam);
// };

// // Create new exam
// exports.createExam = (req, res) => {
//   const { title, description, startTime, duration } = req.body;
//   const newExam = { id: Date.now().toString(), title, description, startTime, duration };
//   exams.push(newExam);
//   res.status(201).json(newExam);
// };

// // Delete exam
// exports.deleteExam = (req, res) => {
//   const { id } = req.params;
//   exams = exams.filter(exam => exam.id !== id);
//   res.json({ message: 'Exam deleted successfully' });
// };
let exams = [];

exports.getExams = (req, res) => {
  res.json(exams);
};

exports.createExam = (req, res) => {
  const { title, description, startTime, duration } = req.body;
  const newExam = { id: Date.now().toString(), title, description, startTime, duration };
  exams.push(newExam);
  res.status(201).json(newExam);
};

exports.deleteExam = (req, res) => {
  const { id } = req.params;
  exams = exams.filter(exam => exam.id !== id);
  res.json({ message: 'Exam deleted successfully' });
};

// ✅ New function to get single exam by ID
exports.getExamById = (req, res) => {
  const { id } = req.params;
  const exam = exams.find(e => e.id === id);
  if (!exam) {
    return res.status(404).json({ message: 'Exam not found' });
  }
  res.json(exam);
};

