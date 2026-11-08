import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Link } from 'react-router-dom';
import { FAITH_MISSION_DATA } from '../constants/faithMissionData';
import { BookOpen, Compass, ChevronRight } from 'lucide-react';

const FaithMission = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const currentLang = i18n.language ? i18n.language.split('-')[0] : 'ko';
  const content = currentLang === 'ko' ? FAITH_MISSION_DATA.ko : FAITH_MISSION_DATA.en;

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 150);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main id="faith-mission-page" style={{ backgroundColor: '#fcfdfd', minHeight: '100vh' }}>
      {/* Page Hero */}
      <section 
        className="page-hero fade-in" 
        style={{ 
          background: 'linear-gradient(135deg, #112a22 0%, #1a4235 60%, #0d221b 100%)', 
          color: '#ffffff', 
          paddingTop: '150px', 
          paddingBottom: '3.5rem', 
          marginBottom: '2.5rem',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <p style={{ 
            fontSize: '0.95rem', 
            letterSpacing: '0.2em', 
            textTransform: 'uppercase', 
            color: '#b8e986', 
            marginBottom: '0.8rem',
            fontWeight: 600
          }}>
            Prison Revival & Angel Tree
          </p>
          <h1 style={{ 
            fontSize: '2.4rem', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            marginBottom: '1rem',
            lineHeight: 1.3
          }}>
            {currentLang === 'ko' ? '신앙고백 및 사명선언' : 'Statement of Faith & Mission'}
          </h1>
          <p style={{ 
            fontSize: '1.05rem', 
            opacity: 0.85, 
            lineHeight: 1.7, 
            maxWidth: '680px', 
            margin: '0 auto 2rem' 
          }}>
            {currentLang === 'ko' 
              ? '예수 그리스도를 머리로 삼아, 담장을 넘어 한 영혼을 회복시키는 믿음과 사명의 고백입니다.'
              : 'Our confession of faith and commitment to the gospel, transforming lives beyond prison walls in Jesus Christ.'}
          </p>

          {/* Quick Navigation Pills */}
          <div style={{ display: 'inline-flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => scrollToSection('faith')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '0.65rem 1.4rem',
                borderRadius: '50px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(6px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b8e986';
                e.currentTarget.style.color = '#112a22';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              <BookOpen size={16} />
              <span>{content.faith.title}</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('mission')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '0.65rem 1.4rem',
                borderRadius: '50px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(6px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b8e986';
                e.currentTarget.style.color = '#112a22';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              <Compass size={16} />
              <span>{content.mission.title}</span>
            </button>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '920px', margin: '0 auto', padding: '3.5rem 1.25rem 6rem' }}>
        
        {/* ========================================================= */}
        {/* SECTION 1: 신앙고백문 (Statement of Faith) */}
        {/* ========================================================= */}
        <section 
          id="faith" 
          style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '20px', 
            padding: '3rem 2.5rem', 
            boxShadow: '0 8px 30px rgba(17, 42, 34, 0.05)',
            border: '1px solid rgba(17, 42, 34, 0.08)',
            marginBottom: '4rem'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid #edf4f1', paddingBottom: '2rem', marginBottom: '2.5rem' }}>
            <span style={{ 
              fontSize: '0.85rem', 
              fontWeight: 700, 
              color: '#059669', 
              letterSpacing: '0.15em', 
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.4rem'
            }}>
              {content.faith.subTitle}
            </span>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 800, 
              color: '#112a22', 
              letterSpacing: '-0.02em',
              margin: '0.3rem 0'
            }}>
              {content.faith.title}
            </h2>
            <p style={{ fontSize: '1rem', color: '#6b7280', margin: 0 }}>
              {content.faith.mainTitle}
            </p>
          </div>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {content.faith.sections.map((sec, sIdx) => (
              <div key={sIdx}>
                <h3 style={{ 
                  fontSize: '1.35rem', 
                  fontWeight: 700, 
                  color: '#112a22', 
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ 
                    display: 'inline-block', 
                    width: '6px', 
                    height: '1.25rem', 
                    backgroundColor: '#10b981', 
                    borderRadius: '3px' 
                  }}></span>
                  {sec.heading}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p 
                      key={pIdx} 
                      style={{ 
                        fontSize: '1.02rem', 
                        lineHeight: '1.85', 
                        color: '#374151', 
                        margin: 0,
                        textAlign: 'justify',
                        wordBreak: 'keep-all'
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Bible Verse Box if present */}
                {sec.verse && (
                  <div 
                    style={{ 
                      marginTop: '1.8rem', 
                      backgroundColor: '#f3f8f5', 
                      borderLeft: '4px solid #10b981', 
                      padding: '1.4rem 1.6rem', 
                      borderRadius: '0 12px 12px 0' 
                    }}
                  >
                    <p style={{ 
                      fontSize: '1.08rem', 
                      fontWeight: 700, 
                      color: '#065f46', 
                      lineHeight: '1.75', 
                      margin: '0 0 0.5rem',
                      fontStyle: 'italic'
                    }}>
                      {sec.verse.text}
                    </p>
                    <span style={{ fontSize: '0.9rem', color: '#047857', fontWeight: 600, display: 'block', textAlign: 'right' }}>
                      {sec.verse.reference}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: 사명선언문 (Mission Statement) */}
        {/* ========================================================= */}
        <section 
          id="mission" 
          style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: '20px', 
            padding: '3rem 2.5rem', 
            boxShadow: '0 8px 30px rgba(17, 42, 34, 0.05)',
            border: '1px solid rgba(17, 42, 34, 0.08)',
            marginBottom: '3rem'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', borderBottom: '2px solid #edf4f1', paddingBottom: '2rem', marginBottom: '2.5rem' }}>
            <span style={{ 
              fontSize: '0.85rem', 
              fontWeight: 700, 
              color: '#059669', 
              letterSpacing: '0.15em', 
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.4rem'
            }}>
              {content.mission.subTitle}
            </span>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 800, 
              color: '#112a22', 
              letterSpacing: '-0.02em',
              margin: '0.3rem 0'
            }}>
              {content.mission.title}
            </h2>
            <p style={{ fontSize: '1rem', color: '#6b7280', margin: 0 }}>
              {content.mission.mainTitle}
            </p>
          </div>

          {/* Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {content.mission.sections.map((sec, sIdx) => (
              <div key={sIdx}>
                <h3 style={{ 
                  fontSize: '1.35rem', 
                  fontWeight: 700, 
                  color: '#112a22', 
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ 
                    display: 'inline-block', 
                    width: '6px', 
                    height: '1.25rem', 
                    backgroundColor: '#059669', 
                    borderRadius: '3px' 
                  }}></span>
                  {sec.heading}
                </h3>

                {/* Highlight Quote if present */}
                {sec.highlightQuote && (
                  <div style={{
                    backgroundColor: '#112a22',
                    color: '#ffffff',
                    padding: '1.3rem 1.6rem',
                    borderRadius: '12px',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    lineHeight: 1.6,
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    boxShadow: '0 4px 15px rgba(17, 42, 34, 0.15)'
                  }}>
                    "{sec.highlightQuote}"
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p 
                      key={pIdx} 
                      style={{ 
                        fontSize: '1.02rem', 
                        lineHeight: '1.85', 
                        color: '#374151', 
                        margin: 0,
                        textAlign: 'justify',
                        wordBreak: 'keep-all'
                      }}
                    >
                      {p}
                    </p>
                  ))}
                </div>

                {/* Bible Verse Box if present */}
                {sec.verse && (
                  <div 
                    style={{ 
                      marginTop: '1.8rem', 
                      backgroundColor: '#f3f8f5', 
                      borderLeft: '4px solid #10b981', 
                      padding: '1.4rem 1.6rem', 
                      borderRadius: '0 12px 12px 0' 
                    }}
                  >
                    <p style={{ 
                      fontSize: '1.08rem', 
                      fontWeight: 700, 
                      color: '#065f46', 
                      lineHeight: '1.75', 
                      margin: '0 0 0.5rem',
                      fontStyle: 'italic'
                    }}>
                      {sec.verse.text}
                    </p>
                    <span style={{ fontSize: '0.9rem', color: '#047857', fontWeight: 600, display: 'block', textAlign: 'right' }}>
                      {sec.verse.reference}
                    </span>
                  </div>
                )}

                {/* Slogan Footer if present */}
                {sec.slogan && (
                  <div style={{ 
                    marginTop: '2rem', 
                    textAlign: 'center', 
                    paddingTop: '1.5rem', 
                    borderTop: '1px dashed #d1fae5' 
                  }}>
                    <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0 0 0.4rem', fontWeight: 600 }}>
                      PRISON REVIVAL & ANGEL TREE
                    </p>
                    <p style={{ fontSize: '1.2rem', fontWeight: 800, color: '#047857', margin: 0, letterSpacing: '-0.01em' }}>
                      {sec.slogan}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Back Button */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link to="/" className="secondary-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <span>{t('backToHome')}</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default FaithMission;

