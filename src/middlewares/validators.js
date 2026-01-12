const { body, validationResult } = require('express-validator');

const loginValidator = [
  body('username').exists().withMessage('username is required'),
  body('password').exists().withMessage('password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: 'Validation error', details: errors.array().map(e => e.msg) });
    next();
  }
];

const createInvestmentValidator = [
  body('cliente').exists().withMessage('cliente is required'),
  body('activo').exists().withMessage('activo is required'),
  body('monto').exists().withMessage('monto is required').bail().isFloat({ gt: 0 }).withMessage('monto must be a positive number'),
  body('tipo').exists().withMessage('tipo is required'),
  body('fecha').exists().withMessage('fecha is required').bail().isISO8601().withMessage('fecha must be a valid date (YYYY-MM-DD)'),
  body('rentabilidad').exists().withMessage('rentabilidad is required').bail().isFloat().withMessage('rentabilidad must be a number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ error: 'Validation error', details: errors.array().map(e => e.msg) });
    next();
  }
];

module.exports = { loginValidator, createInvestmentValidator };