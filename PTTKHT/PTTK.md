# I. Giới thiệu đề tài

## 1. Lý do chọn đề tài

- Trong bối cảnh chuyển đổi số diễn ra mạnh mẽ, việc ứng dụng công nghệ thông tin vào công tác quản lý là nhu cầu tất yếu của các tổ chức, đặc biệt là trong lĩnh vực giáo dục và thư viện. Nhiều thư viện hiện nay vẫn quản lý sách, bạn đọc và nghiệp vụ mượn – trả bằng phương pháp thủ công hoặc các công cụ rời rạc, dẫn đến nhiều hạn chế như: tốn thời gian, dễ sai sót, khó thống kê báo cáo và không đáp ứng được nhu cầu tra cứu nhanh của bạn đọc.
- Việc xây dựng hệ thống quản lý thư viện giúp tự động hóa các quy trình nghiệp vụ, nâng cao hiệu quả quản lý, giảm chi phí vận hành, đồng thời cải thiện chất lượng phục vụ bạn đọc. Chính vì những lý do trên, đề tài “Xây dựng hệ thống quản lý thư viện” được lựa chọn để nghiên cứu và triển khai.

## 2. Mục tiêu của hệ thống

- Mục tiêu chính của hệ thống quản lý thư viện là:

  - Tin học hóa toàn bộ hoạt động quản lý thư viện.
  - Quản lý tập trung thông tin sách, bạn đọc và quá trình mượn - trả.
  - Hỗ trợ tra cứu sách nhanh chóng, chính xác.
  - Cung cấp các chức năng thống kê, báo cáo phục vụ công tác quản lý.
  - Nâng cao hiệu quả làm việc của thủ thư và chất lượng phục vụ bạn đọc.

  * Tin học hóa toàn bộ hoạt động quản lý thư viện.
  * Quản lý tập trung thông tin sách, bạn đọc và quá trình mượn - trả.
  * Hỗ trợ tra cứu sách nhanh chóng, chính xác.
  * Cung cấp các chức năng thống kê, báo cáo phục vụ công tác quản lý.
  * Nâng cao hiệu quả làm việc của thủ thư và chất lượng phục vụ bạn đọc.

## 3. Phạm vi và đối tượng sử dụng

- Phạm vi hệ thống: Hệ thống được xây dựng để quản lý các hoạt động cơ bản của một thư viện như: Quản lý sách, quản lý bạn đọc, mượn - trả sách và thống kê báo cáo.
- Đối tượng sử dụng:

  - Quản trị viên (Admin).
  - Thủ thư.
  - Độc giả.

  * Quản trị viên (Admin).
  * Thủ thư.
  * Độc giả.

## 4. Phương pháp nghiên cứu (Phân tích hướng đối tượng - UML)

- Đề tài sử dụng phương pháp phân tích và thiết kế hướng đối tượng kết hợp với ngôn ngữ mô hình hóa UML. Các biểu đồ UML được sử dụng bao gồm:
  - Biểu đồ Use Case: Mô tả các chức năng của hệ thống và mối quan hệ với tác nhân.
  - Biểu đồ Class: Mô tả cấu trúc dữ liệu và mối quan hệ giữa các lớp.
  - Biểu đồ Sequence: Mô tả trình tự tương tác giữa các đối tượng trong hệ thống
  - Biểu đồ Activity: Mô tả quy trình hoạt động của các tác nhân và hệ thống.

# II. Xác định tác nhân, phân tích chi tiết hệ thống

## 1. Các tác nhân trong hệ thống

### 1.1 Quản trị viên

* Vai trò: Quản lý toàn bộ hệ thống
* Quyền hạn:
  + Quản lý tài khoản thủ thư và người dùng.
  + Phân quyền hệ thống.
  + Cấu hình quy định thư viện (số sách được mượn, số ngày mượn, mức phạt ...).
  + Xem báo cáo, thống kê tổng hợp.
  + Sao lưu và phục hồi dữ liệu.

### 1.2 Thủ thư

* Vai trò: Quản lý nghiệp vụ thư viện hàng ngày
* Quyền hạn:
  + Quản lý đầu sách (thêm, sửa, xóa sách).
  + Quản lý bản sao sách (số lượng, vị trí)
  + Quản lý độc giả.
  + Thực hiện mượn - trả sách.
  + Gia hạn mượn sách.
  + Tính và thu tiền phạt.
  + Lập báo cáo thống kê

