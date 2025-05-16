const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // changed from createdBy to user
  duration: { type: Number, required: true }, // in minutes
  startTime: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);

