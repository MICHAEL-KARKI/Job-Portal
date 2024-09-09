


const express = require('express');
const registerRouter = express.Router();
const upload = require("../middleware/imageUpload")
const controllers = require("../controllers/register_controller")
const validationUser = require("../middleware/SignupFormValidation")

registerRouter.get('/', controllers.renderRegisterPage)
registerRouter.post("/", upload.single("image"), validationUser.signUpFormValidation, controllers.userRegistration)


module.exports = registerRouter;
