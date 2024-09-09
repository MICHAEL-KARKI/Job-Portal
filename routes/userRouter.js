

const express = require('express');
const userRouter = express.Router();

const upload = require("../middleware/imageUpload")
const controller = require("../controllers/userDashboard_controller");
const { user } = require('../connection/config');

userRouter.get("/", controller.getUserOnDashboard)
userRouter.get("/appliedJobs", controller.jobAppliedTrackingByUser)
userRouter.post("/uploadResume", upload.single("resume"), controller.uploadResume)

module.exports = userRouter;
