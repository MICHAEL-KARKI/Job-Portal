

const express = require('express');
const privacyRouter = express.Router();

const privacyController = require("../controllers/privacyController");

privacyRouter.get("/", privacyController.renderPrivacy);

module.exports = privacyRouter;