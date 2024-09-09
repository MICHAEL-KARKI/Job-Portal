
const connection = require("../connection/db");

function getUser(email, password) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users WHERE email = ? AND password = ?"; 
        connection.query(sql, [email, password], (error, results) => {
            if (error) {
                return reject(error)
            }
            return resolve(results)
        })
    })
};


function getCompanyLogin(email, password) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM company WHERE email = ? AND password = ?"; 
        connection.query(sql, [email, password], (error, results) => {
            if (error) {
                return reject(error)
            }
            return resolve(results)
        })
    })
};

module.exports = {
    getUser,
    getCompanyLogin,
}
