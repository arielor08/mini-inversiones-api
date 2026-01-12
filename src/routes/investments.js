const express = require('express');
const router = express.Router();
const { list, create, remove } = require('../controllers/investmentController');
const { authenticateJWT, authorizeRole } = require('../middlewares/authMiddleware');

router.use(authenticateJWT);

router.get('/', list);
router.post('/', authorizeRole('admin'), create);
router.delete('/:id', authorizeRole('admin'), remove);

module.exports = router;
