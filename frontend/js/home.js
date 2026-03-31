let toanBoSach = []; 
let danhSachDaLoc = []; // Thêm biến này để lưu danh sách sách sau khi tìm kiếm/lọc
const SACH_MOI_TRANG = 8; // Số lượng sách muốn hiển thị trên 1 trang (bạn có thể đổi thành 10, 12 tùy ý)

document.addEventListener('DOMContentLoaded', () => {
    hienThiLoiChao();
    hienThiThongTinTaiKhoan();
    taiDanhSachSach();
    taiTrangThaiMuon();
    setupTimKiem();
});

// =====================================
// 1. TẢI VÀ HIỂN THỊ SÁCH (CÓ PHÂN TRANG)
// =====================================
async function taiDanhSachSach() {
    const grid = document.getElementById('bookGrid');
    if (!grid) return;

    try {
        grid.innerHTML = "<p style='width:100%; text-align:center;'>Đang tải danh sách sách...</p>";
        
        const data = await apiFetch('/api/dausach');
        toanBoSach = Array.isArray(data) ? data : (data.data || []);
        danhSachDaLoc = [...toanBoSach]; // Ban đầu, danh sách lọc chính là toàn bộ sách
        
        hienThiDanhSachSach(danhSachDaLoc, 1); // Hiển thị trang 1
        hienThiGoiY(); 
    } catch (error) {
        grid.innerHTML = `<p style="color:red; width: 100%; text-align: center;">Lỗi tải sách: ${error.message}</p>`;
    }
}

// Hàm hiển thị sách (đã thêm tham số trangHienTai)
function hienThiDanhSachSach(danhSach, trangHienTai = 1) {
    const grid = document.getElementById('bookGrid');
    const paginationContainer = document.getElementById('paginationContainer');
    if (!grid) return;

    grid.innerHTML = '';
    
    if (danhSach.length === 0) {
        grid.innerHTML = '<p style="text-align:center; width: 100%; color:#666; padding: 20px;">Không tìm thấy cuốn sách nào phù hợp.</p>';
        if (paginationContainer) paginationContainer.innerHTML = '';
        return;
    }

    // --- LOGIC CẮT MẢNG ĐỂ PHÂN TRANG ---
    const startIndex = (trangHienTai - 1) * SACH_MOI_TRANG;
    const endIndex = startIndex + SACH_MOI_TRANG;
    const sachTrenTrang = danhSach.slice(startIndex, endIndex);

    // Vẽ sách của trang hiện tại
    sachTrenTrang.forEach(sach => {
        let soLuongCoSan = 0;
        if (sach.soLuongCoSan !== undefined && sach.soLuongCoSan !== null) {
            soLuongCoSan = parseInt(sach.soLuongCoSan);
        } else {
            soLuongCoSan = 0; 
        }
        
        const hetSach = soLuongCoSan <= 0;
        
        let nutHanhDong = '';
        if (hetSach) {
            nutHanhDong = `<button onclick="xuLyDatTruoc('${sach.maDauSach}', '${sach.tenSach}')" style="width: 100%; padding: 8px; border:none; background:#fef08a; color:#854d0e; font-weight:bold; border-radius: 6px; cursor:pointer;">Đặt trước</button>`;
        } else {
            nutHanhDong = `<button onclick="thongBaoDenThuVien('${sach.tenSach}')" style="width: 100%; padding: 8px; border:none; background:#d1fae5; color:#065f46; border-radius: 6px; cursor:pointer; font-weight: 500;">Có sẵn</button>`;
        }

        const div = document.createElement('div');
        div.className = "book-card";
        div.style.cssText = "background: white; padding: 15px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); display: flex; flex-direction: column; transition: transform 0.2s; cursor: pointer;";
        
        div.onmouseover = () => div.style.transform = "translateY(-4px)";
        div.onmouseout = () => div.style.transform = "translateY(0)";

        div.innerHTML = `
            <div onclick="window.location.href='chitietsach.html?id=${sach.maDauSach}'" style="display: flex; flex-direction: column; flex-grow: 1; text-decoration: none; color: inherit;">
                <img src="${sach.hinhAnh || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200'}" alt="${sach.tenSach}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="margin: 0 0 5px 0; font-size: 16px;">${sach.tenSach}</h4>
                <p style="margin: 0 0 15px 0; color: #666; font-size: 13px; flex-grow: 1;">${sach.tacGia || 'Không rõ'}</p>
            </div>
            ${nutHanhDong}
        `;
        grid.appendChild(div);
    });

    // Vẽ các nút phân trang
    veNutPhanTrang(danhSach.length, trangHienTai);
}

