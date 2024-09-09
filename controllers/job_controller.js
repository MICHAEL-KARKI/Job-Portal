const jobModel = require("../models/jobModel");
const registrationModel = require("../models/registration_model");
const groupByFour = require("../helper/groupJobs");
const paginationModel = require("../models/pagination");
const groupBy = require("../helper/groupJobs");
const searchModel = require("../models/searchModel");



const renderJobOnPage = async (req, res) => {
  try {
    const auth = req.session.auth;
    const userData = auth ? await registrationModel.getUserOnDashboard(auth.id) : {};
    const value = parseInt(req.query.offset) || 0;
    const searchTerm = req.query.search || "";
    const offset = value * 8;
    const limit = 8;
    let jobs;
    let totalPageCount;

    if (searchTerm) {
      // If a search term is provided, search for jobs
      jobs = await searchModel.searchItem(searchTerm);
      totalPageCount = 1; 
    } else {
      // If no search term, retrieve jobs with pagination
      jobs = await paginationModel.getWithPagination(limit, offset, "job_table");
      totalPageCount = await paginationModel.getTotalCount("job_table");
    }

    return res.render("jobs", {
      title: "Jobs",
      favicon: "/static/image/BWE logo.png",
      jobs: jobs,
      user: userData[0],
      auth: !!auth,
      jobApplySuccess: req.flash("successMessage"),
      currentPages: offset / 8,
      totalPageCount: totalPageCount,
      searchTerm: searchTerm,
    });
  } catch (error) {
    console.error("Error in renderJobOnPage:", error);
    return res.status(500).send("Internal Server Error");
  }
};


  module.exports  = {
    renderJobOnPage
  }