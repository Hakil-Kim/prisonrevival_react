import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CONFIG } from '../constants/config';

const ContactCard = ({ manager, idx }) => {
  const { t } = useTranslation();
  return (
    <div className="contact-card fade-in" style={{ animationDelay: `${0.2 + idx * 0.1}s` }}>
      <div className="contact-card-role">{t(manager.roleKey)}</div>
      <div className="contact-card-name">{t(manager.nameKey)}</div>
      {manager.orgKey && <div className="contact-card-org">{t(manager.orgKey)}</div>}
      
      <div className="contact-card-info">
        {manager.kakao && (
          <div className="contact-info-item">
            <span className="contact-info-icon">💬</span>
            <div className="contact-info-content">
              <span className="contact-info-label">{t('contactKakao')}</span>
              <span className="contact-info-value">{manager.kakao}</span>
            </div>
          </div>
        )}
        {manager.email && (
          <div className="contact-info-item">
            <span className="contact-info-icon">✉️</span>
            <div className="contact-info-content">
              <span className="contact-info-label">{t('contactEmail')}</span>
              <span className="contact-info-value">{manager.email}</span>
            </div>
          </div>
        )}
        {manager.phone && (
          <div className="contact-info-item">
            <span className="contact-info-icon">📱</span>
            <div className="contact-info-content">
              <span className="contact-info-label">{t('contactPhone')}</span>
              <span className="contact-info-value">
                {manager.phone}
                {manager.phoneNoteKey && <span style={{ fontSize: '0.85em', opacity: 0.8, display: 'block' }}>({t(manager.phoneNoteKey)})</span>}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ContactManagers = () => {
  const { t } = useTranslation();

  return (
    <main id="contact-managers-page">
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{t('contactPageTitle')}</h1>
          <p className="section-desc fade-in delay-1">{t('contactPageDesc')}</p>
        </div>
      </section>

      <section className="section container">
        {/* 행 1: 오혁대표 / 이은희팀장 / 임금주 엔젤트리 팀장 */}
        <div className="contact-grid">
          {CONFIG.contactManagers.slice(0, 3).map((manager, idx) => (
            <ContactCard key={idx} manager={manager} idx={idx} />
          ))}
        </div>

        {/* 행 2: 윤솔 카카오채널 팀장 / 박미혜 디자인 총괄 팀장 / 박정희 도서팀장 */}
        <div className="contact-grid">
          {CONFIG.contactManagers.slice(3, 6).map((manager, idx) => (
            <ContactCard key={idx} manager={manager} idx={idx + 3} />
          ))}
        </div>

        {/* 행 3: 장순희 중보기도팀장 / 이수빈 편지팀장 / 최주연 유튜브 팀장 */}
        <div className="contact-grid">
          {CONFIG.contactManagers.slice(6, 9).map((manager, idx) => (
            <ContactCard key={idx} manager={manager} idx={idx + 6} />
          ))}
        </div>

        {/* 행 4: 정주화 오크나무팀장 / 김학일 홈페이지 팀장 / 김은선 홍보팀장 */}
        <div className="contact-grid">
          {CONFIG.contactManagers.slice(9, 12).map((manager, idx) => (
            <ContactCard key={idx} manager={manager} idx={idx + 9} />
          ))}
        </div>

        {/* 행 5: 박희연 편지답장팀장 / 양예은 미디어 팀장 */}
        <div className="contact-grid">
          {CONFIG.contactManagers.slice(12, 14).map((manager, idx) => (
            <ContactCard key={idx} manager={manager} idx={idx + 12} />
          ))}
        </div>

        {/* 행 6: 황득연 국제 글로벌팀장 / 이희정 국내 글로벌팀장 */}
        <div className="contact-grid">
          {CONFIG.contactManagers.slice(14, 16).map((manager, idx) => (
            <ContactCard key={idx} manager={manager} idx={idx + 14} />
          ))}
        </div>

        <div style={{ marginTop: '6rem', textAlign: 'center', marginBottom: '6rem' }}>
          <Link to="/" className="secondary-btn">{t('backToHome')}</Link>
        </div>
      </section>
    </main>
  );
};

export default ContactManagers;
