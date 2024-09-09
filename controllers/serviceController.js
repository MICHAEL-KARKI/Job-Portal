
const registrationModel = require("../models/registration_model");

const renderService = async (req, res) => {
    const auth = req.session.auth;
    const userData =  auth ?   await registrationModel.getUserOnDashboard(auth.id) : {} ;
    return res.render ('service', {
        title: 'Terms Page',
        favicon: '/static/image/BWE logo.png',
        user: userData[0],
        auth: req.session.auth ? true : false
    });
};

module.exports = {
    renderService
};