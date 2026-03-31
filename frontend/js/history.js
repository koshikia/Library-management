


document.addEventListener('DOMContentLoaded', () => {
    // Gọi hàm lấy lịch sử mượn ngay khi trang vừa tải xong
    taiLichSuMuon();
});

async function taiLichSuMuon() {
    // Tìm đến cái tbody của bảng Lịch sử trong history.html
    const tbody = document.querySelector('.history-table tbody');
    if (!tbody) return;

    try {
        // Hiển thị trạng thái đang tải
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">Đang tải lịch sử mượn...</td></tr>';
        
        // Gọi API lấy phiếu mượn của CHÍNH MÌNH (Đã login)
        const data = await apiFetch('/api/phieumuon/my');
        const danhSach = Array.isArray(data) ? data : (data.data || []);

        // Xóa dòng "Đang tải" đi
        tbody.innerHTML = '';
        
        if (danhSach.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px; color: #666;">Bạn chưa mượn cuốn sách nào từ thư viện.</td></tr>';
            return;
        }

        // Lặp qua từng phiếu mượn và in ra bảng
        danhSach.forEach(item => {
            // Xử lý ngày tháng cho đẹp (Ngày, Tháng, Năm)
            const ngayMuon = new Date(item.ngayMuon).toLocaleDateString('vi-VN');
            
            // Nếu đã trả thì hiện ngày trả (hoặc chữ Đã trả), chưa trả thì hiện Hạn trả
            let thoiGianTra = '';
            if (item.trangThai === 'DA_TRA') {
                thoiGianTra = item.ngayTra ? new Date(item.ngayTra).toLocaleDateString('vi-VN') : 'Đã trả';
            } else {
                thoiGianTra = item.hanTra ? `Hạn: ${new Date(item.hanTra).toLocaleDateString('vi-VN')}` : 'Đang mượn...';
            }

            // Xử lý trạng thái để gắn class CSS tương ứng của bạn (status-success, status-danger...)
            let badgeClass = 'status-primary'; // Mặc định màu xanh dương: Đang mượn
            let textTrangThai = 'Đang mượn';
            
            if (item.trangThai === 'DA_TRA') {
                badgeClass = 'status-success'; // Màu xanh lá: Đã trả
                textTrangThai = 'Đã trả';
            } else if (item.trangThai === 'QUA_HAN' || item.trangThai === 'QUAHAN') {
                badgeClass = 'status-danger'; // Màu đỏ: Quá hạn
                textTrangThai = 'Quá hạn';
            }

            // Dữ liệu sách (Nếu Backend không trả về ảnh, dùng ảnh mặc định)
            const tenSach = item.tenSach || 'Sách không xác định';
            const tacGia = item.tacGia || 'Đang cập nhật';
            const hinhAnh = item.hinhAnh || 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=200&auto=format&fit=crop&q=60';

            // Tạo thẻ <tr> mới và nhét dữ liệu vào
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="book-info">
                        <img src="${hinhAnh}" alt="${tenSach}" style="width: 45px; height: 65px; object-fit: cover; border-radius: 4px; margin-right: 12px;">
                        <div>
                            <strong style="font-size: 15px;">${tenSach}</strong>
                            <p style="font-size: 13px; color: #666; margin: 3px 0 0 0;">${tacGia}</p>
                        </div>
                    </div>
                </td>
                <td>${ngayMuon}</td>
                <td style="${item.trangThai === 'QUA_HAN' ? 'color: #dc3545; font-weight: bold;' : ''}">${thoiGianTra}</td>
                <td><span class="status ${badgeClass}">${textTrangThai}</span></td>
                <td class="action-cell">
                    <button style="background: transparent; border: 1px solid #ddd; border-radius: 4px; padding: 4px 8px; cursor: pointer;">Chi tiết</button>
                </td>
            `;
            
            // Gắn vào bảng
            tbody.appendChild(tr);
        });

    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="5" style="color:red; text-align:center; padding: 20px;">Lỗi tải dữ liệu: ${error.message}</td></tr>`;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    taiLichSuMuon();
    hienThiThongTinTaiKhoan();
});

// Hàm hiển thị thông tin Sidebar (Mượn từ home.js)
function hienThiThongTinTaiKhoan() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        const hoTen = user.hoTen || user.ten || 'Độc giả';
        
        const headerName = document.getElementById('header-name');
        const headerAvatar = document.getElementById('header-avatar');
        
        if (headerName) headerName.textContent = hoTen;
        if (headerAvatar) headerAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(hoTen)}&background=random`;
    }
}

// 1. Tải danh sách Lịch sử mượn
async function taiLichSuMuon() {
    const tbody = document.querySelector('.history-table tbody');
    if (!tbody) return;

    try {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">Đang tải dữ liệu...</td></tr>';
        
        // GỌI API: Tùy thuộc vào route của nhóm bạn (Ví dụ: /api/phieumuon/my hoặc /api/phieumuon/lichsu)
        // Bạn nhớ sửa lại đường dẫn này cho đúng với Backend của bạn nhé!
        const data = await apiFetch('/api/phieumuon/my'); 
        const danhSach = Array.isArray(data) ? data : (data.data || []);

        tbody.innerHTML = '';
        
        if (danhSach.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px; color: #666;">Bạn chưa mượn cuốn sách nào.</td></tr>';
            return;
        }

        danhSach.forEach(item => {
            const ngayMuon = new Date(item.ngayMuon).toLocaleDateString('vi-VN');
            const hanTra = new Date(item.hanTra).toLocaleDateString('vi-VN');
            // Nếu chưa trả thì hiện hạn trả, nếu trả rồi thì hiện ngày trả thực tế
            const hienThiNgayTra = item.ngayTraThucTe ? new Date(item.ngayTraThucTe).toLocaleDateString('vi-VN') : `<span style="color:#d97706">Hạn: ${hanTra}</span>`;

            let badgeClass = '';
            let textTrangThai = '';
            let nutHanhDong = '⋯'; // Mặc định không có nút gì

            // Xử lý trạng thái và nút Gia hạn
            if (item.trangThai === 'DANG_MUON') {
                badgeClass = 'status-primary'; // Xanh dương (dùng class CSS hiện có của bạn)
                textTrangThai = 'Đang mượn';
                // Chỉ hiện nút gia hạn khi đang mượn
                nutHanhDong = `<button onclick="moModalGiaHan(${item.id})" style="padding: 6px 12px; background-color: #e0f2fe; color: #0284c7; border: 1px solid #bae6fd; border-radius: 4px; font-size: 13px; font-weight: 500; cursor: pointer;">Gia hạn</button>`;
            } else if (item.trangThai === 'DA_TRA') {
                badgeClass = 'status-success'; // Xanh lá
                textTrangThai = 'Đã trả';
            } else if (item.trangThai === 'QUA_HAN') {
                badgeClass = 'status-danger'; // Đỏ
                textTrangThai = 'Quá hạn';
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <strong>${item.tenSach || 'Sách không xác định'}</strong>
                    <p style="font-size: 12px; color: #666; margin: 2px 0 0;">Mã: ${item.maVach || 'N/A'}</p>
                </td>
                <td>${ngayMuon}</td>
                <td>${hienThiNgayTra}</td>
                <td><span class="status ${badgeClass}" style="padding: 4px 10px; border-radius: 12px; font-size: 12px;">${textTrangThai}</span></td>
                <td class="action-cell">${nutHanhDong}</td>
            `;
            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error(error);
        tbody.innerHTML = `<tr><td colspan="5" style="color:red; text-align:center; padding: 20px;">Lỗi tải dữ liệu: ${error.message}</td></tr>`;
    }
}

