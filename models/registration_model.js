
const conn = require("../connection/db")


function insertNewUser(userData, filename){
    const { name, email, phone, password } = userData 
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO users (name, email, phone, password, image) VALUES(?, ?, ?, ?, ?)"
        conn.query(sql, [name, email, phone, password, filename], (error, results)=>{
            if (error) {
                return reject(error)
            }
            
            return resolve(results)
            
        })
    })
}



function getUserOnDashboard(id){
    return new Promise((resolve, reject) => {
        const sql = "SELECT id, name, email, phone, image, resume FROM users WHERE id = ?";
        conn.query(sql, [id], (error, results)=>{
            if (error) {
                return reject(error)
            }
            
            return resolve(results)
        })
    })
}


// add resume by user 

function insertResume(fileName, id){
    return new Promise((resolve, reject) => {
        const sql = "UPDATE users SET resume = ? WHERE id = ?"
        conn.query(sql, [fileName, id], (error, results)=>{
            if (error) {
                return reject(error);
            } else {
            return resolve(results);
            }
        })
    })
}


function existsUserCheck(email){
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM users WHERE email = ?", [email], (error, results)=>{
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });
}


module.exports = {
    insertNewUser,
    getUserOnDashboard,
    insertResume, 
 existsUserCheck 
};