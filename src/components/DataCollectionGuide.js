import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../supabaseClient';
import { REGISTRATION_STEPS } from '../config/registrationSteps';
import { validatePhoneNumber, usePhoneNumber } from '../utils/phoneNumberUtils';
import { buildSurveySyncPayload, syncScreeningProfile } from '../services/backendSync';

const preferredSessionValueMap = {
  round1: '1차',
  round2: '2차',
  noPreference: '상관없음',
};

const formatPreferredSessionsForStorage = (preferredSession) =>
  preferredSessionValueMap[preferredSession] || '';

const DataCollectionGuide = () => {
  const preferredSessionOptions = [
    { id: 'round1', label: '1차 실험(2026. 5. 11 ~)' },
    { id: 'round2', label: '2차 실험(2026. 5. 26 ~)' },
    { id: 'noPreference', label: '상관없음' },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  
  // 전달받은 점수 데이터
  const { depressionScore = 0, anxietyScore = 0, stressScore = 0 } = location.state || {};

  // 개인정보 입력 상태 관리
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    preferredSession: ''
  });

  // 개인정보 동의 상태 관리
  const [privacyConsent, setPrivacyConsent] = useState(false);

  // 검증 에러 상태 관리
  const [emailError, setEmailError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  
  // 전화번호 관리 (커스텀 훅 사용)
  const {
    phoneFormatted,
    phoneError,
    handlePhoneChange: handlePhoneInputChange
  } = usePhoneNumber(personalInfo.phoneNumber, (phone) => {
    setPersonalInfo(prev => ({
      ...prev,
      phoneNumber: phone
    }));
    // 입력 시 등록 에러 메시지 초기화
    setRegistrationError('');
    setRegistrationSuccess(false);
  });

  // 등록 진행 상태 관리
  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  // 이메일 형식 검증
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  


  // 이메일 입력 처리
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      email: value
    }));
    
    if (value && !validateEmail(value)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
    } else {
      setEmailError('');
    }
    
    // 입력 시 등록 에러 메시지 초기화
    setRegistrationError('');
    setRegistrationSuccess(false);
  };
  


  // 일반 입력 처리 (이름)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 입력 시 등록 에러 메시지 초기화
    setRegistrationError('');
    setRegistrationSuccess(false);
  };

  // 개인정보 동의 체크박스 핸들러
  const handlePrivacyConsentChange = (e) => {
    setPrivacyConsent(e.target.checked);
    
    // 동의 체크 시 등록 에러 메시지 초기화
    setRegistrationError('');
    setRegistrationSuccess(false);
  };

  const handlePreferredSessionChange = (optionId) => {
    setPersonalInfo((prev) => ({
      ...prev,
      preferredSession: optionId,
    }));

    setRegistrationError('');
    setRegistrationSuccess(false);
  };

  // 집단 분류 함수
  const getGroupType = () => {
    if (depressionScore >= 10) {
      return 'depression'; // 우울 집단
    } else if (stressScore >= 17) {
      return 'stress'; // 스트레스 고위험 집단
    } else {
      return 'normal'; // 정상 집단
    }
  };

  // 대기자 등록 핸들러 (DB 저장)
  const handleRegistrationClick = async () => {
    // 필수 필드 검증
    if (!personalInfo.name.trim() || !personalInfo.phoneNumber.trim() || !personalInfo.email.trim()) {
      setRegistrationError('이름, 전화번호, 이메일 주소를 모두 입력해 주세요.');
      return;
    }

    // 개인정보 동의 검증
    if (!privacyConsent) {
      setRegistrationError('개인정보 수집 및 이용에 동의해 주세요.');
      return;
    }

    // 이메일 형식 검증
    if (!validateEmail(personalInfo.email)) {
      setRegistrationError('올바른 이메일 주소 형식을 입력해 주세요.');
      return;
    }

    // 전화번호 형식 검증
    if (!validatePhoneNumber(personalInfo.phoneNumber)) {
      setRegistrationError('전화번호는 010으로 시작하는 11자리 번호여야 합니다.');
      return;
    }

    if (!personalInfo.preferredSession) {
      setRegistrationError('희망 참여일을 선택해 주세요.');
      return;
    }

    // 모든 검증 통과 시 DB에 대기자 정보 저장
    setIsRegistering(true);
    setRegistrationError('');
    setRegistrationSuccess(false);

    try {
      // 먼저 모집 상태 확인
      const { data: isRecruiting, error: recruitmentError } = await supabase
        .rpc('get_recruitment_status');

      if (recruitmentError) {
        console.error('Recruitment status check error:', recruitmentError);
        // 홈 화면과 동일하게 오류 시 기본적으로 모집 중으로 처리
      } else if (!isRecruiting) {
        setRegistrationError('현재 충원이 완료된 상태입니다. 결원 발생 시 추가 모집을 진행하겠습니다.');
        return;
      }

      // 대기자 정보 구성
      const waitlistData = {
        name: personalInfo.name.trim(),
        phone: personalInfo.phoneNumber,
        email: personalInfo.email.trim(),
        preferred_participation_rounds: formatPreferredSessionsForStorage(personalInfo.preferredSession),
        depressive: depressionScore,
        anxiety: anxietyScore,
        stress: stressScore,
        registration_step: REGISTRATION_STEPS.SURVEY_COMPLETED, // 설문조사 완료
        // 동의 필드들은 3단계(동의서 제출)에서 설정하므로 여기서는 제외
        // experiment_consent, data_usage_consent, third_party_consent 필드는 DB 기본값(NULL)으로 유지
      };

      // survey-person 테이블에 직접 insert
      const { data, error } = await supabase
        .from('survey-person')
        .insert([waitlistData]);

      if (error) {
        console.error('Registration error:', error);
        setRegistrationError('등록 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        return;
      }

      try {
        await syncScreeningProfile(
          buildSurveySyncPayload({
            personalInfo,
            depressionScore,
            anxietyScore,
            stressScore,
          })
        );
      } catch (syncError) {
        console.warn('Backend screening sync failed after survey-person insert:', syncError);
      }

      // RPC 함수 결과 확인
      if (data && data.length > 0) {
        const result = data[0];
        if (!result.success) {
          if (result.message.includes('already registered')) {
            setRegistrationError('이미 등록된 전화번호 또는 이메일입니다.');
          } else {
            setRegistrationError(result.message || '등록 중 오류가 발생했습니다.');
          }
          return;
        }
      }

      // 성공 시 상태 업데이트
      setRegistrationSuccess(true);
      
      // 3초 후 자동으로 홈화면으로 이동
      setTimeout(() => {
        navigate('/');
      }, 3000);

    } catch (error) {
      setRegistrationError('시스템 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="data-collection-guide">
      <div className="guide-header">
        <h1>웨어러블 기반 라이프로그 데이터 수집 참여 안내</h1>
      </div>
      
      <div className="guide-content">
        <div className="guide-intro">
          <p>
          한국과학기술연구원 바이오닉스 연구센터에서는 경찰 맞춤형 스트레스 관리 모니터링 시스템을 개발하기 위해 다음과 같이 1 주간 생체 신호 및 라이프로그 데이터 수집에 참여할 참여자를 모집합니다.
          </p>
        </div>

        <div className="guide-section">
          <h2>■ 참여 대상</h2>
          <ul>
            <li>근속 1년 이상 경찰</li>
            <li>삼성 갤럭시 핸드폰 사용자 (아이폰은 정책상 연구에 필요한 데이터를 제공받지 못합니다)</li>
            <li>정신 건강 검사 결과 실험 참여군에 속하는 분</li>
          </ul>
        </div>

        <div className="guide-section">
          <h2>■ 모집 개요</h2>
          <ul>
            <li>모집 기간: <strong>26. 5. 4 (월)</strong></li>
            <li>모집 인원: <strong>우울군 30, 스트레스 고위험군 30, 건강인 40</strong></li>
            <li>
              실험 기간: <strong>측정 시작 후 개인별 1주일</strong>
              <br />
              <strong>1차: 26. 5. 11(월) ~</strong>
              <br />
              <strong>2차: 26. 5. 26(화) ~</strong>
            </li>
          </ul>
        </div>

        <div className="guide-section">
          <h2>■ 참여 내용 및 과정</h2>
          <ol>
            <li>해당 실험군으로 실험 참여를 원하시면 <strong>'대기자 등록'을 위해 이름, 연락처를 기입</strong>해 주세요.</li>
            <li>연구실에서 <strong>개별적으로 연락</strong>을 드리고 제공해 주신 정보에 따라 <strong>갤럭시 워치를 배송</strong>합니다 (개인 소유 
                워치가 있는 경우에도 참여 가능합니다.)</li>
            <li>보내드리는 링크를 통해, 인구학적 정보, 직무 형태, 직무 스트레스, 개인 성향 등 <strong>설문</strong>을 진행해 주세요.</li>
            <li>갤럭시 워치를 배송받은 후, <strong>핸드폰과 연동</strong>해 주세요.</li>
            <li>구글 플레이 스토어에서 <strong>워치용 앱(KIST 건강 모니터링)을 다운로드하여 설치해 주세요</strong>. (개인소유 갤럭시 
                워치도 동일한 절차를 따릅니다)</li>
            <li><strong>삼성 헬스 데이터 수집에 동의</strong>하고 연동해 주세요. (운동량 및 수면 정보 취득 목적)</li>
            <li>설치된 앱을 통해 <strong>2시간 마다 자동으로 귀하의 맥파 정보를 취득하여 스트레스 정도를 알려줍니다.</strong> 알림
            을 받으면, <strong>해당 스트레스 정보가 맞는지, 실제 스트레스 정도는 어느 정도인지 피드백</strong>을 주시면 됩니다.</li>
            <li>알림은 <strong>매 정각마다 제공</strong>되며, <strong>일 3회 이상 피드백</strong>이 요구됩니다.</li>
            <li>주간 근무 및 휴일에는 8:00 - 20:00, 야간 근무에는 20:00 - 8:00시 기준으로 알림이 제공됩니다.</li>
            <li>하루 1회(20:00시) <strong>1분간 걷는 상태에서의 데이터 측정</strong> 과정이 있습니다.</li>
            <li>충전 시간 외에는 <strong>상시 워치를 착용</strong>해주십시오.</li>
            <li><strong>일 1회 수면 설문</strong>, <strong>일 1회 10분 간 챗봇 대화</strong>를 실행해 주세요.</li>
            <li>실험 완료 후 워치 반납을 위한 방문 수거(택배) 안내를 드립니다.</li>
          </ol>
        </div>

        <div className="guide-section">
          <h2>■ 참여 혜택</h2>
          <p>본 실증 실험 데이터 수집이 완료된 분께는 참여사례비(100,000원)가 지급됩니다.</p>
        </div>

        <div className="guide-section">
          <h2>■ 문의 사항</h2>
          <p>본 실험 과정에 대한 문의는 오픈 카카오톡으로 하실 수 있습니다
            (<a href="https://open.kakao.com/o/gTH3TfCg" target="_blank" rel="noopener noreferrer">
                https://open.kakao.com/o/gTH3TfCg
            </a>, <strong>'2025경찰실증'</strong>으로 검색)</p>
        </div>

        {/* 실증 참여 섹션 - 항상 표시 */}
        <div className="guide-section">
          <h2>■ 실증 참여</h2>
          <p>귀하는 <strong>
            {getGroupType() === 'depression' ? '우울군' : 
            getGroupType() === 'stress' ? '스트레스 고위험군' : '건강인'}</strong>으로 분류되어 실증 실험 참여가 가능합니다.</p>
          <p>실증 실험에 참여를 원하시면 개별 연락을 위해 대기자 등록을 진행해 주시기 바랍니다.</p>

          {/* 실증 실험 대기자 등록 섹션 */}
          <div className="registration-form-container">
            <h4>■ 실증 실험 대기자 등록</h4>
            
            <div className="registration-form">
              <div className="personal-info-section">
                <h5>개인정보 입력</h5>
                
                <div className="form-group">
                  <label htmlFor="name">이름</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={personalInfo.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">이메일</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={personalInfo.email}
                    onChange={handleEmailChange}
                    className={emailError ? 'form-input input-error' : 'form-input'}
                    required
                  />
                  {emailError && <p className="error-message">{emailError}</p>}
                </div>

                <div className="form-group">
                  <label htmlFor="phoneNumber">전화번호</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneFormatted}
                    onChange={handlePhoneInputChange}
                    placeholder="010-0000-0000"
                    className={phoneError ? 'form-input input-error' : 'form-input'}
                    required
                  />
                  {phoneError ? (
                    <p className="error-message">{phoneError}</p>
                  ) : (
                    <small className="helper-text">형식: 010-0000-0000</small>
                  )}
                </div>

                <div className="form-group">
                  <label>희망 참여일</label>
                  <div className="checkbox-group" role="radiogroup" aria-label="희망 참여일">
                    {preferredSessionOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`checkbox-option ${personalInfo.preferredSession === option.id ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="preferredSession"
                          checked={personalInfo.preferredSession === option.id}
                          onChange={() => handlePreferredSessionChange(option.id)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="consent-section">
                <div className="consent-checkbox">
                  <input
                    type="checkbox"
                    id="privacyConsent"
                    checked={privacyConsent}
                    onChange={handlePrivacyConsentChange}
                    className="consent-checkbox-input"
                  />
                  <label htmlFor="privacyConsent" className="consent-checkbox-label">
                    [필수]개인정보 수집 및 이용에 동의합니다.
                  </label>
                </div>

                <div className="privacy-notice-box">
                  <ul>
                    <li>개인 정보 수집 항목: 이름, 성별, 휴대폰 번호, 이메일 주소, 테스트 결과</li>
                    <li>수집 목적: 실험 참여 의사를 밝힌 분의 본인 확인 및 실험 방법 안내</li>
                    <li>보유기간: 동의 철회 시까지</li>
                  </ul>
                </div>
              </div>

              <div className="registration-button-container">
                {registrationError && (
                  <p className="error-message">{registrationError}</p>
                )}
                {registrationSuccess && (
                  <div className="success-container">
                    <p className="success-message">
                      대기자 등록이 완료되었습니다. 연구실에서 연락드리겠습니다.<br/>
                      <small style={{color: '#666'}}>3초 후 자동으로 홈화면으로 이동합니다.</small>
                    </p>
                    <button 
                      type="button" 
                      className="btn home-btn"
                      onClick={() => navigate('/')}
                      style={{ marginTop: '10px' }}
                    >
                      홈으로 돌아가기
                    </button>
                  </div>
                )}
                {!registrationSuccess && (
                  <button 
                    type="button" 
                    className={`btn register-btn ${isRegistering ? 'registering' : ''}`}
                    onClick={handleRegistrationClick}
                    disabled={isRegistering}
                  >
                    {isRegistering ? '등록 중...' : '실증 실험 대기자 등록'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="guide-actions">
        <button 
          className="btn back-btn"
          onClick={handleBackClick}
        >
          이전 페이지로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default DataCollectionGuide; 
