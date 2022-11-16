const express = require('express')
const router = express.Router();
const categoriesRouter = require('./adminCategoriesRouter')
const productRouyer = require('./adminProductRouter')
const userRouter = require('./adminUserRouter')
const orderRouter = require('./adminOrderRouter')
const authRouter = require('./adminAuthRouter')
const { checkRoleUser } = require('../midderware/auth');
router.use('/auth', authRouter)
router.use(checkRoleUser)
router.use('/categories', categoriesRouter);
router.use('/product', productRouyer)
router.use('/user', userRouter)
router.use('/order', orderRouter)

module.exports = router