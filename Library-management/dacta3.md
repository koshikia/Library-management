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

## 4.2.

## **ĐẶC TẢ USE CASE: ĐĂNG NHẬP**

| **Use Case**                | **Nội dung**                                                                                                                                                                                                                                                                                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tên**                    | Đăng nhập                                                                                                                                                                                                                                                                                       |
| **Mô tả**                 | Cho phép người dùng đăng nhập vào hệ thống quản lý thư viện                                                                                                                                                                                                                          |
| **Tác nhân (Actor)**      | Bạn đọc, Thủ thư, Quản trị viên                                                                                                                                                                                                                                                            |
| **Tiền điều kiện**      | Người dùng chưa đăng nhập và đã có tài khoản hợp lệ                                                                                                                                                                                                                                 |
| **Hậu điều kiện**       | Người dùng được chuyển đến trang chức năng phù hợp với quyền hạn                                                                                                                                                                                                                   |
| **Luồng sự kiện chính** | 1. Người dùng truy cập trang đăng nhập ``2. Người dùng nhập*username*và*password* ``3. Người dùng nhấn nút**Đăng nhập** ``4. Hệ thống kiểm tra thông tin đăng nhập``5. Nếu thông tin hợp lệ, hệ thống cho phép đăng nhập và chuyển đến trang chính |
| **Luồng sự kiện phụ**   | **A. Đăng nhập thất bại** ``1. Username hoặc password không đúng``2. Hệ thống hiển thị thông báo lỗi ``**B. Người dùng hủy thao tác**``1. Người dùng thoát khỏi trang đăng nhập                                                                                 |

## 4.3.

## **ĐẶC TẢ USE CASE: QUẢN LÝ SÁCH**

| **Use Case**                | **Nội dung**                                                                                                                                                                                             |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tên**                    | Quản lý sách                                                                                                                                                                                                 |
| **Mô tả**                 | Cho phép quản lý thông tin sách trong thư viện                                                                                                                                                           |
| **Tác nhân (Actor)**      | Thủ thư, Quản trị viên                                                                                                                                                                                     |
| **Tiền điều kiện**      | Người dùng đã đăng nhập với quyền quản lý                                                                                                                                                           |
| **Hậu điều kiện**       | Thông tin sách được cập nhật trong hệ thống                                                                                                                                                            |
| **Luồng sự kiện chính** | 1. Thủ thư chọn chức năng Quản lý sách ``2. Chọn thao tác thêm/sửa/xóa sách``3. Nhập hoặc chỉnh sửa thông tin sách ``4. Hệ thống kiểm tra dữ liệu``5. Hệ thống lưu thông tin sách |
| **Luồng sự kiện phụ**   | A. Dữ liệu không hợp lệ ``1. Hệ thống thông báo lỗi``2. Yêu cầu nhập lại                                                                                                                          |

## 4.4.

## **ĐẶC TẢ USE CASE: MƯỢN SÁCH**

| **Use Case**                | **Nội dung**                                                                                                                                                          |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tên**                    | Mượn sách                                                                                                                                                                 |
| **Mô tả**                 | Cho phép bạn đọc mượn sách từ thư viện                                                                                                                             |
| **Tác nhân (Actor)**      | Bạn đọc, Thủ thư                                                                                                                                                        |
| **Tiền điều kiện**      | Bạn đọc đã đăng nhập và chưa vượt quá số sách cho phép                                                                                                       |
| **Hậu điều kiện**       | Phiếu mượn được tạo, trạng thái sách chuyển sang “Đang mượn”                                                                                                 |
| **Luồng sự kiện chính** | 1. Bạn đọc chọn sách cần mượn ``2. Gửi yêu cầu mượn sách``3. Hệ thống kiểm tra tình trạng sách ``4. Lập phiếu mượn``5. Cập nhật trạng thái sách |
| **Luồng sự kiện phụ**   | A. Sách đã hết ``1. Hệ thống thông báo không thể mượn``B. Vượt quá số sách cho phép``1. Hệ thống thông báo                                             |

## 4.5.

## **ĐẶC TẢ USE CASE: TRẢ SÁCH**

| **Use Case**                | **Nội dung**                                                                                                                                      |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tên**                    | Trả sách                                                                                                                                               |
| **Mô tả**                 | Ghi nhận việc trả sách đã mượn                                                                                                                   |
| **Tác nhân (Actor)**      | Bạn đọc, Thủ thư                                                                                                                                    |
| **Tiền điều kiện**      | Sách đang trong trạng thái “Đang mượn”                                                                                                          |
| **Hậu điều kiện**       | Sách được cập nhật trạng thái “Có sẵn”                                                                                                       |
| **Luồng sự kiện chính** | 1. Người dùng chọn chức năng Trả sách ``2. Nhập thông tin phiếu mượn``3. Hệ thống xác nhận thông tin``4. Cập nhật trạng thái sách |
| **Luồng sự kiện phụ**   | A. Trả sách quá hạn``1. Hệ thống tính tiền phạt                                                                                                 |

---

## 4.6.

## **ĐẶC TẢ USE CASE: TÌM KIẾM SÁCH**

| **Use Case**                | **Nội dung**                                                                                                          |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **Tên**                    | Tìm kiếm sách                                                                                                             |
| **Mô tả**                 | Cho phép tìm kiếm sách trong thư viện                                                                                  |
| **Tác nhân (Actor)**      | Bạn đọc, Thủ thư                                                                                                        |
| **Tiền điều kiện**      | Không                                                                                                                       |
| **Hậu điều kiện**       | Hiển thị danh sách sách phù hợp                                                                                        |
| **Luồng sự kiện chính** | 1. Người dùng nhập từ khóa tìm kiếm ``2. Chọn tiêu chí tìm kiếm``3. Hệ thống xử lý``4. Hiển thị kết quả |
| **Luồng sự kiện phụ**   | A. Không có kết quả``1. Hệ thống thông báo                                                                           |

## 4.7.

## **ĐẶC TẢ USE CASE: QUẢN LÝ BẠN ĐỌC**

| **Use Case**                | **Nội dung**                                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tên**                    | Quản lý bạn đọc                                                                                                                        |
| **Mô tả**                 | Quản lý thông tin bạn đọc trong hệ thống                                                                                            |
| **Tác nhân (Actor)**      | Thủ thư, Quản trị viên                                                                                                                 |
| **Tiền điều kiện**      | Người dùng đã đăng nhập với quyền quản lý                                                                                       |
| **Hậu điều kiện**       | Thông tin bạn đọc được cập nhật                                                                                                    |
| **Luồng sự kiện chính** | 1. Chọn chức năng Quản lý bạn đọc ``2. Thêm/sửa/xóa thông tin bạn đọc``3. Hệ thống kiểm tra dữ liệu``4. Lưu thông tin |
| **Luồng sự kiện phụ**   | A. Dữ liệu không hợp lệ``1. Hệ thống yêu cầu nhập lại                                                                            |

## 4.8. Kết luận chương

Chương 5 đã trình bày chi tiết các Use Case của hệ thống Quản lý Thư viện. Các đặc tả này là cơ sở quan trọng để xây dựng các sơ đồ UML chi tiết hơn, đồng thời hỗ trợ cho quá trình thiết kế, triển khai và kiểm thử hệ thống trong các giai đoạn tiếp theo.
