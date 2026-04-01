const DauSachModel = require('../models/dausach.model');
const BanSaoModel = require('../models/bansaosach.model');

function toInt(value) {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
}

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
        const [books] = await DauSachModel.getById(req.params.id);
        if (books.length === 0) return res.status(404).json({ message: 'Không tìm thấy sách' });

        const [copies] = await BanSaoModel.getByDauSachId(req.params.id);
        const book = books[0];

        res.json({
            ...book,
            tongSoLuong: toInt(book.tongSoLuong),
            tongBanSaoThucTe: toInt(book.tongBanSaoThucTe),
            soLuongCoSan: toInt(book.soLuongCoSan),
            soLuongDangMuon: toInt(book.soLuongDangMuon),
            soLuongDangGiuCho: toInt(book.soLuongDangGiuCho),
            soLuongHuHong: toInt(book.soLuongHuHong),
            soLuongThatLac: toInt(book.soLuongThatLac),
            thongKeBanSao: {
                tongSoLuong: toInt(book.tongSoLuong),
                tongBanSaoThucTe: toInt(book.tongBanSaoThucTe),
                soLuongCoSan: toInt(book.soLuongCoSan),
                soLuongDangMuon: toInt(book.soLuongDangMuon),
                soLuongDangGiuCho: toInt(book.soLuongDangGiuCho),
                soLuongHuHong: toInt(book.soLuongHuHong),
                soLuongThatLac: toInt(book.soLuongThatLac)
            },
            danhSachBanSao: copies
        });
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
