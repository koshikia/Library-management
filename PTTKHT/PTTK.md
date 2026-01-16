## Mục tiêu của hệ thống quản lý thư viện

### 1. Mục tiêu tổng quát

Hệ thống quản lý thư viện được xây dựng nhằm tin học hóa toàn bộ các hoạt động quản lý trong thư viện, thay thế các phương pháp quản lý thủ công truyền thống. Hệ thống giúp quản lý tập trung dữ liệu, nâng cao hiệu quả hoạt động và đáp ứng tốt hơn nhu cầu tra cứu, mượn – trả sách của bạn đọc.

---

### 2. Mục tiêu về quản lý tài nguyên thư viện

Hệ thống hỗ trợ quản lý đầy đủ và chính xác thông tin về sách như tên sách, tác giả, thể loại, nhà xuất bản, số lượng và tình trạng sách. Việc cập nhật dữ liệu được thực hiện nhanh chóng, giúp thủ thư dễ dàng theo dõi và kiểm soát tài nguyên thư viện, hạn chế tình trạng thất lạc hoặc sai sót thông tin.

---

### 3. Mục tiêu về quản lý bạn đọc

Hệ thống cho phép quản lý thông tin bạn đọc một cách khoa học, bao gồm cấp thẻ, gia hạn, theo dõi tình trạng thẻ và lịch sử mượn – trả. Qua đó, thư viện có thể kiểm soát chặt chẽ quyền mượn sách và nâng cao ý thức trách nhiệm của bạn đọc.

---

### 4. Mục tiêu về quản lý mượn – trả sách

Hệ thống tự động hóa quy trình mượn – trả sách, hỗ trợ lập phiếu mượn, phiếu trả, tính toán thời hạn mượn và tiền phạt khi trả trễ hoặc làm hư hỏng, mất sách. Điều này giúp giảm thời gian xử lý và tăng độ chính xác trong công tác quản lý.

---

### 5. Mục tiêu về thống kê và báo cáo

Hệ thống cung cấp các chức năng thống kê, báo cáo về tình hình sử dụng sách, số lượt mượn, sách quá hạn và các thông tin liên quan. Những báo cáo này giúp nhà quản lý dễ dàng theo dõi, đánh giá hoạt động thư viện và đưa ra các quyết định phù hợp.

---

### 6. Mục tiêu về bảo mật và mở rộng

Hệ thống đảm bảo an toàn và bảo mật dữ liệu thông qua cơ chế phân quyền người dùng. Đồng thời, hệ thống được thiết kế linh hoạt, dễ dàng mở rộng và nâng cấp trong tương lai nhằm đáp ứng các nhu cầu phát triển của thư viện.

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

# 1.5.Kịch bản các use case quản lý sách

a)Thêm sách

