import React, { useState, useRef, useEffect } from 'react';
import { PostProps } from './PostItem';

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  submitting: boolean;
  originalPost: PostProps | null;
}

export function ReplyModal({ isOpen, onClose, onSubmit, submitting, originalPost }: ReplyModalProps) {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus textarea when modal opens
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent('');
    }
  };

  // Format timestamp to display
  const formatTimestamp = (time: Date | string) => {
    if (!time) return '';
    const date = typeof time === 'string' ? new Date(time) : time;
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Truncate long text for the original post
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Stop propagation to prevent redirection to post details page
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen || !originalPost) return null;

  return (
    <div className="modal-overlay" onClick={handleModalClick}>
      <div className="create-post-modal reply-modal" ref={modalRef} onClick={handleModalClick}>
        <div className="modal-header">
          <button className="modal-close-btn" onClick={onClose}>
            Hủy
          </button>
          <span className="modal-title">Thread trả lời</span>
          <div></div> {/* Empty div for flex spacing */}
        </div>
        
        <div className="modal-content">
          {/* Original post display */}
          <div className="reply-original-post" onClick={handleModalClick}>
            <div className="post-author-info">
              <div className="post-author-avatar">
                {originalPost.author.avatar ? (
                  <img src={originalPost.author.avatar} alt={originalPost.author.username} />
                ) : (
                  <div className="default-avatar">{originalPost.author.username.charAt(0).toUpperCase()}</div>
                )}
              </div>
              <div className="post-author-details">
                <div className="post-author-name">
                  {originalPost.author.username}
                </div>
                <div className="post-timestamp">{formatTimestamp(originalPost.timestamp)}</div>
              </div>
            </div>
            <div className="post-content">
              <p>{truncateText(originalPost.content)}</p>
              {originalPost.image && (
                <div className="post-image">
                  <img src={originalPost.image} alt="Post attachment" />
                </div>
              )}
            </div>
          </div>
          
          {/* Reply input section - Now more compact */}
          <div className="reply-input-section" onClick={handleModalClick}>
            <div className="modal-user-info">
              <div className="modal-user-avatar">
                <span>U</span>
              </div>
              <div className="modal-username-wrapper">
                <div className="modal-username">hg.ducc</div>
              </div>
            </div>
            
            <form className="modal-form" onSubmit={handleSubmit}>
              <textarea
                ref={textareaRef}
                className="modal-textarea"
                placeholder="Thêm bình luận..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onClick={handleModalClick}
              />
              
              <div className="modal-tools">
                <div className="modal-tool-buttons">
                  <button type="button" className="modal-tool-btn image-tool" onClick={handleModalClick}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="tool-icon">
                      <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                    </svg>
                  </button>
                  <button type="button" className="modal-tool-btn audio-tool" onClick={handleModalClick}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="tool-icon">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9 16.5v-9l7.5 4.5L9 16.5z" />
                    </svg>
                  </button>
                </div>
                <div className="modal-post-btn-wrapper">
                  <button
                    type="button"
                    className="modal-post-btn"
                    disabled={!content.trim() || submitting}
                    onClick={handleSubmit}
                  >
                    {submitting ? 'Đang gửi...' : 'Bình luận'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}