const DauSachModel = require('../models/dausach.model');
const BanSaoModel = require('../models/bansaosach.model');

exports.getAll = async (req, res) => {
    try {
        const [rows] = await DauSachModel.getAll();
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getDetail = async (req, res) => {
    try {
        const [book] = await DauSachModel.getById(req.params.id);
        if (book.length === 0) return res.status(404).json({ message: 'Không tìm thấy sách' });

        const [copies] = await BanSaoModel.getByDauSachId(req.params.id);
        res.json({ ...book[0], danhSachBanSao: copies });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        if (!req.body.maDauSach || !req.body.tenSach) {
            return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
        }
        await DauSachModel.create(req.body);
        res.status(201).json({ message: 'Tạo sách thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const [result] = await DauSachModel.update(req.params.id, req.body);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy sách' });
        res.json({ message: 'Cập nhật thành công' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const [result] = await DauSachModel.delete(req.params.id);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Không tìm thấy sách' });
        res.json({ message: 'Đã xóa sách và các bản sao' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};