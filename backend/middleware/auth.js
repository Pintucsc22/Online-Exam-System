const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your-secret-key';

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    req.user = decoded;
    next();
  });
}

module.exports = verifyToken;

