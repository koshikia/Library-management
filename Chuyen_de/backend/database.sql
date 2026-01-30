CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

CREATE TABLE IF NOT EXISTS book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    year INT
);

CREATE TABLE IF NOT EXISTS NguoiDung (
    maNguoiDung INT AUTO_INCREMENT PRIMARY KEY,
    hoTen VARCHAR(255),
    email VARCHAR(255),
    soDienThoai VARCHAR(255),
    diaChi VARCHAR(255),
    tenDangNhap VARCHAR(255),
    matKhau VARCHAR(255),
    trangThai ENUM('Độc giả', 'Thủ thư', 'Quản trị viên') 
        NOT NULL DEFAULT 'Độc giả',
);
CREATE TABLE IF NOT EXISTS QuanTriVien (
    maNguoiDung INT PRIMARY KEY,

    CONSTRAINT fk_qtv_nguoidung
    FOREIGN KEY (maNguoiDung)
    REFERENCES NguoiDung(maNguoiDung)
    ON DELETE CASCADE
);

INSERT INTO NguoiDung (
    hoTen, tenDangNhap, matKhau, trangThai
) VALUES (
    'Admin', 'admin', '123456', 'Quản trị viên'
);

INSERT INTO QuanTriVien (maNguoiDung)
VALUES (LAST_INSERT_ID());