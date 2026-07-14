import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CONFIG } from '../constants/config';
import VideoModal from '../components/common/VideoModal';

const YouTube = () => {
  const { t } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <main id="youtube-page">
      <section className="page-hero">
        <div className="page-hero-bg"></div>
        <div className="container">
          <h1 className="section-title fade-in">{t('youtubeTitle')}</h1>
          <p className="section-desc fade-in delay-1">{t('youtubeDesc')}</p>
        </div>
      </section>

      <div className="container">

        {/* 1. 프리즌리바이벌 & 엔젤트리 유튜브 채널 */}
        <section className="youtube-section fade-in" id="channel">
          <div className="youtube-grid">
            <div className="video-preview" onClick={() => window.open('https://www.youtube.com/@PrisonRevival', '_blank')}>
              <img src="/images/youtube_poster.png" alt="Prison Revival & Angel Tree YouTube Poster" />
            </div>
            <div className="youtube-content">
              <h3>{t('navSubYtChannel')}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{t('ytChannelDesc')}</p>
              <button onClick={() => window.open('https://www.youtube.com/@PrisonRevival', '_blank')} className="yt-btn">
                채널 바로가기
              </button>
            </div>
          </div>
        </section>

        {/* 2. 프리즌리바이벌 & 엔젤트리 사역 소개 */}
        <section className="youtube-section fade-in" id="intro">
          <div className="youtube-grid">
            <div className="video-preview" onClick={() => setSelectedVideo('oG_jy34D42M')}>
              <img src="https://img.youtube.com/vi/oG_jy34D42M/hqdefault.jpg" alt="Intro" />
              <span className="play-icon">▶</span>
            </div>
            <div className="youtube-content">
              <h3>{t('navSubYtIntro')}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{t('ytIntroDesc')}</p>
              <button onClick={() => window.open('https://youtu.be/oG_jy34D42M?si=3FIQVGf1_4QR4ilD', '_blank')} className="yt-btn">{t('ytPlayBtn')}</button>
            </div>
          </div>
        </section>

        {/* 3. 프리즌리바이벌 & 엔젤트리 3주년 감사예배 스케치 */}
        <section className="youtube-section fade-in" id="anniversary">
          <div className="youtube-grid">
            <div className="youtube-content">
              <h3>{t('navSubYtAnniversary')}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{t('ytAnniversaryDesc')}</p>
              <button onClick={() => window.open('https://youtu.be/qiTprhhuOSs', '_blank')} className="yt-btn">{t('ytPlayBtn')}</button>
            </div>
            <div className="video-preview" onClick={() => setSelectedVideo('qiTprhhuOSs')}>
              <img src="https://img.youtube.com/vi/qiTprhhuOSs/hqdefault.jpg" alt="Anniversary" />
              <span className="play-icon">▶</span>
            </div>
          </div>
        </section>

        {/* 4. 프리즌리바이벌 & 엔젤트리 3주년 축하영상 */}
        <section className="youtube-section fade-in" id="recommend">
          <div className="youtube-grid">
            <div className="youtube-content">
              <h3>{t('navSubYtRecommend')}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{t('ytCongratsDesc')}</p>
              <button onClick={() => window.open('https://youtu.be/t5I2-Mn8shI', '_blank')} className="yt-btn">{t('ytPlayBtn')}</button>
            </div>
            <div className="video-preview" onClick={() => setSelectedVideo('t5I2-Mn8shI')}>
              <img src="/images/yt_congrats.png" alt="3rd Anniversary Celebration" />
              <span className="play-icon">▶</span>
            </div>
          </div>
        </section>

        {/* 5. 임은미 선교사님의 묵상중에서 */}
        <section className="youtube-section fade-in" id="meditation">
          <div className="youtube-grid">
            <div className="video-preview" onClick={() => window.open('https://youtube.com/playlist?list=PLY8ptMzVZp7V4DsIzbPFEsJA73cu5hvcX&si=T9Ss2gOLeB4hlPTx', '_blank')}>
              <img src="/images/yt_meditation_poster.png" alt="Meditation Poster" />
            </div>
            <div className="youtube-content">
              <h3>{t('navSubYtMeditation')}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{t('ytMeditationDesc')}</p>
              <button onClick={() => window.open('https://youtube.com/playlist?list=PLY8ptMzVZp7V4DsIzbPFEsJA73cu5hvcX&si=T9Ss2gOLeB4hlPTx', '_blank')} className="yt-btn">
                {t('ytPlaylistBtn')}
              </button>
            </div>
          </div>
        </section>

        {/* 6. 프리즌 리바이벌 협력목사님들의 프리즌 이야기 */}
        <section className="youtube-section fade-in" id="pastor-stories">
          <div className="youtube-grid">
            <div className="youtube-content">
              <h3>{t('navSubYtPastorStories')}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{t('ytPastorStoriesDesc')}</p>
              <button onClick={() => window.open('https://youtu.be/46SzM3kF2Y8', '_blank')} className="yt-btn">{t('ytPlayBtn')}</button>
            </div>
            <div className="video-preview" onClick={() => setSelectedVideo('46SzM3kF2Y8')}>
              <img src="/images/yt_pastors_talk.png" alt="Partner Pastors Talkshow" />
              <span className="play-icon">▶</span>
            </div>
          </div>
        </section>

        {/* 7. 프리즌리바이벌 스탭들의 간증 / Shorts */}
        <section className="youtube-section fade-in" id="shorts" style={{ padding: '4rem 0' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.2rem', color: 'var(--dark-green)', marginBottom: '1.2rem', fontWeight: '700' }}>
              {t('navSubYtStaffShorts')}
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '700px', margin: '0 auto 2rem', lineHeight: '1.8' }}>
              프리즌 리바이벌 스탭들의 생생한 고백과 다양한 은혜를 짧은 쇼츠(Shorts) 영상으로 만나보세요.
            </p>
            <button onClick={() => window.open('https://www.youtube.com/@PrisonRevival/shorts', '_blank')} className="yt-btn">
              쇼츠 채널 바로가기
            </button>
          </div>

          <div className="shorts-grid">
            {/* 1번째 Shorts */}
            <div className="shorts-item" onClick={() => window.open('https://www.youtube.com/shorts/YKum8Mmi98s?feature=share', '_blank')}>
              <img src="/images/yt_shorts_1.png" alt="Shorts 1" />
              <span className="play-icon">▶</span>
            </div>

            {/* 2번째 Shorts */}
            <div className="shorts-item" onClick={() => window.open('https://www.youtube.com/shorts/TfqrFiuB2wY?feature=share', '_blank')}>
              <img src="/images/yt_shorts_2.png" alt="Shorts 2" />
              <span className="play-icon">▶</span>
            </div>

            {/* 3번째 Shorts */}
            <div className="shorts-item" onClick={() => window.open('https://www.youtube.com/shorts/eRf9Vwl5WaQ?feature=share', '_blank')}>
              <img src="https://img.youtube.com/vi/eRf9Vwl5WaQ/hq2.jpg" alt="Shorts 3" />
              <span className="play-icon">▶</span>
            </div>

            {/* 4번째 Shorts */}
            <div className="shorts-item" onClick={() => window.open('https://www.youtube.com/shorts/eRf9Vwl5WaQ?feature=share', '_blank')}>
              <img src="https://img.youtube.com/vi/eRf9Vwl5WaQ/hq3.jpg" alt="Shorts 4" />
              <span className="play-icon">▶</span>
            </div>
          </div>
        </section>

        {/* 8. 담장안에서 온 은혜의 편지 */}
        <section className="youtube-section fade-in" id="letters-prison">
          <div className="youtube-grid">
            <div className="video-preview" onClick={() => window.open('https://www.youtube.com/playlist?list=PLY8ptMzVZp7V4DWZ4Zn5EpKohvzgGCIkV', '_blank')}>
              <img src="/images/yt_prison_letters.png" alt="Grace Letters from prison" />
            </div>
            <div className="youtube-content">
              <h3>{t('navSubYtLettersPrison')}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{t('ytLettersPrisonDesc')}</p>
              <button onClick={() => window.open('https://www.youtube.com/playlist?list=PLY8ptMzVZp7V4DWZ4Zn5EpKohvzgGCIkV', '_blank')} className="yt-btn">
                {t('ytPlaylistBtn')}
              </button>
            </div>
          </div>
        </section>

        {/* 9. 엔젤트리 감동편지 */}
        <section className="youtube-section fade-in" id="letters-angeltree">
          <div className="youtube-grid">
            <div className="video-preview" onClick={() => window.open('https://www.youtube.com/playlist?list=PLY8ptMzVZp7VbyoLKBaEJV0XkCLp2PTzQ', '_blank')}>
              <img src="/images/yt_angeltree_letters.png" alt="Angel Tree Touching Letters" />
            </div>
            <div className="youtube-content">
              <h3>{t('navSubYtLettersAngelTree')}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{t('ytLettersAngelTreeDesc')}</p>
              <button onClick={() => window.open('https://www.youtube.com/playlist?list=PLY8ptMzVZp7VbyoLKBaEJV0XkCLp2PTzQ', '_blank')} className="yt-btn">
                {t('ytPlaylistBtn')}
              </button>
            </div>
          </div>
        </section>

        <div style={{ margin: '6rem 0', textAlign: 'center' }}>
          <Link to="/" className="secondary-btn">{t('backToHome')}</Link>
        </div>
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        videoId={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </main>
  );
};

export default YouTube;
