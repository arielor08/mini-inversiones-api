const authController = require('./authController');
const investmentController = require('./investmentController');

module.exports = { ...authController, ...investmentController };
