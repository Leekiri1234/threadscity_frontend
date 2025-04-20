import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type NotificationType = 'all' | 'follows' | 'thread_replies' | 'mentions' | 'reposts';

interface NotificationsSelectorProps {
  selectedType: NotificationType;
  onSelectType: (type: NotificationType) => void;
}

export function NotificationsSelector({ selectedType, onSelectType }: NotificationsSelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSelectType = (type: NotificationType) => {
    onSelectType(type);
    setIsDropdownOpen(false);
  };

  // Close dropdown and menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Đóng dropdown menu khi click bên ngoài khu vực selector và dropdown
      if (
        selectorRef.current && 
        !selectorRef.current.contains(event.target as Node) &&
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      
      // Đóng options menu khi click bên ngoài
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getTypeTitle = () => {
    switch (selectedType) {
      case 'all':
        return 'Tất cả';
      case 'follows':
        return 'Lượt theo dõi';
      case 'thread_replies':
        return 'Thread trả lời';
      case 'mentions':
        return 'Lượt nhắc';
      case 'reposts':
        return 'Bài đăng lại';
      default:
        return 'Tất cả';
    }
  };

  return (
    <div className="notifications-header">
      {/* Invisible spacer to balance layout */}
      <div className="header-spacer"></div>
      
      {/* Absolutely positioned center element - using notification-specific classes */}
      <div ref={selectorRef} className="notification-selector-header" onClick={handleToggleDropdown}>
        <span className="notification-selector-title">{getTypeTitle()}</span>
        <svg 
          className={`notification-dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} 
          viewBox="0 0 24 24" 
          aria-hidden="true"
        >
          <path d="M12 15.375l-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4z"></path>
        </svg>
      </div>
      
      {/* Options menu on the right */}
      <div className="post-detail-options-wrapper" ref={menuRef}>
        <button onClick={handleToggleMenu} className="post-detail-options">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
          </svg>
        </button>
        
        {isMenuOpen && (
          <div className="notifications-options-dropdown">
            <button className="notification-option-item">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9.5 7c.828 0 1.5 1.119 1.5 2.5S10.328 12 9.5 12 8 10.881 8 9.5 8.672 7 9.5 7zm5 0c.828 0 1.5 1.119 1.5 2.5s-.672 2.5-1.5 2.5S13 10.881 13 9.5 13.672 7 14.5 7zM12 22.25C6.348 22.25 1.75 17.652 1.75 12S6.348 1.75 12 1.75 22.25 6.348 22.25 12 17.652 22.25 12 22.25zm0-18.5c-4.549 0-8.25 3.701-8.25 8.25s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25S16.549 3.75 12 3.75zM8.947 17.322l-1.896-.638C7.101 16.534 8.322 13 12 13s4.898 3.533 4.949 3.684l-1.897.633c-.031-.09-.828-2.316-3.051-2.316s-3.021 2.227-3.053 2.322z"></path>
              </svg>
              <span>Đánh dấu tất cả là đã đọc</span>
            </button>
            <button className="notification-option-item">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"></path>
              </svg>
              <span>Cài đặt thông báo</span>
            </button>
          </div>
        )}
      </div>
      
      {isDropdownOpen && (
        <div className="notification-selector-dropdown" ref={dropdownRef}>
          <button 
            className={`notification-option ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => handleSelectType('all')}
          >
            Tất cả
          </button>
          <button 
            className={`notification-option ${selectedType === 'follows' ? 'active' : ''}`}
            onClick={() => handleSelectType('follows')}
          >
            Lượt theo dõi
          </button>
          <button 
            className={`notification-option ${selectedType === 'thread_replies' ? 'active' : ''}`}
            onClick={() => handleSelectType('thread_replies')}
          >
            Thread trả lời
          </button>
          <button 
            className={`notification-option ${selectedType === 'mentions' ? 'active' : ''}`}
            onClick={() => handleSelectType('mentions')}
          >
            Lượt nhắc
          </button>
          <button 
            className={`notification-option ${selectedType === 'reposts' ? 'active' : ''}`}
            onClick={() => handleSelectType('reposts')}
          >
            Bài đăng lại
          </button>
        </div>
      )}
    </div>
  );
}