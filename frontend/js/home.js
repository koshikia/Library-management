const FALLBACK_BOOK_IMAGE = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop&q=60';

document.addEventListener('DOMContentLoaded', () => {
    hienThiLoiChao();
    hienThiThongTinTaiKhoan();
    khoiTaoNutBatDauDoc();
    taiDanhSachSach();
});

function hienThiLoiChao() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return;

    try {
        const user = JSON.parse(userStr);
        const greetingElement = document.getElementById('hero-greeting');

        if (greetingElement && user.hoTen) {
            greetingElement.textContent = `Chào mừng bạn trở lại, ${user.hoTen}!`;
        }
    } catch (error) {
        console.error('Lỗi đọc thông tin user:', error);
    }
}

function hienThiThongTinTaiKhoan() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return;

    try {
        const user = JSON.parse(userStr);
        const hoTen = user.hoTen || user.ten || 'Độc giả';
        const sidebarName = document.getElementById('sidebar-name');
        const sidebarAvatar = document.getElementById('sidebar-avatar');

        if (sidebarName) sidebarName.textContent = hoTen;
        if (sidebarAvatar) {
            sidebarAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(hoTen)}&background=random`;
        }
    } catch (error) {
        console.error('Lỗi hiển thị tài khoản:', error);
    }
}

function khoiTaoNutBatDauDoc() {
    const button = document.querySelector('.hero-banner .primary-btn');
    if (!button) return;

    button.addEventListener('click', () => {
        document.getElementById('bookList')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

async function taiDanhSachSach() {
    const bookListContainer = document.getElementById('bookList');
    if (!bookListContainer) return;

    try {
        bookListContainer.innerHTML = "<p class='book-grid__status'>Đang tải danh sách sách...</p>";
        const danhSach = await apiFetch('/api/dausach');

        bookListContainer.innerHTML = '';

        if (!Array.isArray(danhSach) || danhSach.length === 0) {
            bookListContainer.innerHTML = "<p class='book-grid__status'>Hiện chưa có sách nào trong thư viện.</p>";
            return;
        }

        const fragment = document.createDocumentFragment();
        danhSach.forEach((sach) => {
            fragment.appendChild(taoTheSach(sach));
        });

        bookListContainer.appendChild(fragment);
    } catch (error) {
        console.error('Lỗi tải sách:', error);
        bookListContainer.innerHTML = `<p class='book-grid__status' style='color:#dc2626;'>Không thể tải danh sách sách lúc này: ${error.message}</p>`;
    }
}

function taoTheSach(sach) {
    const maDauSach = sach.maDauSach || '';
    const tenSach = sach.tenSach || 'Chưa có tên sách';
    const tacGia = sach.tacGia || 'Đang cập nhật tác giả';
    const theLoai = sach.theLoai || 'Chưa phân loại';
    const hinhAnh = sach.hinhAnh || FALLBACK_BOOK_IMAGE;
    const soLuongCoSan = laySoNguyen(sach.soLuongCoSan);
    const tongSoLuong = laySoNguyen(sach.tongSoLuong);

    const card = document.createElement('article');
    card.className = 'book-card interactive-book-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Xem chi tiết sách ${tenSach}`);

    card.addEventListener('click', () => moTrangChiTiet(maDauSach));
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            moTrangChiTiet(maDauSach);
        }
    });

    const cover = document.createElement('div');
    cover.className = 'book-card__cover';

    const image = document.createElement('img');
    image.src = hinhAnh;
    image.alt = tenSach;
    cover.appendChild(image);

    const badgeRow = document.createElement('div');
    badgeRow.className = 'book-card__badge-row';
    badgeRow.appendChild(taoBadge(theLoai));
    // badgeRow.appendChild(
    //     taoBadge(
    //         soLuongCoSan > 0 ? `Còn ${soLuongCoSan} cuốn` : 'Hiện hết sách',
    //         soLuongCoSan > 0 ? 'available' : 'reserve'
    //     )
    // );

    const title = document.createElement('h3');
    title.className = 'book-card__title';
    title.textContent = tenSach;

    const meta = document.createElement('p');
    meta.className = 'book-card__meta';
    meta.textContent = `${tacGia} • ${tongSoLuong} bản sao`;

    const footer = document.createElement('div');
    footer.className = 'book-card__footer';

    const actionButton = document.createElement('button');
    actionButton.type = 'button';
    actionButton.className = `book-action ${soLuongCoSan > 0 ? 'book-action--available' : 'book-action--reserve'}`;
    actionButton.textContent = soLuongCoSan > 0 ? 'Có sẵn' : 'Đặt trước';
    actionButton.addEventListener('click', async (event) => {
        event.stopPropagation();

        if (soLuongCoSan > 0) {
            thongBaoDenThuVien(tenSach);
            return;
        }

        await xuLyDatTruoc(maDauSach, tenSach);
    });

    const detailHint = document.createElement('span');
    detailHint.className = 'book-card__link';
    detailHint.textContent = 'Nhấn để xem chi tiết';

    footer.append(actionButton, detailHint);
    card.append(cover, badgeRow, title, meta, footer);

    return card;
}

function taoBadge(text, variant = 'neutral') {
    const badge = document.createElement('span');
    badge.className = `book-badge book-badge--${variant}`;
    badge.textContent = text;
    return badge;
}

function laySoNguyen(value) {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
}

function moTrangChiTiet(maDauSach) {
    if (!maDauSach) return;
    window.location.href = `book-detail.html?id=${encodeURIComponent(maDauSach)}`;
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
        taiDanhSachSach();
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
