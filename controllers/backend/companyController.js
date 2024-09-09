const jobModel = require("../../models/jobModel");
const companyModel = require("../../models/companyModel");

const companyController = (req, res) => {
  res.render("backend/company_dashboard", {
    title: "Company Page",
    favicon: "/static/image/BWE logo.png",
    layout: "backend",
  });
};

const userApplyDataOnCompany = async (req, res) => {
  try {
    const auth = req.session.auth;
    if (auth && auth.role === "company") {
      const { job_id, user_id } = req.body;
      const companyId = req.session.auth.id;
      const data = await jobModel.getAppliedJobByCompany(companyId);
      if (data) {
        return res.render("backend/applications", {
          title: "Job Applications",
          favicon: "/static/image/BWE logo.png",
          layout: "backend",
          applictions: data,
          changeStatus: req.flash("changeStatus")
        });
      }
      return res.redirect("/backend/company");
    }
  } catch (error) {
    console.log(error);
  }
};

const jobOnCompanyDashboard = async (req, res) => {
  try {
    const auth = req.session.auth;
    if (auth) {
      const id = req.session.auth.id;
      const companyJobList = await jobModel.getJobByCompanyName(id);
      return res.render("backend/viewJob", {
        title: "Company View Jobs Page",
        favicon: "/static/image/BWE logo.png",
        layout: "backend",
        // companyJobList: gropJobList,
        jobData: companyJobList,
      });
    }
        return res.redirect("/backend/company");
    
  } catch (error) {
    console.log(error);
  }
};


const getCompanyOnDashboard = async (req, res) => {
  try {
    const auth = req.session.auth;
    if (auth) {
      const companyData = await companyModel.getCompanyOnDashboard(auth.id);
      if (companyData) {
        return res.render("backend/company_profile", {
          title: "Company Profile",
          favicon: "/static/image/BWE logo.png",
          layout: "backend",
          company: companyData[0],
          auth: req.session.auth ? true : false
        });
      } else {
        console.log("Company not found");
        return res.redirect("/backend/company");
      }
    } else {
      console.log("Authentication failed");
      return res.redirect("/companyLogin"); // Redirect to login page if authentication fails
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

async function changeStatus(req, res) {
  const applicationId = req.body.applicationId; 
  const newStatus = req.body.status;
  try {
      const data = await jobModel.changeStatus(applicationId, newStatus);
      console.log(data);
      if (data) {
        req.flash("changeStatus", "Status updated successfully.")
          return res.redirect("/backend/company/applications")
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update status." });
  }
}





const logout = (req, res) => {
  req.session.destroy((err)=>{
    if(err){
      console.log(err);
      res.status(404).send("something went wrong");
    }else{
      return res.redirect("/backend/companySignup")
    }
  })
}


module.exports = {
  companyController,
  userApplyDataOnCompany,
  jobOnCompanyDashboard,
  getCompanyOnDashboard,
  logout,
  changeStatus
};
