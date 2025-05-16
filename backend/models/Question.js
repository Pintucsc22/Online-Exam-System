const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  questionText: { type: String, required: true }, // 🔄 Changed from 'text'
  options: [{ type: String }],
  correctAnswer: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);

