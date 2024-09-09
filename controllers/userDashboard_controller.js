const registrationModel = require("../models/registration_model")

const jobModel = require("../models/jobModel")



const getUserOnDashboard = async (req, res) => {
  try {
    const auth = req.session.auth;
  
    if (auth) {
      const userData = await registrationModel.getUserOnDashboard(auth.id);
      if (userData) {
        return res.render("userDashboard", {
          title: "User Dashboard",
          favicon: "/static/image/BWE logo.png",
          user: userData[0],
          auth: req.session.auth ? true : false
        });
      }
      
    
    }
    return res.redirect("/login");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const jobAppliedTrackingByUser = async (req, res) => {
  try {
      const auth = req.session.auth;
      if(auth && auth.role === "user"){
          const { job_id, user_id } = req.body;
          const userId = req.session.auth.id;
          const data = await jobModel.getAppliedJobByUser(userId);
          if(data){
              return res.render("jobAppliedDashboard", {
                  title: "Job Applications",
                  favicon: "/static/image/BWE logo.png",
                  layout: "backend",
                  userAppliedJobs: data
              });
          }
          return res.redirect("/backend/company")

      }
  } catch (error) {
      console.log(error);
  }
}

const uploadResume = async (req, res) => {
  try {
    const auth = req.session.auth;
    if(auth) {
      if(!req.file || !req.isFileValid){
          return res.status(400).send("THE UPLOADED RESUME EXTANTION IS INVALID")
      }
      const fileName = req.file.filename;
      const userId = auth.id;
      const uploadResume = await registrationModel.insertResume(fileName,userId);
      if(uploadResume){
        return res.redirect("/userDashboard");
      } else {
        removeFile(req.file.filename);
        return res.redirect("/userDashboard");
      }
    }
  } catch (error) {
    console.log(error);
    if(req.file){
        removeFile(req.file.filename)
    }
    return res.status(400).send("something went wrong with the server");
  }
}


const logout = (req, res) => {
  req.session.destroy((err)=>{
    if(err){
      console.log(err);
      res.status(404).send("something went wrong");
    }else{
      return res.redirect("/")
    }
  })
}


module.exports = {
  getUserOnDashboard,
  jobAppliedTrackingByUser,
  uploadResume,
  logout,
};