### 1.3 Độc giả

* Vai trò: Người sử dụng dịch vụ thư viện
* Quyền hạn:

  + Đăng ký tài khoản.
  + Tra cứu sách.
  + Xem tình trạng sách.
  + Mượn sách.
  + Trả sách.
  + Xem lịch sử mượn - trả.
  + Xem tiền phạt (nếu có).

## 2. Phân tích chi tiết hệ thống

### 2.1 Chức năng quản lý người dùng

#### 2.1.1 Quản lý tài khoản

* Đăng ký tài khoản độc giả.
* Đăng nhập/ đăng xuất.
* Cập nhật thông tin cá nhân.
* Khóa/ mở khóa tài khoản.

#### 2.1.2 Phân quyền

* Quyền hạn:
  + Admin: Toàn quyền.
  + Thủ thư: Nghiệp vụ thư viện.
  + Độc giả: Tra cứu, mượn, trả.

### 2.2 Chức năng quản lý sách

##### 2.2.1 Quản lý đầu sách

* Hệ thống quản lý thông tin ở mức đầu sách, bao gồm:
  + Mã đầu sách.
  + Tên sách.
  + Tác giả.
  + Thể loại.
  + Nhà xuất bản.
  + Năm xuất bản.
  + Mô tả nội dung.
* Một đầu sách có thể có nhiều bản sao với trạng thái khác nhau.

#### 2.2.2 Quản lý bản sao sách

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

### 2.3 Chức năng tra cứu sách

* Ngoài tra cứu cơ bản, hệ thống cho phép:
  + Hiển thị tổng số bản sao.
  + Hiện thị số bản đang còn/ đang mượn.

### 2.4 Chức năng mượn sách

#### 2.4.1 Điều kiện được mượn

* Hệ thống chỉ cho phép mượn khi:
  + Không có sách quá hạn.
  + Số sách đang mượn < Số sách tối đa cho phép.
  + Bản sao sách còn trong kho.

#### 2.4.2 Quy trình mượn sách

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

### 2.5 Chức năng trả sách

#### 2.5.1 Quy trình trả sách

* Độc giả trả sách.
* Thủ thư kiểm tra tình trạng bản sao.
* Hệ thống đối chiều ngày trả.
* Xử lý:
  + Trả đúng hạn.
  + Trả trễ.
  + Hư hỏng.
  + Mất sách.
* Cập nhật trạng thái bản sao.

### 2.6 Chức năng gia hạn mượn sách

- Điều kiện gia hạn:
  + Chưa quá hạn.
  + Không có độc giả khác đặt trước.
  + Chưa vượt số lần gia hạn cho phép.
- Thông tin gia hạn:
  + Ngày gia hạn.
  + Ngày trả mới.
  + Số lần gia hạn.

### 2.7 Chức năng xử lý tiền phạt

#### 2.7.1 Các loại vi phạm

- Trả sách trễ hạn.
- Làm hư hỏng sách.
- Làm mất sách.

#### 2.7.2 Cơ chế tính phạt

- Phạt trễ hạn: theo số ngày trễ.
- Phạt mất/ hỏng: theo % giá trị sách.
- Có thể cấu hình mức phạt trong hệ thống.

#### 2.7.3 Xử lý nghiệp vụ

- Ghi nhận vi phạm vào hồ sơ độc giả.
- Tạm khóa quyền mượn nếu vi phạm nghiêm trọng.
- Tích hợp thanh toán tiền phạt (nếu có).

### 2.8 Chức năng báo cáo và thống kê

#### 2.8.1 Báo cáo nghiệp vụ

- Danh sách sách đang mượn.
- Danh sách sách quá hạn.
- Độc giả vi phạm.

#### 2.8.2 Thống kê khai thác thư viện

- Tần suất mượn theo thời gian.
- Sách được mượn nhiều/ ít.
- Hiệu quả sử dụng tài nguyên.
- Thống kê theo thể loại.

### 2.9 Chức năng cấu hình quy định thư viện

- Admin có thể cấu hình:
  + Số sách được mượn tối đa.
  + Thời gian mượn tối đa.
  + Số lần gia hạn.
  + Mức phạt.

# III. BIỂU ĐỒ USE CASE

