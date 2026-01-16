# KỊCH BẢN USE CASE (CHUẨN HÓA)

## USE CASE: MƯỢN SÁCH BẰNG NHẬN DIỆN KHUÔN MẶT (FACE-ID BORROWING)

---

## 1. Thông tin định danh

* **Mã Use Case:** UC-BORROW-FACE
* **Tên Use Case:** Mượn sách bằng nhận diện khuôn mặt
* **Actor chính:** Bạn đọc
* **Actor hỗ trợ:** Hệ thống nhận diện khuôn mặt (AI Vision), Hệ thống RFID & Cổng an ninh
* **Mô tả:** Use Case cho phép bạn đọc mượn sách tại trạm tự động (Kiosk) thông qua công nghệ nhận diện khuôn mặt và RFID, không cần thẻ thư viện, giấy tờ hoặc điện thoại.
* **Mức độ:** Quan trọng (Core Use Case)

---

## 2. Điều kiện tiên quyết (Pre-condition)

* Bạn đọc đã đăng ký thông tin sinh trắc học (Face-ID) trong hệ thống.
* Tài khoản bạn đọc đang ở trạng thái hợp lệ (không bị khóa, không nợ sách/phí).
* Các đầu sách đã được gắn chip RFID và sẵn sàng cho mượn.
* Trạm mượn sách tự động (Kiosk) hoạt động bình thường.

---

## 3. Điều kiện hậu (Post-condition)

* Trạng thái các đầu sách được cập nhật từ **"Sẵn có"** sang  **"Đang mượn"** .
* Hồ sơ bạn đọc được cập nhật danh sách sách đã mượn và ngày hẹn trả.
* Hệ thống an ninh cho phép các đầu sách đã mượn đi qua cổng từ.

---

## 4. Luồng sự kiện chính (Main Success Scenario)

| Bước | Hành động của Bạn đọc                                             | Phản hồi của Hệ thống                                                                |
| ------ | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| 1      | Đứng trước trạm mượn sách tự động                             | Cảm biến chuyển động kích hoạt camera nhận diện khuôn mặt                      |
| 2      | Nhìn vào camera và thực hiện hành động xác thực theo yêu cầu | Hệ thống AI xác thực danh tính và hiển thị lời chào cá nhân hóa              |
| 3      | Đặt các cuốn sách cần mượn lên khay cảm biến                  | Hệ thống RFID quét đồng thời các chip và hiển thị danh sách sách              |
| 4      | Kiểm tra danh sách và chọn**Xác nhận mượn**                | Hệ thống kiểm tra hạn mức mượn và tình trạng bạn đọc                         |
| 5      | Rời trạm mượn cùng sách                                            | Hệ thống ghi nhận giao dịch, gửi biên lai điện tử và hiển thị ngày hẹn trả |

---

## 5. Luồng ngoại lệ / Luồng thay thế (Alternative & Exception Flows)

### 5.1 Không nhận diện được khuôn mặt

* Hệ thống yêu cầu bạn đọc điều chỉnh tư thế hoặc tháo khẩu trang/kính.
* Sau 3 lần thất bại, hệ thống chuyển sang phương thức xác thực thay thế (QR Code / quầy thủ thư).

### 5.2 Vượt quá hạn mức mượn

* Hệ thống hiển thị thông báo vượt quá số lượng sách cho phép.
* Yêu cầu bạn đọc bỏ bớt sách để tiếp tục giao dịch.

### 5.3 Sách gặp lỗi kỹ thuật (RFID hỏng)

* Hệ thống đánh dấu cuốn sách lỗi và hiển thị thông báo.
* Yêu cầu bạn đọc mang sách đến quầy thủ thư để được hỗ trợ.

### 5.4 Người dùng chưa đăng ký

* Hệ thống thông báo không tìm thấy thông tin bạn đọc.
* Đề xuất đăng ký thành viên mới hoặc chuyển đến quầy hỗ trợ.

---

## 6. Quy tắc nghiệp vụ (Business Rules)

* Mỗi bạn đọc chỉ được mượn tối đa số lượng sách theo quy định thư viện.
* Không cho phép mượn sách khi tài khoản đang bị khóa hoặc còn sách quá hạn.
* Không cho phép sách chưa được xác nhận mượn đi qua cổng an ninh.

---

## 7. Quy tắc bảo mật (Security Rules)

* Hệ thống sử dụng cơ chế chống giả mạo (Anti-Spoofing) bằng camera 3D.
* Dữ liệu khuôn mặt được lưu trữ dưới dạng đặc trưng số đã mã hóa (không lưu ảnh gốc).
* Mọi giao dịch mượn sách đều được ghi log để phục vụ kiểm tra.

---

## 8. Ghi chú

* Use Case này là phiên bản tự động hóa nâng cao của Use Case  **Mượn sách truyền thống** .
* Có thể mở rộng tích hợp trợ lý ảo giọng nói hoặc gợi ý sách thông minh trong các phiên bản sau.

---

## 9. Kết luận

Use Case **Mượn sách bằng nhận diện khuôn mặt** giúp nâng cao trải nghiệm người dùng, giảm tải cho thủ thư và tăng mức độ tự động hóa trong hệ thống quản lý thư viện hiện đại, đồng thời vẫn đảm bảo an ninh và tính toàn vẹn dữ liệu.
