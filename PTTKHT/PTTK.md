### 1. Mục tiêu của hệ thống

Hệ thống quản lý thư viện được xây dựng nhằm:

* Tin học hóa công tác quản lý thư viện.
* Giảm thời gian và công sức cho cán bộ thư viện.
* Quản lý chính xác, hiệu quả sách, độc giả và các hoạt động mượn – trả.
* Nâng cao chất lượng phục vụ bạn đọc.

### 2. Đối tượng sử dụng hệ thống

* **Quản trị viên (Admin):** Quản lý toàn bộ hệ thống, người dùng và dữ liệu.
* **Thủ thư:** Thực hiện các nghiệp vụ quản lý sách, độc giả, mượn – trả.
* **Độc giả:** Tra cứu thông tin sách, theo dõi lịch sử mượn (nếu có).

### 3. Yêu cầu chức năng

#### 3.1. Quản lý người dùng

* Đăng nhập, đăng xuất hệ thống.
* Phân quyền người dùng (Admin, Thủ thư, Độc giả).
* Thêm, sửa, xóa thông tin người dùng.

#### 3.2. Quản lý sách

* Thêm mới sách (mã sách, tên sách, tác giả, thể loại, năm xuất bản, số lượng).
* Cập nhật thông tin sách.
* Xóa sách khỏi hệ thống.
* Tìm kiếm sách theo tên, tác giả, thể loại.

#### 3.3. Quản lý độc giả

* Thêm, sửa, xóa thông tin độc giả.
* Quản lý thẻ thư viện (mã độc giả, ngày cấp, ngày hết hạn).
* Tìm kiếm độc giả theo tên hoặc mã độc giả.

#### 3.4. Quản lý mượn – trả sách

* Lập phiếu mượn sách.
* Ghi nhận trả sách.
* Kiểm tra tình trạng sách (đang mượn, còn trong kho).
* Tính số ngày mượn và xử lý trễ hạn (nếu có).

#### 3.5. Báo cáo – thống kê

* Thống kê số lượng sách trong thư viện.
* Thống kê sách đang được mượn.
* Thống kê độc giả mượn sách nhiều nhất.
* Xuất báo cáo theo thời gian (ngày, tháng, năm).

### 4. Yêu cầu phi chức năng

#### 4.1. Yêu cầu về hiệu năng

* Hệ thống phản hồi nhanh với các thao tác tìm kiếm và cập nhật.
* Đảm bảo hoạt động ổn định với nhiều người dùng cùng lúc.

#### 4.2. Yêu cầu về bảo mật

* Bảo mật thông tin người dùng và dữ liệu thư viện.
* Phân quyền rõ ràng, người dùng chỉ được truy cập chức năng được cấp phép.

#### 4.3. Yêu cầu về giao diện

* Giao diện thân thiện, dễ sử dụng.
* Hỗ trợ tiếng Việt.
* Bố cục rõ ràng, dễ thao tác.

#### 4.4. Yêu cầu về khả năng mở rộng

* Dễ dàng nâng cấp, bổ sung chức năng trong tương lai.
* Có thể tích hợp với hệ thống khác nếu cần.

### 5. Yêu cầu về công nghệ

* Ngôn ngữ lập trình: HTML, CSS, JS, Express.
* Cơ sở dữ liệu: MongoDB, MySQL.
* Môi trường triển khai: Web
* Sever: NodeJS.

### I. Các tác nhân của hệ thống

#### 1. Quản trị viên

* Vai trò: Quản lý toàn bộ hệ thống
* Quyền hạn:
  + Quản lý tài khoản thủ thư và người dùng.
  + Phân quyền hệ thống.
  + Cấu hình quy định thư viện (số sách được mượn, số ngày mượn, mức phạt ...).
  + Xem báo cáo, thống kê tổng hợp.
  + Sao lưu và phục hồi dữ liệu.

#### 2. Thủ thư

* Vai trò: Quản lý nghiệp vụ thư viện hàng ngày
* Quyền hạn:
  + Quản lý đầu sách (thêm, sửa, xóa sách).
  + Quản lý bản sao sách (số lượng, vị trí)
  + Quản lý độc giả.
  + Thực hiện mượn - trả sách.
  + Gia hạn mượn sách.
  + Tính và thu tiền phạt.
  + Lập báo cáo thống kê

#### 3. Độc giả

* Vai trò: Người sử dụng dịch vụ thư viện
* Quyền hạn:

  + Đăng ký tài khoản.
  + Tra cứu sách.
  + Xem tình trạng sách.
  + Mượn sách.
  + Trả sách.
  + Xem lịch sử mượn - trả.
  + Xem tiền phạt (nếu có).

