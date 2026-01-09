
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
