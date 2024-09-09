
const conn = require("../connection/db")


class admin{


static insertNewAdmin (adminData){
    const { name, email, password } = adminData
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO admin (name, email, password) VALUES(?, ?, ?)";
        conn.query(sql, [name, email, password], (error, results)=> {
            if (error) {
                return reject(error)
            }
            return resolve(results)
        })
    })
};

static getAdminLogin(email, password) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM admin WHERE email = ? AND password = ?"; 
        conn.query(sql, [email, password], (error, results) => {
            if (error) {
                return reject(error)
            }
            return resolve(results)
        })
    })
};

static getAdminOnDashboard(id){
    return new Promise((resolve, reject) => {
        const sql = "SELECT name, email FROM admin WHERE id = ?"
        conn.query(sql, [id], (error, results)=> {
            if (error) {
                return reject(error)
            }
            return resolve(results)
        })
    })
}




static getUserOnAdmin(){
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM users"
        conn.query(sql, (error, results)=> {
            if (error) {
                return reject(error)
            }
            return resolve(results)
        })
    })
}


static getCompanyOnAdmin(){
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM company"
        conn.query(sql, (error, results)=> {
            if (error) {
                return reject(error)
            }
            return resolve(results)
        })
    })
}


}

module.exports = admin