const FALLBACK_BOOK_IMAGE = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop&q=60';

document.addEventListener('DOMContentLoaded', () => {
    hienThiThongTinTaiKhoan();
    taiChiTietSach();
});

async function taiChiTietSach() {
    const maDauSach = new URLSearchParams(window.location.search).get('id');
    if (!maDauSach) {
        hienThiTrangThai('Không tìm thấy mã sách để hiển thị chi tiết.', true);
        return;
    }

    try {
        hienThiTrangThai('Đang tải chi tiết sách...');
        const sach = await apiFetch(`/api/dausach/${encodeURIComponent(maDauSach)}`);
        renderChiTietSach(sach);
    } catch (error) {
        hienThiTrangThai(`Không thể tải chi tiết sách: ${error.message}`, true);
    }
}

function renderChiTietSach(sach) {
    const thongKe = sach.thongKeBanSao || {};
    const tongSoLuong = laySoNguyen(sach.tongSoLuong ?? thongKe.tongSoLuong);
    const soLuongCoSan = laySoNguyen(sach.soLuongCoSan ?? thongKe.soLuongCoSan);
    const soLuongDangMuon = laySoNguyen(sach.soLuongDangMuon ?? thongKe.soLuongDangMuon);
    const soLuongDangGiuCho = laySoNguyen(sach.soLuongDangGiuCho ?? thongKe.soLuongDangGiuCho);
    const soLuongHuHong = laySoNguyen(sach.soLuongHuHong ?? thongKe.soLuongHuHong);
    const soLuongThatLac = laySoNguyen(sach.soLuongThatLac ?? thongKe.soLuongThatLac);
    const tongBanSaoThucTe = laySoNguyen(sach.tongBanSaoThucTe ?? thongKe.tongBanSaoThucTe ?? tongSoLuong);
    const copies = Array.isArray(sach.danhSachBanSao) ? sach.danhSachBanSao : [];

    document.title = `${sach.tenSach || 'Chi tiết sách'} | Thư Viện Số`;

    ganText('detailCategoryChip', sach.theLoai || 'Chưa phân loại');
    ganText('detailCodeChip', sach.maDauSach || 'Mã sách chưa cập nhật');
    ganText('detailTitle', sach.tenSach || 'Chưa có tên sách');
    ganText(
        'detailSubtitle',
        `${sach.tacGia || 'Tác giả đang cập nhật'} • ${sach.nhaXuatBan || 'Nhà xuất bản đang cập nhật'}`
    );
    ganText(
        'detailSummaryText',
        sach.moTa?.trim() || 'Cuốn sách này hiện chưa có mô tả nội dung. Bạn có thể xem thông tin xuất bản và tình trạng bản sao bên dưới.'
    );

    const cover = document.getElementById('detailCover');
    if (cover) {
        cover.src = sach.hinhAnh || FALLBACK_BOOK_IMAGE;
        cover.alt = sach.tenSach || 'Bìa sách';
    }

    ganText('detailCode', sach.maDauSach || 'Đang cập nhật');
    ganText('detailName', sach.tenSach || 'Đang cập nhật');
    ganText('detailAuthor', sach.tacGia || 'Đang cập nhật');
    ganText('detailCategory', sach.theLoai || 'Đang cập nhật');
    ganText('detailPublisher', sach.nhaXuatBan || 'Đang cập nhật');
    ganText('detailYear', sach.namXuatBan || 'Đang cập nhật');
    ganText('detailTotalQuantity', `${tongSoLuong} cuốn`);
    ganText('detailAvailableQuantity', `${soLuongCoSan} cuốn`);
    ganText('detailInventorySummary', `Kho hiện có ${soLuongCoSan}/${tongSoLuong} cuốn sẵn sàng phục vụ.`);
    ganText('detailDescription', sach.moTa?.trim() || 'Chưa có mô tả cho đầu sách này.');
    ganText('detailCopiesSummary', `${copies.length} bản sao được ghi nhận trong hệ thống.`);

    ganText('metricTotal', tongBanSaoThucTe);
    ganText('metricAvailable', soLuongCoSan);
    ganText('metricBorrowed', soLuongDangMuon);
    ganText('metricHolding', soLuongDangGiuCho);
    ganText('metricDamaged', soLuongHuHong);
    ganText('metricLost', soLuongThatLac);

    const statusPill = document.getElementById('detailStatusPill');
    const availabilityText = document.getElementById('detailAvailabilityText');
    const adviceText = document.getElementById('detailAdviceText');

    if (statusPill) {
        statusPill.className = `detail-status-pill ${soLuongCoSan > 0 ? 'detail-status-pill--available' : 'detail-status-pill--reserve'}`;
        statusPill.textContent = soLuongCoSan > 0 ? 'Sẵn sàng phục vụ' : 'Cần đặt trước';
    }

    if (availabilityText) {
        availabilityText.textContent = soLuongCoSan > 0
            ? `Hiện còn ${soLuongCoSan} cuốn có thể mượn trực tiếp tại thư viện.`
            : 'Tất cả bản sao đang được sử dụng hoặc tạm giữ chỗ.';
    }

    if (adviceText) {
        adviceText.textContent = soLuongCoSan > 0
            ? 'Bạn có thể đến quầy thủ thư để mượn trực tiếp. Danh sách bản sao bên dưới sẽ giúp kiểm tra nhanh kho hiện tại.'
            : 'Hiện chưa còn bản sao rảnh. Bạn nên gửi yêu cầu đặt trước để hệ thống giữ lượt khi có sách trở lại.';
    }

    capNhatNutHanhDong(sach, soLuongCoSan);
    renderPhanBoTrangThai({ soLuongCoSan, soLuongDangMuon, soLuongDangGiuCho, soLuongHuHong, soLuongThatLac });
    renderDanhSachBanSao(copies);

    document.getElementById('detailLoading')?.classList.add('hidden');
    document.getElementById('detailContent')?.classList.remove('hidden');
}

