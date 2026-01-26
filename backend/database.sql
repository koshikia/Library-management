CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

CREATE TABLE YeuCauDatTruoc (
    maYeuCau NVARCHAR(50) PRIMARY KEY,
    maDocGia NVARCHAR(50) NOT NULL, 
    maDauSach NVARCHAR(50) NOT NULL,
    ngayDat DATETIME DEFAULT CURRENT_TIMESTAMP, 
    ngayHetHanCho DATE,
    trangThai ENUM('DangCho', 'DaDuyet', 'DaHuy') DEFAULT 'DangCho', 
    
    FOREIGN KEY (maDocGia) REFERENCES DocGia(maNguoiDung),
    FOREIGN KEY (maDauSach) REFERENCES DauSach(maDauSach)
);

CREATE TABLE PhieuMuon (
    maPhieu NVARCHAR(50) PRIMARY KEY,
    maDocGia NVARCHAR(50) NOT NULL,
    maThuThu NVARCHAR(50) NOT NULL,
    ngayMuon DATE DEFAULT (CURRENT_DATE), 
    hanTra DATE NOT NULL,
    ngayTraThucTe DATE,
    trangThai ENUM('DangMuon', 'DaTra', 'QuaHan') DEFAULT 'DangMuon',
    
    FOREIGN KEY (maDocGia) REFERENCES DocGia(maNguoiDung),
    FOREIGN KEY (maThuThu) REFERENCES ThuThu(maNguoiDung)
);
CREATE TABLE ChiTietPhieuMuon (
    maPhieu NVARCHAR(50),
    maVach NVARCHAR(50),
    tinhTrangKhiMuon NVARCHAR(100),
    tinhTrangKhiTra NVARCHAR(100),
    PRIMARY KEY (maPhieu, maVach), -- Khóa chính phức hợp
    FOREIGN KEY (maPhieu) REFERENCES PhieuMuon(maPhieu),
    FOREIGN KEY (maVach) REFERENCES BanSaoSach(maVach)
);
