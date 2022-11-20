const router = require('express').Router();
const { checkRoleStaff } = require('../../midderware/auth');
const staffAuthRouter = require('./staffAuthRouter');
const staffCategoryRouter = require('./staffCategoryRouter');
const staffProductRouter = require('./staffProductRouter');
const staffOrderRouter = require('./staffOrderRouter');

router.use('/auth', staffAuthRouter );
router.use(checkRoleStaff);
router.use('/category', staffCategoryRouter );
router.use('/product', staffProductRouter );
router.use('/order', staffOrderRouter);

module.exports = router;