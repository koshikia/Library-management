const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Da2@@92@@4',
    database: 'library_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
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