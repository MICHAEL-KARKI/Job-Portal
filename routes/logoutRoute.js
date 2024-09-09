
const express = require('express');
const logoutRouter = express.Router();

const controller = require("../controllers/userDashboard_controller");

logoutRouter.get("/", controller.logout);

module.exports = logoutRouter