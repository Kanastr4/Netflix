const express = require('express');
const routes = express.Router();
const userController = require('./controllers/userController')

routes.post('/user/store', userController.store)
routes.get('/user/login', userController.login)

module.exports = routes;