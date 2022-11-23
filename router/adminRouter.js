const express = require('express')
const router = express.Router();
const categoriesRouter = require('./adminCategoriesRouter')
const productRouter = require('./adminProductRouter')
const userRouter = require('./adminUserRouter')
const orderRouter = require('./adminOrderRouter')
const authRouter = require('./adminAuthRouter')
const { checkRoleStaff } = require('../midderware/auth');
router.use('/auth', authRouter)
router.use(checkRoleStaff)
router.use('/categories', categoriesRouter);
router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/order', orderRouter)

module.exports = router