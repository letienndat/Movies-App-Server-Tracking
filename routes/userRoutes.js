const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users/track', userController.trackUserAction);
router.get('/users/:email/recommendations', userController.getRecommendations);

module.exports = router;