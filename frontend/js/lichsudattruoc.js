document.addEventListener('DOMContentLoaded', () => {
    taiLichSuDatTruoc();
});

async function taiLichSuDatTruoc() {
    const tableBody = document.getElementById('historyTableBody');
    if (!tableBody) return;

    try {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Đang tải dữ liệu...</td></tr>';

        // Giữ nguyên đường dẫn API /api/dattruoc/lichsu của bạn
        const data = await apiFetch('/api/dattruoc/lichsu');
        
        tableBody.innerHTML = '';

        const danhSach = Array.isArray(data) ? data : (data.data || []);

        if (danhSach.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color: #666;">Bạn chưa có lịch sử đặt trước nào.</td></tr>';
            return;
        }

        danhSach.forEach(item => {
            const ngayDat = new Date(item.ngayDat).toLocaleDateString('vi-VN');
            
            // GOM LOGIC XỬ LÝ TRẠNG THÁI VÀ NÚT BẤM VÀO ĐÂY (Sửa lỗi ReferenceError)
            let badgeClass = 'status-warning'; // Mặc định màu cam
            let textTrangThai = 'Đang chờ';
            let nutHanhDong = '';
            
            if (item.trangThai === 'CHO') {
                nutHanhDong = `<button onclick="huyDatTruoc(${item.id})" style="padding: 6px 12px; border: 1px solid #dc2626; background: transparent; color: #dc2626; border-radius: 4px; cursor: pointer;">Hủy</button>`;
            } else if (item.trangThai === 'DA_CO_SACH') {
                badgeClass = 'status-success'; // Màu xanh lá
                textTrangThai = 'Sách đã về (Đến lấy ngay)';
                nutHanhDong = '⋯';
            } else if (item.trangThai === 'HUY') {
                badgeClass = 'status-danger'; // Màu đỏ
                textTrangThai = 'Đã hủy';
                nutHanhDong = '⋯';
            } else if (item.trangThai === 'HOAN_THANH') {
                badgeClass = 'status-primary'; // Màu xanh dương
                textTrangThai = 'Đã mượn';
                nutHanhDong = '⋯';
            }

            const tenSach = item.tenSach || item.maDauSach || 'Đang cập nhật';
            const tacGia = item.tacGia || 'Không rõ';
            const hinhAnh = item.hinhAnh || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&auto=format&fit=crop&q=60';

            // LOGIC HIỂN THỊ MÃ VẠCH 
            const hienThiMaVach = item.maVach 
                ? `<span style="display:inline-block; margin-top:5px; font-size:12px; padding:2px 8px; background:#f1f5f9; border-radius:4px; color:#334155; border: 1px dashed #cbd5e1;">Mã sách: <strong style="color: #0f172a;">${item.maVach}</strong></span>` 
                : `<span style="display:inline-block; margin-top:5px; font-size:12px; color:#94a3b8; font-style: italic;">(Đang chờ xếp sách)</span>`;

            // IN RA GIAO DIỆN
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="book-info">
                        <img src="${hinhAnh}" alt="${tenSach}" style="width: 50px; height: 70px; object-fit: cover; border-radius: 4px; margin-right: 12px;">
                        <div>
                            <strong>${tenSach}</strong>
                            <p style="font-size: 12px; color: #666; margin: 4px 0 0;">${tacGia}</p>
                            ${hienThiMaVach}
                        </div>
                    </div>
                </td>
                <td>${ngayDat}</td>
                <td><span class="status ${badgeClass}">${textTrangThai}</span></td>
                <td class="action-cell">${nutHanhDong}</td>
            `;
            
            tableBody.appendChild(tr);
        });

    } catch (error) {
        console.error("Lỗi lấy lịch sử:", error);
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color: red;">Lỗi tải dữ liệu: ${error.message}</td></tr>`;
    }
}

// Hàm phụ trợ để map trạng thái
function getStatusInfo(statusCode) {
    switch (statusCode) {
        case 'CHO': return { text: 'Đang chờ', bg: '#fef3c7', color: '#d97706' }; // Vàng cam
        case 'DA_CO_SACH': return { text: 'Đã có sách', bg: '#dbeafe', color: '#2563eb' }; // Xanh dương
        case 'HOAN_THANH': return { text: 'Hoàn thành', bg: '#dcfce3', color: '#16a34a' }; // Xanh lá
        case 'HUY': return { text: 'Đã hủy', bg: '#fee2e2', color: '#dc2626' }; // Đỏ
        default: return { text: statusCode, bg: '#f3f4f6', color: '#374151' };
    }
}
// Chức năng mở rộng: Hủy đặt trước (Nếu Backend của bạn có viết API này)
async function huyDatTruoc(idDatTruoc) {
    if(!confirm('Bạn có chắc chắn muốn hủy đặt cuốn sách này?')) return;
    alert('Chức năng hủy đang được xây dựng...');
    // Sau này có API hủy thì gọi: await apiFetch(`/api/dattruoc/${idDatTruoc}`, { method: 'DELETE' });
    // taiLichSuDatTruoc(); // reload lại bảng
}