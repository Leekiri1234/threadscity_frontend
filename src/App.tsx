// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PostDetail } from './pages/PostDetail';
import { Search } from './pages/Search';
import { Profile } from './pages/Profile'; 
import { Notifications } from './pages/Notifications';
import { CreatePostModal } from './components/CreatePostModal'; // Thêm import CreatePostModal
import './styles/index.css';
import { ReactNode, useState, useEffect } from 'react';

// Tạo context hoặc prop drilling để truyền state xuống các components
interface AppLayoutProps {
  children: ReactNode;
  openCreatePostModal?: () => void;
}

// Layout component with vertical navbar
const AppLayout = ({ children, openCreatePostModal }: AppLayoutProps) => {
  return (
    <div className="app-layout">
      <Navbar openCreatePostModal={openCreatePostModal} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default function App() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false); // Thêm state để quản lý trạng thái submitting

  // Đọc theme từ localStorage và áp dụng khi component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Lắng nghe sự kiện mở modal từ các components khác
  useEffect(() => {
    const handleCustomEvent = () => {
      setIsCreateModalOpen(true);
    };

    window.addEventListener('open_create_post', handleCustomEvent);
    
    return () => {
      window.removeEventListener('open_create_post', handleCustomEvent);
    };
  }, []);

  // Hàm xử lý mở modal từ bất kỳ component nào
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  // Hàm xử lý tạo bài đăng mới
  const handleCreatePost = async (content: string) => {
    if (!content.trim()) return;
    
    setSubmitting(true);
    
    // Giả lập thời gian xử lý
    setTimeout(() => {
      setSubmitting(false);
      setIsCreateModalOpen(false); // Đóng modal sau khi đăng
      console.log("Bài đăng mới: ", content);
    }, 1000);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <AppLayout openCreatePostModal={handleOpenCreateModal}>
            <Home />
          </AppLayout>
        } />
        <Route path="/post/:postId" element={
          <AppLayout openCreatePostModal={handleOpenCreateModal}>
            <PostDetail />
          </AppLayout>
        } />
        <Route path="/search" element={
          <AppLayout openCreatePostModal={handleOpenCreateModal}>
            <Search />
          </AppLayout>
        } />
        <Route path="/create" element={
          <AppLayout openCreatePostModal={handleOpenCreateModal}>
            <div className="home-container">
              <h2>Tạo bài viết mới</h2>
            </div>
          </AppLayout>
        } />
        <Route path="/favorites" element={
          <AppLayout openCreatePostModal={handleOpenCreateModal}>
            <Notifications />
          </AppLayout>
        } />
        <Route path="/profile/:userId?" element={
          <AppLayout openCreatePostModal={handleOpenCreateModal}>
            <Profile />
          </AppLayout>
        } />
        <Route path="/pins" element={
          <AppLayout openCreatePostModal={handleOpenCreateModal}>
            <div className="home-container">
              <h2>Bài viết đã ghim</h2>
            </div>
          </AppLayout>
        } />
        <Route path="/settings" element={
          <AppLayout openCreatePostModal={handleOpenCreateModal}>
            <div className="home-container">
              <h2>Cài đặt</h2>
            </div>
          </AppLayout>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={
          <AppLayout openCreatePostModal={handleOpenCreateModal}>
            <div className="home-container">
              <h2>404 - Không tìm thấy trang</h2>
            </div>
          </AppLayout>
        } />
      </Routes>

      {/* Modal tạo bài đăng mới - đặt ở mức App để có thể mở từ bất kỳ trang nào */}
      <CreatePostModal 
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreatePost}
        submitting={submitting}
      />
    </Router>
  );
}
