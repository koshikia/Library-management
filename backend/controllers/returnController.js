const db = require('../config/db');
const PhieuMuon = require('../models/PhieuMuon');

// Ghi nhận trả sách (Thủ thư) - ĐÃ TÍCH HỢP TÍNH TIỀN PHẠT
exports.returnBorrow = async (req, res) => {
    const { maVach } = req.body;
    if (!maVach) return res.status(400).json({ message: "Thiếu mã vạch cuốn sách cần trả" });

    const conn = await db.getConnection();
    try {
        await conn.beginTransaction();

        // 1. Tìm phiếu mượn & thông tin sách/độc giả (Khóa dòng chống lỗi)
        const [[phieuMuon]] = await conn.query(
            `SELECT p.id, p.hanTra, p.nguoiDungId, n.hoTen, s.tenSach
             FROM PhieuMuon p
             JOIN NguoiDung n ON p.nguoiDungId = n.id
             JOIN BanSaoSach bs ON p.maVach = bs.maVach
             JOIN DauSach s ON bs.maDauSach = s.maDauSach
             WHERE p.maVach = ? AND p.trangThai IN ('DANG_MUON', 'QUA_HAN', 'QUAHAN') 
             LIMIT 1 FOR UPDATE`,
            [maVach]
        );

        if (!phieuMuon) throw new Error("Mã vạch này không có ai mượn, hoặc đã được trả trước đó!");

        // 2. Trả sách lại vào kho
        await conn.query(
            `UPDATE BanSaoSach SET trangThai = 'CO_SAN' WHERE maVach = ?`,
            [maVach]
        );

        // 3. Xử lý Logic Ngày Trễ & Tiền Phạt
        const hanTra = new Date(phieuMuon.hanTra);
        const homNay = new Date();

        hanTra.setHours(0,0,0,0); 
        homNay.setHours(0,0,0,0); 
        
        const diffTime = homNay - hanTra;
        const soNgayTre = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (soNgayTre > 0) {
            // Trường hợp 1: TRỄ HẠN
            await conn.query(
                `UPDATE PhieuMuon 
                 SET trangThai = 'DA_TRA', ngayTra = CURDATE() 
                 WHERE id = ?`,
                [phieuMuon.id]
            );
            
            const tongTien = soNgayTre * 5000;

            const [insertPhat] = await conn.query(
                `INSERT INTO PhieuPhat (phieuMuonId, soNgayTre, tongTien, trangThai) 
                 VALUES (?, ?, ?, 'CHUA_THANH_TOAN')`,
                [phieuMuon.id, soNgayTre, tongTien]
            );

            await conn.commit();
            
            return res.status(200).json({ 
                message: "Sách đã thu hồi, nhưng độc giả bị quá hạn!", 
                hasFine: true, 
                fineDetails: {
                    id: insertPhat.insertId,
                    hoTen: phieuMuon.hoTen,
                    tenSach: phieuMuon.tenSach,
                    soNgayTre: soNgayTre,
                    tongTien: tongTien
                }
            });

        } else {
            // Trường hợp 2: TRẢ ĐÚNG HẠN
            await conn.query(
                `UPDATE PhieuMuon 
                 SET trangThai = 'DA_TRA', ngayTra = CURDATE() 
                 WHERE id = ?`,
                [phieuMuon.id]
            );

            await conn.commit();

            return res.status(200).json({ 
                message: "Ghi nhận trả sách thành công! Cảm ơn độc giả đã trả đúng hạn.", 
                hasFine: false 
            });
        }

    } catch (error) {
        await conn.rollback();
        res.status(400).json({ message: error.message });
    } finally {
        conn.release();
    }
};

// API xử lý khi thủ thư bấm "Thanh toán ngay"
exports.payFine = async (req, res) => {
    try {
        const phieuPhatId = req.params.id;

        await db.query(
            `UPDATE PhieuPhat 
             SET trangThai = 'DA_THANH_TOAN', ngayThanhToan = NOW() 
             WHERE id = ?`,
            [phieuPhatId]
        );

        res.status(200).json({ message: "Thu tiền phạt thành công!" });

    } catch (error) {
        res.status(500).json({ message: "Lỗi thanh toán: " + error.message });
    }
};