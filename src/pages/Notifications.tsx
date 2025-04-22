import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import '../styles/notifications.css';
import { NotificationsSelector } from '../components/NotificationsSelector';

// Notification type definition
interface NotificationProps {
  id: string;
  type: 'like' | 'follow' | 'reply' | 'thread_reply';
  user: {
    id: string;
    username: string;
    avatar?: string;
  };
  content?: string;
  timestamp: Date;
  postId?: string;
  read: boolean;
}

// Notification Item Component
const NotificationItem = ({ notification }: { notification: NotificationProps }) => {
  // Function to display notification message based on type
  const getNotificationMessage = () => {
    switch (notification.type) {
      case 'like':
        return 'đã thích bài viết của bạn';
      case 'follow':
        return 'đã theo dõi bạn';
      case 'reply':
        return 'đã trả lời bình luận của bạn';
      case 'thread_reply':
        return 'đã trả lời trong thread của bạn';
      default:
        return 'đã tương tác với bạn';
    }
  };

  // Format timestamp to relative time
  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} ngày`;
    if (hours > 0) return `${hours} giờ`;
    if (minutes > 0) return `${minutes} phút`;
    return `${seconds} giây`;
  };

  return (
    <div className="notification-item">
      <div className="notification-avatar">
        {notification.user.avatar ? (
          <img src={notification.user.avatar} alt={notification.user.username} />
        ) : (
          <div className="avatar-placeholder">{notification.user.username.charAt(0).toUpperCase()}</div>
        )}
      </div>
      <div className="notification-content">
        <div className="notification-header">
          <span className="notification-username">{notification.user.username}</span>
          <span className="notification-action">{getNotificationMessage()}</span>
          <span className="notification-time">{getRelativeTime(notification.timestamp)}</span>
        </div>
        {notification.content && (
          <div className="notification-message">
            {notification.content}
          </div>
        )}
      </div>
    </div>
  );
};

export function Notifications() {
  const [selectedType, setSelectedType] = useState<'all' | 'follows' | 'thread_replies' | 'mentions' | 'reposts'>('all');

  // Thiết lập tiêu đề trang khi component được mount
  useEffect(() => {
    document.title = 'Thông báo | ThreadsCity';
  }, []);

  // Demo notifications data
  const demoNotifications: NotificationProps[] = [
    {
      id: '1',
      type: 'like',
      user: {
        id: 'user1',
        username: 'maahngf',
      },
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      postId: 'post1',
      read: false
    },
    {
      id: '2',
      type: 'reply',
      user: {
        id: 'user2',
        username: 'nhydisney',
      },
      content: 'Cực cưng ><',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      postId: 'post2',
      read: false
    },
    {
      id: '3',
      type: 'thread_reply',
      user: {
        id: 'user3',
        username: 'tg.namm_',
      },
      content: 'Đã bắt đầu một thread',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      postId: 'post3',
      read: true
    },
    {
      id: '4',
      type: 'follow',
      user: {
        id: 'user4',
        username: 'cibidi.six',
      },
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      read: true
    }
  ];

  // Filter notifications based on selected type
  const filteredNotifications = selectedType === 'all'
    ? demoNotifications
    : demoNotifications.filter(notification => {
        switch(selectedType) {
          case 'follows':
            return notification.type === 'follow';
          case 'thread_replies':
            return notification.type === 'thread_reply';
          case 'mentions':
            return notification.type === 'reply';
          case 'reposts':
            return false; // No demo data for this type yet
          default:
            return true;
        }
      });

  return (
    <div className="notifications-container">
      {/* Feed selector - tách biệt với notifications feed */}
      <div className="feed-header-wrapper">
        <NotificationsSelector 
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
      </div>
      
      {/* Notifications feed content area */}
      <div className="notifications-wrapper">
        <div className="notifications-scrollable-area">
          {filteredNotifications.length > 0 ? (
            <div className="notifications-feed">
              {filteredNotifications.map(notification => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification} 
                />
              ))}
            </div>
          ) : (
            <div className="empty-notifications">
              <p>Không có thông báo nào cho loại này</p>
              <p>Thông báo sẽ xuất hiện ở đây khi bạn nhận được tương tác mới</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}