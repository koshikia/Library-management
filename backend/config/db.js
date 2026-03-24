<<<<<<< HEAD
const mysql = require('mysql2');
=======
// backend/config/db.js
const mysql = require('mysql2/promise');
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
<<<<<<< HEAD
    password: '17052004', // Mật khẩu của bạn
    database: 'library_db', // Tên database của bạn
=======
    password: 'Da2@@92@@4',
    database: 'library_db',
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

<<<<<<< HEAD
// Kiểm tra kết nối (Optional - chỉ để bạn yên tâm là kết nối được)
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Lỗi kết nối MySQL:', err.message);
    } else {
        console.log('Kết nối MySQL thành công!');
        connection.release(); // Trả kết nối về hồ bơi (pool)
    }
});

// QUAN TRỌNG: Phải có .promise() ở đây để dùng được async/await trong Controller
module.exports = pool.promise();
=======
// Kiểm tra kết nối
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Kết nối MySQL thành công!');
        connection.release();
    } catch (err) {
        console.error('Lỗi kết nối MySQL:', err.message);
    }
}

testConnection();

module.exports = pool;
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a
