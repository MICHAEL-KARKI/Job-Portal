
const removeFile = require("../../middleware/removeFile")
const jobModel = require("../../models/jobModel")

const jobPostController = (req, res) => {
    res.render('backend/post_job', {
        title: "Job Post Page",
        favicon: "/static/image/BWE logo.png",
        layout: "backend",
    });
};



  const postJobByCompany = async (req, res) => {
    try {
      if(!req.file || !req.isFileValid){
          return res.status(400).send("image is not valid")
      }
      const fileName = req.file.filename;
      const body = req.body;
      const company_id = req.session.auth.id
      const jobdata = await jobModel.postJobByCompany(body, fileName, company_id);
      if(jobdata){
         return res.redirect("/backend/company");
      }else{
          removeFile(req.file.filename);
          return res.status(400).send("something went wrong")
      }
      
  } catch (error) {
        console.log(error);
      if(req.file){
          removeFile(req.file.filename)
      }
      return res.status(400).send("something went wrong with the server");
    }
  };




module.exports = {
    jobPostController,
    postJobByCompany,
    
}