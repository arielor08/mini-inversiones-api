const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const router = express.Router();
const { list, create, remove } = require('../controllers/investmentController');
const { authenticateJWT, authorizeRole, createInvestmentValidator } = require('../middlewares');

router.use(authenticateJWT);

router.get('/', asyncHandler(list));
router.post('/', authorizeRole('admin'), createInvestmentValidator, asyncHandler(create));
router.delete('/:id', authorizeRole('admin'), asyncHandler(remove));

module.exports = router;
