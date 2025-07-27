const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const examsFile = path.join(__dirname, "..", "data", "exams.json");
const questionsFile = path.join(__dirname, "..", "data", "questions.json");

// ✅ GET All Exams
router.get("/", (req, res) => {
  try {
    const exams = JSON.parse(fs.readFileSync(examsFile, "utf-8"));
    res.json(exams);
  } catch (err) {
    console.error("Failed to load exams:", err);
    res.status(500).json({ message: "Failed to load exams" });
  }
});

// ✅ POST Create New Exam
router.post("/", (req, res) => {
  const { title, description, startTime, duration } = req.body;

  if (!title || !description || !startTime || !duration) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const exams = JSON.parse(fs.readFileSync(examsFile, "utf-8"));

  const newExam = {
    id: uuidv4(),
    title,
    description,
    startTime,
    duration,
  };

  exams.push(newExam);
  fs.writeFileSync(examsFile, JSON.stringify(exams, null, 2));

  res.status(201).json(newExam);
});

// ✅ GET Exam by ID
router.get("/:examId", (req, res) => {
  const exams = JSON.parse(fs.readFileSync(examsFile, "utf-8"));
  const exam = exams.find((e) => e.id === req.params.examId);
  if (!exam) return res.status(404).json({ message: "Exam not found" });
  res.json(exam);
});

// ✅ GET Questions for an Exam
router.get("/:examId/questions", (req, res) => {
  const questions = JSON.parse(fs.readFileSync(questionsFile, "utf-8"));
  const examQuestions = questions.filter((q) => q.examId === req.params.examId);
  res.json(examQuestions);
});

// ✅ POST Add Question to an Exam
router.post("/:examId/questions", (req, res) => {
  const { questionText, options, correctAnswer } = req.body;

  if (!questionText || !options || !correctAnswer)
    return res.status(400).json({ message: "Missing fields" });

  const newQuestion = {
    id: uuidv4(),
    examId: req.params.examId,
    questionText,
    options,
    correctAnswer,
  };

  const questions = JSON.parse(fs.readFileSync(questionsFile, "utf-8"));
  questions.push(newQuestion);
  fs.writeFileSync(questionsFile, JSON.stringify(questions, null, 2));
  res.status(201).json(newQuestion);
});

// ✅ DELETE Question by examId and questionId
router.delete("/:examId/questions/:questionId", (req, res) => {
  const { examId, questionId } = req.params;

  let questions = JSON.parse(fs.readFileSync(questionsFile, "utf-8"));

  const initialLength = questions.length;

  questions = questions.filter(
    (q) => !(q.examId === examId && q.id === questionId)
  );

  if (questions.length === initialLength) {
    return res.status(404).json({ message: "Question not found" });
  }

  fs.writeFileSync(questionsFile, JSON.stringify(questions, null, 2));
  res.json({ message: "Question deleted successfully" });
});

// ✅ POST Submit Exam Answers and Calculate Score
router.post("/:examId/questions/submit", (req, res) => {
  const { examId } = req.params;
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: "Invalid answers format" });
  }

  try {
    const questions = JSON.parse(fs.readFileSync(questionsFile, "utf-8"));
    const examQuestions = questions.filter((q) => q.examId === examId);

    let score = 0;

    examQuestions.forEach((q) => {
      const userAnswer = answers.find((a) => a.questionId === q.id);
      if (userAnswer && userAnswer.selectedOption === q.correctAnswer) {
        score++;
      }
    });

    res.json({ score, total: examQuestions.length });
  } catch (err) {
    console.error("Error submitting exam:", err);
    res.status(500).json({ message: "Failed to submit exam" });
  }
});

// ✅ DELETE an Exam and its Questions
router.delete("/:examId", (req, res) => {
  const { examId } = req.params;

  try {
    // Delete exam from exams.json
    let exams = JSON.parse(fs.readFileSync(examsFile, "utf-8"));
    const examIndex = exams.findIndex((e) => e.id === examId);

    if (examIndex === -1) {
      return res.status(404).json({ message: "Exam not found" });
    }

    exams.splice(examIndex, 1); // remove the exam
    fs.writeFileSync(examsFile, JSON.stringify(exams, null, 2));

    // Delete related questions from questions.json
    let questions = JSON.parse(fs.readFileSync(questionsFile, "utf-8"));
    questions = questions.filter((q) => q.examId !== examId);
    fs.writeFileSync(questionsFile, JSON.stringify(questions, null, 2));

    res.json({ message: "Exam and related questions deleted successfully" });
  } catch (err) {
    console.error("Error deleting exam:", err);
    res.status(500).json({ message: "Failed to delete exam" });
  }
});

module.exports = router;
