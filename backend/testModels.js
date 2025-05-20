const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Exam = require('./models/Exam');
const Question = require('./models/Question');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    
    // Create a new User
    const newUser = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      role: 'teacher'
    });

    return newUser.save();
  })
  .then((savedUser) => {
    console.log('User saved:', savedUser);

    // Create a new Exam
    const newExam = new Exam({
      title: 'Math Exam',
      createdBy: savedUser._id, // Use saved user's ID
      duration: 60,
      startTime: new Date()
    });

    return newExam.save();
  })
  .then((savedExam) => {
    console.log('Exam saved:', savedExam);

    // Create a new Question
    const newQuestion = new Question({
      exam: savedExam._id, // Link to the saved exam
      text: 'What is 2 + 2?',
      options: ['3', '4', '5'],
      correctAnswer: '4'
    });

    return newQuestion.save();
  })
  .then((savedQuestion) => {
    console.log('Question saved:', savedQuestion);
  })
  .catch((err) => {
    console.error('Error:', err);
  })
  .finally(() => {
    mongoose.connection.close(); // Close connection after the test
  });

