const userModel = require("../models/user.model");
exports.getUsers = async (req, res) => {
    try{
        const result = await userModel.getAllUsers();
        res.json(result);
    } catch(err){   
      res.status(500).json({message:"Lỗi server"});
    }
};
exports.updateStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { trangThai } = req.body;
        await userModel.updateStatus(id, trangThai);
        res.json({ message: "Cập nhật trạng thái thành công!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server khi cập nhật trạng thái" });
    }
};
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