## 1 Xây dựng biểu đồ use case

### 1.1 Biểu đồ use case tổng quát

<img src="../img/Use_case.png">

### 1.2 Biểu đồ use case xử lý quá hạn

<img src="../img/XuLy.png">

### 1.3 Biểu đồ use case đặt trước sách

<img src="../img/Book_useCase.png">

## 2 Vai trò của các Actor

### 2.1 Vai trò của độc giả

| Thuộc tính             | Mô tả                                                                                                                                                                                                      |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tên actor              | Độc giả                                                                                                                                                                                                    |
| Mô tả                  | Độc giả xây dựng hệ thống tra sách, theo dõi việc mượn/trả và thực hiện các yêu cầu<br />dịch vụ như đặt trước hoặc xin gia hạn. Độc giả tương tác thông qua giao diện hệ thống<br /> sau khi đăng nhập.   |
| Mục tiêu               | Giúp độc giả tìm được sách cần đọc, sử dụng dịch vụ thư viện thuận tiện, quản lý việc<br /> mượn sách và tránh vi phạm quá hạn.                                                                            |
| Vai trò                | Người sử dụng dịch vụ thư viện trên hệ thống; chủ động tra cứu, gửi yêu cầu đặt<br />trước/gia hạn và theo dõi lịch sử mượn.                                                                               |
| Trách nhiệm            | - Đăng nhập hệ thống để sử dụng chức năng cá nhân<br />- Tra cứu thông tin sách<br />- Đặt trước sách khi sách không sẵn có<br />- Gửi yêu cầu gia hạn mượn<br />- Xem danh sách đang mượn và lịch sử mượn |
| Yêu cầu đối với actor: | Có tài khoản hợp lệ; cung cấp thông tin cá nhân chính xác; tuân thủ quy định<br /> mượn–trả và thời hạn mượn của thư viện.                                                                                 |
| Use case tương ứng     | - Đăng nhập<br />- Tra cứu thông tin sách<br />- Đặt trước sách<br />- Yêu cầu gia hạn thời gian mượn<br />Xem danh sách mượn/lịch sử mượn                                                                 |

### 2.2 vai trò của Thủ Thư

| Thuộc tính         | Mô tả                                                                                                                                                                                                                                                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tên actor          | Thủ thư                                                                                                                                                                                                                                                                                                                                        |
| Mô tả              | Thủ thư vận hành các nghiệp vụ chính của thư viện: quản lý sách, quản lý độc giả,<br /> xử lý mượn–trả,gia hạn, đặt trước và thu tiền phạt. Thủ thư cập nhật dữ liệu để <br />đảm bảo hoạt động thư viện chính xác.                                                                                                                            |
| Mục tiêu           | Đảm bảo quy trình mượn–trả diễn ra đúng quy định, dữ liệu sách/độc giả luôn<br />cập nhật, hỗ trợ quản lý vận hành và báo cáo.                                                                                                                                                                                                                 |
| Vai trò            | Nhân viên nghiệp vụ trực tiếp xử lý giao dịch mượn–trả và quản trị dữ liệu hoạt<br />động hằng ngày của thư viện.                                                                                                                                                                                                                              |
| Trách nhiệm        | - Đăng nhập hệ thống để thao tác nghiệp vụ<br />- Quản lý đầu sách và cập nhật thông tin sách<br />- Quản lý bản sao (Mã vạch, tình trạng)<br />- Quản lý đọc giả (thêm/sửa/khóa thẻ)<br />- Lập phiếu mượn, xử lý trả sách<br />- Tính và thu tiền phạt khi quá hạn<br />- Xử lý đặt trước, duyệt gia hạn mượn<br />- Thống kê và lập báo cáo |
| Yêu cầu với actor  | Có tài khoản thủ thư và quyền thao tác; nhập liệu chính xác; tuân thủ quy trình<br /> nghiệp vụ và quy định thư viện.                                                                                                                                                                                                                          |
| Use case tương ứng | - Đăng nhập<br />- Quản lý đầu sách<br />- Quản lý bản sao (gán mã vạch, tình trạng)<br />- Quản lý độc giả (thêm/sửa/khóa thẻ)<br />- Lập phiếu mượn<br />- Trả sách<br />- Tính và thu tiền phạt (xử lý quá hạn)<br />- Xử lý đặt trước<br />- Gia hạn mượn<br />- Thống kê báo cáo                                                          |

