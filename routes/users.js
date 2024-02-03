const router = require('express').Router()
const userController = require('../controllers/user/userController')






router.get('/info',userController.getInfo)