| **Tiêu** **đề**                                        | **Nội** **dung**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tên** **USE CASE**                                     | **Thêm** **sách**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Tá** **h** **c** **nhân** **chín** | **Thủ** **thư**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Mức**                                                        | **3**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Người** **chịu** **trách** **nhiệm**:  | **Người** **quản** **lý** **thư** **viện**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Tiền** **điều** **kiện**:                     | **Thủ** **thư** **đã** **đăng** **nhập** **vào** **hệ** **thống**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Đảm** **bảo** **tối** **thiểu**        | **Hệ** **thống** **loại** **bỏ** **các** **thông** **tin** **đã** **thêm** **và** **quay** **lui** **bước** **trước**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Đảm** **bảo** **thành** **công**       | **Thông tin** **về** **sách** **mới** **được** **bổ** **sung** **vào** **CSDL**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **Kích** **hoạt**                                       | **Thủ** **thư** **chọn** **chức** **năng** **cập** **nhật** **sách** **trong** **menu**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| **Chuỗi** **sự** **kiện** **chính**       | 1.**Hệ** **thống** **hiển** **thị** **Form** **thêm** **sách** **và** **yêu** **cầu** **thủ** **thư** **nhập** **vào** **thông** **tin** **sách** <br />2. **Thủ** **thư** **nhập** **thông** **tin** **về** **sách** **mới** **và** **nhấn** **Submit** <br />3. **Hệ** **thống** **kiểm** **tra** **thông** **tin** **sách** **và** **xác** **nhận** **thông** **tin** **sách** **hợp** **lệ** <br />4. **Hệ** **thống** **nhập** **thông** **tin** **sách** **mới** **vào** **CSDL** <br />5. **Hệ** **thống** **thông** **báo** **đã** **nhập** **thành** **công** <br />6. **Thủ** **thư** **thoát** **khỏi** **chức** **năng** **thêm** **sách**                                                                                                                                                                 |
| **Ngoại** **lệ**                                        | **3.a.** **Hệ** **thống** **thông** **báo** **sách** **đã** **có** **trong** **CSDL** <br />**3.a.1.** **Hệ** **thống** **hỏi** **thủ** **thư** **có** **thêm** **số** **lượng** **sách** **hay** **không** <br />**3.a.2.** **Thủ** **thư** **thêm** **số** **lượng** **sách** <br />**3.a.3.** **Hệ** **thống** **thêm** **số** **lượng** **cho** **sách** **đã** **có** <br />**3.a.4.** **Hệ** **thống** **thông** **báo** **nhập** **thành** **công** <br />**3.b.** **Hệ** **thống** **thông** **báo** **thông** **tin** **sách** **không** **hợp** **lệ** <br />**3.b.1.** **Hệ** **thống** **yêu** **cầu** **thủ** **thư** **nhập** **lại** **thông** **tin** <br />**3.b.2.** **Thủ** **thư** **nhập** **lại** **thông** **tin** **sách** |

b)Sửa sách

| **Tiêu** **đề**                                       | **Nội** **dung**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tên** **USE CASE**                                    | Sửa sách                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Tác** **nhân** **chính**                     | **Thủ** **thư**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Mức**                                                       | **3**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Người** **chịu** **trách** **nhiệm**: | **Người** **quản** **lý** **thư** **viện**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Tiền** **điều** **kiện**:                    | Thủ thư đã đăng nhập vào hệ**thống**<br />**Sách cần sửa  đã tồn tại trong CSDL .**                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Đảm** **bảo** **tối** **thiểu**       | Không có thay đổi nào được lưu nếu thao tác thất bại.<br />Hệ thống giữ nguyên dữ liệu ban đầu của sách.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Đảm** **bảo** **thành** **công**      | **Thông tin** **về** **sách** **mới** **được** **bổ** **sung** **vào** **CSDL**                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Kích** **hoạt**                                      | Thủ thư chọn chức năng Sửa sách  từ menu quản lý sách.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Chuỗi** **sự** **kiện** **chính**      | 1.Hệ thống hiển thị**danh sách sách** .<br />2. Thủ thư chọn một sách cần sửa.<br />3. Hệ thống hiển thị **form sửa sách** với thông tin hiện tại.<br />4. Thủ thư chỉnh sửa thông tin sách và nhấn  **Submit** .<br />5. Hệ thống kiểm tra tính hợp lệ của thông tin đã chỉnh sửa.<br />6. Hệ thống cập nhật thông tin sách vào  **Cơ sở dữ liệu** .<br />7.Hệ thống thông báo  **sửa sách thành công** .<br />8.Thủ thư thoát khỏi chức năng sửa sách. |
| **Ngoại** **lệ**                                       | **5.a.** Thông tin sách không hợp lệ<br />**5.a.1.** Hệ thống thông báo thông tin không hợp lệ.<br />**5.a.2.** Hệ thống yêu cầu thủ thư nhập lại thông tin.<br />**5.b.** Sách không tồn tại<br />5.b.1. Hệ thống thông báo sách không tồn tại trong CSDL.<br />5.b.2. Hệ thống quay lại danh sách sách.                                                                                                                                                                                      |

c)Xóa sách