### 2.3 Vai trò của Admin hệ thống

| Thuộc tính            | Mô tả                                                                                                                                                                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tên actor             | Admin hê thống                                                                                                                                                                                                                |
| Mô tả                 | Admin chịu trách nhiệm quản trị hệ thống: quản lý tài khoản người dùng và phân quyền,<br /> cấu hình các quy định vận hành áp dụng chung cho toàn hệ thống thư viện.                                                          |
| Mục tiêu              | Đảm bảo hệ thống hoạt động ổn định, an toàn; quyền truy cập đúng vai trò; các quy định<br />được cấu hình thống nhất và dễ quản lý                                                                                            |
| Vai trò               | Quản trị viên hệ thống, kiểm soát quyền truy cập và thiết lập cấu hình/quy định hệ thống.                                                                                                                                     |
| Trách nhiệm           | - Đăng nhập hệ thống với quyền quản trị<br />- Quản lý tài khoản và phân quyền hệ thống<br />- Cấu hính quy định (Thời gian mượn, mức phạt, giới hạn mượn...)<br />- Theo dõi và đảm bảo tính nhất quán dữ liệu theo quy định |
| Yêu cầu đối với actor | Có tài khoản admin; hiểu cấu trúc quyền và quy định thư viện; cấu hình đúng để không<br /> ảnh hưởng vận hành.                                                                                                                |
| Use case tương ứng    | - Đăng nhập<br />- Quản lý tài khoản và phân quyền hệ thống<br />- Cấu hình quy định                                                                                                                                          |

## 3 kịch bản hoạt động use case

### 3.1 Use case đăng ký

| Mục            | Nội dung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tên Use case   | Đăng ký                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Actor chính    | Độc giả                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Mô tả          | Use case cho phép người dùng mới (độc giả) tạo tài khoản để sử dụng các dịch vụ của hệ thống quản lý thư viện<br /> như tra cứu sách, mượn sách, đặt trước và gia hạn mượn.                                                                                                                                                                                                                                                                                                                                                                                                 |
| Tiền điều kiện | - Cung cấp thông tin xác thực                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Hậu điều kiện  | - Tài khoản độc giả được tạo thành công và lưu trong cơ sở dữ liệu<br />- Người dùng cố thể đăng nhập để sử dụng hệ thống                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Luông chính    | - Người dùng truy cập website hệ thống thư viện<br />- Chọn chức năng đăng ký<br />- Hệ thống hiển thị form đăng ký tài khoản<br />-Người dùng nhập đầy đủ thông tin cá nhân (họ tên, email, số điện thoại,mật khẩu,<br />địa chỉ...)<br />- Người dùng xác nhận đăng ký<br />- Hệ thống kiểm tra tính hợp lệ của thông tin (định dạng email, độ mạnh mật khẩu, dữ liệu bắt buộc)<br />- Hệ hống kiểm tra email/số điện thoại có tồn tại trong hệ thống hay không<br />- Hệ thống lưu trữ thông tin tài khoản vào co sở dũ liệu<br />-Hệ thống thông báo đăng ký thành công |
| Luồng phụ      | - Nếu thông tin không hợp lệ: Hệ thống hiển thị thông báo lỗi và yêu cầu người dùng nhập lại<br />- Email hoặc số điện thoại đã tồn tại: Hệ thống thông báo tài khoản đã tồn tại, yêu cầu sử dụng thông tin khác<br />- Người dùng nhập thiếu thông tin :Hệ thống yêu cầu bổ sung thông tin bắt bu                                                                                                                                                                                                                                                                          |
| Kết quả        | Tài khoản độc giả được tạo thành công                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

### 3.2 Use case đăng nhập

**Bảng: Quy trình đăng nhập**

