const express = require('express');
const routes = express.Router();
const userController = require('./controllers/userController')
const publicController = require('./controllers/publicController')

//user routes

routes.post('/user/store', userController.store)
routes.get('/user/login', userController.login)
routes.get('/user/showAll', userController.showAll)
routes.post('/user/delete', userController.delete)
routes.put('/user/update', userController.update)
routes.post('/user/showOne', userController.showOne)

//public routes

routes.post('/public/store', publicController.store)

module.exports = routes;