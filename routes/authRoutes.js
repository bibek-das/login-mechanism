const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/profile', authController.profile);
router.get('/login', authController.viewLogin);
router.get('/signup', authController.viewSignup);

module.exports = router;
