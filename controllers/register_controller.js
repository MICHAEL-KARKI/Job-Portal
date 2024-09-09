const removeFile = require("../middleware/removeFile");
const registrationModel = require("../models/registration_model");
const { validationResult } = require("express-validator");

const renderRegisterPage = (req, res) => {
  const error = req.flash("error");
  return res.render("register", {
    title: "Register Page",
    favicon: "/static/image/BWE logo.png",
    layout: "backend",
    error: error,
    isAuthenticated: req.session.auth ? true : false,
  });
};

const userRegistration = async (req, res) => {
  try {
    const existsUserCheck = await registrationModel.existsUserCheck(
      req.body.email
    );
   
    if (existsUserCheck.length > 0) {
      req.flash("errorMessage", "Email already exists");
      return res.redirect("/register");
    } else {
      const error = validationResult(req);
      if (error.isEmpty()) {
        if (!req.file || !req.isFileValid) {
          return res.status(400).send("image is not valid");
        }

        const fileName = req.file.filename;
        const body = req.body;
        const data = await registrationModel.insertNewUser(body, fileName);
        if (data) {
          req.session.auth = {
            id: data.insertId,
            role: "user",
          };
          console.log(req.session.auth);
          return res.redirect("/userDashboard");
        } else {
          removeFile(req.file.filename);
          return res.status(400).send("something went wrong");
        }
      }else{
        const errorData = error.mapped()
        req.flash('error', errorData)
        return res.redirect("/register")
      }
    }
  } catch (error) {
    console.log(error);
    if (req.file) {
      removeFile(req.file.filename);
    }
    return res.status(400).send("something went wrong with the server");
  }
};

module.exports = {
  renderRegisterPage,
  userRegistration,
};
