const { staffLogin } = require('../../controller/staff/authController');
const router = require('express').Router();

router.post('/', staffLogin);

module.exports = router;