| Mục                  | Nội dung                                                                                                                                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Tên Use case         | Đăng nhập                                                                                                                                                                                                                      |
| Mô tả                | Cho phép người dùng truy cập hệ thống thư viện theo quyền được cấp                                                                                                                                                             |
| Actor chính          | Độc giả/ thủ thư/ admin                                                                                                                                                                                                        |
| Điều kiện tiên quyết | Người dùng đã có tài khoản hợp lệ trong hệ thống                                                                                                                                                                               |
| Hậu điều kiện        | Người dùng được xác thực và truy cập vào giao diện tương ứng với vai trò                                                                                                                                                       |
| Luồng chính          | - Người dùng truy cập hệ thống và chọn chức năng đăng nhập<br />- Nhập tên đăng nhập và mật khẩu<br />- Hệ thống kiểm tra thống tin xác thực<br />- Nếu hợp lệ, hệ thống cho phép truy cập các chức năng tương ứng với vai trò |
| Luồng phụ            | - Nếu tên đnăg nhập hoặc sai mật, hệ thống thông báo lỗi<br />- Người dùng nhập lại thông tin đăng nhập                                                                                                                        |
| Kết quả              | -  Người dùng đăng nhập thành công  và sử dụng hệ thống theo quyền được cấp                                                                                                                                                    |

### Use case đăng ký

<<<<<<< HEAD
`<img src="../img/bieudolop.png">`
=======
Thủ thư quản lý từng bản sao cụ thể của sách.
Mỗi bản sao được gán mã vạch và trạng thái sử dụng.
Hệ thống cập nhật tình trạng để phục vụ mượn và trả sách.

### 2.8 Quản lý độc giả

Thủ thư tạo mới, chỉnh sửa hoặc khóa thẻ của độc giả. Thông tin độc giả được quản lý tập trung trong hệ thống. Việc quản lý giúp kiểm soát quyền mượn sách của độc giả.

### 2.9 Lập phiếu mượn

Thủ thư kiểm tra thông tin thẻ của độc giả và tình trạng sách. Sau đó lập phiếu mượn cho độc giả. Hệ thống ghi nhận ngày mượn và cập nhật hạn trả sách.

### 2.10 Trả sách

Thủ thư tiếp nhận sách do độc giả trả lại.
Hệ thống cập nhật trạng thái sách sang đã trả.
Nếu sách quá hạn, hệ thống chuyển sang xử lý tiền phạt.

### 2.11 Xử lý quá hạn (tính và thu tiền phạt)

Hệ thống xác định số ngày quá hạn trả sách. Tiền phạt được tính theo quy định của thư viện. Thủ thư thu tiền và cập nhật trạng thái hoàn tất.

### 2.12 Thống kê báo cáo

Thủ thư yêu cầu tạo báo cáo thống kê.
Hệ thống tổng hợp dữ liệu mượn, trả và vi phạm.
Báo cáo phục vụ công tác quản lý thư viện.

### 2.13 Quản lý tài khoản và phân quyền hệ thống

Admin tạo và quản lý tài khoản người dùng hệ thống.
Thực hiện phân quyền truy cập theo vai trò.
Đảm bảo an toàn và kiểm soát hệ thống.

### 2.14 cấu hình quy định

Admin thiết lập các quy định hoạt động của thư viện.
Bao gồm thời gian mượn, số sách mượn và mức phạt.
Các quy định được áp dụng thống nhất toàn hệ thống.

# CHƯƠNG 4. ĐẶC TẢ USE CASE HỆ THỐNG QUẢN LÝ THƯ VIỆN

---


## 4.0. Sơ đồ tổng quát hệ thống (Use Case Diagram)

Sơ đồ Use Case tổng quát mô tả toàn bộ các chức năng chính của hệ thống Quản lý Thư viện và mối quan hệ tương tác giữa các Actor và hệ thống. Sơ đồ này giúp xác định phạm vi chức năng, tránh thiếu hoặc trùng lặp yêu cầu trong quá trình phân tích.

### Các Actor trong hệ thống

| Actor            | Mô tả quyền hạn                                                                                    |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| Bạn đọc       | Tìm kiếm sách, mượn sách, trả sách, gia hạn mượn, đặt trước sách, xem lịch sử mượn |
| Thủ thư        | Quản lý sách, quản lý mượn – trả, quản lý thông tin bạn đọc                             |
| Quản trị viên | Quản lý tài khoản nhân viên, cấu hình hệ thống, báo cáo – thống kê, sao lưu dữ liệu  |

Sơ đồ Use Case tổng quát là cơ sở để xây dựng các sơ đồ chi tiết như **Sequence Diagram** và **Activity Diagram** cho từng chức năng cụ thể.

---

## 4.2. ĐẶC TẢ USE CASE: ĐĂNG NHẬP

### Thông tin chung