// =====================================
// Hàm vẽ các nút < 1 2 3 > 
// =====================================
function veNutPhanTrang(tongSoSach, trangHienTai) {
    const container = document.getElementById('paginationContainer');
    if (!container) return;
    
    container.innerHTML = ''; // Xóa nút cũ
    const tongSoTrang = Math.ceil(tongSoSach / SACH_MOI_TRANG);
    
    if (tongSoTrang <= 1) return; // Có 1 trang thì khỏi cần nút

    // Nút Prev (<)
    const btnPrev = document.createElement('button');
    btnPrev.innerHTML = '‹';
    btnPrev.style.cssText = `padding: 6px 14px; font-size: 16px; border: 1px solid #cbd5e1; border-radius: 6px; background: ${trangHienTai === 1 ? '#f8fafc' : 'white'}; color: ${trangHienTai === 1 ? '#94a3b8' : '#0f172a'}; cursor: ${trangHienTai === 1 ? 'not-allowed' : 'pointer'};`;
    btnPrev.disabled = trangHienTai === 1;
    btnPrev.onclick = () => hienThiDanhSachSach(danhSachDaLoc, trangHienTai - 1);
    container.appendChild(btnPrev);

    // Các nút số trang
    for (let i = 1; i <= tongSoTrang; i++) {
        const btn = document.createElement('button');
        btn.innerHTML = i;
        const isActive = (i === trangHienTai);
        btn.style.cssText = `padding: 6px 14px; font-size: 14px; border: 1px solid ${isActive ? '#3b82f6' : '#cbd5e1'}; border-radius: 6px; background: ${isActive ? '#3b82f6' : 'white'}; color: ${isActive ? 'white' : '#0f172a'}; cursor: pointer; font-weight: ${isActive ? 'bold' : 'normal'};`;
        btn.onclick = () => hienThiDanhSachSach(danhSachDaLoc, i);
        container.appendChild(btn);
    }

    // Nút Next (>)
    const btnNext = document.createElement('button');
    btnNext.innerHTML = '›';
    btnNext.style.cssText = `padding: 6px 14px; font-size: 16px; border: 1px solid #cbd5e1; border-radius: 6px; background: ${trangHienTai === tongSoTrang ? '#f8fafc' : 'white'}; color: ${trangHienTai === tongSoTrang ? '#94a3b8' : '#0f172a'}; cursor: ${trangHienTai === tongSoTrang ? 'not-allowed' : 'pointer'};`;
    btnNext.disabled = trangHienTai === tongSoTrang;
    btnNext.onclick = () => hienThiDanhSachSach(danhSachDaLoc, trangHienTai + 1);
    container.appendChild(btnNext);
}

// =====================================
// 2. CÁC HÀM XỬ LÝ NÚT BẤM (CỦA BẠN)
// =====================================
function thongBaoDenThuVien(tenSach) {
    alert(`Cuốn "${tenSach}" hiện đang có sẵn trên kệ!\n\nVui lòng mang theo Thẻ Độc Giả đến quầy thủ thư để mượn sách trực tiếp nhé.`);
}

async function xuLyDatTruoc(maDauSach, tenSach) {
    const xacNhan = confirm(`Bạn có muốn yêu cầu đặt trước cuốn "${tenSach}" không?`);
    if (!xacNhan) return;

    try {
        const result = await apiFetch('/api/dattruoc', {
            method: 'POST',
            body: JSON.stringify({ maDauSach: maDauSach })
        });

        alert("🎉 Đặt trước thành công! Hệ thống đã ghi nhận yêu cầu của bạn.");
        taiDanhSachSach(); // Tải lại để cập nhật số lượng
    } catch (error) {
        alert("Không thể đặt trước: " + error.message);
    }
}

function dangXuat() {
    if (confirm("Bạn có chắc chắn muốn thoát khỏi hệ thống?")) {
        localStorage.removeItem('user');
        localStorage.removeItem('vaiTro');
        window.location.href = 'login.html';
    }
}

// =====================================
// 3. TÌM KIẾM & LỌC (KHÁM PHÁ THỂ LOẠI)
// =====================================
function setupTimKiem() {
    const input = document.getElementById('searchInput');
    if (input) {
        input.addEventListener('input', (e) => {
            const tuKhoa = e.target.value.toLowerCase().trim();
            // Cập nhật biến danhSachDaLoc thay vì tạo biến cục bộ
            danhSachDaLoc = toanBoSach.filter(sach => 
                (sach.tenSach && sach.tenSach.toLowerCase().includes(tuKhoa)) ||
                (sach.tacGia && sach.tacGia.toLowerCase().includes(tuKhoa)) ||
                (sach.maDauSach && sach.maDauSach.toLowerCase().includes(tuKhoa))
            );
            hienThiDanhSachSach(danhSachDaLoc, 1); // <--- Trả về trang 1
        });
    }
}

