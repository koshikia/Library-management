## 1. Phạm vi hệ thống (Scope)

Hệ thống **Website Quản lý Thư viện** được xây dựng nhằm hỗ trợ số hóa và tự động hóa các hoạt động quản lý thư viện, thay thế cho các quy trình thủ công truyền thống. Hệ thống phục vụ cho **thư viện bên ngoài** (không giới hạn trong phạm vi trường học), cho phép nhiều nhóm người dùng truy cập và sử dụng thông qua trình duyệt web.

Phạm vi của hệ thống bao gồm các chức năng chính sau:

- **Quản lý tài nguyên thư viện**
  - Quản lý sách, tài liệu (thêm, sửa, xóa, tra cứu)
  - Quản lý danh mục, thể loại, tác giả, nhà xuất bản
  - Theo dõi tình trạng sách (còn, đang mượn, hỏng, mất)

- **Quản lý người dùng**
  - Quản lý thông tin độc giả
  - Phân quyền sử dụng theo vai trò (độc giả, thủ thư, quản trị viên)

- **Quản lý mượn – trả**
  - Đăng ký mượn sách
  - Xác nhận mượn – trả sách
  - Gia hạn mượn sách
  - Theo dõi lịch sử mượn – trả và tình trạng quá hạn

- **Tra cứu và hỗ trợ**
  - Tìm kiếm sách theo nhiều tiêu chí
  - Thông báo tình trạng mượn sách, quá hạn, phí phạt (nếu có)

Hệ thống **không** bao gồm:
- Quản lý mua sắm sách từ nhà cung cấp
- Thanh toán trực tuyến (có thể mở rộng trong tương lai)
- Quản lý kho vật lý chi tiết (vị trí kệ nâng cao)

---

## 2. Đối tượng sử dụng hệ thống (Intended Users)

Hệ thống được thiết kế để phục vụ ba nhóm người dùng chính, mỗi nhóm có quyền hạn và chức năng riêng biệt.

### 2.1. Độc giả

Độc giả là người sử dụng thư viện để tra cứu và mượn tài liệu.

**Chức năng chính:**
- Đăng ký và đăng nhập tài khoản
- Tra cứu, tìm kiếm sách và tài liệu
- Xem thông tin chi tiết sách
- Gửi yêu cầu mượn sách
- Xem danh sách sách đang mượn và lịch sử mượn – trả
- Gia hạn mượn sách (nếu được phép)
- Nhận thông báo về hạn trả sách

---

### 2.2. Thủ thư

Thủ thư là người trực tiếp quản lý hoạt động hằng ngày của thư viện.

**Chức năng chính:**
- Quản lý thông tin sách và tài liệu
- Quản lý danh mục, thể loại, tác giả
- Xác nhận yêu cầu mượn – trả sách
- Cập nhật tình trạng sách
- Quản lý thông tin độc giả
- Theo dõi các trường hợp mượn quá hạn
- Lập báo cáo thống kê

---

### 2.3. Quản trị viên (Administrator)

Quản trị viên là người quản lý toàn bộ hệ thống và chịu trách nhiệm vận hành kỹ thuật.

**Chức năng chính:**
- Quản lý tài khoản người dùng và phân quyền
- Quản lý cấu hình hệ thống
- Theo dõi nhật ký hệ thống
- Sao lưu và phục hồi dữ liệu
- Đảm bảo an toàn và bảo mật hệ thống
