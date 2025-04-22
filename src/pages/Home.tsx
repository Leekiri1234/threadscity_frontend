import React, { useState, useEffect } from 'react';
import { PostItem, PostProps } from '../components/PostItem';
import { FeedSelector } from '../components/FeedSelector';

export function Home() {
  const [selectedFeed, setSelectedFeed] = useState<'suggested' | 'following'>('suggested');

  // Thiết lập tiêu đề trang thành "Trang chủ" khi component được mount
  useEffect(() => {
    document.title = 'Trang chủ | ThreadsCity';
  }, []);

  // Demo posts - dữ liệu mẫu cố định
  const demoPosts: PostProps[] = [
    {
      id: '1',
      author: {
        id: 'user1',
        username: 'workaffirmations',
      },
      content: 'The Katy Perry spaceship plan is a big LOL because they genuinely thought we would be inspired by watching rich women spend money.',
      timestamp: new Date('2023-07-06T12:00:00'),
      likes: 565,
      replies: 30,
    },
    {
      id: '2',
      author: {
        id: 'user2',
        username: 'nao_dgni_dauftu_doi_ten',
      },
      content: 'Mình mới coi xong điểm đgnl của mình, điểm kh nằm ở top cao cũng k phải top thấp\nMng có ai biết tư lấy điểm đgnl như nào kh v điểm mình chỉ từ 850-900 th a',
      timestamp: new Date('2023-07-05T14:30:00'),
      likes: 59,
      replies: 13,
      isLiked: true,
    },
    {
      id: '3',
      author: {
        id: 'user3',
        username: 'tuenhi',
      },
      content: 'Mọi người ơi!! Hiện tại em là sinh viên muốn tìm việc kiểu như làm thu ngân part time ở tp HCM. Mọi người có biết chỗ nào khum ạ😭',
      timestamp: new Date('2023-07-05T10:15:00'),
      likes: 1,
      replies: 4,
    },
    {
      id: '4',
      author: {
        id: 'user4',
        username: 'vyxinhgai_99',
      },
      content: 'Đang nwng ❤️ là có ảnh 🦋',
      timestamp: new Date('2023-07-05T11:15:00'),
      likes: 7,
      replies: 0,
    },
    {
      id: '5',
      author: {
        id: 'user5',
        username: 'amaya100',
      },
      content: 'Senator Chris Van Hollen announces he will be travelling to El Salvador TOMORROW MORNING. 👏🏾👏🏾',
      timestamp: new Date('2023-07-04T09:30:00'),
      likes: 819,
      replies: 22,
    },
    {
      id: '6',
      author: {
        id: 'user6',
        username: 'chris_the_soup',
      },
      content: '@wendys please come dip your fries in my tears',
      timestamp: new Date('2023-07-04T08:15:00'),
      likes: 14,
      replies: 2,
    },
    {
      id: '7',
      author: {
        id: 'user7',
        username: 'georgehtakei',
      },
      content: 'When did the Republican Party become such a group of snowflakes? They talk tough, but when it comes down to it, they are the biggest cowards, scared of LGBTQ+ books, the truth about slavery, drag queens, and the grim reality of gun violence.',
      timestamp: new Date('2023-07-03T20:45:00'),
      likes: 1235,
      replies: 87,
    },
    {
      id: '8',
      author: {
        id: 'user8',
        username: 'thejigsawpuzzle',
      },
      content: 'Put all your feral pigs into a very big jar and shake it up to create pulled pork.',
      timestamp: new Date('2023-07-03T15:20:00'),
      likes: 433,
      replies: 12,
    },
    {
      id: '9',
      author: {
        id: 'user9',
        username: 'szechuan_sauce',
      },
      content: 'Đang chuẩn bị cho kỳ thi tốt nghiệp. Cảm thấy sắp đầu hàng với Vật Lý rồi 😢',
      timestamp: new Date('2023-07-02T10:45:00'),
      likes: 89,
      replies: 23,
    },
    {
      id: '10',
      author: {
        id: 'user10',
        username: 'coffeelover42',
      },
      content: 'Hôm nay ở Sài Gòn mưa quá trời, ngập cả đường luôn. Ai đang ở ngoài đường nhớ cẩn thận nha mọi người ơi!',
      timestamp: new Date('2023-07-01T16:30:00'),
      likes: 156,
      replies: 34,
    },
  ];

  return (
    <div className="home-container">
      {/* Feed selector - tách biệt với post feed */}
      <div className="feed-header-wrapper">
        <FeedSelector 
          selectedFeed={selectedFeed} 
          onSelectFeed={setSelectedFeed}
        />
      </div>
      
      {/* Feed content area - phần chứa bài đăng có khả năng scroll */}
      <div className="feed-wrapper">
        <div className="feed-scrollable-area">
          {/* Create post form - simplified version */}
          <div className="create-post">
            <div className="create-post-avatar-placeholder">
              U
            </div>
            <div className="create-post-input" onClick={() => window.dispatchEvent(new CustomEvent('open_create_post'))}>
              <div className="create-post-placeholder">Có gì mới?</div>
            </div>
            <button 
              type="button" 
              className="post-submit-button"
              onClick={() => window.dispatchEvent(new CustomEvent('open_create_post'))}
            >
              Đăng
            </button>
          </div>

          {/* Posts feed */}
          <div className="post-feed">
            {demoPosts.map((post) => (
              <PostItem key={post.id} {...post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