function capNhatNutHanhDong(sach, soLuongCoSan) {
    const button = document.getElementById('detailPrimaryAction');
    if (!button) return;

    button.className = `primary-btn detail-primary-btn ${soLuongCoSan > 0 ? 'is-available' : 'is-reserve'}`;
    button.textContent = soLuongCoSan > 0 ? 'Có sẵn tại thư viện' : 'Đặt trước ngay';
    button.onclick = async () => {
        if (soLuongCoSan > 0) {
            thongBaoDenThuVien(sach.tenSach || 'Cuốn sách này');
            return;
        }

        await xuLyDatTruoc(sach.maDauSach, sach.tenSach || 'Cuốn sách này');
    };
}

function renderPhanBoTrangThai(thongKe) {
    const container = document.getElementById('detailCopySummary');
    if (!container) return;

    const items = [
        ['Có sẵn', thongKe.soLuongCoSan],
        ['Đang mượn', thongKe.soLuongDangMuon],
        ['Đang giữ chỗ', thongKe.soLuongDangGiuCho],
        ['Hư hỏng', thongKe.soLuongHuHong],
        ['Thất lạc', thongKe.soLuongThatLac]
    ];

    container.innerHTML = '';

    items.forEach(([label, value]) => {
        const row = document.createElement('div');
        row.className = 'detail-copy-summary-item';

        const labelElement = document.createElement('span');
        labelElement.textContent = label;

        const valueElement = document.createElement('span');
        valueElement.textContent = `${value} cuốn`;

        row.append(labelElement, valueElement);
        container.appendChild(row);
    });
}