| Thuộc tính        | Nội dung                                                                 |
| ------------------- | ------------------------------------------------------------------------- |
| Tên Use Case       | Đăng nhập                                                              |
| Mô tả             | Cho phép người dùng truy cập vào hệ thống theo đúng quyền hạn |
| Actor chính        | Bạn đọc, Thủ thư, Quản trị viên                                   |
| Actor phụ          | Hệ thống xác thực                                                     |
| Mục tiêu          | Xác thực người dùng và phân quyền truy cập                       |
| Mức độ ưu tiên | Cao                                                                       |

### Điều kiện

| Loại              | Mô tả                                                                      |
| ------------------ | ---------------------------------------------------------------------------- |
| Tiền điều kiện | Người dùng đã có tài khoản hợp lệ và chưa đăng nhập           |
| Hậu điều kiện  | Người dùng được đăng nhập thành công hoặc nhận thông báo lỗi |

### Luồng sự kiện chính

1. Người dùng truy cập trang đăng nhập.
2. Người dùng nhập **username** và  **password** .
3. Người dùng nhấn nút  **Đăng nhập** .
4. Hệ thống kiểm tra tính hợp lệ của thông tin.
5. Hệ thống xác định quyền người dùng.
6. Chuyển đến giao diện chức năng tương ứng.

### Luồng sự kiện phụ / Ngoại lệ

* **A1: Sai thông tin đăng nhập**
  1. Username hoặc password không đúng.
  2. Hệ thống hiển thị thông báo lỗi.
* **A2: Tài khoản bị khóa**
  1. Hệ thống thông báo tài khoản không khả dụng.

### Quy tắc nghiệp vụ

* Mật khẩu phải được mã hóa trong CSDL.
* Một tài khoản đăng nhập không quá 5 lần sai liên tiếp.

### Dữ liệu vào/ra

* Dữ liệu vào: username, password
* Dữ liệu ra: thông tin người dùng, quyền hạn

---

## 4.3. ĐẶC TẢ USE CASE: QUẢN LÝ SÁCH

### Thông tin chung

| Thuộc tính        | Nội dung                                   |
| ------------------- | ------------------------------------------- |
| Tên Use Case       | Quản lý sách                             |
| Mô tả             | Quản lý thông tin sách trong thư viện |
| Actor chính        | Thủ thư, Quản trị viên                 |
| Mục tiêu          | Cập nhật danh mục sách chính xác      |
| Mức độ ưu tiên | Cao                                         |

### Điều kiện

| Loại              | Mô tả                                               |
| ------------------ | ----------------------------------------------------- |
| Tiền điều kiện | Người dùng đã đăng nhập với quyền quản lý |
| Hậu điều kiện  | Thông tin sách được thêm/sửa/xóa trong CSDL   |

### Luồng sự kiện chính

1. Thủ thư chọn chức năng  **Quản lý sách** .
2. Chọn thao tác: Thêm / Sửa / Xóa sách.
3. Nhập hoặc chỉnh sửa thông tin sách (mã sách, tên sách, tác giả, NXB, số lượng…).
4. Hệ thống kiểm tra dữ liệu.
5. Lưu thông tin vào hệ thống.

### Luồng sự kiện phụ

* **B1: Dữ liệu không hợp lệ**
  1. Thiếu thông tin hoặc trùng mã sách.
  2. Hệ thống thông báo lỗi và yêu cầu nhập lại.

### Quy tắc nghiệp vụ

* Mã sách là duy nhất.
* Không được xóa sách đang được mượn.

---

## 4.4. ĐẶC TẢ USE CASE: MƯỢN SÁCH

### Thông tin chung

| Thuộc tính        | Nội dung                    |
| ------------------- | ---------------------------- |
| Tên Use Case       | Mượn sách                 |
| Actor chính        | Bạn đọc, Thủ thư        |
| Mục tiêu          | Ghi nhận việc mượn sách |
| Mức độ ưu tiên | Cao                          |

### Điều kiện

| Loại              | Mô tả                                                                      |
| ------------------ | ---------------------------------------------------------------------------- |
| Tiền điều kiện | Bạn đọc đã đăng nhập và còn quyền mượn sách                    |
| Hậu điều kiện  | Phiếu mượn được tạo, sách chuyển sang trạng thái “Đang mượn” |

### Luồng sự kiện chính

