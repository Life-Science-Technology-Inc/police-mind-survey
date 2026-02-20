import React from 'react';
import { useNavigate } from 'react-router-dom';

const ExperimentCompletePage = () => {
  const navigate = useNavigate();


  // 동의서 및 사본 제출 핸들러
  const handleDocumentSubmission = () => {
    try {
      navigate('/registration');
    } catch (error) {
      alert('페이지 이동 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (event, handler) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handler();
    }
  };

  return (
    <div className="home-container">
      <div className="logo-section">
        <div className="logo-container">
          <img 
            src={`${process.env.PUBLIC_URL}/police_logo.png`}
            alt="경찰청 로고" 
            className="logo police-logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}  
          />
          <img 
            src={`${process.env.PUBLIC_URL}/kist_logo.png`}
            alt="한국과학기술연구원 로고" 
            className="logo kist-logo"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>
      
      <header className="home-header">
        <h1>[경찰 건강 스마트 관리 R&amp;D]</h1>
      </header>
      
      <div className="home-title">
        <h2>서류 제출 안내</h2>
      </div>

      <main className="home-content">
        <div className="description">
          <div className="description-box">
            <p className="description-text">
              실험에 참여해 주셔서 감사합니다.
            </p>
            <p className="description-text">
            참여자 분이 측정한 데이터와 정보는 <strong>익명 처리 후 연구용</strong>으로만 사용됨을 다시 한번 말씀드립니다. 
            </p>
            <p className="description-text">
              연구 종료 후 <strong>사례비 지급</strong>을 위해 다음을 업로드 또는 전송해 주세요.
            </p>
            <p className="description-text">
              <strong>동의서 및 통장, 신분증 사본</strong>
            </p>
          </div>
        </div>

        <div className="action-buttons">
          <div 
            className="action-card" 
            onClick={handleDocumentSubmission}
            onKeyDown={(e) => handleKeyDown(e, handleDocumentSubmission)}
            role="button"
            tabIndex={0}
            aria-label="동의서 및 사본 제출"
          >
            <div className="card-content">
              <h3 className="card-title">동의서 및 사본 제출</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExperimentCompletePage; 
