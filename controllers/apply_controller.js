



const jobModel = require("../models/jobModel")




const applyController = async (req, res)=>{
    try {
        const auth = req.session.auth
        if(auth){
            const { job_id, company_id } = req.body;
            const user_id  = req.session.auth.id;
            const data = await jobModel.applyJobByUser(user_id, job_id, company_id);
            if(data){
                req.flash("successMessage", "job applied successfully")
                return res.redirect("/jobs")
            }
        }else{
            req.flash("errorMessage", "signup and apply for job")
            return res.redirect("/register")
        }

    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    applyController,
}