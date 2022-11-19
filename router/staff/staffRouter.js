const router = require('express').Router();
const staffAuthRouter = require('./staffAuthRouter');

router.use('/auth', staffAuthRouter );

module.exports = router;