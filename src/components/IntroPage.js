import React from 'react';

const IntroPage = ({ nextPage }) => {
  const handleYesClick = () => {
    nextPage();
  };

  const handleNoClick = () => {
    // 홈으로 돌아가기 (브라우저 뒤로가기 또는 홈으로 이동)
    window.history.back();
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (event, handler) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handler();
    }
  };

  return (
    <div className="data-collection-guide">
      <div className="guide-header">
        <h1>[경찰 건강 스마트 관리 R&D]</h1>
        <h2>우울·불안·스트레스 테스트 안내문</h2>
      </div>

      <div className="guide-content">
        <div className="guide-intro">
          <p>
            안녕하십니까? 설문을 위한 웹페이지에 방문해 주셔서 감사합니다. 본 설문은 '경찰 건강 스마트 관리 (R&D)' 사업의 일환으로 경찰 맞춤형 스트레스 관리 모니터링 시스템을 개발하기 위해 한국과학기술연구원이 실시하는 「웨어러블 기반 라이프로그 데이터 수집」을 위한 실험군 선별을 목적으로 합니다. 
          </p>

          <p>
            2026년도 모집 예정인 실험군은 우울군 30명, 스트레스 고위험군 30명, 건강인 40명이며, 실험군 선별 설문은 우울 선별 검사(PHQ-9) 9문항, 일반 불안 검사(GAD-7) 7문항, 스트레스(PSS) 검사 10문항으로 구성되어 있습니다. 
          </p>
        </div>

        <div className="guide-section">
          <h2>■ 개인정보의 수집항목 및 이용목적</h2>
          <p>
            참여자분들이 제공한 개인정보는 「개인정보보호지침」에 따라 한국과학기술연구원에서 안전하게 보호되며, 모든 데이터는 익명 처리되어 근무 형태 및 생활 습관과 정신 건강의 관계를 파악하기 위한 분석 및 모니터링 시스템 개발 용도로만 사용됩니다. 
          </p>

          <p>수집하는 개인정보 항목 및 선별 기준, 수집 목적은 다음과 같습니다.</p>
          <ul>
            <li>1) 우울 선별 검사(PHQ-9): 우울 점수가 중간 수준 이상의 참여자 선별 (10점 이상)</li>
            <li>2) 불안 검사(GAD-7): 우울군 선별에 보조적으로 활용 (10점 이상)</li>
            <li>3) 스트레스 검사(PSS): 우울 점수는 낮으나 스트레스가 높은 참여자 선별 (17점 이상)</li>
            <li>4) 우울 점수 10점 미만 및 스트레스 점수 17점 미만: 건강한 참여자 선별</li>
            <li>5) 개인 정보 수집 항목: 이름, 성별, 휴대폰 번호, 이메일 주소, 테스트 결과</li>
          </ul>
          <p>수집 목적: 실험 참여 의사를 밝힌 분의 본인 확인 및 실험 방법 안내</p>
        </div>

        <div className="guide-section">
          <h2>■ 개인정보 보호</h2>
          <p>실험 참여를 원하지 않는 분들의 정보는 즉시 폐기되며, 연구 이외의 목적으로 활용되거나 제3자에게 제공되지 않습니다.</p>

          <p>
            본 연구는 한국과학기술연구원 기관생명윤리위원회의 승인을 받아 진행되며(IRB 승인번호 KIST-202209-HR-013), 실험 인원 <strong>충원 시 조기 마감</strong> 안내를 받을 수 있습니다. 
          </p>
        </div>

        <div className="guide-section">
          <h2>■ 설문 참여 동의</h2>
          <p><strong>본 설문에 참여하시겠습니까?</strong></p>
          
          <div className="guide-actions">
            <button 
              className="btn yes-btn" 
              onClick={handleYesClick}
              onKeyDown={(e) => handleKeyDown(e, handleYesClick)}
              aria-label="설문조사에 참여하고 설문 시작 페이지로 이동"
            >
              예 (설문 시작)
            </button>
            <button 
              className="btn back-btn no-btn" 
              onClick={handleNoClick}
              onKeyDown={(e) => handleKeyDown(e, handleNoClick)}
              aria-label="설문조사에 참여하지 않고 홈 페이지로 돌아가기"
            >
              아니오 (이전 페이지)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
