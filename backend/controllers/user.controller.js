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


// thêm user
exports.addUser = (req,res)=>{

const data = {

hoTen:req.body.hoTen,
email:req.body.email,
matKhau:req.body.matKhau,
vaiTro:req.body.vaiTro

};

userModel.addUser(data,(err)=>{

if(err) return res.status(500).json({message:"Lỗi thêm user"});

res.json({message:"Thêm thành công"});

});

};


// sửa user
exports.updateUser = (req, res) => {

const id = req.params.id;

const {
hoTen,
email,
vaiTro
} = req.body;

const sql = `
UPDATE NguoiDung SET
hoTen=?,
email=?,
vaiTro=?
WHERE id=?`;

db.query(sql,[
hoTen,
email,
vaiTro,
id
],(err,result)=>{

if(err){
console.log(err);
return res.status(500).json({message:"Lỗi cập nhật"});
}

if(result.affectedRows === 0){
return res.status(404).json({message:"Không tìm thấy user"});
}

res.json({message:"Cập nhật thành công"});

});

};


// xóa user
exports.deleteUser = (req,res)=>{

const id = req.params.id;

userModel.deleteUser(id,(err)=>{

if(err) return res.status(500).json({message:"Lỗi xóa user"});

res.json({message:"Đã xóa"});

});

};