1. Bạn đọc chọn sách cần mượn.
2. Gửi yêu cầu mượn sách.
3. Hệ thống kiểm tra số lượng và điều kiện mượn.
4. Lập phiếu mượn.
5. Cập nhật trạng thái sách.

### Luồng sự kiện phụ

* **C1: Sách đã hết** → Thông báo không thể mượn.
* **C2: Vượt quá số sách cho phép** → Từ chối yêu cầu.

### Quy tắc nghiệp vụ

* Mỗi bạn đọc chỉ được mượn tối đa N cuốn.
* Thời hạn mượn là X ngày.

---

## 4.5. ĐẶC TẢ USE CASE: TRẢ SÁCH

### Thông tin chung

| Thuộc tính  | Nội dung                  |
| ------------- | -------------------------- |
| Tên Use Case | Trả sách                 |
| Actor chính  | Bạn đọc, Thủ thư      |
| Mục tiêu    | Ghi nhận việc trả sách |

### Luồng sự kiện chính

1. Người dùng chọn chức năng  **Trả sách** .
2. Nhập mã phiếu mượn.
3. Hệ thống xác nhận thông tin.
4. Cập nhật trạng thái sách.

### Luồng sự kiện phụ

* **D1: Trả sách quá hạn** → Hệ thống tính tiền phạt.

### Quy tắc nghiệp vụ

* Tiền phạt = số ngày trễ × mức phạt/ngày.

---

## 4.6. ĐẶC TẢ USE CASE: TÌM KIẾM SÁCH

### Luồng sự kiện chính

1. Người dùng nhập từ khóa.
2. Chọn tiêu chí (tên sách, tác giả, thể loại…).
3. Hệ thống xử lý.
4. Hiển thị kết quả.

### Luồng sự kiện phụ

* Không có kết quả → Thông báo cho người dùng.

---

## 4.7. ĐẶC TẢ USE CASE: QUẢN LÝ BẠN ĐỌC

### Luồng sự kiện chính

1. Thủ thư chọn chức năng  **Quản lý bạn đọc** .
2. Thêm / Sửa / Xóa thông tin bạn đọc.
3. Hệ thống kiểm tra dữ liệu.
4. Lưu thông tin.

### Quy tắc nghiệp vụ

* Mã bạn đọc là duy nhất.
* Không xóa bạn đọc đang mượn sách.

---

## 4.8. ĐẶC TẢ USE CASE BỔ SUNG (MỞ RỘNG)

### 4.8.1. ĐẶC TẢ USE CASE: GIA HẠN MƯỢN SÁCH

#### Thông tin chung

| Thuộc tính        | Nội dung                                                          |
| ------------------- | ------------------------------------------------------------------ |
| Tên Use Case       | Gia hạn mượn sách                                              |
| Mô tả             | Cho phép bạn đọc gia hạn thời gian mượn sách đang mượn |
| Actor chính        | Bạn đọc, Thủ thư                                              |
| Mục tiêu          | Kéo dài thời gian mượn sách theo quy định                  |
| Mức độ ưu tiên | Trung bình                                                        |

#### Điều kiện

| Loại              | Mô tả                                        |
| ------------------ | ---------------------------------------------- |
| Tiền điều kiện | Sách đang được mượn và chưa quá hạn |
| Hậu điều kiện  | Thời hạn trả sách được cập nhật       |

#### Luồng sự kiện chính

1. Bạn đọc chọn chức năng  **Gia hạn mượn sách** .
2. Nhập mã phiếu mượn cần gia hạn.
3. Hệ thống kiểm tra điều kiện gia hạn.
4. Hệ thống cập nhật ngày trả mới.
5. Thông báo gia hạn thành công.

#### Luồng sự kiện phụ

* **E1: Không đủ điều kiện gia hạn** → Hệ thống từ chối và hiển thị lý do.

#### Quy tắc nghiệp vụ

* Mỗi phiếu mượn chỉ được gia hạn tối đa 1 lần.
* Không cho phép gia hạn sách đã có người đặt trước.

---

### 4.8.2. ĐẶC TẢ USE CASE: ĐẶT TRƯỚC SÁCH

#### Thông tin chung

