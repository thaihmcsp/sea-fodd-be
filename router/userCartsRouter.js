const express = require('express')
const router = express.Router()
const userController = require('../controller/user/cartController')
const { checkToken } = require('../midderware/auth')

router.get('/', checkToken, userController.getListCarts)
router.patch('/', checkToken, userController.updateCarts)
router.patch('/add-to-cart', checkToken, userController.addToCart)

module.exports = router