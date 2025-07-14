// const express = require('express');
// const router = express.Router();
// const { login } = require('../controllers/authController');

// router.post('/login', authController.loginUser);


// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// // Login Route
// router.post('/login', authController.loginUser);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

router.post('/login', login);  // ✅ using the correct function name

module.exports = router;
