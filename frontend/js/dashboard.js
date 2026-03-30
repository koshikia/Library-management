// --- KHỞI TẠO KHI LOAD TRANG ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Kiểm tra quyền ngay lập tức
    kiemTraQuyenTruyCap();

    hienThiTenThuThu();
    setupChuyenTab();
    xuLyDangXuat();
    taiDanhSachDatTruoc(); 
    taiDanhSachPhieuMuon();
});
// Hàm bảo vệ trang Dashboard
function kiemTraQuyenTruyCap() {
    const vaiTro = localStorage.getItem("vaiTro");
    
    // Nếu chưa đăng nhập, hoặc là ĐỘC GIẢ thì đuổi về trang chủ/đăng nhập
    if (!vaiTro || vaiTro === "DOCGIA") {
        alert("Cảnh báo: Bạn không có quyền truy cập vào trang quản trị!");
        window.location.href = "home.html"; 
    }
}


// --- KHỞI TẠO KHI LOAD TRANG ---
document.addEventListener('DOMContentLoaded', () => {
    hienThiTenThuThu();
    setupChuyenTab();
    xuLyDangXuat();
    
    // Tải sẵn dữ liệu cho tab Đặt trước (hoặc tab nào bạn muốn hiện đầu tiên)
    taiDanhSachDatTruoc(); 
});

// Lấy tên Thủ thư từ localStorage hiển thị lên góc phải
function hienThiTenThuThu() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        const user = JSON.parse(userStr);
        document.getElementById('adminNameDisplay').textContent = `Xin chào, ${user.hoTen} (${user.vaiTro})`;
    }
}

// --- LOGIC CHUYỂN TAB (MENU BÊN TRÁI) ---
function setupChuyenTab() {
    const links = document.querySelectorAll('.sidebar .nav-link');
    const sections = document.querySelectorAll('.content-section');
    const pageTitle = document.getElementById('pageTitle');

    links.forEach(link => {
        link.addEventListener('click', () => {
            // Xóa class active ở tất cả menu và section
            links.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Thêm class active cho menu được click và section tương ứng
            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Đổi tiêu đề to trên cùng
            pageTitle.textContent = link.textContent;

            // Nếu bấm vào tab Đặt trước thì gọi lại hàm lấy dữ liệu cho mới
            if (targetId === 'section-dattruoc') {
                taiDanhSachDatTruoc();
            } else if (targetId === 'section-sach') {
                taiDanhSachDauSach();
            } else if (targetId === 'section-muontra') {
                taiDanhSachPhieuMuon(); // Gọi hàm tải Phiếu Mượn
            }
        });
    });
}

