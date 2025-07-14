const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = 'your-secret-key';

const users = [
  { id: 1, email: 'user@example.com', password: bcrypt.hashSync('password', 10), role: 'user' },
  { id: 2, email: 'admin@example.com', password: bcrypt.hashSync('admin123', 10), role: 'admin' }
];

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token, userId: user.id, role: user.role });
};

