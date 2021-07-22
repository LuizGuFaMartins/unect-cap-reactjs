const express = require('express');
const Router = express.Router();

//Controllers
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
//Middleware
const authMiddleware = require('./app/middlewares/auth');

Router.post('/users', UserController.store);
Router.post('/sessions', SessionController.store);


Router.use(authMiddleware);

Router.get('/users', UserController.index);
Router.put('/users', UserController.update);
Router.delete('/users', UserController.delete);


module.exports = Router;