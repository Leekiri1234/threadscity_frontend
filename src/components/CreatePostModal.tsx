import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  submitting: boolean;
}

export function CreatePostModal({ isOpen, onClose, onSubmit, submitting }: CreatePostModalProps) {
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      try {
        const res = await axios.post(
          "http://localhost:3001/api/create_post",
          { content },
          { withCredentials: true }
        );
  
        console.log("✅ Post created:", res.data);
        onSubmit(content);
        setContent('');
        onClose();
      } catch (error: any) {
        console.error("Error creating post:", error);
        alert(error.response?.data?.message || "Lỗi khi đăng bài");
      }
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="create-post-modal" ref={modalRef}>
        <div className="modal-header">
          <button className="modal-close-btn" onClick={onClose}>
            Hủy
          </button>
          <span className="modal-title">Thread mới</span>
        </div>
        
        <div className="modal-content">
          <div className="modal-user-info">
            <div className="modal-user-avatar">
              <span>U</span>
            </div>
            <div className="modal-username-wrapper">
              <div className="modal-username">hg.ducc</div>
              <div className="modal-user-context">Thêm chủ đề</div>
            </div>
          </div>
          
          <form className="modal-form" onSubmit={handleSubmit}>
            <textarea
              ref={textareaRef}
              className="modal-textarea"
              placeholder="Có gì mới?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            <div className="modal-tools">
              <button type="button" className="modal-tool-btn image-tool">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="tool-icon">
                  <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                </svg>
              </button>
              <button type="button" className="modal-tool-btn audio-tool">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="tool-icon">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM9 16.5v-9l7.5 4.5L9 16.5z" />
                </svg>
              </button>
            </div>
            
          </form>
          
          <div className="modal-footer">
            <div className="modal-post-btn-wrapper">
              <button
                type="button"
                className="modal-post-btn"
                disabled={!content.trim() || submitting}
                onClick={handleSubmit}
              >
                {submitting ? 'Đang đăng...' : 'Đăng'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}