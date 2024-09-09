const mysql = require('mysql');
const dbconfig = require("./config")

const connection = mysql.createConnection(dbconfig);
    
connection.connect((error) =>{
    if (error) {
        console.log(error);
    }
    console.log("Database Connected to jobportal");
});

module.exports = connection;
