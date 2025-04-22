import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../hooks/useTheme';
import threadsLogo from '../assets/Threads_(app)_logo.svg';

export function Register() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState(''); // New state for full name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    document.title = 'Đăng ký | ThreadsCity';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() || !fullName.trim()) {
      return setError('Vui lòng điền đầy đủ thông tin');
    }
    
    if (password !== confirmPassword) {
      return setError('Mật khẩu không khớp');
    }
    
    if (password.length < 6) {
      return setError('Mật khẩu phải có ít nhất 6 ký tự');
    }
    
    setNetworkError(false);
    try {
      setError('');
      setLoading(true);
      await register(username, email, password, fullName);
      navigate('/login', { state: { message: 'Đăng ký thành công. Vui lòng đăng nhập.' } });
    } catch (err: any) {
      // Kiểm tra nếu là lỗi mạng (không có response)
      if (err.message && (
          err.message.includes('Không thể kết nối') || 
          err.message.includes('Network Error') ||
          !err.response
      )) {
        setNetworkError(true);
        setError('Lỗi kết nối có thể do máy chủ chưa khởi động hoặc đang bị trục trặc.');
      } else if (err.message === 'Existed email!') {
        // Thông báo cụ thể hơn khi email đã tồn tại
        setError('Email này đã được sử dụng. Vui lòng sử dụng email khác hoặc đăng nhập nếu đây là tài khoản của bạn.');
      } else if (err.message === 'Existed username!') {
        // Thông báo cụ thể hơn khi username đã tồn tại
        setError('Tên người dùng này đã được sử dụng. Vui lòng chọn tên người dùng khác.');
      } else {
        const errorMessage = err.message || 'Tạo tài khoản thất bại';
        setError(errorMessage);
      }
      console.error(err);
    } finally {
      setLoading(false);
      setIsRetrying(false);
    }
  };

  // Chức năng thử lại khi gặp lỗi mạng
  const handleRetry = () => {
    setIsRetrying(true);
    setError('');
    setTimeout(() => {
      handleSubmit(new Event('submit') as any);
    }, 1000);
  };

  // Helper function to render error with theme support
  const renderErrorMessage = () => {
    if (!error) return null;
    
    return (
      <div className="alert alert-error mb-4" role="alert">
        {error}
        {networkError && (
          <button
            onClick={handleRetry}
            className="retry-button"
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              color: theme === 'dark' ? '#ff5252' : '#d32f2f',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '0 0 0 12px',
              transition: 'color var(--transition-normal)'
            }}
            disabled={loading || isRetrying}
          >
            {isRetrying ? 'Đang thử lại...' : 'Thử lại'}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="auth-page">
      {/* Theme toggle button with SVG icons - repositioned to top left */}
      <button 
        onClick={toggleTheme} 
        className="theme-toggle" 
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          width: '24px',
          height: '24px',
          zIndex: 10
        }}
        title="Chuyển đổi chủ đề"
      >
        {theme === 'dark' ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M12 9c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"></path>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"></path>
          </svg>
        )}
      </button>

      {/* Threads logo circle */}
      <div className="pink-circle">
        <img src={threadsLogo} alt="Logo Threads" className="threads-logo" />
      </div>

      <div className="auth-container">
        <h1 className="auth-title">Tham gia ThreadsCity cùng chúng tôi</h1>
        
        {renderErrorMessage()}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="auth-input"
            type="text"
            placeholder="Tên người dùng"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            required
          />
          
          <input
            className="auth-input"
            type="text"
            placeholder="Họ tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
            required
          />
          
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          
          <input
            className="auth-input"
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
          
          <input
            className="auth-input"
            type="password"
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            required
          />
          
          <button 
            className="auth-button" 
            type="submit"
            disabled={loading}
          >
            {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
          </button>
        </form>
        
        <div className="auth-divider">
          <span>hoặc</span>
        </div>
        
        <div className="auth-footer">
          <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
        </div>
      </div>
    </div>
  );
}
