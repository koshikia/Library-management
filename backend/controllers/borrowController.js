const db = require('../config/db');

exports.createBorrow = async (req, res) => {
    const { docGiaId, maVach } = req.body;
    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();

        // 1. Kiểm tra giới hạn mượn của độc giả
        const [[{ count }]] = await conn.query(
            "SELECT COUNT(*) AS count FROM PhieuMuon WHERE nguoiDungId = ? AND trangThai = 'DANG_MUON'",
            [docGiaId]
        );

        if (count >= 5) {
            throw new Error("Độc giả đã đạt giới hạn mượn sách (5 cuốn).");
        }

        // 2. Kiểm tra trạng thái sách
        const [[book]] = await conn.query(
            "SELECT maDauSach, trangThai FROM BanSaoSach WHERE maVach = ?",
            [maVach]
        );

        if (!book || book.trangThai !== 'CO_SAN') {
            throw new Error("Sách không sẵn sàng để mượn.");
        }

        // 3. Kiểm tra đặt trước
        const [reserves] = await conn.query(
            `SELECT nguoiDungId FROM DatTruoc
             WHERE maDauSach = ? AND trangThai = 'CHO'
             ORDER BY ngayDat ASC LIMIT 1`,
            [book.maDauSach]
        );

        if (reserves.length && reserves[0].nguoiDungId !== docGiaId) {
            throw new Error("Sách đã có người khác đặt trước.");
        }

        // 4. Lập phiếu mượn
        await conn.query(
            `INSERT INTO PhieuMuon (nguoiDungId, maVach, ngayMuon, hanTra)
             VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY))`,
            [docGiaId, maVach]
        );

        // 5. Cập nhật trạng thái sách
        await conn.query(
            "UPDATE BanSaoSach SET trangThai = 'DANG_MUON' WHERE maVach = ?",
            [maVach]
        );

        await conn.commit();
        res.status(201).json({ message: "Mượn sách thành công" });

    } catch (err) {
        await conn.rollback();
        res.status(400).json({ error: err.message });
    } finally {
        conn.release();
    }
};





exports.renewBook = async (req, res) => {
    const { phieuMuonId } = req.body;
    const conn = await db.getConnection();

    try {
        await conn.beginTransaction();

        const [[info]] = await conn.query(
            `SELECT pm.*, bss.maDauSach
             FROM PhieuMuon pm
             JOIN BanSaoSach bss ON pm.maVach = bss.maVach
             WHERE pm.id = ?`,
            [phieuMuonId]
        );
        if (!info) throw new Error("Phiếu mượn không tồn tại.");

        const [reserves] = await conn.query(
            "SELECT id FROM DatTruoc WHERE maDauSach = ? AND trangThai = 'CHO'",
            [info.maDauSach]
        );
        if (reserves.length) {
            throw new Error("Không thể gia hạn vì đã có người đặt trước.");
        }

        await conn.query(
            "UPDATE PhieuMuon SET hanTra = DATE_ADD(hanTra, INTERVAL 14 DAY) WHERE id = ?",
            [phieuMuonId]
        );

        await conn.commit();
        res.json({ message: "Gia hạn thành công" });

    } catch (err) {
        await conn.rollback();
        res.status(400).json({ error: err.message });
    } finally {
        conn.release();
    }
};
