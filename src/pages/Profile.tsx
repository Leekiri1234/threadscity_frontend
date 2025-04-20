import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { PostItem, PostProps } from '../components/PostItem';
import { useAuth } from '../contexts/AuthContext';

interface ProfileUser {
  id: string;
  username: string;
  displayName?: string;
  bio?: string;
  followers?: number;
  following?: number;
  avatar?: string;
}

export function Profile() {
  const { userId } = useParams<{ userId: string }>();
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Thêm hook useLocation để lấy đường dẫn hiện tại
  
  const [activeTab, setActiveTab] = useState<'threads' | 'replies' | 'reposts'>('threads');
  const [userProfile, setUserProfile] = useState<ProfileUser | null>(null);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const [newPostContent, setNewPostContent] = useState<string>('');
  
  // Xử lý khi người dùng nhấp vào nút đăng nhập
  const handleLoginClick = () => {
    navigate('/login');
  };

  // Xử lý khi người dùng nhấp vào nút đăng ký
  const handleRegisterClick = () => {
    navigate('/register');
  };
  
  // Check if the profile belongs to the current logged-in user
  useEffect(() => {
    // Kiểm tra chính xác hơn - Nếu đường dẫn là /profile (không có tham số) thì đây là trang cá nhân của người dùng
    const isProfilePage = location.pathname === '/profile';
    
    if (isAuthenticated) {
      // Đây là trang cá nhân của người dùng đang đăng nhập nếu:
      // 1. Đường dẫn chính xác là /profile HOẶC
      // 2. Không có userId trong tham số HOẶC
      // 3. userId trùng với ID người dùng đang đăng nhập
      if (isProfilePage || !userId) {
        console.log('Setting as current user profile');
        setIsCurrentUser(true);
      } else {
        // Trong ứng dụng thực tế, bạn sẽ lấy ID của người dùng đang đăng nhập từ AuthContext
        const currentUserId = 'hg.ducc'; // Mock ID của người dùng đang đăng nhập
        setIsCurrentUser(userId === currentUserId);
      }
    }
  }, [isAuthenticated, userId, location.pathname]);
  
  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        // This is mock data - replace with actual API call in production
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock user data
        const mockUser: ProfileUser = {
          id: userId || 'hg.ducc',
          username: 'hg.ducc',
          displayName: 'Hong Duc',
          bio: 'Ducc',
          followers: 72,
          following: 145,
          avatar: ''  // Leave empty for default avatar
        };
        
        // Mock user posts
        const mockPosts: PostProps[] = [
          {
            id: '1',
            author: {
              id: userId || 'hg.ducc',
              username: 'hg.ducc',
            },
            content: 'Đây là bài đăng đầu tiên của tôi trên Threads City!',
            timestamp: new Date('2023-10-15T14:30:00'),
            likes: 24,
            replies: 3,
          },
          {
            id: '2',
            author: {
              id: userId || 'hg.ducc',
              username: 'hg.ducc',
            },
            content: 'Đang trên đường đi học, thời tiết hôm nay đẹp quá!',
            timestamp: new Date('2023-10-10T09:15:00'),
            likes: 18,
            replies: 2,
          },
        ];
        
        setUserProfile(mockUser);
        setPosts(mockPosts);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [userId]);
  
  const handleTabChange = (tab: 'threads' | 'replies' | 'reposts') => {
    setActiveTab(tab);
  };

  const handleNewPostSubmit = () => {
    if (newPostContent.trim()) {
      console.log("Đăng bài viết mới:", newPostContent);
      // Đây là nơi bạn sẽ gửi dữ liệu đến API
      setNewPostContent('');
    }
  };

  // Handle go back navigation
  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="profile-loading">
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="home-container">
        <div className="profile-error">
          <p>Không tìm thấy người dùng</p>
          <Link to="/" className="btn btn-outline">Quay lại trang chủ</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Profile Header - Cập nhật để giống với Search.tsx */}
      <div className="feed-header-wrapper">
        <div className="post-detail-header search-detail-header">
          <button onClick={handleGoBack} className="post-detail-back">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
            </svg>
          </button>
          <h2 className="post-detail-title">Trang cá nhân</h2>
          <button className="post-detail-options">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Main content wrapper - Sử dụng feed-wrapper và feed-scrollable-area giống Home.tsx */}
      <div className="feed-wrapper">
        <div className="feed-scrollable-area">
          {/* User Profile Info */}
          <div className="profile-info-section">
            <div className="profile-user-info">
              <div className="profile-name-section">
                <h1 className="profile-display-name">{userProfile?.displayName}</h1>
                <h2 className="profile-username">{userProfile?.username}</h2>
              </div>
              <div className="profile-avatar">
                {userProfile?.avatar ? (
                  <img src={userProfile.avatar} alt={userProfile.displayName || userProfile.username} />
                ) : (
                  <div className="profile-default-avatar">
                    {(userProfile?.displayName || userProfile?.username)?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
            
            {userProfile?.bio && (
              <p className="profile-bio">{userProfile.bio}</p>
            )}
            
            {/* Follower count with profile thumbnails */}
            <div className="profile-followers-section">
              <div className="profile-follower-avatars">
                <div className="follower-avatar-mini"></div>
                <div className="follower-avatar-mini"></div>
              </div>
              <div className="profile-followers-count">
                <span>{userProfile?.followers} người theo dõi</span>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="profile-buttons">
              {!isAuthenticated ? (
                // Người dùng chưa đăng nhập - hiển thị nút đăng nhập/đăng ký
                <div className="profile-guest-actions">
                  <button onClick={handleLoginClick} className="profile-login-button">
                    Đăng nhập để theo dõi
                  </button>
                  <div className="profile-register-prompt">
                    Chưa có tài khoản? <button onClick={handleRegisterClick} className="profile-register-link">Đăng ký</button>
                  </div>
                </div>
              ) : location.pathname === '/profile' || isCurrentUser ? (
                // Đây là trang cá nhân của người dùng đang đăng nhập
                // Thêm điều kiện kiểm tra chính xác đường dẫn là /profile để đảm bảo
                <button className="profile-edit-button">Chỉnh sửa trang cá nhân</button>
              ) : (
                // Đây là trang cá nhân của người khác
                <div className="profile-links">
                  <button className="profile-follow-button">Theo dõi</button>
                </div>
              )}
            </div>
          </div>
          
          {/* Completion section for user's own profile */}
          {isCurrentUser && (
            <div className="profile-completion-section">
              <div className="profile-completion-header">
                <h3>Hoàn tất trang cá nhân</h3>
                <span className="profile-completion-count">Còn 1 mục</span>
              </div>
              
              <div className="profile-completion-items">
                <div className="profile-completion-item">
                  <div className="profile-completion-icon create-thread">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
                    </svg>
                  </div>
                  <div className="profile-completion-info">
                    <div className="profile-completion-title">Tạo thread</div>
                    <div className="profile-completion-description">
                      Cho mọi người biết bạn đang nghĩ gì hoặc chia sẻ về một điều mới đây.
                    </div>
                  </div>
                  <div className="profile-completion-action">
                    <button className="profile-completion-button">Tạo</button>
                  </div>
                </div>
                
                <div className="profile-completion-item completed">
                  <div className="profile-completion-icon add-photo">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"></path>
                    </svg>
                  </div>
                  <div className="profile-completion-info">
                    <div className="profile-completion-title">Thêm ảnh đại diện</div>
                    <div className="profile-completion-description">
                      Giúp mọi người dễ dàng nhận ra bạn hơn.
                    </div>
                  </div>
                  <div className="profile-completion-action">
                    <span className="profile-completion-status">Xong</span>
                  </div>
                </div>
                
                <div className="profile-completion-item completed">
                  <div className="profile-completion-icon follow-users">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z"></path>
                    </svg>
                  </div>
                  <div className="profile-completion-info">
                    <div className="profile-completion-title">Theo dõi 5 trang cá nhân</div>
                    <div className="profile-completion-description">
                      Hãy lấp đầy bảng feed bằng những thread bạn quan tâm.
                    </div>
                  </div>
                  <div className="profile-completion-action">
                    <span className="profile-completion-status">Xong</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Content Tabs */}
          <div className="profile-tabs">
            <button 
              className={`profile-tab ${activeTab === 'threads' ? 'active' : ''}`}
              onClick={() => handleTabChange('threads')}
            >
              Thread
            </button>
            <button 
              className={`profile-tab ${activeTab === 'replies' ? 'active' : ''}`}
              onClick={() => handleTabChange('replies')}
            >
              Thread trả lời
            </button>
            <button 
              className={`profile-tab ${activeTab === 'reposts' ? 'active' : ''}`}
              onClick={() => handleTabChange('reposts')}
            >
              Bài đăng lại
            </button>
          </div>
          
          {/* New Post Input Field - Sử dụng cấu trúc create-post từ Home.tsx */}
          {isCurrentUser && activeTab === 'threads' && (
            <div className="create-post">
              <div className="create-post-avatar-placeholder">
                {(userProfile?.displayName || userProfile?.username)?.charAt(0).toUpperCase()}
              </div>
              <div className="create-post-input">
                <input 
                  type="text" 
                  className="create-post-input-field" 
                  placeholder="Có gì mới?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>
              <button 
                className="post-submit-button"
                disabled={!newPostContent.trim()}
                onClick={handleNewPostSubmit}
              >
                Đăng
              </button>
            </div>
          )}
          
          {/* Post content based on selected tab - Sử dụng cấu trúc post-feed từ Home.tsx */}
          <div className="post-feed">
            {activeTab === 'threads' && posts.length > 0 ? (
              posts.map(post => (
                <PostItem key={post.id} {...post} />
              ))
            ) : activeTab === 'threads' ? (
              <div className="profile-no-posts">
                <p>Chưa có bài đăng nào.</p>
                {isCurrentUser && (
                  <Link to="/" className="profile-create-post-link">Tạo bài đăng đầu tiên</Link>
                )}
              </div>
            ) : activeTab === 'replies' ? (
              <div className="profile-no-posts">
                <p>Chưa có trả lời nào.</p>
              </div>
            ) : (
              <div className="profile-no-posts">
                <p>Chưa có bài đăng lại nào.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}