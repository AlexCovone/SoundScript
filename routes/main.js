const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
// const eventsController = require('../controllers/events');
const { ensureAuth } = require('../middleware/auth');

// router.get('/profile', ensureAuth, eventsController.getProfile);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

module.exports = router;
