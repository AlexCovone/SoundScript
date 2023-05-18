const express = require('express');
const router = express.Router();
const passport = require('passport');

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/login');
});

// @desc    Logout User
// @route   /auth/logout
router.get('/logout', (req, res) => {
    console.log('User has logged out using /auth/logout')
    req.logout()
    res.redirect('/')
})

module.exports = router;