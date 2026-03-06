const db = require('../config/db');

exports.getAllBooks = (callback) => {
    const sql = "SELECT * FROM DauSach";
    db.query(sql, callback);
};