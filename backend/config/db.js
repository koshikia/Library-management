// backend/config/db.js
const mysql = require('mysql2/promise');

<<<<<<< HEAD
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '17052004', // Mật khẩu của bạn
    database: 'library_db', // Tên database của bạn
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Kiểm tra kết nối (Optional - chỉ để bạn yên tâm là kết nối được)
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Lỗi kết nối MySQL:', err.message);
    } else {
        console.log('Kết nối MySQL thành công!');
        connection.release(); // Trả kết nối về hồ bơi (pool)
    }
=======
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '15122004',
    database: 'library_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
>>>>>>> c3d0409ddb7bbe9101418ecea918898e9b3122e6
});

// QUAN TRỌNG: Phải có .promise() ở đây để dùng được async/await trong Controller
module.exports = pool.promise();
