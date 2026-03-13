const db = require('../config/db');
const PhieuMuon = require('../models/PhieuMuon');

exports.createBorrow = async (req, res) => {

    const { docGiaId, maVach } = req.body;

    if (!docGiaId || !maVach) {
        return res.status(400).json({
            message: "Thiếu thông tin mượn sách"
        });
    }

    const conn = await db.getConnection();

    try {

        await conn.beginTransaction();

        // 1. kiểm tra độc giả tồn tại
        const [[user]] = await conn.query(
            "SELECT id FROM NguoiDung WHERE id = ?",
            [docGiaId]
        );

        if (!user) {
            throw new Error("Độc giả không tồn tại");
        }


        // 2. kiểm tra giới hạn mượn (tối đa 5)
        const [[{ count }]] = await conn.query(
            `SELECT COUNT(*) AS count
             FROM PhieuMuon
             WHERE nguoiDungId = ?
             AND trangThai = 'DANG_MUON'`,
            [docGiaId]
        );

        if (count >= 5) {
            throw new Error("Độc giả đã mượn tối đa 5 cuốn sách");
        }


        // 3. kiểm tra sách tồn tại
        const [[book]] = await conn.query(
            `SELECT maDauSach, trangThai
             FROM BanSaoSach
             WHERE maVach = ?`,
            [maVach]
        );

        if (!book) {
            throw new Error("Không tìm thấy bản sao sách");
        }

        if (book.trangThai !== 'CO_SAN') {
            throw new Error("Sách hiện không sẵn sàng để mượn");
        }


        // 4. kiểm tra đặt trước
        const [reserves] = await conn.query(
            `SELECT id, nguoiDungId
             FROM DatTruoc
             WHERE maDauSach = ?
             AND trangThai = 'CHO'
             ORDER BY ngayDat ASC
             LIMIT 1`,
            [book.maDauSach]
        );


        if (reserves.length > 0) {

            const reserve = reserves[0];

            if (reserve.nguoiDungId !== docGiaId) {
                throw new Error("Sách đã được người khác đặt trước");
            }

            // cập nhật đặt trước
            await conn.query(
                `UPDATE DatTruoc
                 SET trangThai = 'DA_CO_SACH'
                 WHERE id = ?`,
                [reserve.id]
            );
        }


        // 5. tạo phiếu mượn
        await conn.query(
            `INSERT INTO PhieuMuon
            (nguoiDungId, maVach, ngayMuon, hanTra, trangThai)
            VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'DANG_MUON')`,
            [docGiaId, maVach]
        );


        // 6. cập nhật trạng thái sách
        await conn.query(
            `UPDATE BanSaoSach
             SET trangThai = 'DANG_MUON'
             WHERE maVach = ?`,
            [maVach]
        );


        await conn.commit();

        res.status(201).json({
            message: "Mượn sách thành công"
        });

    } catch (error) {

        await conn.rollback();

        res.status(400).json({
            message: error.message
        });

    } finally {

        conn.release();

    }
};



// lấy tất cả phiếu mượn (admin / thủ thư)
exports.getAllBorrows = async (req, res) => {

    try {

        const borrows = await PhieuMuon.getAll();

        res.json(borrows);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Lỗi server"
        });

    }

};


// độc giả xem phiếu mượn của mình
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