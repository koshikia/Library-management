document.addEventListener('DOMContentLoaded', () => {
    taiLichSuDatTruoc();
});

async function taiLichSuDatTruoc() {
    const tableBody = document.getElementById('historyTableBody');
    if (!tableBody) return;

    try {
        tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Đang tải dữ liệu...</td></tr>';

        // Gọi API lấy lịch sử đặt trước (đã có isLoggedIn bảo vệ ở backend)
        const data = await apiFetch('/api/dattruoc/lichsu');
        
        tableBody.innerHTML = '';

        // Đề phòng trường hợp API trả về data.data hoặc mảng trực tiếp
        const danhSach = Array.isArray(data) ? data : (data.data || []);

        if (danhSach.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;">Bạn chưa có lịch sử đặt trước nào.</td></tr>';
            return;
        }

        danhSach.forEach(item => {
            // Định dạng ngày giờ Việt Nam
            const ngayDat = new Date(item.ngayDat).toLocaleDateString('vi-VN');
            
            // Hàm helper để xử lý trạng thái và màu sắc
            const statusInfo = getStatusInfo(item.trangThai);
            
            // Xử lý thông tin sách (Nếu backend JOIN bảng DauSach)
            // Nếu backend của bạn chưa JOIN, nó sẽ chỉ in ra maDauSach
            const tenSach = item.tenSach || item.maDauSach || 'Đang cập nhật';
            const tacGia = item.tacGia || 'Không rõ';
            const hinhAnh = item.hinhAnh || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&auto=format&fit=crop&q=60';

            // Tạo dòng (row)
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="book-info">
                        <img src="${hinhAnh}" alt="${tenSach}" style="width: 50px; height: 70px; object-fit: cover; border-radius: 4px; margin-right: 12px;">
                        <div>
                            <strong>${tenSach}</strong>
                            <p style="font-size: 12px; color: #666; margin: 4px 0 0;">${tacGia}</p>
                        </div>
                    </div>
                </td>
                <td>${ngayDat}</td>
                <td>
                    <span style="padding: 4px 10px; border-radius: 20px; font-size: 12px; background-color: ${statusInfo.bg}; color: ${statusInfo.color};">
                        ${statusInfo.text}
                    </span>
                </td>
                <td class="action-cell">
                    ${item.trangThai === 'CHO' 
                        ? `<button onclick="huyDatTruoc(${item.id})" style="padding: 6px 12px; border: 1px solid #dc2626; background: transparent; color: #dc2626; border-radius: 4px; cursor: pointer;">Hủy</button>` 
                        : '⋯'}
                </td>
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