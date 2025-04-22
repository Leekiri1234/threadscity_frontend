import api from './api';

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  msg: string;
}

// Hàm tiện ích để thử lại khi gặp lỗi mạng
const retryNetworkRequest = async (requestFn: () => Promise<any>, maxRetries = 2): Promise<any> => {
  let lastError;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error: any) {
      lastError = error;
      // Chỉ thử lại nếu là lỗi mạng (không có response từ server)
      if (error.response) {
        throw error;
      }
      // Chờ một khoảng thời gian trước khi thử lại
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }
  throw lastError;
};

// Auth service for handling authentication-related API calls
const AuthService = {
  // Register a new user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    return retryNetworkRequest(async () => {
      try {
        const response = await api.post<AuthResponse>('/register', data);
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          if (error.response.data.msg) {
            throw new Error(error.response.data.msg);
          } else if (error.response.data.message) {
            throw new Error(error.response.data.message);
          }
        }
        // Xử lý lỗi mạng cụ thể
        if (!error.response) {
          throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và đảm bảo máy chủ đang hoạt động.');
        }
        throw error;
      }
    });
  },

  // Login with existing credentials
  login: async (data: LoginData): Promise<AuthResponse> => {
    return retryNetworkRequest(async () => {
      try {
        const response = await api.post<AuthResponse>('/auth', data);
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data) {
          if (error.response.data.message) {
            throw new Error(error.response.data.message);
          } else if (error.response.data.msg) {
            throw new Error(error.response.data.msg);
          }
        }
        // Xử lý lỗi mạng cụ thể
        if (!error.response) {
          throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng và đảm bảo máy chủ đang hoạt động.');
        }
        throw error;
      }
    });
  },

  // Logout current user
  logout: async (): Promise<AuthResponse> => {
    return retryNetworkRequest(async () => {
      try {
        const response = await api.get<AuthResponse>('/logout');
        return response.data;
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.msg) {
          throw new Error(error.response.data.msg);
        }
        throw error;
      }
    });
  },

  // Check if user is authenticated
  checkAuth: async (): Promise<boolean> => {
    try {
      // Use an endpoint that requires authentication
      const response = await api.get('/homepage');
      console.log('Auth check response:', response.status);
      return true;
    } catch (error: any) {
      console.error('Auth check failed:', error.response?.status || error.message);
      return false;
    }
  }
};

export default AuthService;