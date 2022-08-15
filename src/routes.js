//===================
// IMPORTS
//===================

const { Router } = require('express');

const AuthMiddleware = require('./app/Middlewares/AuthMiddleware')
const UserController = require('./app/Controllers/User_Controller')
const loginController = require('./app/Controllers/Login_Controller')
const productController = require('./app/Controllers/Product_Controller')


//===================
// ROUTES
//===================


const routes = new Router();

routes.post('/register', UserController.store);
routes.post('/login', loginController.index);
routes.get('/account', AuthMiddleware, UserController.myAccount);
routes.post('/account/create-product', AuthMiddleware, UserController.createProduct);
routes.post('/account/edit-product', AuthMiddleware, UserController.editProduct);
routes.post('/account/delete-product', AuthMiddleware, UserController.deleteProduct);

routes.get('/products', productController.findProducts);








//===================
// EXPORT 
//===================

module.exports = routes;