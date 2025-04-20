// filepath: c:\Users\nguye\Desktop\IWS-Final\frontend\threadscityfrontend\src\pages\PostDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PostProps } from '../components/PostItem';
import { ReplyModal } from '../components/ReplyModal';

export function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostProps | null>(null);
  const [replies, setReplies] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [replyContent, setReplyContent] = useState<string>('');
  const [showSortOptions, setShowSortOptions] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<'top' | 'recent'>('top');
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [submittingReply, setSubmittingReply] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostProps | null>(null);

  useEffect(() => {
    // For now, use mock data - in a real app, you would fetch post data from API
    const fetchPostData = async () => {
      try {
        // This is mock data - replace with actual API call in production
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock post data
        const mockPost: PostProps = {
          id: postId || '1',
          author: {
            id: 'istrawberryyou0',
            username: 'istrawberryyou0',
          },
          content: 't với bố t đi cà phê\nt vừa đau bụng chưa kịp nói vì chưa muốn về\nbố t "anh đau bụng quá hay mình về sớm đi"\nt mới bảo "bố đau bụng vẻ là hết đau hay gì?"\nánh kêu "anh về đi là" 🫠',
          timestamp: new Date('2023-07-06T12:00:00'),
          likes: 2400,
          replies: 51,
        };
        
        // Mock replies data
        const mockReplies: PostProps[] = [
          {
            id: 'reply1',
            author: {
              id: 'nguyenanhthuongle',
              username: 'nguyenanhthuongle',
            },
            content: 'Bố trong quán cà phê không có nhà vệ sinh cho a là hả :)',
            timestamp: new Date('2023-07-06T12:30:00'),
            likes: 164,
            replies: 7,
          },
          {
            id: 'reply2',
            author: {
              id: '_havit.02_',
              username: '_havit.02_',
            },
            content: 'mỗi lần thấy bố mình kêu buồn ỉa hay đi ỉa là mình cười éo chịu đc',
            timestamp: new Date('2023-07-06T13:00:00'),
            likes: 41,
            replies: 1,
          },
          {
            id: 'reply3',
            author: {
              id: 'istrawberryyou0',
              username: 'istrawberryyou0',
            },
            content: 'bố t với t suốt ngày đau bụng và ỉa',
            timestamp: new Date('2023-07-06T13:30:00'),
            likes: 4,
            replies: 0,
          },
        ];
        
        setPost(mockPost);
        setReplies(mockReplies);
      } catch (error) {
        console.error('Error fetching post data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  // Format timestamp to display
  const formatTimestamp = (time: Date | string) => {
    const date = typeof time === 'string' ? new Date(time) : time;
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Handle submit from the inline reply form
  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    
    console.log('Reply submitted from inline form:', replyContent);
    setReplyContent('');
  };
  
  // Open the reply modal for the main post
  const handleMainPostReply = () => {
    if (post) {
      setSelectedPost(post);
      setIsReplyModalOpen(true);
    }
  };
  
  // Open the reply modal for a specific reply
  const handleReplyToComment = (replyPost: PostProps) => {
    setSelectedPost(replyPost);
    setIsReplyModalOpen(true);
  };
  
  // Handle submission from the reply modal
  const handleModalReplySubmit = (content: string) => {
    setSubmittingReply(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Reply submitted from modal:', content, 'to post:', selectedPost?.id);
      setSubmittingReply(false);
      setIsReplyModalOpen(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="post-detail-container">
        <div className="post-detail-loading">
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail-container">
        <div className="post-detail-error">
          <p>Không tìm thấy bài viết</p>
          <Link to="/" className="btn btn-outline">Quay lại trang chủ</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-container">
      {/* Header with back button and options button */}
      <div className="feed-header-wrapper">
        <div className="post-detail-header">
          <Link to="/" className="post-detail-back">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
            </svg>
          </Link>
          <h2 className="post-detail-title">Thread</h2>
          <button className="post-detail-options">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Main content wrapped like feed-wrapper */}
      <div className="feed-wrapper">
        <div className="feed-scrollable-area">
          {/* Main post */}
          <div className="post-detail-main">
            <div className="post-detail-item">
              <div className="post-header">
                <Link to={`/profile/${post.author.id}`} className="post-author-avatar">
                  {post.author.avatar ? (
                    <img src={post.author.avatar} alt={post.author.username} />
                  ) : (
                    <div className="default-avatar">{post.author.username.charAt(0).toUpperCase()}</div>
                  )}
                </Link>
                <div className="post-info">
                  <Link to={`/profile/${post.author.id}`} className="post-author-name">
                    {post.author.username}
                  </Link>
                  <span className="post-timestamp">{formatTimestamp(post.timestamp)}</span>
                </div>
                <button className="post-more-options">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                  </svg>
                </button>
              </div>

              <div className="post-content">
                <p>{post.content}</p>
                {post.image && (
                  <div className="post-image">
                    <img src={post.image} alt="Post attachment" />
                  </div>
                )}
              </div>

              <div className="post-actions">
                <button className={`post-action ${post.isLiked ? 'is-active' : ''}`}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                  </svg>
                  {(post.likes ?? 0) > 0 && <span>{post.likes}</span>}
                </button>
                <button className="post-action" onClick={handleMainPostReply}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                  </svg>
                  {(post.replies ?? 0) > 0 && <span>{post.replies}</span>}
                </button>
                <button className="post-action">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
                    <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Reply input */}
          <div className="post-reply-form-container">
            <form className="post-reply-form" onSubmit={handleSubmitReply}>
              <div className="post-reply-avatar">
                <div className="default-avatar">U</div>
              </div>
              <input
                type="text"
                placeholder="Thêm bình luận..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="post-reply-input"
              />
              <button 
                type="submit" 
                className="post-reply-button"
                disabled={!replyContent.trim()}
              >
                Bình luận
              </button>
            </form>
          </div>

          {/* Sort options header - Cập nhật cấu trúc cho phù hợp với ảnh thứ 2 */}
          <div className="feed-header-wrapper">
            <div className="post-detail-sort-header">
              <div className="post-sort-dropdown-container">
                <button 
                  className="post-sort-dropdown-button" 
                  onClick={() => setShowSortOptions(!showSortOptions)}
                >
                  {sortOption === 'top' ? 'Hàng đầu' : 'Mới đây'}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 15.4l-6-6L7.4 8l4.6 4.6L16.6 8 18 9.4z"></path>
                  </svg>
                </button>
                
                {showSortOptions && (
                  <div className="post-sort-dropdown-menu">
                    <div 
                      className={`post-sort-option ${sortOption === 'top' ? 'selected' : ''}`}
                      onClick={() => {
                        setSortOption('top');
                        setShowSortOptions(false);
                      }}
                    >
                      <span>Hàng đầu</span>
                      {sortOption === 'top' && (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path>
                        </svg>
                      )}
                    </div>
                    <div 
                      className={`post-sort-option ${sortOption === 'recent' ? 'selected' : ''}`}
                      onClick={() => {
                        setSortOption('recent');
                        setShowSortOptions(false);
                      }}
                    >
                      <span>Mới đây</span>
                      {sortOption === 'recent' && (
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path>
                        </svg>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <Link to="#" className="post-view-activity">
                Xem hoạt động
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.586 12L7.65 5.064 9.064 3.65 17.414 12l-8.35 8.35-1.414-1.414L14.586 12z"></path>
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Replies */}
          <div className="post-detail-replies">
            {replies.map((reply) => (
              <div key={reply.id} className="post-detail-reply-item">
                <div className="post-header">
                  <Link to={`/profile/${reply.author.id}`} className="post-author-avatar">
                    {reply.author.avatar ? (
                      <img src={reply.author.avatar} alt={reply.author.username} />
                    ) : (
                      <div className="default-avatar">{reply.author.username.charAt(0).toUpperCase()}</div>
                    )}
                  </Link>
                  <div className="post-info">
                    <Link to={`/profile/${reply.author.id}`} className="post-author-name">
                      {reply.author.username}
                    </Link>
                    <span className="post-timestamp">{formatTimestamp(reply.timestamp)}</span>
                  </div>
                  <button className="post-more-options">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                    </svg>
                  </button>
                </div>

                <div className="post-content">
                  <p>{reply.content}</p>
                  {reply.image && (
                    <div className="post-image">
                      <img src={reply.image} alt="Reply attachment" />
                    </div>
                  )}
                </div>

                <div className="post-actions">
                  <button className={`post-action ${reply.isLiked ? 'is-active' : ''}`}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                    </svg>
                    {(reply.likes ?? 0) > 0 && <span>{reply.likes}</span>}
                  </button>
                  <button className="post-action" onClick={() => handleReplyToComment(reply)}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                    </svg>
                    {(reply.replies ?? 0) > 0 && <span>{reply.replies}</span>}
                  </button>
                  <button className="post-action">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
                      <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reply Modal */}
      <ReplyModal
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        onSubmit={handleModalReplySubmit}
        submitting={submittingReply}
        originalPost={selectedPost}
      />
    </div>
  );
}