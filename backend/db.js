const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '17052004', // nếu có mật khẩu thì điền
    database: 'library_db'
});

db.connect(err => {
    if (err) {
        console.error('Lỗi kết nối MySQL:', err);
    } else {
        console.log('Đã kết nối MySQL');
    }
});

module.exports = db;
