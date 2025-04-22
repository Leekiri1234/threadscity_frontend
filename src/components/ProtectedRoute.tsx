import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * ProtectedRoute component kiểm tra xem người dùng đã đăng nhập chưa
 * Nếu chưa đăng nhập, sẽ chuyển hướng đến trang đăng nhập
 */
export function ProtectedRoute({ children, redirectTo = '/login' }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Hiển thị trạng thái loading nếu đang kiểm tra xác thực
  if (isLoading) {
    return <div className="loading-container">Đang tải...</div>;
  }

  // Nếu chưa xác thực, chuyển hướng đến trang đăng nhập
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // Nếu đã xác thực, hiển thị nội dung route
  return <>{children}</>;
}