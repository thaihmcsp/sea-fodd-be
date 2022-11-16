const express = require('express');
const router = express.Router();
const authController = require('../controller/user/authController');

router.get('/:email/:code', authController.verifyEmail);
router.post('/checkCode', authController.mailCodeForgotPass);
module.exports = router;