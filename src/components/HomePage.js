import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../supabaseClient';

// 상수 정의
const SURVEY_ROUTE = '/survey';
const EXPERIMENT_COMPLETE_ROUTE = '/experiment-complete';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState('');

  // 대기자 등록 성공 메시지 확인
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // 5초 후 메시지 자동 제거
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  // 모집 상태 확인 함수
  const checkRecruitmentStatus = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_recruitment_status');
        
      if (error) {
        console.error('Failed to check recruitment status:', error);
        return true; // 오류 시 기본적으로 모집 중으로 처리
      }
      
      return data;
    } catch (error) {
      console.error('Failed to check recruitment status:', error);
      return true; // 오류 시 기본적으로 모집 중으로 처리
    }
  };

  // 설문조사 페이지 이동 핸들러
  const handleSurveyClick = async () => {
    try {
      // 모집 상태 확인
      const isRecruiting = await checkRecruitmentStatus();
      
      if (!isRecruiting) {
        alert('현재 충원이 완료된 상태입니다. 결원 발생 시 추가 모집을 진행하겠습니다');
        return;
      }
      
      navigate(SURVEY_ROUTE);
    } catch (error) {
      alert('페이지 이동 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 대기자 동의서 제출 클릭 핸들러
  const handleRegistrationClick = () => {
    try {
      navigate(EXPERIMENT_COMPLETE_ROUTE);
    } catch (error) {
      alert('페이지 이동 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  // 실험 방법 및 워치 조작 클릭 핸들러
  const handleGuideClick = () => {
    try {
      navigate('/field-study-guide');
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
      <header className="home-header">
        <h1>경찰 맞춤형 스트레스 관리 모니터링 시스템 실증 실험 안내</h1>
      </header>

      <main className="home-content">
        {successMessage && (
          <div className="success-notification">
            <p className="success-text">✅ {successMessage}</p>
          </div>
        )}
        
        <div className="description">
          <div className="description-box">
            <p className="description-text">
              2026년도 경찰 스트레스 관리 모니터링 시스템 실증 실험에 참여해 주셔서 감사합니다.
            </p>
            <p className="description-text">
              실증 실험 <span className="highlight-teal">참여 대상자 등록</span>을 위해서는 아래 <span className="highlight-teal">정신 건강 설문</span> 에 먼저 응해 주시고,
            </p>
            <p className="description-text">
              실험 <span className="highlight-pink">참여자로 확인</span>되신 분들은 아래 <span className="highlight-pink">실험 방법 및 워치 조작</span>를 통해 실험 내용을 확인해 주세요.
            </p>
          </div>
        </div>

        <div className="action-buttons">
          <div 
            className="action-card" 
            onClick={handleSurveyClick}
            onKeyDown={(e) => handleKeyDown(e, handleSurveyClick)}
            role="button"
            tabIndex={0}
            aria-label="실증 실험 참여를 위한 정신 건강 설문 시작하기"
          >
            <div className="card-content">
              <p className="card-subtitle">실증 실험 참여를 위한</p>
              <h3 className="card-title">정신 건강 설문</h3>
            </div>
          </div>
          
          <div 
            className="action-card" 
            onClick={handleGuideClick}
            onKeyDown={(e) => handleKeyDown(e, handleGuideClick)}
            role="button"
            tabIndex={0}
            aria-label="실험 방법 및 워치 조작 페이지"
          >
            <div className="card-content">
              <h3 className="card-title">실험 방법 및 워치 조작</h3>
            </div>
          </div>

          <div 
            className="action-card" 
            onClick={handleRegistrationClick}
            onKeyDown={(e) => handleKeyDown(e, handleRegistrationClick)}
            role="button"
            tabIndex={0}
            aria-label="실증 실험 대기자 동의서 제출"
          >
            <div className="card-content">
              <h3 className="card-title">동의서 및 서류 제출</h3>
            </div>
          </div>

        </div>

        <div className="home-footer-note">
          <p>IoT, AI 기반 경찰 인적자원 향상성 관리 플랫폼 개발사업</p>
          <p>경찰청, (주)라이프사이언스테크놀로지, 한국과학기술연구원, 강북삼성병원</p>
        </div>
      </main>
    </div>
  );
};

export default HomePage; 