### II. Phân tích chi tiết hệ thống

#### 1. Chức năng quản lý người dùng

##### 1.1 Quản lý tài khoản

* Đăng ký tài khoản độc giả.
* Đăng nhập/ đăng xuất.
* Cập nhật thông tin cá nhân.
* Khóa/ mở khóa tài khoản.

##### 1.2 Phân quyền

* Quyền hạn:
  + Admin: Toàn quyền.
  + Thủ thư: Nghiệp vụ thư viện.
  + Độc giả: Tra cứu, mượn, trả.

#### 2. Chức năng quản lý sách

##### 2.1 Quản lý đầu sách

* Hệ thống quản lý thông tin ở mức đầu sách, bao gồm:
  + Mã đầu sách.
  + Tên sách.
  + Tác giả.
  + Thể loại.
  + Nhà xuất bản.
  + Năm xuất bản.
  + Mô tả nội dung.
* Một đầu sách có thể có nhiều bản sao với trạng thái khác nhau.

##### 2.2 Quản lý bản sao sách

* Hệ thống quản lý chi tiết từng bản sao của một đầu sách:
  + Mã bản sao.
  + Mã đầu sách.
  + Vị trí kệ.
  + Tình trạng:
    + Còn trong kho.
    + Đang được mượn.
    + Đặt trước.
    + Hư hỏng.
    + Mất.

#### 3. Chức năng tra cứu sách

* Ngoài tra cứu cơ bản, hệ thống cho phép:
  + Hiển thị tổng số bản sao.
  + Hiện thị số bản đang còn/ đang mượn.

#### 4. Chức năng mượn sách

##### 4.1 Điều kiện được mượn

* Hệ thống chỉ cho phép mượn khi:
  + Không có sách quá hạn.
  + Số sách đang mượn < Số sách tối đa cho phép.
  + Bản sao sách còn trong kho.

##### 4.2 Quy trình mượn sách

* Quy trình mượn sách:
  + Độc giả yêu cầu mượn sách.
  + Hệ thống kiểm tra điều kiện mượn.
  + Thủ thư xác nhận yếu cầu.
  + Hệ thống tạo phiếu mượn.
  + Cập nhật trạng thái bản sao -> Đang mượn.
* Thông tin phiếu mượn:
  + Mã phiếu.
  + Độc giả.
  + Danh sách bản sao mượn.
  + Ngày mượn.
  + Ngày trả dự kiến.
  + Thời gian mượn tối đa.

#### 5. Chức năng trả sách

##### 5.1 Quy trình trả sách

* Độc giả trả sách.
* Thủ thư kiểm tra tình trạng bản sao.
* Hệ thống đối chiều ngày trả.
* Xử lý:
  + Trả đúng hạn.
  + Trả trễ.
  + Hư hỏng.
  + Mất sách.
* Cập nhật trạng thái bản sao.

#### 6. Chức năng gia hạn mượn sách

- Điều kiện gia hạn:
  + Chưa quá hạn.
  + Không có độc giả khác đặt trước.
  + Chưa vượt số lần gia hạn cho phép.
- Thông tin gia hạn:
  + Ngày gia hạn.
  + Ngày trả mới.
  + Số lần gia hạn.

#### 7. Chức năng xử lý tiền phạt

##### 7.1 Các loại vi phạm

- Trả sách trễ hạn.
- Làm hư hỏng sách.
- Làm mất sách.

##### 7.2 Cơ chế tính phạt

- Phạt trễ hạn: theo số ngày trễ.
- Phạt mất/ hỏng: theo % giá trị sách.
- Có thể cấu hình mức phạt trong hệ thống.

##### 7.3 Xử lý nghiệp vụ

- Ghi nhận vi phạm vào hồ sơ độc giả.
- Tạm khóa quyền mượn nếu vi phạm nghiêm trọng.
- Tích hợp thanh toán tiền phạt (nếu có).

#### 8. Chức năng báo cáo và thống kê

##### 8.1 Báo cáo nghiệp vụ

- Danh sách sách đang mượn.
- Danh sách sách quá hạn.
- Độc giả vi phạm.

##### 8.2 Thống kê khai thác thư viện

- Tần suất mượn theo thời gian.
- Sách được mượn nhiều/ ít.
- Hiệu quả sử dụng tài nguyên.
- Thống kê theo thể loại.

#### 9. Chức năng cấu hình quy định thư viện

- Admin có thể cấu hình:
  + Số sách được mượn tối đa.
  + Thời gian mượn tối đa.
  + Số lần gia hạn.
  + Mức phạt.
