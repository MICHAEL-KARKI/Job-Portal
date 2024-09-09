
const registrationModel = require('../models/registration_model');

const renderPrivacy = async (req, res) => {
    const auth = req.session.auth;
    const userData =  auth ?   await registrationModel.getUserOnDashboard(auth.id) : {} ;
    return res.render('privacy', { 
        title: "Privacy Page", 
        favicon: "/static/image/BWE logo.png",
        user: userData[0],
        auth: req.session.auth ? true : false 
    });
};

module.exports = {
    renderPrivacy
};