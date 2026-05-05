# Cổng Thông Tin Nhà Ở Xã Hội (LandingpageNOXH)

Dự án Landing Page cung cấp thông tin về các dự án Nhà Ở Xã Hội (NOXH) tại miền Bắc.

## Tính năng chính

*   **Danh sách dự án**: Hiển thị thông tin chi tiết các dự án (vị trí, giá bán, tiến độ).
*   **Bản đồ tỉnh thành**: Lọc dự án theo địa phương.
*   **Đăng ký tư vấn**: Form thu thập thông tin khách hàng (kết nối Google Sheets).
*   **Tin tức**: Cập nhật thông tin thị trường.

## Cài đặt & Chạy Local

1.  **Cài đặt dependencies**:
    ```bash
    npm install
    ```

2.  **Cấu hình môi trường**:
    Tạo file `.env` (hoặc `.env.local`) dựa trên `.env.example`:
    ```env
    VITE_GOOGLE_APPS_SCRIPT_URL=your_script_url
    VITE_ENABLE_DYNAMIC_FETCH=true
    ```

3.  **Chạy server development**:
    ```bash
    npm run dev
    ```
    Truy cập: `http://localhost:5173`

4.  **Chạy test**:
    ```bash
    npm run test
    ```

## Deploy

Dự án được cấu hình để deploy bằng Docker/Nginx.
Xem `Dockerfile` và `nginx-docker.conf` để biết chi tiết.

## Lưu ý về Routing

Dự án sử dụng `react-router-dom` và `nginx` để xử lý SPA routing.
Nếu gặp lỗi URL dạng `/path#/path`, hệ thống sẽ tự động sanitize (xem `App.jsx`).
