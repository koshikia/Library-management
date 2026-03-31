const userModel = require("../models/user.model");
const db = require("../config/db");

// lấy danh sách user
exports.getUsers = async (req, res) => {

try{

const result = await userModel.getAllUsers();

res.json(result);

}catch(err){

res.status(500).json({message:"Lỗi server"});

}

};

// 2. Cập nhật trạng thái (Khóa / Mở khóa)
exports.updateStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { trangThai } = req.body; // 'HOAT_DONG' hoặc 'BI_KHOA'
        
        await userModel.updateStatus(id, trangThai);
        res.json({ message: "Cập nhật trạng thái thành công!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server khi cập nhật trạng thái" });
    }
};

// 3. Xóa user
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await userModel.deleteUser(id);
        res.json({ message: "Đã xóa user thành công" });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Không thể xóa người dùng này vì họ đang có dữ liệu trong hệ thống!" });
    }
};

// 4. Thêm user
exports.addUser = async (req, res) => {
    try {
        const data = {
            hoTen: req.body.hoTen,
            email: req.body.email,
            matKhau: req.body.matKhau,
            vaiTro: req.body.vaiTro
        };
        await userModel.addUser(data);
        res.json({ message: "Thêm thành công" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi thêm user" });
    }
};

// 5. Cập nhật thông tin user
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = {
            hoTen: req.body.hoTen,
            email: req.body.email,
            vaiTro: req.body.vaiTro
        };
        
        await userModel.updateUser(id, data);
        res.json({ message: "Cập nhật thành công" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi cập nhật" });
    }
};