// --- XỬ LÝ CHỨC NĂNG ĐẶT TRƯỚC ---
async function taiDanhSachDatTruoc() {
    const tbody = document.getElementById('bangDatTruoc');
    if (!tbody) return;

    try {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Đang tải dữ liệu...</td></tr>';
        
        // Gọi API lấy toàn bộ danh sách đặt trước (yêu cầu quyền Thủ thư)
        const data = await apiFetch('/api/dattruoc');
        const danhSach = Array.isArray(data) ? data : (data.data || []);

        tbody.innerHTML = '';
        if(danhSach.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Chưa có yêu cầu đặt trước nào.</td></tr>';
            return;
        }

        danhSach.forEach(item => {
            const ngayDat = new Date(item.ngayDat).toLocaleString('vi-VN');
            
            // 1. Đã sửa lại đúng tên biến khớp với câu lệnh SQL của bạn
            const tenDocGia = item.hoTen || 'Không xác định'; 
            const tenSach = item.tenSach || `Mã sách: ${item.maDauSach}`;
            const soLuongCoSan = item.soLuongCoSan || 0; // Số lượng bản sao rảnh

            let trangThaiHtml = '';
            let hanhDongHtml = '⋯';

            if (item.trangThai === 'CHO') {
                trangThaiHtml = '<span class="badge bg-dangmuon">Đang chờ duyệt</span>';
                
                // 2. LOGIC CỰC HAY CỦA BẠN: Hết sách thì khóa nút Duyệt, làm mờ đi
                if (soLuongCoSan > 0) {
                    hanhDongHtml = `
                        <button class="btn-small" style="background-color: #28a745;" onclick="capNhatTrangThaiDatTruoc(${item.id}, 'DA_CO_SACH')">Duyệt</button>
                        <button class="btn-small" style="background-color: #dc3545; margin-left: 5px;" onclick="capNhatTrangThaiDatTruoc(${item.id}, 'HUY')">Từ chối</button>
                    `;
                } else {
                    hanhDongHtml = `
                        <button class="btn-small" style="background-color: #6c757d; cursor: not-allowed;" title="Đã hết bản sao trong kho" disabled>Hết sách</button>
                        <button class="btn-small" style="background-color: #dc3545; margin-left: 5px;" onclick="capNhatTrangThaiDatTruoc(${item.id}, 'HUY')">Từ chối</button>
                    `;
                }
            } else if (item.trangThai === 'DA_CO_SACH') {
                trangThaiHtml = '<span class="badge bg-cosan">Đã duyệt (Chờ đến lấy)</span>';
            } else if (item.trangThai === 'HUY') {
                trangThaiHtml = '<span class="badge bg-huhong">Đã hủy</span>';
            } else if (item.trangThai === 'HOAN_THANH') {
                trangThaiHtml = '<span class="badge bg-cosan" style="background-color: #17a2b8;">Đã hoàn thành</span>';
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${item.id}</td>
                <td>${tenDocGia}</td>
                <td><strong>${tenSach}</strong></td>
                <td><strong style="color: ${soLuongCoSan > 0 ? 'green' : 'red'};">${soLuongCoSan}</strong></td>
                <td>${ngayDat}</td>
                <td>${trangThaiHtml}</td>
                <td>${hanhDongHtml}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="7" style="color:red;text-align:center;">Lỗi: ${error.message}</td></tr>`;
    }
}

// Hàm gọi API để cập nhật trạng thái (Duyệt hoặc Hủy)
async function capNhatTrangThaiDatTruoc(idDatTruoc, trangThaiMoi) {
    const hanhDong = trangThaiMoi === 'DA_CO_SACH' ? 'DUYỆT cấp sách cho' : 'TỪ CHỐI';
    if (!confirm(`Bạn có chắc chắn muốn ${hanhDong} yêu cầu #${idDatTruoc} không?`)) return;

    try {
        await apiFetch(`/api/dattruoc/${idDatTruoc}/trangthai`, {
            method: 'PUT',
            body: JSON.stringify({ trangThai: trangThaiMoi })
        });
        
        alert("Đã cập nhật trạng thái thành công!");
        taiDanhSachDatTruoc(); // Reload lại bảng ngay lập tức
    } catch (error) {
        alert("Lỗi cập nhật: " + error.message);
    }
}

// ==========================================
// QUẢN LÝ ĐẦU SÁCH & BẢN SAO SÁCH
// ==========================================

// 1. Tải danh sách Đầu Sách ra bảng
async function taiDanhSachDauSach() {
    const tbody = document.getElementById('bangDanhSachSach');
    if (!tbody) return;

    try {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Đang tải dữ liệu...</td></tr>';
        
        // Gọi API lấy Đầu Sách (Nhớ kiểm tra lại đường dẫn API của bạn nếu khác)
        const data = await apiFetch('/api/dausach');
        const danhSach = Array.isArray(data) ? data : (data.data || []);

        tbody.innerHTML = '';
        if (danhSach.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Chưa có đầu sách nào trong kho.</td></tr>';
            return;
        }

        danhSach.forEach(sach => {
            // Lưu dữ liệu sách vào một thuộc tính data-* ẩn để hút lên form cho dễ
            const sachJson = encodeURIComponent(JSON.stringify(sach)); 
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${sach.maDauSach}</strong></td>
                <td>${sach.tenSach}</td>
                <td>${sach.tacGia || 'Đang cập nhật'}</td>
                <td><strong style="color: blue;">${sach.tongSoLuong || 0}</strong> cuốn</td>
                <td>
                    <button class="btn-small" style="background-color: #ffc107; color: black; margin-right: 5px;" onclick="hutDuLieuLenForm('${sachJson}')">Sửa</button>
                    <button class="btn-small" style="background-color: #dc3545; margin-right: 5px;" onclick="xoaDauSach('${sach.maDauSach}')">Xóa</button>
                    <button class="btn-small" style="background-color: #17a2b8;" onclick="moModalBanSao('${sach.maDauSach}', '${sach.tenSach}')">+ Bản Sao</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="5" style="color:red;text-align:center;">Lỗi: ${error.message}</td></tr>`;
    }
}
// --- LOGIC SỬA / XÓA ĐẦU SÁCH ---
let isEditMode = false; // Cờ hiệu nhận biết đang Thêm hay Sửa

// Hàm hút dữ liệu từ bảng lên Form
function hutDuLieuLenForm(sachJsonEncoded) {
    const sach = JSON.parse(decodeURIComponent(sachJsonEncoded));
    
    // Đổ dữ liệu vào các ô input
    document.getElementById('maDauSach').value = sach.maDauSach;
    document.getElementById('maDauSach').readOnly = true; // Không cho sửa Mã (vì nó là khóa chính)
    document.getElementById('maDauSach').style.backgroundColor = '#e9ecef';
    
    document.getElementById('tenSach').value = sach.tenSach || '';
    document.getElementById('tacGia').value = sach.tacGia || '';
    document.getElementById('theLoai').value = sach.theLoai || '';
    document.getElementById('nhaXuatBan').value = sach.nhaXuatBan || '';
    document.getElementById('namXuatBan').value = sach.namXuatBan || '';
    document.getElementById('hinhAnh').value = sach.hinhAnh || '';
    document.getElementById('moTa').value = sach.moTa || '';

    // Đổi giao diện Form sang chế độ Sửa
    isEditMode = true;
    const btnSubmit = document.querySelector('#formThemSach button[type="submit"]');
    btnSubmit.textContent = 'Lưu Cập Nhật';
    btnSubmit.style.backgroundColor = '#ffc107';
    btnSubmit.style.color = 'black';
    
    // Cuộn trang lên chỗ cái form cho Thủ thư thấy
    document.getElementById('formThemSach').scrollIntoView({ behavior: 'smooth' });
}

// Hàm Xóa Đầu Sách
async function xoaDauSach(maDauSach) {
    if (!confirm(`CẢNH BÁO: Bạn có chắc chắn muốn xóa toàn bộ Đầu sách ${maDauSach} không?`)) return;

    try {
        await apiFetch(`/api/dausach/${maDauSach}`, { method: 'DELETE' });
        alert("Đã xóa Đầu sách thành công!");
        taiDanhSachDauSach(); // Tải lại bảng
    } catch (error) {
        // Bắt lỗi khóa ngoại (nếu sách đang có người mượn hoặc có bản sao)
        alert("Không thể xóa! Sách này đang có Bản sao trong kho hoặc đang nằm trong lịch sử Mượn/Đặt trước của độc giả.\n\nChi tiết lỗi: " + error.message);
    }
}

// Hàm Reset Form về trạng thái Thêm Mới ban đầu
function resetFormDauSach() {
    document.getElementById('formThemSach').reset();
    document.getElementById('maDauSach').readOnly = false;
    document.getElementById('maDauSach').style.backgroundColor = '';
    
    isEditMode = false;
    const btnSubmit = document.querySelector('#formThemSach button[type="submit"]');
    btnSubmit.textContent = 'Thêm Đầu Sách';
    btnSubmit.style.backgroundColor = '#28a745';
    btnSubmit.style.color = 'white';
}
// 2. Xử lý Form Thêm Đầu Sách Mới
// Xử lý Form: Nhận diện tự động là đang Thêm mới hay Sửa
const formThemSach = document.getElementById('formThemSach');
if (formThemSach) {
    formThemSach.addEventListener('submit', async (e) => {
        e.preventDefault();

        const payload = {
            maDauSach: document.getElementById('maDauSach').value.trim(),
            tenSach: document.getElementById('tenSach').value.trim(),
            tacGia: document.getElementById('tacGia').value.trim(),
            theLoai: document.getElementById('theLoai').value.trim(),
            nhaXuatBan: document.getElementById('nhaXuatBan').value.trim(),
            namXuatBan: document.getElementById('namXuatBan').value ? parseInt(document.getElementById('namXuatBan').value) : null,
            hinhAnh: document.getElementById('hinhAnh').value.trim(),
            moTa: document.getElementById('moTa').value.trim()
        };

        try {
            if (isEditMode) {
                // ĐANG Ở CHẾ ĐỘ SỬA -> Gọi API PUT
                await apiFetch(`/api/dausach/${payload.maDauSach}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });
                alert('Đã CẬP NHẬT thông tin sách thành công!');
            } else {
                // ĐANG Ở CHẾ ĐỘ THÊM MỚI -> Gọi API POST
                await apiFetch('/api/dausach', {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
                alert('Đã THÊM Đầu Sách mới thành công!');
            }
            
            resetFormDauSach(); // Dọn dẹp trả form về như cũ
            taiDanhSachDauSach(); // Tải lại bảng ngay lập tức
            
        } catch (error) {
            alert('Lỗi thao tác: ' + error.message);
        }
    });
}
// 3. XỬ LÝ CỬA SỔ MODAL (BẢN SAO SÁCH)
let currentMaDauSach = ''; // Lưu tạm mã sách đang mở

function moModalBanSao(maDauSach, tenSach) {
    currentMaDauSach = maDauSach;
    document.getElementById('modalTitle').textContent = `Chi tiết bản sao: ${tenSach} (${maDauSach})`;
    document.getElementById('modalBanSao').style.display = 'flex'; // Hiển thị modal
    document.getElementById('inputMaVachMoi').value = ''; // Xóa ô nhập mã vạch cũ
    taiDanhSachBanSao(maDauSach);
}

function dongModal() {
    document.getElementById('modalBanSao').style.display = 'none'; // Ẩn modal
    currentMaDauSach = '';
}

// Hàm tải danh sách các bản sao (Mã vạch) của 1 cuốn sách
async function taiDanhSachBanSao(maDauSach) {
    const tbody = document.getElementById('bangChiTietBanSao');
    try {
        tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Đang tải mã vạch...</td></tr>';
        
        // Giả sử API lấy bản sao của bạn là /api/bansaosach/:maDauSach
        const data = await apiFetch(`/api/bansaosach/${maDauSach}`);
        const danhSach = Array.isArray(data) ? data : (data.data || []);
        
        tbody.innerHTML = '';
        if (danhSach.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Chưa có bản sao nào. Hãy nhập mã vạch mới!</td></tr>';
            return;
        }

        danhSach.forEach(banSao => {
            let trangThaiBadge = '';
            if (banSao.trangThai === 'CO_SAN') trangThaiBadge = '<span class="badge bg-cosan">Có sẵn</span>';
            else if (banSao.trangThai === 'DANG_MUON') trangThaiBadge = '<span class="badge bg-dangmuon">Đang mượn</span>';
            else trangThaiBadge = `<span class="badge bg-huhong">${banSao.trangThai}</span>`;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${banSao.maVach}</strong></td>
                <td>${trangThaiBadge}</td>
                <td>
                    <button class="btn-small" style="background-color: #dc3545;" onclick="xoaBanSao('${banSao.id || banSao.maVach}')">Xóa</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="3" style="color:red;text-align:center;">Không tải được dữ liệu bản sao.</td></tr>`;
    }
}

// Thêm mã vạch mới (Nhập kho 1 bản sao thực tế)
async function themBanSaoTuModal() {
    const maVach = document.getElementById('inputMaVachMoi').value.trim();
    if (!maVach) {
        alert("Vui lòng nhập Mã Vạch (Ví dụ: MV001, IT_001_1...)");
        return;
    }

    try {
        // Giả sử API thêm bản sao của bạn yêu cầu truyền maVach và maDauSach
        await apiFetch('/api/bansaosach', {
            method: 'POST',
            body: JSON.stringify({
                maVach: maVach,
                maDauSach: currentMaDauSach,
                trangThai: 'CO_SAN' // Sách mới nhập kho mặc định là có sẵn
            })
        });
        
        alert("Nhập bản sao thành công!");
        document.getElementById('inputMaVachMoi').value = ''; // Xóa trắng ô input
        
        // Tải lại danh sách bản sao trong Modal
        taiDanhSachBanSao(currentMaDauSach);
        // Tải lại cả bảng Đầu sách bên ngoài để cập nhật cột "Số lượng"
        taiDanhSachDauSach(); 
    } catch (error) {
        alert("Lỗi nhập bản sao: " + error.message);
    }
}

// --- LOGIC ĐĂNG XUẤT ---
function xuLyDangXuat() {
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', async () => {
            if(confirm("Bạn muốn đăng xuất khỏi tài khoản Thủ thư?")) {
                try {
                    await apiFetch('/api/logout', { method: 'POST' });
                    localStorage.clear();
                    window.location.href = 'login.html';
                } catch (err) {
                    alert("Lỗi đăng xuất");
                }
            }
        });
    }
}
// Hàm xóa bản sao
async function xoaBanSao(idBanSao) {
    if (!confirm("Bạn có chắc chắn muốn xóa bản sao (mã vạch) này khỏi kho không?")) return;

    try {
        // Gọi API xóa bản sao (dựa vào file route của bạn là DELETE /api/bansaosach/:id)
        await apiFetch(`/api/bansaosach/${idBanSao}`, { method: 'DELETE' });
        
        alert("Đã xóa bản sao thành công!");
        taiDanhSachBanSao(currentMaDauSach); // Tải lại danh sách trong Modal
        taiDanhSachDauSach(); // Tải lại bảng Đầu sách bên ngoài để cập nhật lại số lượng cuốn
    } catch (error) {
        alert("Lỗi xóa bản sao: " + error.message);
    }
}
// ==========================================
// QUẢN LÝ MƯỢN / TRẢ SÁCH
// ==========================================

// 1. Tải danh sách tất cả Phiếu Mượn
async function taiDanhSachPhieuMuon() {
    const tbody = document.getElementById('bangTatCaPhieuMuon');
    if (!tbody) return;

    try {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Đang tải danh sách...</td></tr>';
        
        const data = await apiFetch('/api/phieumuon/all');
        const danhSach = Array.isArray(data) ? data : (data.data || []);

        tbody.innerHTML = '';
        if (danhSach.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Chưa có phiếu mượn nào trong hệ thống.</td></tr>';
            return;
        }

        danhSach.forEach(item => {
            const ngayMuon = new Date(item.ngayMuon).toLocaleDateString('vi-VN');
            const hanTra = new Date(item.hanTra).toLocaleDateString('vi-VN');
            
            // Xử lý thông tin hiển thị (giả sử backend đã JOIN các bảng)
            const tenDocGia = item.hoTen || item.hoTenNguoiDung || `ID: ${item.docGiaId || item.nguoiDungId || 'Không rõ'}`;
            const tenSach = item.tenSach || 'Đang cập nhật';
            const maVach = item.maVach || 'Chưa rõ';

            let trangThaiHtml = '';
            if (item.trangThai === 'DANG_MUON') {
                trangThaiHtml = '<span class="badge bg-dangmuon">Đang mượn</span>';
            } else if (item.trangThai === 'DA_TRA') {
                trangThaiHtml = '<span class="badge bg-cosan">Đã trả</span>';
            } else if (item.trangThai === 'QUAHAN' || item.trangThai === 'QUA_HAN') {
                trangThaiHtml = '<span class="badge bg-huhong">Quá hạn</span>';
            }

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>#${item.id || item.maPhieu}</strong></td>
                <td>${tenDocGia}</td>
                <td>${tenSach} <br><small style="color: #666;">(${maVach})</small></td>
                <td>${ngayMuon}</td>
                <td style="${item.trangThai === 'QUA_HAN' ? 'color: red; font-weight: bold;' : ''}">${hanTra}</td>
                <td>${trangThaiHtml}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="6" style="color:red;text-align:center;">Lỗi tải phiếu mượn: ${error.message}</td></tr>`;
    }
}

// 2. Xử lý nút "Tạo Phiếu Mượn"
async function xuLyMuonSach() {
    const maVach = document.getElementById('muon_maVach').value.trim();
    const nguoiDungId = document.getElementById('muon_nguoiDungId').value.trim();

    if (!maVach || !nguoiDungId) {
        alert("Vui lòng nhập đầy đủ Mã vạch của sách và ID của Độc giả!");
        return;
    }

    try {
        // Gửi yêu cầu Mượn xuống Backend
        await apiFetch('/api/phieumuon', {
            method: 'POST',
            body: JSON.stringify({
                maVach: maVach,
                docGiaId: parseInt(nguoiDungId) // ĐỔI TỪ nguoiDungId THÀNH docGiaId
            })
        });

        alert("Tạo Phiếu Mượn thành công! Sách đã được giao cho độc giả.");
        
        // Xóa trắng ô nhập liệu
        document.getElementById('muon_maVach').value = '';
        document.getElementById('muon_nguoiDungId').value = '';
        
        // Tải lại bảng để thấy phiếu mượn mới
        taiDanhSachPhieuMuon(); 
    } catch (error) {
        alert("Lỗi khi mượn sách: " + error.message);
    }
}

// 3. Xử lý nút "Ghi nhận Trả Sách"
async function xuLyTraSach() {
    const maVach = document.getElementById('tra_maVach').value.trim();

    if (!maVach) {
        alert("Vui lòng nhập Mã vạch của cuốn sách cần trả!");
        return;
    }

    try {
        // Gửi yêu cầu Trả sách (Ví dụ API: PUT /api/phieumuon/tra)
        await apiFetch('/api/phieumuon/tra', {
            method: 'PUT',
            body: JSON.stringify({ maVach: maVach })
        });

        alert("Ghi nhận Trả Sách thành công! Sách đã được nhập lại vào kho.");
        document.getElementById('tra_maVach').value = '';
        taiDanhSachPhieuMuon();
    } catch (error) {
        alert("Lỗi khi trả sách: " + error.message);
    }
}