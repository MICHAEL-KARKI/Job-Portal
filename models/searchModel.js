const connection = require('../connection/db');

function searchItem(searchTerm) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM job_table WHERE job_title LIKE '%${searchTerm}%'`;
        connection.query(sql, (error, results) => {
            if (error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
}

module.exports = {
    searchItem
};