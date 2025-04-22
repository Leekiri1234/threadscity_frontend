import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface SuggestedUser {
  id: string;
  username: string;
  displayName?: string;
  avatar?: string;
  followers?: number;
  bio?: string;
  verified?: boolean;
}

export function Search() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'profiles' | 'posts'>('profiles');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  // Focus search input on page load
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    
    fetchSuggestedUsers();

    // Đặt tiêu đề trang
    document.title = "Tìm kiếm | ThreadsCity";
  }, []);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  // Mock function to fetch suggested users
  const fetchSuggestedUsers = async () => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Mock data based on the image
    const mockUsers: SuggestedUser[] = [
      {
        id: 'ktln_thread',
        username: 'ktln_thread',
        displayName: 'KTLN', 
        followers: 9342,
        bio: 'Thread của KTLN'
      },
      {
        id: 'moon.nef_',
        username: 'moon.nef_',
        displayName: 'Mangata',
        followers: 78100,
        bio: 'Nơi giải toả nỗi buồn\nSomewhere with someone 🌱 🌱'
      },
      {
        id: 'kienbo_',
        username: 'kienbo_',
        displayName: 'Trung Kiên',
        followers: 67
      },
      {
        id: '_vhoantr',
        username: '_vhoantr',
        displayName: 'Trần Việt Hoàn',
        followers: 192,
        bio: '📍 Hanoi | 18+'
      },
      {
        id: 'caonhi_2k6',
        username: 'caonhi_2k6',
        displayName: 'Cao Nhi',
        followers: 1240,
        bio: 'Sống và làm việc tại Sài Gòn ✨'
      },
      {
        id: 'thucuoi_01',
        username: 'thucuoi_01',
        displayName: 'Thu Cười',
        followers: 643,
        bio: 'Designer | Photographer 📸'
      }
    ];
    
    setSuggestedUsers(mockUsers);
    setIsLoading(false);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const formatFollowerCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}Tr người theo dõi`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K người theo dõi`;
    }
    return `${count} người theo dõi`;
  };
  
  return (
    <div className="home-container">
      {/* Search Header - Updated to match PostDetail style */}
      <div className="feed-header-wrapper">
        <div className="post-detail-header search-detail-header">
          <button onClick={handleGoBack} className="post-detail-back">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
            </svg>
          </button>
          <h2 className="post-detail-title">Tìm kiếm</h2>
          <button className="post-detail-options">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Search Content Wrapper */}
      <div className="feed-wrapper">
        <div className="feed-scrollable-area">
          {/* Search Input */}
          <div className="search-input-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                className="search-input"
                placeholder="Tìm kiếm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button 
                  className="search-clear-btn" 
                  onClick={() => setSearchQuery('')}
                  aria-label="Xóa tìm kiếm"
                >
                  <span>×</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Search Tabs - Like Feed Selector */}
          <div className="search-tabs">
            <div 
              className={`search-tab ${activeTab === 'profiles' ? 'active' : ''}`}
              onClick={() => setActiveTab('profiles')}
            >
              Tài khoản
            </div>
            <div 
              className={`search-tab ${activeTab === 'posts' ? 'active' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              Bài viết
            </div>
          </div>
          
          {/* Suggested Follow Section */}
          {activeTab === 'profiles' && (
            <div className="post-feed">
              <div className="search-suggested-header">
                <h3>Gợi ý theo dõi</h3>
              </div>
              
              {isLoading ? (
                <div className="search-loading">
                  <p>Đang tải...</p>
                </div>
              ) : (
                <div className="search-results">
                  {suggestedUsers.map(user => (
                    <div key={user.id} className="post-item user-profile-item">
                      <div className="user-profile-avatar">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.username} />
                        ) : (
                          <div className="default-avatar">
                            {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      
                      <div className="user-profile-content">
                        <div className="user-profile-header">
                          <div className="user-profile-info">
                            <Link to={`/profile/${user.id}`} className="user-profile-username">
                              {user.username}
                            </Link>
                            <div className="user-profile-display-name">
                              {user.displayName || user.username}
                            </div>
                          </div>
                          
                          <div className="user-profile-action">
                            <button className="follow-button">Theo dõi</button>
                          </div>
                        </div>
                        
                        {user.bio && (
                          <div className="user-profile-bio">
                            {user.bio}
                          </div>
                        )}
                        
                        {user.followers !== undefined && (
                          <div className="user-profile-followers">
                            {formatFollowerCount(user.followers)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Posts results - empty for now */}
          {activeTab === 'posts' && (
            <div className="post-feed">
              <div className="search-not-found">
                <p>Nhập từ khóa để tìm kiếm bài viết</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}