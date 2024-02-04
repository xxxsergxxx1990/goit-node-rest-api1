
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/jwtMiddleware');
const userController = require('../controllers/userController');

router.post('/logout', authenticateToken, userController.logout);
router.get('/current', authenticateToken, userController.getCurrentUser);
module.exports = router;