| **Tiêu** **đề**                                       | **Nội** **dung**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Tên** **USE CASE**                                    | **Xóa sách**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Tác** **nhân** **chính**                      | **Thủ** **thư**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Mức**                                                       | **3**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| **Người** **chịu** **trách** **nhiệm**: | **Người** **quản** **lý** **thư** **viện**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Tiền** **điều** **kiện**:                    | **Thủ** **thư** **đã** **đăng** **nhập** **vào** **hệ** thống<br />Sách **cần xóa  đã tồn tại trong CSDL .<br />Sách  không đang được mượn .**                                                                                                                                                                                                                                                                                                                                                             |
| **Đảm** **bảo** **tối** **thiểu**       | Không có thay đổi nào xảy ra nếu thao tác thất bại hoặc bị hủy.<br />Dữ liệu hệ thống được giữ nguyên trạng thái ban đầu.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Đảm** **bảo** **thành** **công**      | Thông tin sách được**xóa khỏi CSDL** .                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Kích** **hoạt**                                      | Thủ thư chọn chức năng**“Xóa sách”** trong menu quản lý sách.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Chuỗi** **sự** **kiện** **chính**      | 1.Hệ thống hiển thị**danh sách sách**.<br />2. Thủ thư chọn sách cần xóa.<br />3. Hệ thống hiển thị thông báo  **xác nhận xóa sách**.<br />4. Thủ thư xác nhận thao tác xóa.<br />5. Hệ thống xóa thông tin sách khỏi  **Cơ sở dữ liệu** .<br />6. Hệ thống thông báo  **xóa sách thành công** .<br />7.Thủ thư thoát khỏi chức năng xóa sách.                                                                                                                                                    |
| **Ngoại** **lệ**                                       | **4.a.** Thủ thư hủy thao tác xóa<br />4.a.1. Hệ thống quay lại danh sách sách.<br />4.a.2. Không có dữ liệu nào bị thay đổi.<br />5.a. Sách đang được mượn<br />5.a.1. Hệ thống thông báo sách đang được mượn, không thể xóa.<br />5.a.2. Hệ thống đề xuất thủ thư  **ngừng cho mượn hoặc ẩn sách** .<br />5.a.3. Hệ thống quay lại danh sách sách.<br />2.a. Sách không tồn tại<br />2.a.1. Hệ thống thông báo sách không tồn tại trong CSDL.<br />2.a.2. Hệ thống quay lại danh sách sách. |

d)Phân loại (thể loại, tác giả, NXB)

| **Tiêu** **đề**                                       | **Nội** **dung**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Tên** **USE CASE**                                    | Phân loại (thể loại, tác giả, NXB)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Tác** **nhân** **chính**                      | **Thủ** **thư**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Mức**                                                       | **3**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Người** **chịu** **trách** **nhiệm**: | **Người** **quản** **lý** **thư** **viện**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Tiền** **điều** **kiện**:                    | **Thủ** **thư** **đã** **đăng** **nhập** **vào** **hệ** **thống<br />Sách cần phân loại  **đã tồn tại trong CSDL** .**                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Đảm** **bảo** **tối** **thiểu**       | Không có thay đổi nào được lưu nếu thao tác thất bại.<br />Dữ liệu sách giữ nguyên trạng thái ban đầu.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Đảm** **bảo** **thành** **công**      | Sách được gán**đúng thể loại, tác giả và nhà xuất bản** trong CSDL.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Kích** **hoạt**                                      | Thủ thư chọn chức năng**“Phân loại sách”** trong menu quản lý sách.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Chuỗi** **sự** **kiện** **chính**      | 1.Hệ thống hiển thị danh sách sách.<br />2. Thủ thư chọn một sách cần phân loại.<br />3. Hệ thống hiển thị form phân loại sách (thể loại, tác giả, nhà xuất bản).<br />4. Thủ thư chọn hoặc nhập mới thể loại, tác giả, nhà xuất bản.<br />5. Hệ thống kiểm tra tính hợp lệ của thông tin phân loại.<br />6. Hệ thống cập nhật thông tin phân loại cho sách trong  **CSDL** .<br />7.Hệ thống thông báo  **phân loại sách thành công** .<br />8.Thủ thư thoát khỏi chức năng phân loại sách.       |
| **Ngoại** **lệ**                                       | **4.a.** Thể loại / Tác giả / NXB chưa tồn tại<br />4.a.1. Hệ thống thông báo dữ liệu chưa tồn tại.<br />4.a.2. Hệ thống hỏi thủ thư có muốn **thêm mới** không.<br />4.a.3. Thủ thư nhập thông tin mới.<br />4.a.4. Hệ thống lưu dữ liệu mới vào CSDL.<br />4.a.5. Hệ thống gán dữ liệu mới cho sách.<br />5.a. Thông tin phân loại không hợp lệ<br />5.a.1. Hệ thống thông báo thông tin không hợp lệ.<br />5.a.2. Hệ thống yêu cầu thủ thư nhập lại.<br />5.a.3. Thủ thư nhập lại thông tin phân loại. |

