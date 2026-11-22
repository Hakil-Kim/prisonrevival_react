import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Gift, Sparkles, Heart, Sun, Globe } from 'lucide-react';

const DONATION_LINKS = [
  {
    id: 'racing-to-freedom',
    url: 'https://donorbox.org/racing-to-freedom',
    labelKo: '자유를 향한 여정',
    labelEn: 'Racing to Freedom',
    Icon: Heart,
    accent: '#e11d48',
    bgAccent: '#fff1f2'
  },
  {
    id: 'nepal-children',
    url: 'https://donorbox.org/rebuild-hope-for-children-in-nepal',
    labelKo: '네팔 어린이 희망 세우기',
    labelEn: 'Rebuild Hope in Nepal',
    Icon: Sun,
    accent: '#d97706',
    bgAccent: '#fffbeb'
  },
  {
    id: 'caleb-mission',
    url: 'https://www.calebmissionusa.org/donate',
    labelKo: '갈렙선교회 후원',
    labelEn: 'Caleb Mission USA',
    Icon: Globe,
    accent: '#059669',
    bgAccent: '#ecfdf5'
  }
];

const FloatingDonate = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const currentLang = i18n.language ? i18n.language.split('-')[0] : 'ko';
  const isKo = currentLang === 'ko';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="floating-donate-wrapper">
      <div className="floating-donate-btn-group">
        <button
          type="button"
          className={`floating-donate-btn ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={t('donateTooltip')}
        >
          <span className="floating-donate-shimmer" aria-hidden="true" />
          <span className="floating-donate-icon-wrap">
            <Gift size={21} strokeWidth={2.2} />
            <Sparkles size={12} className="floating-donate-sparkle" aria-hidden="true" />
          </span>
        </button>
        {!isOpen && (
          <span className="floating-donate-tooltip" role="tooltip">
            {t('donateTooltip')}
          </span>
        )}
      </div>

      {isOpen && (
        <div className="floating-donate-dropdown" role="menu">
          <div className="floating-donate-dropdown-header">
            <Sparkles size={13} className="floating-donate-header-sparkle" />
            <span>{isKo ? '사랑의 나눔에 함께해주세요' : 'Share Love & Hope'}</span>
          </div>

          <div className="floating-donate-list">
            {DONATION_LINKS.map(({ id, url, labelKo, labelEn, Icon, accent, bgAccent }) => (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                className="floating-donate-item"
                onClick={() => setIsOpen(false)}
              >
                <span
                  className="floating-donate-item-icon"
                  style={{ color: accent, backgroundColor: bgAccent }}
                >
                  <Icon size={18} strokeWidth={2.2} />
                </span>
                <span className="floating-donate-item-title">{isKo ? labelKo : labelEn}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingDonate;
