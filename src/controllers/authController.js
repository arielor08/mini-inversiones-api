const jwt = require('jsonwebtoken');
const { getUsers } = require('../data/store');
const { jwtSecret } = require('../config');
const JWT_EXPIRES_IN = '2h';

/**
 * POST /login
 */
async function login(req, res) {
  const { username, password } = req.body || {};
  const errors = [];
  if (!username) errors.push('username is required');
  if (!password) errors.push('password is required');
  if (errors.length) return res.status(400).json({ error: 'Validation error', details: errors });

  const user = getUsers().find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ username: user.username, role: user.role }, jwtSecret, { expiresIn: JWT_EXPIRES_IN });
  res.json({ token });
}

module.exports = { login }; 
