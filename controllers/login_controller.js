
const loginModel = require('../models/loginModel');


const renderLoginPage = (req, res) => {
    res.render("login", {
        title: "Login Page",
        favicon: "/static/image/BWE logo.png",
        layout: "backend",
        errorMessage: req.flash("errorMessage"),
    });
};


const userLogin = async (req, res)=>{
    try {
        const { email, password} = req.body;
        const userData = await loginModel.getUser(email, password)
        if(!userData.length){
            req.flash("errorMessage", "Invalid Email or Password")
            return res.redirect("/login")
        }
        if(userData.length){
            req.session.auth = {
                id: userData[0].id,
                role: "user"
            }
            return res.redirect("/userDashboard")
        }
    } catch (error) {
        console.log(error)
    }
}

const CompanyLogin = async (req, res)=>{
    try {
        const { email, password} = req.body;
        const companyData = await loginModel.getCompanyLogin(email, password)
        if(!companyData.length){
            req.flash("errorMessage", "Invalid Email or Password")
            return res.redirect("/login")
        }
        if(companyData.length){
            req.session.auth = {
                id: companyData[0].id,
                role: "company"
            }
            req.flash("loginSuccess", "Login Successful")
            return res.redirect("/backend/company")
        }
    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    renderLoginPage,
    userLogin,
    CompanyLogin,
};