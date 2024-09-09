

const express = require("express")
const jobRouter = express.Router();

const controller = require("../controllers/job_controller")
const jobApplyController = require("../controllers/apply_controller")


jobRouter.get("/", controller.renderJobOnPage)
jobRouter.post("/apply", jobApplyController.applyController)


module.exports = jobRouter;