// Hàm hiển thị tên người dùng
function hienThiLoiChao() {
    // Lấy chuỗi thông tin user từ localStorage (đã lưu ở bước Đăng nhập)
    const userStr = localStorage.getItem("user");
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            const greetingElement = document.getElementById("hero-greeting");
            
            // Lấy cột hoTen từ database
            if (greetingElement && user.hoTen) {
                greetingElement.textContent = `Chào mừng bạn trở lại, ${user.hoTen}!`;
            }
        } catch (error) {
            console.error("Lỗi đọc thông tin user:", error);
        }
    }
}

// Hàm lấy và hiển thị danh sách sách từ Backend
async function taiDanhSachSach() {
    const bookListContainer = document.getElementById("bookList");
    if (!bookListContainer) return;

    try {
        // Hiển thị chữ đang tải trong lúc chờ đợi
        bookListContainer.innerHTML = "<p>Đang tải danh sách sách...</p>";

        // Gọi API lấy toàn bộ Đầu sách (Giả sử route của bạn là /api/dausach)
        // Nhớ dùng apiFetch từ file api.js nhé
        const danhSach = await apiFetch("/api/dausach");
        
        // Xóa chữ đang tải
        bookListContainer.innerHTML = "";

        if (!danhSach || danhSach.length === 0) {
            bookListContainer.innerHTML = "<p>Hiện chưa có sách nào trong thư viện.</p>";
            return;
        }

        // Lặp qua từng quyển sách và tạo HTML
        danhSach.forEach(sach => {
            const hinhAnh = sach.hinhAnh || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop&q=60";
            const tacGia = sach.tacGia || "Đang cập nhật";

            // Kiểm tra số lượng sách (Bạn có thể đổi tên biến nếu Backend trả về tên khác)
            const soLuong = sach.tongSoLuong || 0; 
            
            // Xây dựng giao diện cho nút bấm dựa trên số lượng
            let nutBamHTML = "";
            if (soLuong > 0) {
                // Nếu còn sách
                nutBamHTML = `<button class="borrow-btn" onclick="xuLyDatTruoc('${sach.maDauSach}')">Có sẵn</button>`;
            } else {
                // Nếu hết sách (thêm class 'reserve-btn' để lát nữa đổi màu)
                nutBamHTML = `<button class="borrow-btn reserve-btn" onclick="xuLyDatTruoc('${sach.maDauSach}')">Đặt trước</button>`;
            }

            // Tạo thẻ div cho quyển sách
            const card = document.createElement("div");
            card.className = "book-card";
            
            card.innerHTML = `
                <img src="${hinhAnh}" alt="${sach.tenSach}">
                <h3>${sach.tenSach}</h3>
                <p>${tacGia}</p>
                ${nutBamHTML}
            `;
            
            // Thêm quyển sách vào "thùng chứa"
            bookListContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Lỗi tải sách:", error);
        bookListContainer.innerHTML = '<p style="color: red;">Không thể tải danh sách sách lúc này.</p>';
    }
}

// Hàm tạm thời để chuyển hướng khi bấm xem chi tiết sách
function xemChiTiet(maDauSach) {
    // Sau này chúng ta sẽ tạo trang chi tiết sách và truyền mã sách lên URL
    console.log("Mã sách vừa chọn:", maDauSach);
    alert(`Bạn vừa chọn mượn sách có mã: ${maDauSach}`);
    // window.location.href = `book-detail.html?id=${maDauSach}`;
}

// Chạy 2 hàm trên ngay khi trang web vừa load xong
document.addEventListener("DOMContentLoaded", () => {
    hienThiLoiChao();
    taiDanhSachSach();
});

// Hàm xử lý khi người dùng click vào nút Có sẵn / Đặt trước
async function xuLyDatTruoc(maDauSach) {
    // 1. Hỏi xác nhận để tránh click nhầm
    const xacNhan = confirm("Bạn có muốn đặt trước tựa sách này không?");
    if (!xacNhan) return;

    try {
        // 2. Gọi API đặt trước sách
        const result = await apiFetch('/api/dattruoc', {
            method: 'POST',
            body: JSON.stringify({
                maDauSach: maDauSach
            })
        });

        // 3. Thông báo thành công
        alert(result.message || "Đặt trước thành công! Hệ thống đã ghi nhận yêu cầu của bạn.");
        
        // 4. (Tùy chọn) Gọi lại hàm tải danh sách để cập nhật lại số lượng sách mới nhất
        taiDanhSachSach();

    } catch (error) {
        // Nếu lỗi (ví dụ: đã đặt cuốn này rồi, hoặc tài khoản bị khóa...)
        console.error("Lỗi đặt trước:", error);
        alert("Không thể đặt trước: " + error.message);
    }
}