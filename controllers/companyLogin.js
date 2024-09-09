// controllers/companyLogin.js

const companyModel = require("../models/companyModel")

const renderLogin = (req, res) => {
    return res.render("companyLogin", {
        title: "Company Login Page",
        favicon: "/static/image/BWE logo.png",
        layout: "backend"
    });
};

const companyRegistration = async (req, res) => {
    try {
        const body = req.body;
        const data = await companyModel.insertNewCompany(body);
        if (data) {
            req.session.auth = {
                id: data.insertId,
                role: "company",
            }
            return res.redirect("/backend/company");
        } else {
            return res.status(400).send("Something went wrong");
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send("Something went wrong with the server");
    }
};

module.exports = {
    renderLogin,
    companyRegistration,
};
