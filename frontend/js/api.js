// Thay đổi port này nếu Backend của bạn chạy ở port khác
const BASE_URL = 'http://localhost:3000'; 

/**
 * Hàm gọi API dùng chung cho toàn bộ dự án
 * Tự động đính kèm thông tin Session (credentials: 'include')
 */
async function apiFetch(endpoint, options = {}) {
    // Thiết lập cấu hình mặc định
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include' // RẤT QUAN TRỌNG: Để gửi Cookie Session lên Backend
    };

    // Gộp cấu hình mặc định với cấu hình người dùng truyền vào
    const finalOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...(options.headers || {})
        }
    };

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, finalOptions);
        const data = await response.json();

        // Nếu HTTP status trả về không phải 2xx (ví dụ: 401, 403, 404, 500)
        if (!response.ok) {
            throw new Error(data.message || 'Có lỗi xảy ra từ server!');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error; // Ném lỗi ra để các file JS khác bắt được và hiển thị lên giao diện
    }
}