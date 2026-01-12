const { authenticateJWT, authorizeRole } = require('./authMiddleware');
const { loginValidator, createInvestmentValidator } = require('./validators');
const { notFoundHandler, errorHandler } = require('./errorHandler');

module.exports = { authenticateJWT, authorizeRole, loginValidator, createInvestmentValidator, notFoundHandler, errorHandler };
