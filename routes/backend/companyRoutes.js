const express = require("express");

const companyRouter = express.Router();
const upload = require("../../middleware/imageUpload")

const companyController = require("../../controllers/backend/companyController");
const jobController = require("../../controllers/backend/jobPost_controller")


companyRouter.get("/", companyController.companyController);
companyRouter.get("/jobPost", jobController.jobPostController);
companyRouter.post("/jobPost", upload.single("image"), jobController.postJobByCompany)
companyRouter.get("/applications", companyController.userApplyDataOnCompany)
companyRouter.get("/viewJobs", companyController.jobOnCompanyDashboard)
companyRouter.get("/company_profile", companyController.getCompanyOnDashboard)
companyRouter.get("/logout", companyController.logout)

companyRouter.post("/changeStatus/:id", companyController.changeStatus)



module.exports = companyRouter;