| Thuộc tính        | Nội dung                                                     |
| ------------------- | ------------------------------------------------------------- |
| Tên Use Case       | Đặt trước sách                                           |
| Mô tả             | Cho phép bạn đọc đặt trước sách đang được mượn |
| Actor chính        | Bạn đọc                                                    |
| Mục tiêu          | Đảm bảo quyền mượn sách khi sách được trả         |
| Mức độ ưu tiên | Trung bình                                                   |

#### Điều kiện

| Loại              | Mô tả                                               |
| ------------------ | ----------------------------------------------------- |
| Tiền điều kiện | Sách đang ở trạng thái “Đang mượn”          |
| Hậu điều kiện  | Yêu cầu đặt trước được lưu trong hệ thống |

#### Luồng sự kiện chính

1. Bạn đọc tìm kiếm và chọn sách cần đặt trước.
2. Chọn chức năng  **Đặt trước** .
3. Hệ thống kiểm tra số lượng người đặt trước.
4. Ghi nhận yêu cầu đặt trước.
5. Thông báo đặt trước thành công.

#### Luồng sự kiện phụ

* **F1: Số lượng đặt trước đạt giới hạn** → Hệ thống từ chối yêu cầu.

#### Quy tắc nghiệp vụ

* Mỗi sách chỉ cho phép tối đa N lượt đặt trước.
* Ưu tiên theo thứ tự thời gian đăng ký.

---

### 4.8.3. ĐẶC TẢ USE CASE: BÁO CÁO – THỐNG KÊ

#### Thông tin chung

| Thuộc tính        | Nội dung                                               |
| ------------------- | ------------------------------------------------------- |
| Tên Use Case       | Báo cáo – Thống kê                                 |
| Mô tả             | Cung cấp các báo cáo tổng hợp phục vụ quản lý |
| Actor chính        | Quản trị viên                                        |
| Mục tiêu          | Hỗ trợ công tác quản lý và ra quyết định      |
| Mức độ ưu tiên | Trung bình                                             |

#### Điều kiện

| Loại              | Mô tả                                       |
| ------------------ | --------------------------------------------- |
| Tiền điều kiện | Quản trị viên đã đăng nhập            |
| Hậu điều kiện  | Báo cáo được hiển thị hoặc xuất file |

#### Luồng sự kiện chính

1. Quản trị viên chọn chức năng  **Báo cáo – Thống kê** .
2. Lựa chọn loại báo cáo (sách mượn nhiều, quá hạn, tồn kho…).
3. Hệ thống tổng hợp dữ liệu.
4. Hiển thị báo cáo hoặc xuất file.

#### Quy tắc nghiệp vụ

* Dữ liệu báo cáo phải phản ánh đúng thời điểm truy vấn.
* Chỉ quản trị viên mới có quyền truy cập chức năng này.

## 4.9. Kết luận chương

Chương 4 đã trình bày đầy đủ và chi tiết các Use Case của hệ thống Quản lý Thư viện, bao gồm các chức năng cơ bản và các Use Case mở rộng nhằm phản ánh sát hơn hoạt động thực tế của thư viện. Những đặc tả này là cơ sở quan trọng cho việc xây dựng các sơ đồ UML chi tiết, thiết kế cơ sở dữ liệu và triển khai hệ thống trong các giai đoạn tiếp theo.


# CHƯƠNG 5:THIẾT KẾ HỆ THỐNG

## 5.1. Biểu đồ lớp

<img src="../img/bieudolop.png">
>>>>>>> 8726732bcb9eefb8a17bd4cce640d42e17268a3b

## 5.2. Biểu đồ tuần tự
### 5.2.1. Biểu đồ tuần tự đăng ký
<img src="../img/dangkysequence.png">

### 5.2.2. Biểu đồ tuần tự đăng nhập
<img src="../img/dangnhapsequence.png">

### 5.2.3. Biểu đồ tuần tự Quên mật khẩu
<img src="../img/quenmatkhausequence.png">
# V. THIẾT KẾ HỆ THỐNG

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

### 5.3.6. Biểu đồ hoạt thêm sách mới
<img src="../img/addsach.png">

### 5.3.7. Biểu đồ hoạt động cập nhật sách
<img src="../img/updatesach.png">

### 5.3.8. Biểu đồ hoạt động xóa sách
<img src="../img/deletesach.png">

### 5.3.9. Biểu đồ hoạt động quản lý mượn sách
<img src="../img/quanlymuon.png">
