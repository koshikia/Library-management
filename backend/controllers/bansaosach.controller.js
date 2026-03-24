const BanSaoModel = require('../models/bansaosach.model');
const DauSachModel = require('../models/dausach.model');
const db = require('../config/db');
exports.create = async (req, res) => {
    const { maVach, maDauSach } = req.body;
    try {
        // 1. Thêm bản sao
        await BanSaoModel.create(req.body);
        
        // 2. Tăng số lượng bên DauSach (+1)
        await DauSachModel.updateQuantity(maDauSach, 1);

        res.status(201).json({ message: 'Nhập bản sao thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const [result] = await BanSaoModel.updateStatus(req.params.id, req.body.trangThai);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy bản sao' });
        res.json({ message: 'Cập nhật trạng thái thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        // 1. Tìm bản sao để lấy mã đầu sách
        const [rows] = await BanSaoModel.getById(req.params.id);
        if (rows.length === 0) return res.status(404).json({ message: 'Không tìm thấy bản sao' });
        const maDauSach = rows[0].maDauSach;

        // 2. Xóa bản sao
        await BanSaoModel.delete(req.params.id);

        // 3. Giảm số lượng bên DauSach (-1)
        await DauSachModel.updateQuantity(maDauSach, -1);

        res.json({ message: 'Đã xóa bản sao' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Thêm hàm này vào cuối file controller
exports.getByMaDauSach = async (req, res) => {
    try {
        const maDauSach = req.params.maDauSach;
        
        // Cấu trúc query có thể thay đổi tùy theo cách nhóm bạn đang viết (dùng callback hay async/await)
        // Giả sử dùng async/await giống file dattruoc.controller.js lúc nãy:
        const sql = `SELECT * FROM BanSaoSach WHERE maDauSach = ? ORDER BY maVach ASC`;
        const [rows] = await db.query(sql, [maDauSach]); 
        
        // Trả về thẳng mảng dữ liệu cho Frontend
        res.status(200).json(rows);
        
    } catch (error) {
        console.error("Lỗi lấy bản sao:", error);
        res.status(500).json({ message: 'Lỗi server khi lấy dữ liệu bản sao.' });
    }
};