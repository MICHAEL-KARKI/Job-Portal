
const adminModel = require("../../models/adminModel");
const jobModel = require("../../models/jobModel")

class Admin{

static adminController = (req, res) => {
    res.render('backend/admin_dashboard', { 
        title: "Admin Page",
        favicon: "/static/image/BWE logo.png",
        layout: "backend"
    });
};

static renderAdminSignup = (req, res) => {
    return res.render("backend/adminSignup", {
        title: "Signup Page",
        favicon: "/static/image/BWE logo.png",
        layout: "backend",
    });
};

static renderAdminLogin = (req, res) => {
    res.render("backend/adminLogin", {
        title: "Login Page",
        favicon: "/static/image/BWE logo.png",
        layout: "backend",
    });
};


static adminRegistration = async (req, res) => {
    try {
        const body = req.body;
        const data = await adminModel.insertNewAdmin(body);
        if (data) {
            req.session.auth = {
                id: data.insertId,
                role: "admin",
            }
            return res.redirect("/backend/admin");
        } else {
          res.redirect("/backend/admin/adminSignup")
            return res.status(400).send("Something went wrong");
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send("Something went wrong with the server");
    }
};


static adminLogin = async (req, res)=>{
  try {
      const { email, password} = req.body;
      const adminData = await adminModel.getAdminLogin(email, password)
      if(!adminData.length){
          req.flash("errorMessage", "Invalid Email or Password")
          return res.redirect("/backend/admin/adminLogin")
      }
      if(adminData.length){
          req.session.auth = {
              id: adminData[0].id,
              role: "admin"
          }
          return res.redirect("/backend/admin")
      }
  } catch (error) {
      console.log(error)
  }
}


static getadminOnDashboard = async (req, res) => {
    try {
      const auth = req.session.auth;
      if (auth) {
        const adminData = await adminModel.getAdminOnDashboard(auth.id);
        if (adminData) {
          return res.render("backend/admin_profile", {
            title: "Admin Profile",
            favicon: "/static/image/BWE logo.png",
            layout: "backend",
            admin: adminData[0],
            auth: req.session.auth ? true : false
          });
        } else {
          console.log("Admin not found");
          return res.redirect("/backend/admin_profile");
        }
      } else {
        console.log("Authentication failed");
        return res.redirect("/adminLogin");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  


static getAllUsersOnAdmin = async (req, res)=>{
  try {
    const data = await adminModel.getUserOnAdmin();
    if(data){
      return res.render("backend/usersData", {
        title: "All Users",
        favicon: "/static/image/BWE logo.png",
        layout: "backend",
        users: data,
      });
    }
    
  } catch (error) {
    console.log(error);
  }
} 

static getAllCompnyOnAdmin = async (req, res) => {
  try {
    const data = await adminModel.getCompanyOnAdmin();
    if (data) {
      return res.render("backend/company", {
        title: "All Companies",
        favicon: "/static/image/BWE logo.png",
        layout: "backend",
        companies: data,
      });
    } else {
      console.log("No data found");
      return res.status(404).send("No companies found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
}

static logoutAdmin = (req, res) => {
  req.session.destroy((err)=>{
    if(err){
      console.log(err);
      res.status(404).send("something went wrong");
    }else{
      return res.redirect("/backend/admin")
    }
  })
}



}



module.exports = Admin;
