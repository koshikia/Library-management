document.addEventListener('DOMContentLoaded', () => {
    // 1. Lấy ID sách từ URL (Ví dụ: chitietsach.html?id=DS01)
    const urlParams = new URLSearchParams(window.location.search);
    const maDauSach = urlParams.get('id');

    if (!maDauSach) {
        alert("Không tìm thấy mã sách!");
        window.location.href = 'home.html';
        return;
    }

    taiChiTietSach(maDauSach);
    hienThiThongTinTaiKhoan();
    taiTrangThaiMuon();
    taiGoiYSach();
});

async function taiChiTietSach(maDauSach) {
    try {
        // Gọi API lấy dữ liệu (điều chỉnh URL nếu route của bạn khác)
        const data = await apiFetch(`/api/dausach/${maDauSach}`);
        
        // Ẩn chữ "Đang tải", hiện nội dung
        document.getElementById('detailLoading').classList.add('hidden');
        document.getElementById('detailContent').classList.remove('hidden');

        // ĐỔ DỮ LIỆU VÀO PHẦN HERO (Trên cùng)
        document.getElementById('detailCover').src = data.hinhAnh || 'https://via.placeholder.com/300x450?text=Chưa+có+ảnh+bìa';
        document.getElementById('detailCategoryChip').textContent = data.theLoai || 'Chưa phân loại';
        document.getElementById('detailCodeChip').textContent = data.maDauSach;
        document.getElementById('detailTitle').textContent = data.tenSach;
        document.getElementById('detailSubtitle').textContent = `${data.tacGia || 'Khuyết danh'} • ${data.nhaXuatBan || 'NXB Không rõ'}`;
        document.getElementById('detailSummaryText').textContent = data.moTa || 'Chưa có thông tin mô tả cho cuốn sách này.';

        // Xử lý nút Trạng thái và Nút bấm chính
        const statusPill = document.getElementById('detailStatusPill');
        const availText = document.getElementById('detailAvailabilityText');
        const btnAction = document.getElementById('detailPrimaryAction');

        if (data.soLuongCoSan > 0) {
            // SÁCH CÒN TRONG KHO -> HIỂN THỊ CÓ SẴN
            statusPill.textContent = 'Có sẵn';
            statusPill.style.backgroundColor = '#d1fae5';
            statusPill.style.color = '#065f46';
            availText.textContent = `Còn ${data.soLuongCoSan} cuốn trong kho`;
            
            // Nút bấm: Chỉ thông báo ra thư viện lấy
            btnAction.textContent = 'Sách đang có sẵn';
            btnAction.style.backgroundColor = '#10b981'; // Màu xanh lá
            btnAction.style.color = 'white';
            btnAction.disabled = false;
            btnAction.style.cursor = 'pointer';
            btnAction.onclick = () => {
                alert(`Cuốn "${data.tenSach}" hiện đang có sẵn trên kệ!\n\nVui lòng mang theo Thẻ Độc Giả đến quầy thủ thư để mượn sách trực tiếp nhé.`);
            };

        } else {
            // SÁCH BẰNG 0 -> CHO PHÉP ĐẶT TRƯỚC
            statusPill.textContent = 'Hết sách';
            statusPill.style.backgroundColor = '#fef08a';
            statusPill.style.color = '#854d0e';
            availText.textContent = `Hiện tại đã hết sách trong kho`;
            
            // Nút bấm: Gọi hàm Đặt trước
            btnAction.textContent = 'Đặt trước sách này';
            btnAction.style.backgroundColor = '#f59e0b'; // Màu vàng cam nổi bật
            btnAction.style.color = 'white';
            btnAction.disabled = false;
            btnAction.style.cursor = 'pointer';
            btnAction.onclick = () => datTruocSach(data.maDauSach);
        }
        // ĐỔ DỮ LIỆU VÀO GRID THÔNG TIN CHI TIẾT
        document.getElementById('detailCode').textContent = data.maDauSach;
        document.getElementById('detailName').textContent = data.tenSach;
        document.getElementById('detailAuthor').textContent = data.tacGia || 'Đang cập nhật';
        document.getElementById('detailCategory').textContent = data.theLoai || 'Đang cập nhật';
        document.getElementById('detailPublisher').textContent = data.nhaXuatBan || 'Đang cập nhật';
        document.getElementById('detailYear').textContent = data.namXuatBan || 'Đang cập nhật';
        document.getElementById('detailTotalQuantity').textContent = data.tongSoLuong || 0;
        document.getElementById('detailAvailableQuantity').textContent = data.soLuongCoSan || 0;
        
        // Mô tả chi tiết
        document.getElementById('detailDescription').innerHTML = `<p>${data.moTa || 'Đang cập nhật mô tả...'}</p>`;

        // ĐỔ DỮ LIỆU VÀO BẢNG BẢN SAO SÁCH
        const tbody = document.getElementById('detailCopiesBody');
        tbody.innerHTML = '';
        if (data.banSao && data.banSao.length > 0) {
            data.banSao.forEach(bs => {
                let badgeClass = 'bg-huhong'; // Mặc định màu đỏ
                if (bs.trangThai === 'CO_SAN') badgeClass = 'bg-cosan'; // Thêm class CSS màu xanh lá của bạn
                if (bs.trangThai === 'DANG_MUON') badgeClass = 'bg-dangmuon'; // Màu vàng

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${bs.maVach}</strong></td>
                    <td><span class="badge ${badgeClass}">${bs.trangThai}</span></td>
                    <td>${bs.ghiChu || '-'}</td>
                `;
                tbody.appendChild(tr);
            });
        } else {
            tbody.innerHTML = '<tr><td colspan="3" style="text-align:center">Chưa có bản sao nào trong kho.</td></tr>';
        }

    } catch (error) {
        console.error("Lỗi:", error);
        document.getElementById('detailLoading').innerHTML = `<span style="color:red">Lỗi tải dữ liệu: ${error.message}</span>`;
    }
}

// Xử lý sự kiện bấm nút Đặt trước
async function datTruocSach(maDauSach) {
    if (!confirm('Bạn có chắc chắn muốn đặt trước cuốn sách này?')) return;

    try {
        // Cần đảm bảo file api.js có hàm lấy user session, hoặc bạn truyền userId ở đây.
        // Ví dụ gọi API POST /api/dattruoc
        await apiFetch('/api/dattruoc', {
            method: 'POST',
            body: JSON.stringify({ maDauSach: maDauSach })
        });

        alert("Đặt trước thành công! Vui lòng chờ Thủ thư duyệt.");
        // Tải lại trang để cập nhật lại số lượng
        window.location.reload(); 
    } catch (error) {
        alert("Lỗi đặt trước: " + error.message);
    }
}
// ==========================================
// CODE XỬ LÝ PANEL BÊN PHẢI (RIGHT PANEL)
// ==========================================

// 1. Hiển thị User & Đăng xuất
function hienThiThongTinTaiKhoan() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        document.getElementById('header-name').textContent = user.hoTen || 'Độc giả';
        document.getElementById('header-avatar').src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.hoTen || 'User')}&background=random`;
    }
}

window.dangXuat = function() {
    if (confirm("Bạn có chắc chắn muốn thoát?")) {
        localStorage.clear();
        window.location.href = 'login.html';
    }
}

// 2. Tải và hiển thị sách gợi ý (Cần lấy toàn bộ sách trước)
let toanBoSachChoGoiY = [];
async function taiGoiYSach() {
    try {
        const data = await apiFetch('/api/dausach');
        toanBoSachChoGoiY = Array.isArray(data) ? data : (data.data || []);
        hienThiGoiY();
    } catch (error) {
        document.getElementById('goiYSachContainer').innerHTML = '<p style="color:red; text-align:center;">Lỗi tải gợi ý</p>';
    }
}

window.hienThiGoiY = function() {
    const container = document.getElementById('goiYSachContainer');
    if (!container || toanBoSachChoGoiY.length === 0) return;

    const shuffled = [...toanBoSachChoGoiY].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);

    container.innerHTML = '';
    selected.forEach(sach => {
        container.innerHTML += `
            <div onclick="window.location.href='chitietsach.html?id=${sach.maDauSach}'" style="display: flex; gap: 10px; margin-bottom: 15px; align-items: center; cursor: pointer; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">
                <img src="${sach.hinhAnh || 'https://via.placeholder.com/50x70'}" style="width: 50px; height: 70px; object-fit: cover; border-radius: 4px;">
                <div>
                    <h5 style="margin: 0 0 5px 0; font-size: 14px; color: #007bff;">${sach.tenSach}</h5>
                    <p style="margin: 0; font-size: 12px; color: #666;">${sach.tacGia || 'Không rõ'}</p>
                </div>
            </div>
        `;
    });
}

// 3. Xử lý click Thể loại -> Chuyển về trang chủ để lọc
window.locTheoTheLoai = function(theLoai) {
    // Vì đang ở trang chi tiết, nếu click thể loại thì đẩy về trang chủ kèm param
    window.location.href = `home.html?theloai=${encodeURIComponent(theLoai)}`;
}

// 4. Trạng thái mượn
async function taiTrangThaiMuon() {
    const box = document.getElementById('trangThaiMuonBox');
    if (!box) return;

    try {
        const data = await apiFetch('/api/phieumuon/my');
        const lichSu = Array.isArray(data) ? data : (data.data || []);
        const sachDangGiu = lichSu.filter(item => item.trangThai === 'DANG_MUON' || item.trangThai === 'QUA_HAN');

        if (sachDangGiu.length === 0) {
            box.innerHTML = `<div style="text-align: center; padding: 10px 0;"><i class="fa-solid fa-book-open" style="font-size: 24px; color: #cbd5e1; margin-bottom: 10px;"></i><p style="margin: 0; font-size: 13px; color: #64748b;">Bạn hiện không giữ sách nào.</p></div>`;
            return;
        }

        const cuonSapHan = sachDangGiu.reduce((a, b) => new Date(a.hanTra) < new Date(b.hanTra) ? a : b);
        const hanTra = new Date(cuonSapHan.hanTra);
        const soNgayConLai = Math.ceil((hanTra - new Date()) / (1000 * 60 * 60 * 24));

        let canhBao = soNgayConLai < 0 ? `<span style="color:#dc3545;font-weight:bold">Quá hạn</span>` : `<span style="color:#28a745">Còn ${soNgayConLai} ngày</span>`;

        box.innerHTML = `
            <div style="background: #f8fafc; padding: 12px; border-radius: 8px;">
                <p style="margin: 0 0 5px 0; font-size: 13px;">Bạn đang giữ <strong>${sachDangGiu.length}</strong> cuốn.</p>
                <div style="border-top: 1px dashed #cbd5e1; padding-top: 10px; margin-top: 10px;">
                    <strong style="display: block; font-size: 14px; margin-bottom: 5px;">${cuonSapHan.tenSach}</strong>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
                        <span>Hạn: ${hanTra.toLocaleDateString('vi-VN')}</span>${canhBao}
                    </div>
                </div>
            </div>`;
    } catch (error) {
        box.innerHTML = `<p style="color:red; font-size: 13px;">Không thể tải trạng thái.</p>`;
    }
}