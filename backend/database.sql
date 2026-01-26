        CREATE DATABASE IF NOT EXISTS library_db;
    USE library_db;

    CREATE TABLE IF NOT EXISTS Book (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        author VARCHAR(255),
        year INT
    );
    CREATE TABLE IF NOT EXISTS ThuThu(
        maNhanVien VARCHAR(20) AUTO_INCREMENT PRIMARY KEY,
        caLamViec VARCHAR(255),

        CONSTRAINT fk_ThuThu_NguoiDung
             FOREIGN KEY (maNhanVien)
             REFERENCES NguoiDung(maNguoiDung)
             ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS DocGia(
        maTheThuVien VARCHAR(20) AUTO_INCREMENT PRIMARY KEY,
        ngayHetHanThe DATE NOT NULL,
        soSachDangMuon INT default 0 check (soSachDangMuon >=0),
        tongNoPhat FLOAT default 0 chekc (tongNoPhat >=0) ,
        CONSTRAINT fk_DocGia_NguoiDung      
           FOREIGN KEY (maTheThuVien)       
           REFERENCES NguoiDung(maNguoiDung)    
           ON DELETE CASCADE 
    );
   
