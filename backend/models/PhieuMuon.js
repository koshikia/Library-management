const db = require('../config/db');

const PhieuMuon = {
    // TẠO PHIẾU MƯỢN (Đã bọc Transaction & Row Lock chống Race Condition)
    taoPhieuMuon: async (docGiaId, maVach) => {
        const conn = await db.getConnection();
        
        try {
            await conn.beginTransaction();
            
            // 1. Kiểm tra độc giả
            const [[user]] = await conn.query("SELECT id FROM NguoiDung WHERE id = ?", [docGiaId]);
            if (!user) throw new Error("Độc giả không tồn tại");

            // 2. Kiểm tra giới hạn mượn
            const [[{ count }]] = await conn.query(
                "SELECT COUNT(*) AS count FROM PhieuMuon WHERE nguoiDungId = ? AND trangThai = 'DANG_MUON'",
                [docGiaId]
            );
            if (count >= 5) throw new Error("Độc giả đã mượn tối đa 5 cuốn sách");
            
            // 3. Khóa dòng sách và kiểm tra trạng thái (FOR UPDATE)
            const [[book]] = await conn.query(
                `SELECT maDauSach, trangThai
                 FROM BanSaoSach
                 WHERE maVach = ? FOR UPDATE`,
                [maVach]
            );

            if (!book) throw new Error("Không tìm thấy bản sao sách");
            if (book.trangThai !== 'CO_SAN' && book.trangThai !== 'DANG_GIU_CHO') {
                throw new Error(`Sách hiện không sẵn sàng để mượn (Trạng thái: ${book.trangThai})`);
            }
            
            // 4. Xử lý logic Đặt trước
            if (book.trangThai === 'DANG_GIU_CHO') {
                const [reserves] = await conn.query(
                    `SELECT id 
                     FROM DatTruoc
                     WHERE maVach = ? AND nguoiDungId = ? AND trangThai = 'DA_CO_SACH'
                     LIMIT 1 FOR UPDATE`,
                    [maVach, docGiaId]
                );

                if (reserves.length === 0) {
                    throw new Error("Từ chối: Bản sao này đã được cất giữ riêng cho một Độc giả khác (chưa đúng người hoặc chưa được duyệt)!");
                }
                await conn.query(`UPDATE DatTruoc SET trangThai = 'HOAN_THANH' WHERE id = ?`, [reserves[0].id]);

            } else if (book.trangThai === 'CO_SAN') {
                const [reserves] = await conn.query(
                    `SELECT id 
                     FROM DatTruoc
                     WHERE maDauSach = ? AND nguoiDungId = ? AND trangThai = 'CHO'
                     LIMIT 1 FOR UPDATE`, 
                    [book.maDauSach, docGiaId]
                );

                if (reserves.length > 0) {
                    await conn.query(`UPDATE DatTruoc SET trangThai = 'HOAN_THANH' WHERE id = ?`, [reserves[0].id]);
                } 
            }
            
            // 5. Tạo Phiếu mượn và cập nhật Bản sao sách
            await conn.query(
                `INSERT INTO PhieuMuon (nguoiDungId, maVach, ngayMuon, hanTra, trangThai)
                 VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'DANG_MUON')`,
                [docGiaId, maVach]
            );

            await conn.query(`UPDATE BanSaoSach SET trangThai = 'DANG_MUON' WHERE maVach = ?`, [maVach]);

            await conn.commit();
            return { message: "Mượn sách thành công! Đã đồng bộ với hệ thống đặt trước." };

        } catch (error) {
            await conn.rollback();
            throw error; // Ném lỗi ra ngoài để Controller bắt
        } finally {
            conn.release();
        }
    },

    // Lấy phiếu mượn theo ID
    findById: async (id) => {
        const [rows] = await db.query(
            `SELECT * 
             FROM PhieuMuon 
             WHERE id = ?
             LIMIT 1`,
            [id]
        );
        return rows[0] || null;
    },

    // Tìm phiếu mượn đang mượn theo mã vạch
    findDangMuonByMaVach: async (maVach) => {
        const [rows] = await db.query(
            `SELECT *
             FROM PhieuMuon
             WHERE maVach = ?
             AND trangThai = 'DANG_MUON'
             LIMIT 1`,
            [maVach]
        );
        return rows[0] || null;
    },

    // Cập nhật trả sách
    traSach: async (id) => {
        const [result] = await db.query(
            `UPDATE PhieuMuon
             SET trangThai = 'DA_TRA',
                 ngayTra = CURDATE()
             WHERE id = ?
             AND trangThai = 'DANG_MUON'`,
            [id]
        );
        return result;
    },

    // Thủ thư xem tất cả phiếu mượn
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT 
                pm.id,
                nd.hoTen,
                nd.email,
                ds.tenSach,
                bs.maVach,
                pm.ngayMuon,
                pm.hanTra,
                pm.ngayTra,
                pm.trangThai
            FROM PhieuMuon pm
            JOIN NguoiDung nd 
                ON pm.nguoiDungId = nd.id
            JOIN BanSaoSach bs 
                ON pm.maVach = bs.maVach
            JOIN DauSach ds 
                ON bs.maDauSach = ds.maDauSach
            ORDER BY pm.ngayMuon DESC
        `);
        return rows;
    },

    // Bạn đọc xem phiếu mượn của mình
    getByUserId: async (userId) => {
        const [rows] = await db.query(`
            SELECT 
                pm.id,
                ds.tenSach,
                pm.maVach,
                pm.ngayMuon,
                pm.hanTra,
                pm.ngayTra,
                pm.trangThai
            FROM PhieuMuon pm
            JOIN BanSaoSach bs 
                ON pm.maVach = bs.maVach
            JOIN DauSach ds 
                ON bs.maDauSach = ds.maDauSach
            WHERE pm.nguoiDungId = ?
            ORDER BY pm.ngayMuon DESC
        `, [userId]);
        return rows;
    }
};

module.exports = PhieuMuon;