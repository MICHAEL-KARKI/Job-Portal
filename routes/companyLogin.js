// routes/companyLogin.js

const express = require('express');
const companyRouter = express.Router();
const controllers = require("../controllers/companyLogin");
const loginController = require("../controllers/login_controller");

companyRouter.get('/', controllers.renderLogin);
companyRouter.post('/', controllers.companyRegistration);
companyRouter.post('/companyLogin', loginController.CompanyLogin);

module.exports = companyRouter;
