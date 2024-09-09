

const express = require('express');
const aboutRouter = express.Router();

const aboutController = require("../controllers/aboutController");

aboutRouter.get("/", aboutController.renderAbout);

module.exports = aboutRouter;