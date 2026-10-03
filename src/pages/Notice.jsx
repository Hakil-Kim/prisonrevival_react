import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NOTICE_DATA } from '../constants/noticeData';
import ImageModal from '../components/common/ImageModal';
import { Share2, Check } from 'lucide-react';

const Notice = () => {
  const { type } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const [activeNoticeId, setActiveNoticeId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const noticeBoardRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (noticeBoardRef.current && !noticeBoardRef.current.contains(e.target)) {
        setActiveNoticeId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // URL ?id= 파라미터 감지 시 자동 펼침 및 스크롤 이동
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const targetId = params.get('id');
    if (targetId) {
      setActiveNoticeId(targetId);
      setTimeout(() => {
        const el = document.getElementById(`notice-${targetId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 350);
    }
  }, [location.search, type]);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const renderContentWithLinks = (text) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split('\n').map((line, i) => {
      const parts = line.split(urlRegex);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (urlRegex.test(part)) {
              return (
                <a 
                  key={j} 
                  href={part} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: '#047857', fontWeight: 'bold', textDecoration: 'underline' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {part}
                </a>
              );
            }
            return part;
          })}
          <br />
        </span>
      );
    });
  };

  const handleShare = async (e, notice) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/notice/${notice.type || type}?id=${notice.id}`;
    const shareData = {
      title: notice.title,
      text: notice.title,
      url: shareUrl
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setToastMessage(t('msgLinkCopied'));
      setTimeout(() => setToastMessage(null), 2500);
    } catch (err) {
      console.error('Failed to copy share link:', err);
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'general': return t('navSubGeneral');
      case 'matching': return t('navSubMatching');
      case 'books': return t('navSubBookSupport');
      case 'revival-acc': return t('navSubRevivalAccounting');
      case 'angeltree-acc': return t('navSubAngelAccounting');
      default: return t('navNotice');
    }
  };

  return (
    <main id="notice-page">
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{getTitle()}</h1>
        </div>
      </section>

      <div className="container">
        <section className="section">
          {(() => {
            const filteredNotices = NOTICE_DATA
              .filter(notice => notice.type === type)
              .sort((a, b) => b.date.localeCompare(a.date));

            return filteredNotices.length > 0 ? (
              <div className="notice-board" ref={noticeBoardRef} style={{ maxWidth: '800px', margin: '0 auto' }}>
                {filteredNotices.map((notice, index) => {
                  const isActive = activeNoticeId === notice.id;
                  return (
                    <div 
                      key={notice.id}
                      id={`notice-${notice.id}`}
                      className="notice-item-wrapper"
                      style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        width: '100%',
                        marginTop: index > 0 ? '0.5rem' : '0' 
                      }}
                    >
                      <div 
                        className={`notice-item ${isActive ? 'active' : ''}`}
                        onClick={() => setActiveNoticeId(isActive ? null : notice.id)}
                        style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                      >
                        <div className="notice-left" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                          <span className="notice-dot"></span>
                          <span>{notice.title}</span>
                          {isActive && (
                            <span
                              role="button"
                              tabIndex={0}
                              className="notice-tag"
                              onClick={(e) => handleShare(e, notice)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  handleShare(e, notice);
                                }
                              }}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                backgroundColor: 'var(--dark-green, #112a22)',
                                color: '#ffffff',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                                userSelect: 'none'
                              }}
                              title={t('btnShare')}
                            >
                              <Share2 size={13} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                              <span>{t('btnShare')}</span>
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                          <span className={`notice-tag ${notice.tagClass || ''}`} style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}>{notice.date}</span>
                          <span style={{ fontSize: '0.8rem', opacity: 0.6, transform: isActive ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', display: 'inline-block' }}>▼</span>
                        </div>
                      </div>
                      <div 
                        className="notice-detail-content" 
                        style={{
                          maxHeight: isActive ? '20000px' : '0',
                          opacity: isActive ? 1 : 0,
                          overflow: 'hidden',
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          padding: isActive ? '1.5rem 1.5rem 2rem 1.5rem' : '0 1.5rem',
                          backgroundColor: '#f9fafb',
                          borderRadius: '8px',
                          marginTop: isActive ? '0.5rem' : '0',
                          marginBottom: isActive ? '1rem' : '0',
                          fontSize: '0.95rem',
                          lineHeight: '1.75',
                          color: '#374151',
                          textAlign: 'left',
                          border: isActive ? '1px solid rgba(17, 42, 34, 0.08)' : 'none'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {renderContentWithLinks(notice.content)}
                        {notice.images && notice.images.length > 0 && (
                          <div style={{ marginTop: '2rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                            {notice.images.map((imgSrc, imgIdx) => (
                              <div 
                                key={imgIdx} 
                                style={{ 
                                  cursor: 'zoom-in', 
                                  maxWidth: '100%', 
                                  borderRadius: '12px', 
                                  overflow: 'hidden',
                                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' 
                                }}
                                onClick={() => handleImageClick(imgSrc)}
                              >
                                <img 
                                  src={imgSrc} 
                                  alt="공지 첨부 이미지" 
                                  style={{ width: '100%', height: 'auto', display: 'block' }} 
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ 
                background: 'white', 
                padding: '4rem', 
                borderRadius: '24px', 
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)', 
                textAlign: 'center', 
                border: '1px solid rgba(0,0,0,0.05)',
                margin: '0 auto',
                maxWidth: '800px'
              }}>
                <p style={{ fontSize: '1.2rem', color: '#666', margin: 0 }}>{t('noticePagePlaceholder')}</p>
              </div>
            );
          })()}
        </section>

        <div style={{ marginTop: '6rem', textAlign: 'center', marginBottom: '6rem' }}>
          <Link to="/" className="secondary-btn">{t('backToHome')}</Link>
        </div>
      </div>
      <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(17, 24, 39, 0.92)',
            color: '#fff',
            padding: '0.75rem 1.4rem',
            borderRadius: '50px',
            fontSize: '0.88rem',
            fontWeight: 500,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backdropFilter: 'blur(8px)',
            pointerEvents: 'none'
          }}
        >
          <Check size={16} color="#34d399" />
          <span>{toastMessage}</span>
        </div>
      )}
    </main>
  );
};

export default Notice;
