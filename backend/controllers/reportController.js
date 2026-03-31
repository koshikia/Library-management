const db = require('../config/db');

exports.getDashboardStats = async (req, res) => {
    try {
        // 1. Chạy song song 4 truy vấn đếm số liệu tổng quan để tối ưu hiệu năng
        const [
            [[{ tongDauSach }]],
            [[{ tongDocGia }]],
            [[{ dangChoMuon }]],
            [[{ tongDoanhThu }]]
        ] = await Promise.all([
            db.query("SELECT COUNT(*) AS tongDauSach FROM DauSach"),
            db.query("SELECT COUNT(*) AS tongDocGia FROM NguoiDung WHERE vaiTro = 'DOCGIA'"),
            db.query("SELECT COUNT(*) AS dangChoMuon FROM PhieuMuon WHERE trangThai = 'DANG_MUON'"),
            db.query("SELECT SUM(tongTien) AS tongDoanhThu FROM PhieuPhat WHERE trangThai = 'DA_THANH_TOAN'")
        ]);

        // 2. Lấy danh sách lịch sử nộp phạt (Sắp xếp mới nhất lên đầu)
        const [lichSuPhat] = await db.query(`
            SELECT 
                pp.id AS maPhieuPhat,
                nd.hoTen AS tenDocGia,
                ds.tenSach,
                pp.soNgayTre,
                pp.tongTien,
                pp.ngayThanhToan
            FROM PhieuPhat pp
            JOIN PhieuMuon pm ON pp.phieuMuonId = pm.id
            JOIN NguoiDung nd ON pm.nguoiDungId = nd.id
            JOIN BanSaoSach bs ON pm.maVach = bs.maVach
            JOIN DauSach ds ON bs.maDauSach = ds.maDauSach
            WHERE pp.trangThai = 'DA_THANH_TOAN'
            ORDER BY pp.ngayThanhToan DESC
        `);

        // 3. Đóng gói toàn bộ dữ liệu trả về cho Frontend
        res.status(200).json({
            tongDauSach: tongDauSach || 0,
            tongDocGia: tongDocGia || 0,
            dangChoMuon: dangChoMuon || 0,
            tongDoanhThu: tongDoanhThu || 0,
            lichSuPhat: lichSuPhat
        });

    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy dữ liệu thống kê: " + error.message });
    }
};