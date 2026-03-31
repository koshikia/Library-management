const PhieuMuon = require('../models/PhieuMuon');

exports.createBorrow = async (req, res) => {
    const { docGiaId, maVach } = req.body;
    
    if (!docGiaId || !maVach) {
        return res.status(400).json({ message: "Thiếu thông tin mượn sách" });
    }

    try {
        const result = await PhieuMuon.taoPhieuMuon(docGiaId, maVach);

        res.status(201).json(result);
        
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllBorrows = async (req, res) => {
    try {
        const data = await PhieuMuon.getAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};

exports.getMyBorrows = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).json({
                message: "Chưa đăng nhập"
            });
        }

        const userId = req.session.user.id;
        const data = await PhieuMuon.getByUserId(userId);
        res.json(data);

    } catch (error) {
        res.status(500).json({
            message: "Lỗi server"
        });
    }
};