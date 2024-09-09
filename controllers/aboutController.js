
const registrationModel = require("../models/registration_model")

const renderAbout = async (req, res) => {
    const auth = req.session.auth;
    const userData =  auth ?   await registrationModel.getUserOnDashboard(auth.id) : {} ;
    return res.render('about', { 
        title: "About Page", 
        favicon: "/static/image/BWE logo.png",
        user: userData[0],
        auth: req.session.auth ? true : false
    });
};

module.exports = {
    renderAbout,
}