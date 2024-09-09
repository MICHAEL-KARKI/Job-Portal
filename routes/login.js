


const express = require('express');
const loginRouter = express.Router();
const controllers = require("../controllers/login_controller")

loginRouter.get('/', controllers.renderLoginPage)
loginRouter.post('/', controllers.userLogin)


module.exports = loginRouter;
