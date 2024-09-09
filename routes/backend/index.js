const express = require('express')
const backendRouter = express.Router();

const adminRoutes = require("./adminRoutes")
const companyRoutes = require("./companyRoutes");
const authMiddleware = require("../../middleware/auth")


backendRouter.use("/admin", adminRoutes)
backendRouter.use("/company", authMiddleware.companyRole, companyRoutes)



module.exports = backendRouter;

