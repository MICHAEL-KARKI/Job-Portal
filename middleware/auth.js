

const adminRole = async (req, res, next) => {
    const auth = req.session.auth;
    if (auth && auth.role === "admin") {
      return  next();
    }
        return res.redirect('/adminLogin'); 
    
};


const companyRole = (req, res, next) => {
    const auth = req.session.auth;
    if (auth) {
        if (auth.role === 'company') {
            return next();
        } else {
            return res.redirect('/companySignup'); 
        }
    } else {
        return res.redirect('/companySignup'); 
    }
};


const userRole = async (req, res, next) => {
    const auth = req.session.auth;
    if (auth && auth.role === "user") {
        next();
    } else {
        return res.redirect('/login'); 
    }
};



module.exports = {
    adminRole,
    companyRole,
    userRole
}