window.locTheoTheLoai = function(theLoai, element) {
    document.querySelectorAll('#danhMucTags .tag').forEach(tag => tag.style.backgroundColor = '#f1f5f9');
    element.style.backgroundColor = '#dbeafe';

    if (theLoai === 'Tất cả') {
        danhSachDaLoc = [...toanBoSach];
    } else {
        danhSachDaLoc = toanBoSach.filter(sach => sach.theLoai && sach.theLoai.includes(theLoai));
    }
    hienThiDanhSachSach(danhSachDaLoc, 1); // <--- Trả về trang 1
}

// =====================================
// 4. GỢI Ý SÁCH RANDOM (CỘT PHẢI)
// =====================================
window.hienThiGoiY = function() {
    const container = document.getElementById('goiYSachContainer');
    if (!container || toanBoSach.length === 0) return;

    const shuffled = [...toanBoSach].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 2);

    container.innerHTML = '';
    selected.forEach(sach => {
        container.innerHTML += `
            <div onclick="window.location.href='chitietsach.html?id=${sach.maDauSach}'" style="display: flex; gap: 10px; margin-bottom: 15px; align-items: center; cursor: pointer; transition: opacity 0.2s;" onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">
                <img src="${sach.hinhAnh || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100'}" style="width: 50px; height: 70px; object-fit: cover; border-radius: 4px;">
                <div>
                    <h5 style="margin: 0 0 5px 0; font-size: 14px; color: #007bff;">${sach.tenSach}</h5>
                    <p style="margin: 0; font-size: 12px; color: #666;">${sach.tacGia || 'Không rõ'}</p>
                </div>
            </div>
        `;
    });
}

// =====================================
// 5. TRẠNG THÁI SÁCH ĐANG MƯỢN (CỘT PHẢI)
// =====================================
async function taiTrangThaiMuon() {
    const box = document.getElementById('trangThaiMuonBox');
    if (!box) return;

    try {
        const data = await apiFetch('/api/phieumuon/my');
        const lichSu = Array.isArray(data) ? data : (data.data || []);
        
        const sachDangGiu = lichSu.filter(item => item.trangThai === 'DANG_MUON' || item.trangThai === 'QUA_HAN');

        if (sachDangGiu.length === 0) {
            box.innerHTML = `
                <div style="text-align: center; padding: 10px 0;">
                    <i class="fa-solid fa-book-open" style="font-size: 24px; color: #cbd5e1; margin-bottom: 10px;"></i>
                    <p style="margin: 0; font-size: 13px; color: #64748b;">Bạn hiện không giữ cuốn sách nào của thư viện.</p>
                </div>`;
            return;
        }

        const cuonSapHan = sachDangGiu.reduce((a, b) => new Date(a.hanTra) < new Date(b.hanTra) ? a : b);
        const hanTra = new Date(cuonSapHan.hanTra);
        const homNay = new Date();
        const soNgayConLai = Math.ceil((hanTra - homNay) / (1000 * 60 * 60 * 24));

        let canhBaoHtml = '';
        if (soNgayConLai < 0) {
            canhBaoHtml = `<span style="color: #dc3545; font-weight: bold;">Đã quá hạn ${Math.abs(soNgayConLai)} ngày!</span>`;
        } else if (soNgayConLai <= 2) {
            canhBaoHtml = `<span style="color: #d97706; font-weight: bold;">Sắp đến hạn (còn ${soNgayConLai} ngày)</span>`;
        } else {
            canhBaoHtml = `<span style="color: #28a745;">Còn ${soNgayConLai} ngày</span>`;
        }

        box.innerHTML = `
            <div style="background: #f8fafc; padding: 12px; border-radius: 8px;">
                <p style="margin: 0 0 5px 0; font-size: 13px; color: #475569;">Bạn đang giữ <strong>${sachDangGiu.length}</strong> cuốn sách.</p>
                <div style="border-top: 1px dashed #cbd5e1; padding-top: 10px; margin-top: 10px;">
                    <p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b;">Chú ý nhất:</p>
                    <strong style="display: block; font-size: 14px; margin-bottom: 5px;">${cuonSapHan.tenSach || 'Sách không rõ'}</strong>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
                        <span>Hạn: ${hanTra.toLocaleDateString('vi-VN')}</span>
                        ${canhBaoHtml}
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        box.innerHTML = `<p style="color:red; font-size: 13px;">Không thể tải trạng thái.</p>`;
    }
}

// =====================================
// 6. GIAO DIỆN CHUNG (CỦA BẠN)
// =====================================
function hienThiLoiChao() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
        try {
            const user = JSON.parse(userStr);
            const greetingElement = document.getElementById("hero-greeting");
            if (greetingElement && user.hoTen) {
                greetingElement.textContent = `Chào mừng bạn trở lại, ${user.hoTen}!`;
            }
        } catch (error) {
            console.error("Lỗi đọc thông tin user:", error);
        }
    }
}

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