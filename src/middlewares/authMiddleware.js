const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Bad Authorization format' });

  const token = parts[1];
  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * authorizeRole - accepts a string role or an array of allowed roles
 * @param {string|string[]} allowed
 */
function authorizeRole(allowed) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    const role = req.user.role;
    const ok = Array.isArray(allowed) ? allowed.includes(role) : role === allowed;
    if (!ok) return res.status(403).json({ error: 'Forbidden: insufficient role' });
    next();
  };
}

module.exports = { authenticateJWT, authorizeRole };
