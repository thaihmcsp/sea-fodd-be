const express = require('express')
const router = express.Router()
const authController = require('../controller/admin/authController')

router.post('/', authController.adminLogin)

module.exports = router