e)Tìm kiếm

| **Tiêu** **đề**                                       | **Nội** **dung**                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Tên** **USE CASE**                                    | **Tìm kiếm sách**                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Tác** **nhân** **chính**                      | **Thủ** **thư**                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Mức**                                                       | **3**                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Người** **chịu** **trách** **nhiệm**: | **Người** **quản** **lý** **thư** **viện**                                                                                                                                                                                                                                                                                                                                                                                           |
| **Tiền** **điều** **kiện**:                    | **Thủ** **thư** **đã** **đăng** **nhập** **vào** **hệ** **thống**                                                                                                                                                                                                                                                                                                                                              |
| **Đảm** **bảo** **tối** **thiểu**       | Không có dữ liệu nào bị thay đổi trong CSDL.<br />Trạng thái hệ thống không bị ảnh hưởng.                                                                                                                                                                                                                                                                                                                                                               |
| **Đảm** **bảo** **thành** **công**      | Danh sách sách phù hợp với tiêu chí tìm kiếm được hiển thị.                                                                                                                                                                                                                                                                                                                                                                                                |
| **Kích** **hoạt**                                      | Thủ thư chọn thanh**“Tìm kiếm sách”** trong menu quản lý sách.                                                                                                                                                                                                                                                                                                                                                                                                |
| **Chuỗi** **sự** **kiện** **chính**      | 1.Hệ thống hiển thị thanh tìm kiếm sách.<br />2. Thủ thư nhập một hoặc nhiều tiêu chí tìm kiếm (tên sách, tác giả, thể loại, NXB, mã sách,…).<br />3. Thủ thư nhấn nút  **Tìm kiếm** .<br />4. Hệ thống kiểm tra dữ liệu tìm kiếm<br />5. Hệ thống truy vấn CSDL và hiển thị danh sách sách phù hợp.<br />6. Thủ thư xem kết quả tìm kiếm.<br />7.Thủ thư thoát khỏi chức năng tìm kiếm sách. |
| **Ngoại** **lệ**                                       | 4.a. Không nhập tiêu chí tìm kiếm<br />4.a.1. Hệ thống thông báo yêu cầu nhập ít nhất một tiêu chí.<br />4.a.2. Hệ thống quay lại form tìm kiếm<br />5.a. Không tìm thấy kết quả<br />5.a.1. Hệ thống thông báo không tìm thấy sách phù hợp.<br />5.a.2. Hệ thống cho phép thủ thư nhập lại tiêu chí tìm kiếm.                                                                                                          |

=======

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

## BIỂU ĐỒ LỚP

<img src="../img/bieudolop.png">

# CHƯƠNG 5:THIẾT KẾ HỆ THỐNG

## 5.3. Biểu đồ hoạt động

### 5.3.1. Biểu đồ hoạt động đăng ký
<img src="../img/dangkyact.png">

### 5.3.2. Biểu đồ hoạt động đăng nhập
<img src="../img/dangnhapact.png">

### 5.3.3. Biểu đồ hoạt động lấy lại mật khẩu
<img src="../img/quenmkact.png">

### 5.3.4. Biểu đồ hoạt động cấp mã sinh viên
<img src="../img/capmaact.png">

### 5.3.5. Biểu đồ hoạt động muợn sách
<img src="../img/muonsach.png">
