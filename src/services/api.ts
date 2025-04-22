import axios from 'axios';

// Create axios instance with base URL for API calls
const api = axios.create({
  baseURL: '/api', // Sử dụng đường dẫn tương đối để đi qua proxy Vite
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000 // 10 seconds timeout
});

// Interceptor để xử lý lỗi kết nối
api.interceptors.response.use(
  response => response,
  error => {
    // Hiển thị lỗi cụ thể hơn thay vì chỉ "Network Error"
    if (error.code === 'ECONNABORTED') {
      console.error('Yêu cầu đã hết thời gian. Vui lòng thử lại sau.');
    } else if (!error.response) {
      console.error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng hoặc đảm bảo máy chủ đang chạy.');
    }
    return Promise.reject(error);
  }
);

export default api;