function renderDanhSachBanSao(copies) {
    const tbody = document.getElementById('detailCopiesBody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (!copies.length) {
        const row = document.createElement('tr');
        row.innerHTML = "<td colspan='3' class='empty-state'>Hiện chưa có bản sao nào được nhập cho đầu sách này.</td>";
        tbody.appendChild(row);
        return;
    }

    copies.forEach((copy) => {
        const { label, className, note } = layThongTinTrangThai(copy.trangThai);
        const row = document.createElement('tr');

        const codeCell = document.createElement('td');
        codeCell.textContent = copy.maVach || 'Chưa có mã vạch';

        const statusCell = document.createElement('td');
        const statusBadge = document.createElement('span');
        statusBadge.className = `copy-status ${className}`;
        statusBadge.textContent = label;
        statusCell.appendChild(statusBadge);

        const noteCell = document.createElement('td');
        noteCell.textContent = note;

        row.append(codeCell, statusCell, noteCell);
        tbody.appendChild(row);
    });
}

function layThongTinTrangThai(trangThai) {
    switch (trangThai) {
        case 'CO_SAN':
            return {
                label: 'Có sẵn',
                className: 'copy-status--available',
                note: 'Bản sao đang ở thư viện và có thể phục vụ bạn ngay.'
            };
        case 'DANG_MUON':
            return {
                label: 'Đang mượn',
                className: 'copy-status--borrowed',
                note: 'Bản sao đang được độc giả khác sử dụng.'
            };
        case 'DANG_GIU_CHO':
            return {
                label: 'Đang giữ chỗ',
                className: 'copy-status--holding',
                note: 'Bản sao đã được giữ cho một yêu cầu đặt trước.'
            };
        case 'HU_HONG':
            return {
                label: 'Hư hỏng',
                className: 'copy-status--damaged',
                note: 'Bản sao đang chờ xử lý, chưa thể phục vụ.'
            };
        case 'MAT':
            return {
                label: 'Thất lạc',
                className: 'copy-status--lost',
                note: 'Bản sao hiện không còn trong kho.'
            };
        default:
            return {
                label: trangThai || 'Không xác định',
                className: 'copy-status--neutral',
                note: 'Trạng thái bản sao đang được cập nhật.'
            };
    }
}

function hienThiTrangThai(message, isError = false) {
    const loading = document.getElementById('detailLoading');
    const content = document.getElementById('detailContent');

    if (content) {
        content.classList.add('hidden');
    }

    if (loading) {
        loading.classList.remove('hidden');
        loading.textContent = message;
        loading.style.color = isError ? '#dc2626' : '#475569';
    }
}

function ganText(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function laySoNguyen(value) {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
}

function hienThiThongTinTaiKhoan() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return;

    try {
        const user = JSON.parse(userStr);
        const hoTen = user.hoTen || user.ten || 'Độc giả';

        ganText('sidebar-name', hoTen);

        const sidebarAvatar = document.getElementById('sidebar-avatar');
        if (sidebarAvatar) {
            sidebarAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(hoTen)}&background=random`;
        }
    } catch (error) {
        console.error('Lỗi hiển thị tài khoản:', error);
    }
}

function thongBaoDenThuVien(tenSach) {
    alert(`Cuốn "${tenSach}" hiện đang có sẵn trên kệ.\n\nVui lòng mang theo thẻ độc giả đến quầy thủ thư để mượn sách trực tiếp.`);
}

async function xuLyDatTruoc(maDauSach, tenSach) {
    const xacNhan = confirm(`Bạn có muốn yêu cầu đặt trước cuốn "${tenSach}" không?`);
    if (!xacNhan) return;

    try {
        await apiFetch('/api/dattruoc', {
            method: 'POST',
            body: JSON.stringify({ maDauSach })
        });

        alert('Đặt trước thành công. Hệ thống đã ghi nhận yêu cầu của bạn.');
        await taiChiTietSach();
    } catch (error) {
        alert(`Không thể đặt trước: ${error.message}`);
    }
}

function dangXuat() {
    if (confirm('Bạn có chắc chắn muốn thoát khỏi hệ thống?')) {
        localStorage.removeItem('user');
        localStorage.removeItem('vaiTro');
        window.location.href = 'login.html';
    }
}
