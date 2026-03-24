// Hàm kiểm tra xem user đã đăng nhập chưa khi vừa load trang
async function checkAuthStatus() {
    try {
        const userData = await apiFetch('/api/me');
        
        // Nếu thành công (có session), cập nhật giao diện
        // Ví dụ: Ẩn nút đăng nhập, hiện tên user và nút đăng xuất
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('user-info').innerText = `Xin chào, ${userData.hoTen} (${userData.vaiTro})`;
        document.getElementById('logout-btn').style.display = 'block';

        // Bạn có thể lưu vaiTro vào localStorage tạm để ẩn/hiện menu Admin/Thủ thư ở Frontend
        localStorage.setItem('userRole', userData.vaiTro);

    } catch (error) {
        // Nếu lỗi (chưa đăng nhập hoặc session hết hạn)
        console.log('Chưa đăng nhập - Khách truy cập');
        document.getElementById('logout-btn').style.display = 'none';
        localStorage.removeItem('userRole');
    }
}

// Chạy hàm này mỗi khi load trang
document.addEventListener('DOMContentLoaded', checkAuthStatus);
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            await apiFetch('/api/logout', { method: 'POST' });
            alert('Đã đăng xuất!');
            window.location.href = '/login.html';
        } catch (error) {
            alert('Lỗi đăng xuất: ' + error.message);
        }
    });
}