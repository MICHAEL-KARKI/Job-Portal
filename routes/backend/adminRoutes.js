


const express = require('express')
const adminRouter = express.Router();

const adminController = require("../../controllers/backend/adminController")

adminRouter.get("/", adminController.adminController)
adminRouter.get("/adminSignup", adminController.renderAdminSignup);
adminRouter.get("/adminLogin", adminController.renderAdminLogin)
adminRouter.post("/adminSignup", adminController.adminRegistration)
adminRouter.post("/adminLogin", adminController.adminLogin)
adminRouter.get("/admin_profile", adminController.getadminOnDashboard)
adminRouter.get("/users", adminController.getAllUsersOnAdmin)
adminRouter.get("/companies", adminController.getAllCompnyOnAdmin)
adminRouter.get("/logout", adminController.logoutAdmin)

module.exports = adminRouter;