// 2. Mở Modal Gia Hạn
function moModalGiaHan(phieuMuonId) {
    document.getElementById('giaHanPhieuMuonId').value = phieuMuonId;
    document.getElementById('lyDoGiaHan').value = ''; // Xóa trắng lý do cũ
    document.getElementById('giaHanModal').style.display = 'flex';
}

// 3. Đóng Modal Gia Hạn
function dongModalGiaHan() {
    document.getElementById('giaHanModal').style.display = 'none';
}

// 4. Gửi yêu cầu Gia hạn lên Backend
async function guiYeuCauGiaHan() {
    const phieuMuonId = document.getElementById('giaHanPhieuMuonId').value;
    const lyDo = document.getElementById('lyDoGiaHan').value.trim();

    if (!lyDo) {
        alert("Vui lòng nhập lý do gia hạn để thủ thư xem xét nhé!");
        return;
    }

    try {
        const result = await apiFetch('/api/giahan', { 
            method: 'POST',
            body: JSON.stringify({
                phieuMuonId: phieuMuonId,
                lyDo: lyDo
            })
        });

        alert("🎉 " + (result.message || "Gửi yêu cầu gia hạn thành công! Vui lòng chờ thủ thư duyệt."));
        dongModalGiaHan();
        
        // Load lại danh sách để cập nhật giao diện (nếu muốn)
        // taiLichSuMuon();

    } catch (error) {
        alert("Lỗi: " + error.message);
    }
}

function dangXuat() {
    if (confirm("Bạn có chắc chắn muốn thoát?")) {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
}