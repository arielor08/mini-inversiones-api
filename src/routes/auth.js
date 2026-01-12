const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const router = express.Router();
const { login } = require('../controllers/authController');
const { loginValidator } = require('../middlewares');

router.post('/', loginValidator, asyncHandler(login));

module.exports = router; 
