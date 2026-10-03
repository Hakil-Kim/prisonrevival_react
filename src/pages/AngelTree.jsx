import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import ImageModal from '../components/common/ImageModal';
import { ArrowRight, Share2, Check } from 'lucide-react';
import { MANNA_BRIDGE_NEWS_DATA } from '../constants/mannaBridgeNewsData';

const AngelTree = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeNoticeId, setActiveNoticeId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const newsBoardRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (newsBoardRef.current && !newsBoardRef.current.contains(e.target)) {
        setActiveNoticeId(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // URL ?newsId= 또는 ?id= 파라미터 감지 시 자동 펼침 및 스크롤 이동
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const targetId = params.get('newsId') || params.get('id');
    if (targetId) {
      setActiveNoticeId(targetId);
      setTimeout(() => {
        const el = document.getElementById(`news-${targetId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 400);
    }
  }, [location.search]);

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

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleShare = async (e, news) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/angeltree?newsId=${news.id}#manna-bridge-news`;
    const shareData = {
      title: news.title,
      text: news.title,
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

  return (
    <main id="angeltree-page">
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{t('angelTitleMain')}</h1>
          <p className="section-desc fade-in delay-1">{t('angelDescMain')}</p>
        </div>
      </section>

      <div className="container">

      {/* 1. What is Angel Tree? */}
      <section id="intro" className="guide-section scroll-reveal">
        <h2 className="sub-section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>{t('angelIntroTitle')}</h2>
        <div className="guide-intro-box">
          <div className="split-layout" style={{ gap: '3rem' }}>
            <div className="program-img-col" style={{ cursor: 'zoom-in', aspectRatio: 'auto', height: 'fit-content' }} onClick={() => handleImageClick(t('angelIntroImg'))}>
              <img src={t('angelIntroImg')} alt="Angel Tree Intro Illustration" style={{ borderRadius: '16px', width: '100%', height: 'auto', display: 'block' }} />
            </div>
            <div 
              className="content-col"
              dangerouslySetInnerHTML={{ __html: t('angelIntroText') }}
              style={{ padding: 0 }}
            ></div>
          </div>
        </div>
      </section>

      {/* 2. Christmas */}
      <section id="christmas" className="guide-section scroll-reveal">
        <div className="split-layout">
          <div className="program-img-col" style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(t('angelChristmasImg'))}>
            <img src={t('angelChristmasImg')} alt="Christmas Poster" />
          </div>
          <div className="content-col">
            <h3>{t('angelChristmasTitle')}</h3>
            <p>{t('angelChristmasText')}</p>
            
            <div className="guide-box">
              <h4>{t('angelChristmasHowTitle')}</h4>
              <p dangerouslySetInnerHTML={{ __html: t('angelChristmasHowText') }}></p>
            </div>

            <div className="christmas-donate-box">
              <h4>{t('angelChristmasDonateTitle')}</h4>
              <p>{t('angelChristmasDonateTax')}</p>
              <p>{t('angelChristmasDonateNoTax')}</p>
            </div>

            <a 
              href="http://pf.kakao.com/_ptYAG/chat" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="primary-btn"
              style={{ 
                textDecoration: 'none', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem', 
                marginTop: '1.5rem',
                textAlign: 'left',
                whiteSpace: 'pre-line'
              }}
            >
              <ArrowRight size={20} style={{ flexShrink: 0 }} />
              <span>{t('angelChristmasApplyBtn')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Angel Tree : Manna Bridge in Seum */}
      <section id="manna-seum" className="guide-section scroll-reveal">
        <div className="split-layout" style={{ alignItems: 'start' }}>
          <div className="program-img-col">
            <div style={{ cursor: 'zoom-in', marginBottom: '1.5rem' }} onClick={() => handleImageClick('/images/angeltree/angel_manna_seum_banner.png')}>
              <img src="/images/angeltree/angel_manna_seum_banner.png" alt="Manna Bridge in Seum Form" style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }} />
            </div>
            <div style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick(t('angelMannaImg'))}>
              <img src={t('angelMannaImg')} alt="Manna Bridge in Seum Poster" style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }} />
            </div>
          </div>
          <div className="content-col">
            <h3>{t('mannaSeumTitle')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('mannaSeumText') }}></p>
            
            <div className="guide-box">
              <h4>{t('mannaSeumHowTitle')}</h4>
              <p dangerouslySetInnerHTML={{ __html: t('mannaSeumHowText') }}></p>
              <p style={{ marginTop: '1.5rem', fontWeight: 600, color: 'var(--dark-green)' }}>
                {t('mannaSeumInquiry')}
              </p>
            </div>

            <a 
              href="https://online.mrm.or.kr/sr5t4uf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="primary-btn"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}
            >
              <ArrowRight size={20} />
              {t('mannaSeumBtn')}
            </a>
          </div>
        </div>
      </section>

      {/* 4. Angel Tree : Manna Bridge in Angel Tree */}
      <section id="manna-angel" className="guide-section scroll-reveal">
        <div className="split-layout" style={{ alignItems: 'start' }}>
          <div className="program-img-col" style={{ cursor: 'zoom-in' }} onClick={() => handleImageClick('/images/angeltree/angel_manna_angel_banner.png')}>
            <img src="/images/angeltree/angel_manna_angel_banner.png" alt="Manna Bridge in Angel Tree Banner" style={{ width: '100%', height: 'auto', borderRadius: '12px', display: 'block' }} />
          </div>
          <div className="content-col">
            <h3>{t('mannaAngelTitle')}</h3>
            <p dangerouslySetInnerHTML={{ __html: t('mannaAngelText') }}></p>
            
            <div className="guide-box">
              <h4>{t('mannaAngelHowTitle')}</h4>
              <p dangerouslySetInnerHTML={{ __html: t('mannaAngelHowText') }}></p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Prison Angel Tree Ministry & Support Guide */}
      <section id="prison-angel-guide" className="guide-section scroll-reveal" style={{ textAlign: 'center' }}>
        <h2 className="sub-section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>{t('navSubPrisonAngelGuide')}</h2>
        <div 
          style={{ 
            cursor: 'zoom-in', 
            width: '100%', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            display: 'block'
          }} 
          onClick={() => handleImageClick('/images/angeltree/prison_angel_guide.jpg')}
        >
          <img 
            src="/images/angeltree/prison_angel_guide.jpg" 
            alt="Prison Angel Tree Guide Poster" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block'
            }} 
          />
        </div>
      </section>

      {/* 6. Angel Tree : Manna Bridge News */}
      <section id="manna-bridge-news" className="guide-section scroll-reveal" style={{ textAlign: 'center' }}>
        <h2 className="sub-section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>{t('navSubMannaBridgeNews')}</h2>
        <div className="notice-board" ref={newsBoardRef} style={{ maxWidth: '800px', margin: '0 auto' }}>
          {MANNA_BRIDGE_NEWS_DATA.map((news, index) => {
            const isActive = activeNoticeId === news.id;
            return (
              <div 
                key={news.id}
                id={`news-${news.id}`}
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
                  onClick={() => setActiveNoticeId(isActive ? null : news.id)}
                  style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}
                >
                  <div className="notice-left" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <span className="notice-dot"></span>
                    <span>{news.title}</span>
                    {isActive && (
                      <span
                        role="button"
                        tabIndex={0}
                        className="notice-tag"
                        onClick={(e) => handleShare(e, news)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleShare(e, news);
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
                    <span className="notice-tag" style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}>{news.date}</span>
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
                  {renderContentWithLinks(news.content)}
                  {news.images && news.images.length > 0 && (
                    <div style={{ marginTop: '2rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                      {news.images.map((imgSrc, imgIdx) => (
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
                            alt="소식 첨부 이미지" 
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

export default AngelTree;
