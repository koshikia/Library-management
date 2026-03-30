const db = require('../config/db');

class DatTruocModel {
    static async taoDatTruoc(nguoiDungId, maDauSach) {
        const [sach] = await db.query('SELECT maDauSach FROM DauSach WHERE maDauSach = ?', [maDauSach]);
        if (sach.length === 0) {
            throw new Error('Đầu sách không tồn tại.');
        }

        const [daDat] = await db.query(
            'SELECT id FROM DatTruoc WHERE nguoiDungId = ? AND maDauSach = ? AND trangThai IN ("CHO", "DA_CO_SACH")',
            [nguoiDungId, maDauSach]
        );
        if (daDat.length > 0) {
            throw new Error('Bạn đã đặt cuốn sách này và đang chờ lấy sách rồi.');
        }
        const [dangMuon] = await db.query(`
            SELECT pm.id 
            FROM PhieuMuon pm
            JOIN BanSaoSach bs ON pm.maVach = bs.maVach
            WHERE pm.nguoiDungId = ? AND bs.maDauSach = ? AND pm.trangThai = 'DANG_MUON'
        `, [nguoiDungId, maDauSach]);
        
        if (dangMuon.length > 0) {
            throw new Error('Bạn đang mượn cuốn sách này rồi! Hãy trả sách trước khi muốn mượn/đặt lại.');
        }
        const sql = `INSERT INTO DatTruoc (nguoiDungId, maDauSach, trangThai) VALUES (?, ?, 'CHO')`;
        const [result] = await db.query(sql, [nguoiDungId, maDauSach]);
        return result.insertId;
    }

    static async capNhatTrangThai(datTruocId, trangThaiMoi) {
        const conn = await db.getConnection(); 
        try {
            await conn.beginTransaction();
            const [[thongTinDat]] = await conn.query(
                'SELECT maDauSach, trangThai FROM DatTruoc WHERE id = ? FOR UPDATE', 
                [datTruocId]
            );
            
            if (!thongTinDat) throw new Error('Không tìm thấy phiếu đặt trước này.');
            if (thongTinDat.trangThai !== 'CHO') throw new Error('Phiếu này không ở trạng thái CHỜ để duyệt.');
            
            const maDauSach = thongTinDat.maDauSach;
            let maVachDuocChon = null;

            if (trangThaiMoi === 'DA_CO_SACH') {
                const [banSaoRanh] = await conn.query(
                    'SELECT maVach FROM BanSaoSach WHERE maDauSach = ? AND trangThai = "CO_SAN" LIMIT 1 FOR UPDATE', 
                    [maDauSach]
                );
                
                if (banSaoRanh.length === 0) {
                    throw new Error('Không thể Báo có sách! Hiện tại không có bản sao nào đang rảnh trong kho.');
                }

                maVachDuocChon = banSaoRanh[0].maVach;
                await conn.query('UPDATE BanSaoSach SET trangThai = "DANG_GIU_CHO" WHERE maVach = ?', [maVachDuocChon]);
                
                await conn.query('UPDATE DatTruoc SET trangThai = ?, maVach = ? WHERE id = ?', [trangThaiMoi, maVachDuocChon, datTruocId]);
            } else {
                await conn.query('UPDATE DatTruoc SET trangThai = ? WHERE id = ?', [trangThaiMoi, datTruocId]);
            }
            
            await conn.commit();
            return maVachDuocChon; 
            
        } catch (error) {
            await conn.rollback();
            throw error; 
        } finally {
            conn.release();
        }
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
            SELECT dt.id, dt.ngayDat, dt.trangThai, dt.maVach, ds.tenSach
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