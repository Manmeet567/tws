const express = require('express')
const { signupUser, loginUser } = require('../controllers/userController')

const router = express.Router()

router.post('/loginData', loginUser)

router.post('/registerData', signupUser)

module.exports = router