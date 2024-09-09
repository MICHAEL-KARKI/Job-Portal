const connection = require("../connection/db");

function postJobByCompany(jobData, filename, id) {
  const { job_title, salary, description, location, job_type } = jobData;
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO job_table (job_title, salary, description, location, job_type, image, company_id) VALUES(?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [job_title, salary, description, location, job_type, filename, id],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
}

function getAllJobs() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM job_table";
    connection.query(sql, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
}

function applyJobByUser(job_id, user_id, company_id) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO apply_table (user_id, job_id, company_id, status) VALUES(?, ?, ?, ?)";
    connection.query(
      sql,
      [job_id, user_id, company_id, "pending"],
      (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
}

function getAppliedJobByCompany(company_id, user_id, job_id) {
  return new Promise((resolve, reject) => {
    const sql = `
SELECT  
    apply_table.*,
    job_table.job_title, job_table.image, job_table.company_id
    users.name, users.email, users.phone 
FROM
    apply_table 
INNER JOIN 
    job_table ON apply_table.job_id = job_table.id 
INNER JOIN  
    users ON apply_table.user_id = users.id 
INNER JOIN
    company ON apply_table.company_id = company.id
WHERE 
    apply_table.company_id = ?`;


    connection.query(sql, [company_id, user_id, job_id], (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
}

function getAppliedJobByUser(user_id) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT  
    apply_table.*,
    job_table.job_title, job_table.image, salary, description, job_type,
    users.name, users.email, users.phone 
FROM
    apply_table 
INNER JOIN 
    job_table ON apply_table.job_id = job_table.id 
INNER JOIN  
    users ON apply_table.user_id = users.id 
WHERE 
    apply_table.user_id = ?`

    connection.query(sql, [user_id], (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
}

function getJobByCompanyName(company_id){
    return new Promise((resolve, reject) => {
        const sql = `SELECT job_table.id, job_table.image,  job_table.job_title, job_table.description, job_table.salary, job_table.job_type, job_table.location FROM job_table
        INNER JOIN company ON job_table.company_id = company.id` 
        connection.query(sql, [company_id], (error, results) => {
            if (error) {
                return reject(error)
            }
            return resolve(results)
        })
    })
}


function getJobByCompanyID(company_id){
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM job_table WHERE company_id = ?",
            [company_id],
            (error, results) => {
                if (error) {
                    return reject(error)
                }
                return resolve(results)
            }
        )
    })
}


function getJobsOnCompanyDashboard(){
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM job_table"
        connection.query(sql, (error, results) => {
            if (error) {
                return reject(error)
            }
            return resolve(results)
        })
    })
}

function changeStatus(id, newStatus) {
  return new Promise((resolve, reject) => {
      const sql = "UPDATE apply_table SET status = ? WHERE id = ?";
      connection.query(sql, [newStatus, id], (error, results) => {
          if (error) {
              return reject(error);
          }
          return resolve(results);
  });
});
}

module.exports = {
  postJobByCompany,
  getAllJobs,
  applyJobByUser,
  getAppliedJobByCompany,
  getAppliedJobByUser,
  getJobByCompanyName,
  getJobByCompanyID,
  getJobsOnCompanyDashboard,
  changeStatus
};
