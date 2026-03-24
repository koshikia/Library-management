const db = require('../config/db');

class DatTruocModel {
    // 1. DÀNH CHO ĐỘC GIẢ: Đặt trước một đầu sách
    static async taoDatTruoc(nguoiDungId, maDauSach) {
<<<<<<< HEAD
        // Kiểm tra xem đầu sách có tồn tại không
=======
        // ... (Giữ nguyên kiểm tra đầu sách tồn tại) ...
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a
        const [sach] = await db.query('SELECT maDauSach FROM DauSach WHERE maDauSach = ?', [maDauSach]);
        if (sach.length === 0) {
            throw new Error('Đầu sách không tồn tại.');
        }

<<<<<<< HEAD
        // Kiểm tra xem độc giả này đã đặt trước cuốn này và đang chờ chưa (tránh spam)
        const [daDat] = await db.query(
            'SELECT id FROM DatTruoc WHERE nguoiDungId = ? AND maDauSach = ? AND trangThai = "CHO"',
            [nguoiDungId, maDauSach]
        );
        if (daDat.length > 0) {
            throw new Error('Bạn đã đặt trước cuốn sách này và đang trong hàng đợi rồi.');
        }

=======
        // KIỂM TRA 1: Đã đặt và đang chờ/đã có sách chưa?
        const [daDat] = await db.query(
            'SELECT id FROM DatTruoc WHERE nguoiDungId = ? AND maDauSach = ? AND trangThai IN ("CHO", "DA_CO_SACH")',
            [nguoiDungId, maDauSach]
        );
        if (daDat.length > 0) {
            throw new Error('Bạn đã đặt cuốn sách này và đang chờ lấy sách rồi.');
        }

        // KIỂM TRA 2: Đang mượn cuốn này chưa?
        const [dangMuon] = await db.query(`
            SELECT pm.id 
            FROM PhieuMuon pm
            JOIN BanSaoSach bs ON pm.maVach = bs.maVach
            WHERE pm.nguoiDungId = ? AND bs.maDauSach = ? AND pm.trangThai = 'DANG_MUON'
        `, [nguoiDungId, maDauSach]);
        
        if (dangMuon.length > 0) {
            throw new Error('Bạn đang mượn cuốn sách này rồi! Hãy trả sách trước khi muốn mượn/đặt lại.');
        }

        // Tiến hành tạo đặt trước
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a
        const sql = `INSERT INTO DatTruoc (nguoiDungId, maDauSach, trangThai) VALUES (?, ?, 'CHO')`;
        const [result] = await db.query(sql, [nguoiDungId, maDauSach]);
        return result.insertId;
    }
<<<<<<< HEAD
// 2. DÀNH CHO THỦ THƯ: Cập nhật trạng thái (Hệ thống TỰ ĐỘNG lấy 1 cuốn để giữ chỗ)
=======

    // 2. DÀNH CHO THỦ THƯ: Cập nhật trạng thái
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a
    static async capNhatTrangThai(datTruocId, trangThaiMoi) {
        const [thongTinDat] = await db.query('SELECT maDauSach FROM DatTruoc WHERE id = ?', [datTruocId]);
        if (thongTinDat.length === 0) throw new Error('Không tìm thấy phiếu đặt trước này.');
        
        const maDauSach = thongTinDat[0].maDauSach;
        let maVachDuocChon = null;

        if (trangThaiMoi === 'DA_CO_SACH') {
<<<<<<< HEAD

=======
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a
            const [banSaoRanh] = await db.query(
                'SELECT maVach FROM BanSaoSach WHERE maDauSach = ? AND trangThai = "CO_SAN" LIMIT 1', 
                [maDauSach]
            );
            
            if (banSaoRanh.length === 0) {
                throw new Error('Không thể Báo có sách! Hiện tại không có bản sao nào đang rảnh trong kho.');
            }

            maVachDuocChon = banSaoRanh[0].maVach;

<<<<<<< HEAD
            await db.query('UPDATE BanSaoSach SET trangThai = "DANG_GIU_CHO" WHERE maVach = ?', [maVachDuocChon]);
        }

        const sql = 'UPDATE DatTruoc SET trangThai = ? WHERE id = ?';
        await db.query(sql, [trangThaiMoi, datTruocId]);
=======
            // Đổi trạng thái bản sao thành Đang giữ chỗ
            await db.query('UPDATE BanSaoSach SET trangThai = "DANG_GIU_CHO" WHERE maVach = ?', [maVachDuocChon]);
            
            // LƯU CẢ TRẠNG THÁI VÀ MÃ VẠCH VÀO PHIẾU ĐẶT TRƯỚC
            await db.query('UPDATE DatTruoc SET trangThai = ?, maVach = ? WHERE id = ?', [trangThaiMoi, maVachDuocChon, datTruocId]);
        } else {
            // Nếu là Hủy thì chỉ cập nhật trạng thái (và có thể phải nhả mã vạch ra nếu trước đó đã duyệt, phần này có thể bổ sung sau nếu cần)
            await db.query('UPDATE DatTruoc SET trangThai = ? WHERE id = ?', [trangThaiMoi, datTruocId]);
        }
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a
        
        return maVachDuocChon; 
    }
    static async getAll() {
        const sql = `
            SELECT dt.id, dt.ngayDat, dt.trangThai, nd.hoTen, ds.tenSach,
                   (SELECT COUNT(*) FROM BanSaoSach bs WHERE bs.maDauSach = dt.maDauSach AND bs.trangThai = 'CO_SAN') AS soLuongCoSan
            FROM DatTruoc dt
            JOIN NguoiDung nd ON dt.nguoiDungId = nd.id
            JOIN DauSach ds ON dt.maDauSach = ds.maDauSach
            ORDER BY dt.ngayDat DESC
        `;
        const [rows] = await db.query(sql);
        return rows;
    }

    static async getLichSuCaNhan(nguoiDungId) {
        const sql = `
<<<<<<< HEAD
            SELECT dt.id, dt.ngayDat, dt.trangThai, ds.tenSach
=======
            SELECT dt.id, dt.ngayDat, dt.trangThai, dt.maVach, ds.tenSach
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a
            FROM DatTruoc dt
            JOIN DauSach ds ON dt.maDauSach = ds.maDauSach
            WHERE dt.nguoiDungId = ?
            ORDER BY dt.ngayDat DESC
        `;
        const [rows] = await db.query(sql, [nguoiDungId]);
        return rows;
    }
}

module.exports = DatTruocModel;