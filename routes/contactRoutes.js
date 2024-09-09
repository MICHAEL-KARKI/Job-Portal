

const express = require('express');
const contactRouter = express.Router();

const contactController = require('../controllers/contactController');

contactRouter.get('/', contactController.renderContactPage);

module.exports = contactRouter