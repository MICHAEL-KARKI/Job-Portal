
const express = require('express');
const router = express.Router();
const homeRoutes = require('./home_routes');
const registerRoutes = require("./register");
const loginRouter = require('./login');
const contactRoutes = require('./contactRoutes');
const userRouter = require("./userRouter")
const jobRouter = require("./jobsRoute")
const companyRouter = require("./companyLogin")
const serviceRouter = require("./serviceRoutes")
const privacyRouter = require("./privacyRouter")
const logoutRoutes = require("./logoutRoute")
const aboutRouter = require("./aboutRouter")
const blogRouter = require("./blogRoutes")

const authMiddleware = require("../middleware/auth")


router.use('/', homeRoutes);
router.use("/register", registerRoutes);
router.use("/login", loginRouter);
router.use("/contact", contactRoutes);
router.use("/userDashboard", authMiddleware.userRole, userRouter)
router.use("/jobs", jobRouter)
router.use("/companySignup", companyRouter)
router.use("/service", serviceRouter)
router.use("/privacy", privacyRouter)
router.use("/logout", logoutRoutes)
router.use("/about", aboutRouter)

// router.use("/search", searchRouter)

module.exports = router;
