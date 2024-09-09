
const conn = require("../connection/db")

function insertNewCompany (companyData){
    const { name, email, phone, location, password } = companyData
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO company (name, email, phone, location, password) VALUES(?, ?, ?, ?, ?)"
        conn.query(sql, [name, email, phone, location, password], (error, results)=> {
            if (error) {
                return reject(error)
            }
            return resolve(results)
        })
    })
};

function getCompanyOnDashboard(id){
    return new Promise((resolve, reject) => {
        const sql = "SELECT name, email, phone, location FROM company WHERE id = ?"
        conn.query(sql, [id], (error, results)=> {
            if (error) {
                return reject(error)
            }
            return resolve(results)
        })
    })
}



module.exports = {
    insertNewCompany,
    getCompanyOnDashboard,
};