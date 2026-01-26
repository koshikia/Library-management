CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

CREATE TABLE IF NOT EXISTS book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    year INT
);

CREATE TABLE IF NOT EXISTS DauSach (
    maDauSach VARCHAR(20) PRIMARY KEY,
    tenSach NVARCHAR(255) NOT NULL,
    tacGia NVARCHAR(255),
    theLoai NVARCHAR(100),
    nhaXuatBan NVARCHAR(255),
    namXuatBan INT,
    moTa TEXT,
    soLuongDangCo INT
);
CREATE TABLE IF NOT EXISTS BanSaoSach (
    maVach VARCHAR(50) PRIMARY KEY,
    maDauSach VARCHAR(20),
    trangThai ENUM('Có Sẵn', 'Đang Mượn', 'Hỏng', 'Mất') DEFAULT 'Có Sẵn',
    FOREIGN KEY (maDauSach) REFERENCES DauSach(maDauSach)
);
