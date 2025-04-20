import React, { useState, useRef, useEffect } from 'react';

type FeedType = 'suggested' | 'following';

interface FeedSelectorProps {
  selectedFeed: FeedType;
  onSelectFeed: (feed: FeedType) => void;
}

export function FeedSelector({ selectedFeed, onSelectFeed }: FeedSelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectFeed = (feed: FeedType) => {
    onSelectFeed(feed);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getFeedTitle = () => {
    return selectedFeed === 'suggested' ? 'Dành cho bạn' : 'Following';
  };

  return (
    <div className="feed-selector" ref={dropdownRef}>
      <div className="feed-selector-header" onClick={handleToggleDropdown}>
        <span className="feed-selector-title">{getFeedTitle()}</span>
        <svg 
          className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} 
          viewBox="0 0 24 24" 
          aria-hidden="true"
        >
          <path d="M12 15.375l-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4z"></path>
        </svg>
      </div>
      
      {isDropdownOpen && (
        <div className="feed-selector-dropdown">
          <button 
            className={`feed-option ${selectedFeed === 'suggested' ? 'active' : ''}`}
            onClick={() => handleSelectFeed('suggested')}
          >
            Dành cho bạn
          </button>
          <button 
            className={`feed-option ${selectedFeed === 'following' ? 'active' : ''}`}
            onClick={() => handleSelectFeed('following')}
          >
            Following
          </button>
        </div>
      )}
    </div>
  );
}