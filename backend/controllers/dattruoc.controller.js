const DatTruocModel = require('../models/dattruoc.model');

exports.datTruocSach = async (req, res) => {
    const { maDauSach } = req.body;
<<<<<<< HEAD
    const nguoiDungId = req.user.id; // Lấy từ token đăng nhập
=======
    const nguoiDungId = req.session.user.id; // Dùng session nên phải thêm session, thông thường dùng jwt thì k cần
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a

    try {
        if (!maDauSach) {
            return res.status(400).json({ message: 'Vui lòng cung cấp mã đầu sách cần đặt.' });
        }

        const datTruocId = await DatTruocModel.taoDatTruoc(nguoiDungId, maDauSach);
        res.status(201).json({ 
            message: 'Đặt trước sách thành công. Thư viện sẽ thông báo khi có sách!',
            datTruocId: datTruocId
        });
    } catch (error) {
<<<<<<< HEAD
        if (error.message.includes('không tồn tại') || error.message.includes('đang trong hàng đợi')) {
=======
        // Thêm chuỗi 'đang mượn' vào điều kiện bắt lỗi 400
        if (error.message.includes('không tồn tại') || 
            error.message.includes('đang chờ') || 
            error.message.includes('đang mượn')) {
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a
            return res.status(400).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: 'Lỗi server khi đặt trước sách.' });
    }
};

exports.capNhatDatTruoc = async (req, res) => {
    const datTruocId = req.params.id;
    const { trangThai } = req.body; 

    try {
        if (!['DA_CO_SACH', 'HUY'].includes(trangThai)) {
            return res.status(400).json({ message: 'Trạng thái không hợp lệ.' });
        }
        const maVach = await DatTruocModel.capNhatTrangThai(datTruocId, trangThai);
        
        res.status(200).json({ 
            message: 'Cập nhật trạng thái thành công.',
            maVach: maVach
        });
    } catch (error) {
        if (error.message.includes('Không thể Báo có sách') || error.message.includes('Không tìm thấy')) {
            return res.status(400).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: 'Lỗi server khi cập nhật đặt trước.' });
    }
};

exports.getAllDatTruoc = async (req, res) => {
    try {
        const danhSach = await DatTruocModel.getAll();
        res.status(200).json(danhSach);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server khi lấy danh sách đặt trước.' });
    }
};

exports.layLichSuCaNhan = async (req, res) => {
    try {
<<<<<<< HEAD
        const nguoiDungId = req.user.id;
=======
        const nguoiDungId = req.session.user.id;
>>>>>>> 92ef0a0620a1cb62b89e1c08ec9842dca647ba7a
        const lichSu = await DatTruocModel.getLichSuCaNhan(nguoiDungId);
        res.status(200).json(lichSu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi server khi lấy lịch sử đặt trước.' });
    }
};