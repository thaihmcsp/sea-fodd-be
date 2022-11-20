const { staffLogin } = require('../../controller/staff/authController');
const router = require('express').Router();

router.post('/login', staffLogin);

module.exports = router;