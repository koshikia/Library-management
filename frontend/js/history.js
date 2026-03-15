


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