const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const translationController = require('../controllers/translations');
const { ensureAuth } = require('../middleware/auth');

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);
router.get('/profile', ensureAuth, translationController.getProfile);
router.post('/saveTranslation', ensureAuth, translationController.saveTranslation);

module.exports = router;
