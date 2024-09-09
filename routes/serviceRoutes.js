
const express = require('express');
const serverRouter = express.Router();

const serviceController = require('../controllers/serviceController');

serverRouter.get('/', serviceController.renderService);

module.exports = serverRouter;