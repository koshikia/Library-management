# CHƯƠNG 4. ĐẶC TẢ USE CASE HỆ THỐNG QUẢN LÝ THƯ VIỆN

---

## 4.1. Giới thiệu chương

Chương này trình bày chi tiết các **Use Case** của hệ thống Quản lý Thư viện. Mỗi Use Case được đặc tả đầy đủ nhằm mô tả rõ ràng cách thức tương tác giữa **Actor** và  **hệ thống** , giúp làm cơ sở cho việc thiết kế, cài đặt và kiểm thử hệ thống sau này.

Các Use Case chính bao gồm:

* Đăng nhập
* Quản lý sách
* Mượn sách
* Trả sách
* Tìm kiếm sách
* Quản lý bạn đọc

---

## 4.2. Đặc tả Use Case: Đăng nhập

* **Tên Use Case:** Đăng nhập
* **Actor:** Bạn đọc, Thủ thư, Quản trị viên
* **Mô tả:** Cho phép người dùng truy cập hệ thống thông qua tài khoản hợp lệ.
* **Điều kiện tiên quyết:** Người dùng đã được cấp tài khoản.
* **Hậu điều kiện:** Người dùng đăng nhập thành công và truy cập các chức năng tương ứng với quyền hạn.

### Luồng sự kiện chính

1. Người dùng mở giao diện đăng nhập.
2. Nhập tên đăng nhập và mật khẩu.
3. Hệ thống kiểm tra thông tin đăng nhập.
4. Hệ thống xác thực thành công.
5. Người dùng được chuyển vào trang chính.

### Luồng thay thế

* 3a. Thông tin đăng nhập sai → Hệ thống thông báo lỗi và yêu cầu nhập lại.
* 3b. Tài khoản không tồn tại → Hệ thống thông báo.

---

## 4.3. Đặc tả Use Case: Quản lý sách

* **Tên Use Case:** Quản lý sách
* **Actor:** Thủ thư, Quản trị viên
* **Mô tả:** Cho phép quản lý thông tin sách trong thư viện.
* **Điều kiện tiên quyết:** Actor đã đăng nhập với quyền quản lý.
* **Hậu điều kiện:** Thông tin sách được cập nhật trong cơ sở dữ liệu.

### Luồng sự kiện chính

1. Actor chọn chức năng Quản lý sách.
2. Chọn thao tác: Thêm, sửa hoặc xóa sách.
3. Nhập hoặc chỉnh sửa thông tin sách.
4. Hệ thống kiểm tra tính hợp lệ của dữ liệu.
5. Hệ thống lưu thông tin vào cơ sở dữ liệu.

### Luồng thay thế

* 4a. Dữ liệu không hợp lệ → Hệ thống yêu cầu nhập lại.

---

## 4.4. Đặc tả Use Case: Mượn sách

* **Tên Use Case:** Mượn sách
* **Actor:** Bạn đọc, Thủ thư
* **Mô tả:** Ghi nhận quá trình mượn sách của bạn đọc.
* **Điều kiện tiên quyết:** Bạn đọc có tài khoản hợp lệ và chưa vượt quá số sách cho phép.
* **Hậu điều kiện:** Phiếu mượn được tạo, trạng thái sách chuyển sang “Đang mượn”.

### Luồng sự kiện chính

1. Bạn đọc tìm kiếm và chọn sách cần mượn.
2. Gửi yêu cầu mượn sách.
3. Hệ thống kiểm tra tình trạng sách.
4. Hệ thống lập phiếu mượn.
5. Cập nhật trạng thái sách.

### Luồng thay thế

* 3a. Sách đã hết → Thông báo không thể mượn.
* 3b. Bạn đọc vượt quá số lượng sách cho phép → Thông báo.

---

## 4.5. Đặc tả Use Case: Trả sách

* **Tên Use Case:** Trả sách
* **Actor:** Bạn đọc, Thủ thư
* **Mô tả:** Ghi nhận việc trả sách của bạn đọc.
* **Điều kiện tiên quyết:** Sách đang trong trạng thái “Đang mượn”.
* **Hậu điều kiện:** Sách được cập nhật trạng thái “Có sẵn”.

### Luồng sự kiện chính

1. Actor chọn chức năng Trả sách.
2. Nhập thông tin phiếu mượn.
3. Hệ thống xác nhận thông tin.
4. Cập nhật trạng thái sách.
5. Hoàn tất quá trình trả sách.

### Luồng thay thế

* 3a. Trả sách quá hạn → Hệ thống tính tiền phạt (nếu có).

---

## 4.6. Đặc tả Use Case: Tìm kiếm sách

* **Tên Use Case:** Tìm kiếm sách
* **Actor:** Bạn đọc, Thủ thư
* **Mô tả:** Cho phép tìm kiếm sách theo nhiều tiêu chí khác nhau.
* **Điều kiện tiên quyết:** Không có.
* **Hậu điều kiện:** Hiển thị danh sách sách phù hợp.

### Luồng sự kiện chính

1. Actor nhập từ khóa tìm kiếm.
2. Chọn tiêu chí tìm kiếm (tên sách, tác giả, thể loại…).
3. Hệ thống xử lý truy vấn.
4. Hiển thị kết quả tìm kiếm.

### Luồng thay thế

* 4a. Không có kết quả → Thông báo cho người dùng.

---

## 4.7. Đặc tả Use Case: Quản lý bạn đọc

* **Tên Use Case:** Quản lý bạn đọc
* **Actor:** Thủ thư, Quản trị viên
* **Mô tả:** Quản lý thông tin cá nhân của bạn đọc trong hệ thống.
* **Điều kiện tiên quyết:** Actor đăng nhập với quyền quản lý.
* **Hậu điều kiện:** Thông tin bạn đọc được cập nhật trong cơ sở dữ liệu.

### Luồng sự kiện chính

1. Actor chọn chức năng Quản lý bạn đọc.
2. Thực hiện thao tác thêm, sửa hoặc xóa bạn đọc.
3. Hệ thống kiểm tra dữ liệu nhập vào.
4. Lưu thông tin vào cơ sở dữ liệu.

### Luồng thay thế

* 3a. Dữ liệu không hợp lệ → Yêu cầu nhập lại.

---

## 4.8. Kết luận chương

Chương 5 đã trình bày chi tiết các Use Case của hệ thống Quản lý Thư viện. Các đặc tả này là cơ sở quan trọng để xây dựng các sơ đồ UML chi tiết hơn, đồng thời hỗ trợ cho quá trình thiết kế, triển khai và kiểm thử hệ thống trong các giai đoạn tiếp theo.
