document.addEventListener('DOMContentLoaded', () => {
    hienThiLoiChao();
    taiDanhSachSach();
    hienThiThongTinTaiKhoan();
});

// Hàm hiển thị tên người dùng ở Hero Banner
function hienThiLoiChao() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            const greetingElement = document.getElementById("hero-greeting");
            if (greetingElement && user.hoTen) {
                greetingElement.textContent = `Chào mừng bạn trở lại, ${user.hoTen}!`;
            }
        } catch (error) {
            console.error("Lỗi đọc thông tin user:", error);
        }
    }
}

// Hàm hiển thị tên và avatar ở góc dưới trái (Sidebar)
function hienThiThongTinTaiKhoan() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        const hoTen = user.hoTen || user.ten || 'Độc giả';
        const sidebarName = document.getElementById('sidebar-name');
        const sidebarAvatar = document.getElementById('sidebar-avatar');
        
        if (sidebarName) sidebarName.textContent = hoTen;
        if (sidebarAvatar) sidebarAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(hoTen)}&background=random`;
    }
}

// Hàm lấy và hiển thị danh sách sách từ Backend
// Hàm lấy và hiển thị danh sách sách từ Backend
async function taiDanhSachSach() {
    const bookListContainer = document.getElementById("bookList");
    if (!bookListContainer) return;

    try {
        bookListContainer.innerHTML = "<p style='width:100%; text-align:center;'>Đang tải danh sách sách...</p>";

        const danhSach = await apiFetch("/api/dausach");
        
        bookListContainer.innerHTML = "";

        if (!danhSach || danhSach.length === 0) {
            bookListContainer.innerHTML = "<p style='width:100%; text-align:center;'>Hiện chưa có sách nào trong thư viện.</p>";
            return;
        }

        danhSach.forEach(sach => {
            const hinhAnh = sach.hinhAnh || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop&q=60";
            const tacGia = sach.tacGia || "Đang cập nhật";

            // LOGIC LẤY SỐ LƯỢNG: 
            // Ép kiểu về số nguyên. Nếu soLuongCoSan bị undefined (do backend chưa cập nhật kịp), dùng tạm tongSoLuong
            const soLuong = parseInt(sach.soLuongCoSan) || 0;
            
            let nutBamHTML = "";

            if (soLuong > 0) {
                // Sách CÓ SẴN -> Nút màu xanh dương nhạt, gọi hàm thông báo đến thư viện
                nutBamHTML = `<button onclick="thongBaoDenThuVien('${sach.tenSach}')" style="background-color: #e0f2fe; color: #0284c7; border: none; padding: 10px 16px; border-radius: 8px; font-weight: 600; cursor: pointer; width: 100%; font-size: 14px; transition: 0.2s;">Có sẵn</button>`;
            } else {
                // Sách ĐÃ HẾT -> Nút màu vàng cam, gọi hàm xử lý Đặt trước
                nutBamHTML = `<button onclick="xuLyDatTruoc('${sach.maDauSach}', '${sach.tenSach}')" style="background-color: #fef3c7; color: #d97706; border: none; padding: 10px 16px; border-radius: 8px; font-weight: 600; cursor: pointer; width: 100%; font-size: 14px; transition: 0.2s;">Đặt trước</button>`;
            }

            const card = document.createElement("div");
            card.className = "book-card";
            card.style.cssText = "background: white; border-radius: 16px; padding: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); display: flex; flex-direction: column; transition: transform 0.2s; cursor: pointer;";
            
            card.innerHTML = `
                <div style="height: 180px; overflow: hidden; border-radius: 8px; margin-bottom: 12px;">
                    <img src="${hinhAnh}" alt="${sach.tenSach}" style="width: 100%; height: 100%; object-fit: cover;">
                </div>
                <h3 style="font-size: 16px; font-weight: 700; color: #1e293b; margin: 0 0 4px 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${sach.tenSach}</h3>
                <p style="font-size: 14px; color: #64748b; margin: 0 0 16px 0;">${tacGia}</p>
                
                <div style="margin-top: auto;">
                    ${nutBamHTML}
                </div>
            `;
            
            card.onmouseover = () => card.style.transform = "translateY(-4px)";
            card.onmouseout = () => card.style.transform = "translateY(0)";

            bookListContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Lỗi tải sách:", error);
        bookListContainer.innerHTML = '<p style="color: red; width: 100%; text-align: center;">Không thể tải danh sách sách lúc này.</p>';
    }
}

// THÊM HÀM NÀY VÀO DƯỚI CÙNG FILE HOME.JS:
// Hàm hiển thị thông báo khi bấm vào nút Có sẵn
function thongBaoDenThuVien(tenSach) {
    alert(`Cuốn "${tenSach}" hiện đang có sẵn trên kệ!\n\nVui lòng mang theo Thẻ Độc Giả đến quầy thủ thư để mượn sách trực tiếp nhé.`);
}

// Xử lý nút Đặt trước
async function xuLyDatTruoc(maDauSach, tenSach) {
    const xacNhan = confirm(`Bạn có muốn yêu cầu đặt trước cuốn "${tenSach}" không?`);
    if (!xacNhan) return;

    try {
        const result = await apiFetch('/api/dattruoc', {
            method: 'POST',
            body: JSON.stringify({ maDauSach: maDauSach })
        });

        alert("🎉 Đặt trước thành công! Hệ thống đã ghi nhận yêu cầu của bạn.");
        taiDanhSachSach(); // Tải lại để cập nhật số lượng

    } catch (error) {
        alert("Không thể đặt trước: " + error.message);
    }
}

// Hàm xử lý đăng xuất
function dangXuat() {
    if (confirm("Bạn có chắc chắn muốn thoát khỏi hệ thống?")) {
        localStorage.removeItem('user');
        localStorage.removeItem('vaiTro');
        window.location.href = 'login.html';
    }
}