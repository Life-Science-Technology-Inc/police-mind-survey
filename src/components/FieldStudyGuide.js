import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

// 이미지 경로 헬퍼 함수
const getImageUrl = (imagePath) => `${process.env.PUBLIC_URL}/${imagePath}`;

const watchImageStyle = {
  maxWidth: '100%',
  width: '300px',
  height: 'auto',
  borderRadius: '8px'
};

const squareImageStyle = {
  maxWidth: '100%',
  aspectRatio: '1 / 1',
  objectFit: 'contain',
  borderRadius: '8px'
};

const phoneImageStyle = {
  maxWidth: '100%',
  width: '300px',
  height: 'auto',
  borderRadius: '8px'
};

const FieldStudyGuide = () => {
  const navigate = useNavigate();
  const [activeMainTab, setActiveMainTab] = useState('experiment-preparation');
  const [activeSubTab, setActiveSubTab] = useState('power');
  const [activeMonitoringSubTab, setActiveMonitoringSubTab] = useState('basic-settings');
  
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleMainTabChange = (selectedOption) => {
    const tabId = selectedOption.value;
    // 같은 탭을 선택한 경우 서브탭 변경 없이 리턴
    if (tabId === activeMainTab) {
      return;
    }
    
    setActiveMainTab(tabId);
    // 기본 사용법 탭으로 이동 시 서브 탭을 전원으로 초기화
    if (tabId === 'basic-usage') {
      setActiveSubTab('power');
    }
    // 탭 변경 시 최상단으로 스크롤
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const handleSubTabChange = (tabId) => {
    setActiveSubTab(tabId);
    // 탭 변경 시 최상단으로 스크롤
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const handleMonitoringSubTabChange = (tabId) => {
    setActiveMonitoringSubTab(tabId);
    // 탭 변경 시 최상단으로 스크롤
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const mainTabOptions = [
    { value: 'experiment-preparation', label: '실험 준비 방법' },
    { value: 'basic-usage', label: '갤럭시워치 기본 사용법' },
    { value: 'pairing', label: '갤럭시 워치와 스마트폰 페어링 하는 법' },
    { value: 'dev-mode', label: 'Dev mode 활성화 하는 법' },
    { value: 'app-install', label: '갤럭시 워치 KIST 어플 설치하는 법' },
    { value: 'web-registration', label: '실증 실험 모니터링 시스템 회원가입 및 근무일정 설명' },
    { value: 'monitoring-usage', label: 'KIST 건강 모니터링 어플 사용법' },
    { value: 'voice-recording', label: '하루 연상 단어 음성으로 녹음하기' },
    { value: 'samsung-health-download', label: '삼성 헬스 데이터 다운로드 및 전송 방법' },
  ];

  const subTabs = [
    { id: 'power', label: '전원 켜고 끄는 법' },
    { id: 'basic', label: '화면 좌우상하 의미' }
  ];

  const monitoringSubTabs = [
    { id: 'basic-settings', label: '기본 설정' },
    { id: 'auto-measure', label: '오토측정시작' },
    { id: 'manual-measure', label: '맥파측정(수동측정)' },
    { id: 'walk-measure', label: '걷기측정' }
  ];
  
  return (
    <div className="data-collection-guide">
      {/* 고정 헤더 영역 */}
      <div 
        className="guide-header" 
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 100,
          borderBottom: '2px solid #e9ecef',
          paddingBottom: '10px'
        }}
      >
        <h1>실험 방법 및 워치 조작</h1>
        
        {/* 메인 탭 네비게이션 - React Select */}
        <div className="main-tab-navigation" style={{ marginTop: '20px' }}>
          <Select
            value={mainTabOptions.find(option => option.value === activeMainTab)}
            onChange={handleMainTabChange}
            options={mainTabOptions}
            placeholder="안내 내용을 선택하세요"
            isSearchable={false}
            maxMenuHeight={600}
            styles={{
              control: (provided) => ({
                ...provided,
                minHeight: '45px',
                border: '2px solid #007bff',
                borderRadius: '8px',
                fontSize: '16px',
                boxShadow: 'none',
                '&:hover': {
                  border: '2px solid #007bff'
                }
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: '#007bff'
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 999
              }),
              menuList: (provided) => ({
                ...provided,
                maxHeight: '600px'
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? '#007bff' : state.isFocused ? '#f8f9fa' : 'white',
                color: state.isSelected ? 'white' : '#333',
                padding: '12px 16px',
                fontSize: '16px'
              }),
              singleValue: (provided) => ({
                ...provided,
                color: '#333',
                fontWeight: '500'
              })
            }}
          />
        </div>

        {/* 서브 탭 네비게이션 (기본 사용법 선택 시에만 표시) */}
        {activeMainTab === 'basic-usage' && (
          <div className="sub-tab-navigation" style={{ marginTop: '15px' }}>
            {subTabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeSubTab === tab.id ? 'active' : ''}`}
                onClick={() => handleSubTabChange(tab.id)}
                style={{
                  padding: '8px 16px',
                  margin: '0 3px',
                  border: 'none',
                  borderRadius: '3px',
                  backgroundColor: activeSubTab === tab.id ? '#007bff' : '#e9ecef',
                  color: activeSubTab === tab.id ? 'white' : '#666',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: activeSubTab === tab.id ? 'bold' : 'normal'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* 모니터링 서브 탭 네비게이션 (KIST 건강 모니터링 어플 사용법 선택 시에만 표시) */}
        {activeMainTab === 'monitoring-usage' && (
          <div className="sub-tab-navigation" style={{ marginTop: '15px', marginBottom: '20px' }}>
            {monitoringSubTabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeMonitoringSubTab === tab.id ? 'active' : ''}`}
                onClick={() => handleMonitoringSubTabChange(tab.id)}
                style={{
                  padding: '10px 18px',
                  margin: '0 5px 8px 0',
                  border: 'none',
                  borderRadius: '5px',
                  backgroundColor: activeMonitoringSubTab === tab.id ? '#007bff' : '#e9ecef',
                  color: activeMonitoringSubTab === tab.id ? 'white' : '#666',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: activeMonitoringSubTab === tab.id ? 'bold' : 'normal',
                  display: 'inline-block',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="guide-content">
        {/* 실험 준비 방법 탭 */}
        {activeMainTab === 'experiment-preparation' && (
          <div className="guide-section">
            <h2>■ 실험 준비 방법</h2>
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '20px 0'
            }}>
              <img 
                src={getImageUrl('field-study-guide/01-experiment-preparation/ready_new.png')}
                alt="실험 준비 방법 순서도" 
                style={{
                  maxWidth: '100%',
                  width: window.innerWidth > 768 ? '760px' : '98%',
                  height: 'auto',
                  borderRadius: '8px',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>
          </div>
        )}

        {/* 웹 회원가입 및 근무일정 탭 */}
        {activeMainTab === 'web-registration' && (
          <div className="guide-section">
            <h2>■ 실증 실험 모니터링 시스템 회원가입 및 근무일정 설명</h2>
            
            <div className="guide-subsection">
              <h3>
                1. 
                <a 
                      href="https://health-user.lstgrp.com/#/login" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'red', fontWeight: 'bold', textDecoration: 'underline' }}
                    >
                      실증실험 모니터링 시스템
                    </a>
                     접속 후 회원가입 클릭</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/06-web-registration/new_page1.png')}
                  alt="실증실험 모니터링 시스템 접속 후 회원가입 클릭" 
                  style={{
                    maxWidth: '100%',
                    width: window.innerWidth > 768 ? '400px' : '90%',
                    height: 'auto',
                    borderRadius: '8px',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>2. 회원가입하기</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/06-web-registration/new_page2.png')} 
                  alt="간편 회원가입 페이지" 
                  style={{
                    maxWidth: '100%',
                    width: window.innerWidth > 768 ? '400px' : '90%',
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>3. 로그인 후 [근무 일정] 클릭</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/06-web-registration/new_page3.png')}
                  alt="로그인 후 근무 일정 클릭" 
                  style={{
                    maxWidth: '100%',
                    width: window.innerWidth > 768 ? '400px' : '90%',
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>4. 근무 일정 등록하기</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/06-web-registration/new_page4.png')} 
                  alt="근무 일정 등록하기" 
                  style={{
                    maxWidth: '100%',
                    width: window.innerWidth > 768 ? '400px' : '90%',
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>5. 아래에서 등록된 근무 일정 확인 가능</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/06-web-registration/new_page5.png')} 
                  alt="등록된 근무 일정 확인" 
                  style={{
                    maxWidth: '100%',
                    width: window.innerWidth > 768 ? '400px' : '90%',
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>6. BRS, BIG5 설문까지 완료하기</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/06-web-registration/new_page6.png')} 
                  alt="BRS와 BIG5 설문 완료" 
                  style={{
                    maxWidth: '100%',
                    width: window.innerWidth > 768 ? '400px' : '90%',
                    height: 'auto',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 앱 설치 탭 */}
        {activeMainTab === 'app-install' && (
          <div className="guide-section">
            <h2>■ 갤럭시 워치 KIST 어플 설치하는 법</h2>
            
            <div className="guide-subsection">
              <h3>1. Play 스토어 클릭</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/05-app-install/playstore_app_download-1.png')} 
                  alt="갤럭시 워치 앱 메뉴에서 Play 스토어 찾기" 
                  style={{
                    ...squareImageStyle,
                    width: window.innerWidth > 768 ? '250px' : '70%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>2. 돋보기(검색) 클릭</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/05-app-install/playstore_app_download-2.png')} 
                  alt="Play 스토어에서 검색 버튼 클릭" 
                  style={{
                    ...squareImageStyle,
                    width: window.innerWidth > 768 ? '250px' : '70%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>3. KIST 검색</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/05-app-install/playstore_app_download-3.png')} 
                  alt="검색창에 KIST 입력" 
                  style={{
                    ...squareImageStyle,
                    width: window.innerWidth > 768 ? '250px' : '70%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>4. 설치 클릭</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/05-app-install/playstore_app_download-4.png')} 
                  alt="KIST 건강 모니터링 앱 설치" 
                  style={{
                    ...squareImageStyle,
                    width: window.innerWidth > 768 ? '250px' : '70%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3 style={{ marginTop: '40px', color: '#333' }}>
                잠깐! 편의를 위해
              </h3>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
                <strong>설치가 완료되면 어플 목록 하단에 KIST 아이콘이 생성됩니다.</strong>
              </p>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>
                매번 스크롤을 내리는 번거로움을 줄이기 위해 해당 아이콘을 상단으로 이동해두시길 권장드립니다.
              </p>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: window.innerWidth > 768 ? 'repeat(3, 1fr)' : window.innerWidth > 480 ? 'repeat(2, 1fr)' : '1fr',
                gap: '15px',
                margin: '20px 0',
                justifyItems: 'center'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <img 
                    src={getImageUrl('field-study-guide/05-app-install/playstore_app_download-5.png')} 
                    alt="어플 목록 하단 KIST 아이콘 생성" 
                    style={{
                      ...squareImageStyle,
                      width: window.innerWidth > 768 ? '200px' : '80%'
                    }}
                  />
                  <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>어플 목록 하단 KIST<br/>아이콘 생성</span>
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img 
                    src={getImageUrl('field-study-guide/05-app-install/playstore_app_download-6.png')} 
                    alt="KIST 아이콘 길게 클릭" 
                    style={{
                      ...squareImageStyle,
                      width: window.innerWidth > 768 ? '200px' : '80%'
                    }}
                  />
                  <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>KIST 아이콘 길게 클릭</span>
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img 
                    src={getImageUrl('field-study-guide/05-app-install/playstore_app_download-7.png')} 
                    alt="상단으로 끌어 올리기" 
                    style={{
                      ...squareImageStyle,
                      width: window.innerWidth > 768 ? '200px' : '80%'
                    }}
                  />
                  <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                    <span style={{ color: 'red', fontWeight: 'bold' }}>상단으로 끌어 올리기</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KIST 건강 모니터링 어플 사용법 탭 */}
        {activeMainTab === 'monitoring-usage' && (
          <>
            {activeMonitoringSubTab === 'basic-settings' && (
              <div className="guide-section">
                <h2>■ 기본 설정</h2>
                
                <div className="guide-subsection">
                  <h3>1. 허용 클릭</h3>
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/basic-settings/galaxy_monitoring_basic_4.png')} 
                      alt="허용 클릭" 
                      style={{
                        ...squareImageStyle,
                        width: window.innerWidth > 768 ? '250px' : '70%'
                      }}
                    />
                  </div>
                </div>

                <div className="guide-subsection">
                  <h3>2. 앱을 사용 중일 때 클릭</h3>
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/basic-settings/galaxy_monitoring_basic_1.png')} 
                      alt="앱을 사용 중일 때만" 
                      style={{
                        ...squareImageStyle,
                        width: window.innerWidth > 768 ? '250px' : '70%'
                      }}
                    />
                  </div>
                </div>

                <div className="guide-subsection">
                  <h3>3. 항상 클릭</h3>
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/basic-settings/galaxy_monitoring_basic_2.png')} 
                      alt="항상 클릭" 
                      style={{
                        ...squareImageStyle,
                        width: window.innerWidth > 768 ? '250px' : '70%'
                      }}
                    />
                  </div>
                </div>

                <div className="guide-subsection">
                  <h3>4. 뒤로가기 버튼 클릭 → 메인 화면으로 이동</h3>
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/basic-settings/galaxy_monitoring_basic_3.png')} 
                      alt="터코가기 버튼 클릭 → 메인 화면으로 이동" 
                      style={{
                        ...squareImageStyle,
                        width: window.innerWidth > 768 ? '250px' : '70%'
                      }}
                    />
                  </div>
                </div>

                <div className="guide-subsection">
                  <h3>5. 전화번호 클릭</h3>
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img 
                        src={getImageUrl('field-study-guide/07-monitoring-usage/basic-settings/galaxy_monitoring_basic_set-2.png')} 
                        alt="전화 번호 입력 화면"                       
                      style={{
                        ...squareImageStyle,
                        width: window.innerWidth > 768 ? '250px' : '70%'
                      }}
                    />
                  </div>
                </div>

                <div className="guide-subsection">
                  <h3>6. 전화번호 입력 후 저장하기 클릭</h3>
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/basic-settings/galaxy_monitoring_basic_set-3.png')} 
                      alt="오토측정시작 버튼 클릭" 
                      style={{
                        ...squareImageStyle,
                        width: window.innerWidth > 768 ? '250px' : '70%'
                      }}
                    />
                    <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: '10px',
                    flexDirection: window.innerWidth <= 480 ? 'column' : 'row',
                    marginTop: '20px'
                  }}>
                    <p style={{ 
                      color: '#333', 
                      fontSize: '16px', 
                      fontWeight: 'bold',
                      margin: 0,
                      textAlign: window.innerWidth <= 480 ? 'center' : 'left'
                    }}> 
                      KIST 통합관제시스템에서 회원가입할 때 입력하신 전화번호와 동일해야 합니다!
                    </p>
                  </div>
                  </div>
                </div>
                
                <div className="guide-subsection">
                  <h3>7. 연두색 아이콘이 되면 성공!</h3>
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/basic-settings/modify3.png')} 
                      alt="오토측정시작 버튼 클릭" 
                      style={{
                        ...squareImageStyle,
                        width: window.innerWidth > 768 ? '350px' : '70%'
                      }}
                    />
                  </div>
                </div>

                <div className="guide-subsection">
                  <h3>8. 빨간색 아이콘이 되면 성공!</h3>
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/basic-settings/galaxy_monitoring_basic_set-6.png')} 
                      alt="빨간색 아이콘으로 변경 성공" 
                      style={{
                        ...squareImageStyle,
                        width: window.innerWidth > 768 ? '250px' : '70%'
                      }}
                    />
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: '10px',
                    flexDirection: window.innerWidth <= 480 ? 'column' : 'row',
                    marginTop: '20px'
                  }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/basic-settings/red_icon.png')} 
                      alt="빨간색 원형 아이콘" 
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%'
                      }}
                    />
                    <p style={{ 
                      color: '#333', 
                      fontSize: '16px', 
                      fontWeight: 'bold',
                      margin: 0,
                      textAlign: window.innerWidth <= 480 ? 'center' : 'left'
                    }}>
                      와 같이 빨간색 아이콘으로 표시되어 있어야<br/>
                      오토측정이 정상적으로 진행됩니다!
                    </p>
                  </div>
                </div>

                <div className="guide-subsection">
                  <h3>9. 스크롤 아래로 내리기</h3>
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/basic-settings/new_page9.png')} 
                      alt="스크롤 아래로 내리기" 
                      style={{
                        ...squareImageStyle,
                        width: window.innerWidth > 768 ? '250px' : '70%'
                      }}
                    />
                  </div>
                </div>

                <div className="guide-subsection">
                  <h3>10. [알림 및 리마인더 설정허용]을 한번 끄고 다시 켜기(이미 허용상태처럼 보여도 이과정은 필수)</h3>
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/basic-settings/new_page10.png')} 
                      alt="알림 및 리마인더 설정허용을 한번 끄고 다시 켜기" 
                      style={{
                        ...squareImageStyle,
                        width: window.innerWidth > 768 ? '250px' : '70%'
                      }}
                    />
                  </div>
                </div>

                <div className="guide-subsection" style={{ marginTop: '40px', borderTop: '2px solid #e9ecef', paddingTop: '30px' }}>
                  <h2 style={{ color: '#333', marginBottom: '20px' }}>측정을 잘못 선택했거나 다시 진행하고 싶은 경우</h2>
                  
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                    gap: window.innerWidth <= 768 ? '20px' : '40px',
                    margin: '30px 0'
                  }}>
                    <div style={{ textAlign: 'center', flex: '1', maxWidth: '100%' }}>
                      <img 
                        src={getImageUrl('field-study-guide/07-monitoring-usage/basic-settings/galaxy_monitoring_basic_back.png')} 
                        alt="갤럭시 워치 뒤로가기 버튼" 
                        style={{
                          maxWidth: '100%',
                          width: window.innerWidth > 768 ? '250px' : '90%',
                          height: 'auto',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                    <div style={{ textAlign: 'center', flex: '1', maxWidth: '100%' }}>
                      <img 
                        src={getImageUrl('field-study-guide/07-monitoring-usage/basic-settings/galaxy_monitoring_basic_swipe.png')} 
                        alt="화면을 왼쪽에서 오른쪽으로 밀면 이전 화면으로 돌아감" 
                        style={{
                          maxWidth: '100%',
                          width: window.innerWidth > 768 ? '250px' : '90%',
                          height: 'auto',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                  </div>
                  
                  <p style={{ 
                    color: '#333', 
                    fontSize: '18px', 
                    fontWeight: 'bold',
                    textAlign: 'center',
                    margin: '20px 0',
                    lineHeight: '1.6'
                  }}>
                    뒤로가기 버튼을 누르거나 화면을 왼쪽에서 오른쪽으로 밀면 이전 화면으로 돌아갈 수 있습니다.
                  </p>
                </div>

                <div className="guide-subsection" style={{ marginTop: '40px', borderTop: '2px solid #e9ecef', paddingTop: '30px' }}>
                  <h2 style={{ color: '#333', marginBottom: '20px' }}>진동을 끄고 싶은 경우(방해금지 모드)</h2>
                  
                  <div style={{ textAlign: 'center', margin: '30px 0' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/basic-settings/off_vibration_2.png')} 
                      alt="진동을 끄고 싶은 경우(방해금지 모드)" 
                      style={{
                        maxWidth: '100%',
                        width: window.innerWidth > 768 ? '600px' : '95%',
                        height: 'auto',
                        borderRadius: '8px',
                        display: 'block',
                        margin: '0 auto'
                      }}
                    />
                  </div>

                  <p style={{ 
                    color: '#333', 
                    fontSize: '16px', 
                    lineHeight: '1.6',
                    margin: '15px 0'
                  }}>
                    버튼이 <span style={{ color: 'red', fontWeight: 'bold' }}>빨간색 아이콘</span>으로 표시되어 있으면 자동측정 및 진동이 일과 시간에 맞춰 자동으로 해제됩니다.
                  </p>
                  <p style={{ 
                    color: '#333', 
                    fontSize: '16px', 
                    lineHeight: '1.6',
                    margin: '15px 0'
                  }}>
                    방해금지 모드는 다음 날 자동으로 해제됩니다.
                  </p>


                </div>
              </div>
            )}

            {activeMonitoringSubTab === 'auto-measure' && (
              <div className="guide-section">
                <h2>■ 오토측정시작</h2>
                
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth > 768 ? 'repeat(4, 1fr)' : window.innerWidth > 480 ? 'repeat(2, 1fr)' : '1fr',
                  gap: '20px',
                  margin: '30px 0',
                  justifyItems: 'center'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/auto-measure/auto_measure_1.png')} 
                      alt="센서 데이터 수집 중" 
                      style={{
                        maxWidth: '100%',
                        width: window.innerWidth > 768 ? '220px' : window.innerWidth > 480 ? '180px' : '220px',
                        height: 'auto',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/auto-measure/auto_measure-3.png')} 
                      alt="피드백 요청됨" 
                      style={{
                        maxWidth: '100%',
                        width: window.innerWidth > 768 ? '200px' : window.innerWidth > 480 ? '180px' : '200px',
                        height: 'auto',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/auto-measure/auto_measure-4.png')} 
                      alt="스트레스 측정 결과 (스트레스)" 
                      style={{
                        maxWidth: '100%',
                        width: window.innerWidth > 768 ? '200px' : window.innerWidth > 480 ? '180px' : '200px',
                        height: 'auto',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/auto-measure/auto_measure-5.png')} 
                      alt="스트레스 측정 결과 (스트레스)" 
                      style={{
                        maxWidth: '100%',
                        width: window.innerWidth > 768 ? '200px' : window.innerWidth > 480 ? '180px' : '200px',
                        height: 'auto',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                </div>

                <div className="guide-subsection">
                  <h3 style={{ fontSize: '18px' }}>📈 오토측정 안내</h3>
                  <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
                    <li>오토측정은 회원가입 다음 날부터 자동진행됩니다.</li>
                    <li>오토측정은 하루 12회, 1시간 간격으로 자동 측정되며, 각 측정은 1분 동안 진행됩니다.</li>
                    <li>측정이 끝나면 스트레스 알림이 표시되며(→2번 사진 참고), 알림을 클릭하여 스트레스 점수를 선택해주세요.</li>
                    <li>스트레스가 있는 상태면 <img src={getImageUrl('field-study-guide/07-monitoring-usage/auto-measure/auto_measure-7.png')} alt="스트레스" style={{width: '20px', height: '20px', display: 'inline', verticalAlign: 'middle', margin: '0 2px'}} /> 스트레스가 없는 상태면 <img src={getImageUrl('field-study-guide/07-monitoring-usage/auto-measure/auto_measure-8.png')} alt="스트레스" style={{width: '20px', height: '20px', display: 'inline', verticalAlign: 'middle', margin: '0 2px'}} /> (→3번 사진 참고)으로 표시됩니다. 정오를 판단하기 위해 이어지는 화면에서 자신이 실제 느끼는 스트레스 강도를 숫자로 선택해주세요.</li>
                    <li>스트레스 점수를 선택하지 않을 시 진동이 울립니다.</li>
                  </ul>
                </div>

                <div className="guide-subsection">
                  <h3 style={{ fontSize: '18px' }}>🔎 오토측정 횟수 확인 방법</h3>
                  <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
                    <li>[오토측정중] 버튼 옆의 빨간색 숫자는 <img src={getImageUrl('field-study-guide/07-monitoring-usage/auto-measure/auto_measure-9.png')} alt="0" style={{width: '30px', height: '30px', display: 'inline', verticalAlign: 'middle', margin: '0 2px'}} /> 오늘 완료된 오토측정 횟수를 의미합니다.</li>
                    <li>숫자가 6 미만이면 1시간 정도의 간격을 두고 [맥파측정] 버튼을 눌러 수동으로 측정해주세요.</li>
                  </ul>
                  
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/auto-measure/auto_measure-6.png')} 
                      alt="오토측정 상태 확인" 
                      style={{
                        ...squareImageStyle,
                        width: window.innerWidth > 768 ? '300px' : '80%'
                      }}
                    />
                  </div>
                </div>

                <div className="guide-subsection">
                  <h3 style={{ fontSize: '18px' }}>⚠️ 측정 시 주의사항</h3>
                  <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
                    <li>측정 중에는 최대한 움직이지 말아주세요.</li>
                    <li>책상 위에 손목을 올려 놓은 상태에서 측정하시는 것을 권장드립니다.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeMonitoringSubTab === 'manual-measure' && (
              <div className="guide-section">
                <h2>■ 맥파측정(수동측정)</h2>
                
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: window.innerWidth > 768 ? 'repeat(4, 1fr)' : window.innerWidth > 480 ? 'repeat(2, 1fr)' : '1fr',
                  gap: '20px',
                  margin: '30px 0',
                  justifyItems: 'center'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/manual-measure/manual_measure-1.png')} 
                      alt="맥파측정 메뉴 선택" 
                      style={{
                        maxWidth: '100%',
                        width: window.innerWidth > 768 ? '200px' : window.innerWidth > 480 ? '180px' : '200px',
                        height: 'auto',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/manual-measure/manual_measure-2.png')} 
                      alt="측정 중" 
                      style={{
                        maxWidth: '100%',
                        width: window.innerWidth > 768 ? '200px' : window.innerWidth > 480 ? '180px' : '200px',
                        height: 'auto',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/manual-measure/manual_measure-3.png')} 
                      alt="스트레스 측정 결과 (스트레스)" 
                      style={{
                        maxWidth: '100%',
                        width: window.innerWidth > 768 ? '200px' : window.innerWidth > 480 ? '180px' : '200px',
                        height: 'auto',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/manual-measure/manual_measure-4.png')} 
                      alt="스트레스 측정 결과 (스트레스)" 
                      style={{
                        maxWidth: '100%',
                        width: window.innerWidth > 768 ? '200px' : window.innerWidth > 480 ? '180px' : '200px',
                        height: 'auto',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                </div>

                <div className="guide-subsection">
                  <h3 style={{ fontSize: '18px' }}>📈 맥파측정 안내</h3>
                  <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
                    <li>맥파측정은 오토측정을 놓쳤을 경우 수동으로 진행되며, 1분 동안 진행됩니다.</li>
                    <li>측정이 끝나면 스트레스 점수를 반드시 선택해야 합니다.(→3번 사진 참고).</li>
                    <li>스트레스가 있는 상태면 <img src={getImageUrl('field-study-guide/07-monitoring-usage/manual-measure/manual_measure-5.png')} alt="스트레스" style={{width: '20px', height: '20px', display: 'inline', verticalAlign: 'middle', margin: '0 2px'}} /> 스트레스가 없는 상태면 <img src={getImageUrl('field-study-guide/07-monitoring-usage/manual-measure/manual_measure-6.png')} alt="스트레스" style={{width: '20px', height: '20px', display: 'inline', verticalAlign: 'middle', margin: '0 2px'}} /> (→3번 사진 참고)으로 표시됩니다. 정오를 판단하기 위해 이어지는 화면에서 자신이 실제 느끼는 스트레스 강도를 숫자로 선택해주세요.</li>
                    <li>맥파측정 후 30분 동안 재측정이 불가합니다.</li>
                  </ul>
                </div>

                <div className="guide-subsection">
                  <h3 style={{ fontSize: '18px' }}>⚠️ 측정 시 주의사항</h3>
                  <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
                    <li>측정 중에는 최대한 움직이지 말아주세요.</li>
                    <li>책상 위에 손목을 올려 놓은 상태에서 측정하시는 것을 권장드립니다.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeMonitoringSubTab === 'walk-measure' && (
              <div className="guide-section">
                <h2>■ 걷기측정</h2>
                
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                  gap: window.innerWidth <= 768 ? '20px' : '40px',
                  margin: '30px 0'
                }}>
                  <div style={{ textAlign: 'center', flex: '1', maxWidth: '100%' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/walk-measure/walk_measure.png-1.png')} 
                      alt="걷기측정 메뉴 선택" 
                      style={{
                        maxWidth: '100%',
                        width: window.innerWidth > 768 ? '300px' : '250px',
                        height: 'auto',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'center', flex: '1', maxWidth: '100%' }}>
                    <img 
                      src={getImageUrl('field-study-guide/07-monitoring-usage/walk-measure/walk_measure.png-2.png')} 
                      alt="걷기측정 중" 
                      style={{
                        maxWidth: '100%',
                        width: window.innerWidth > 768 ? '300px' : '250px',
                        height: 'auto',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                </div>

                <div className="guide-subsection">
                  <h3 style={{ fontSize: '18px' }}>📈 걷기측정 안내</h3>
                  <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
                    <li>걷기측정은 하루 1회, 매일 저녁 8시(20시)에 수동으로 측정해주세요.</li>
                    <li>걷기측정을 누르고 1분 이상 걸으면 자동 종료됩니다.</li>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}

        {/* Dev mode 활성화 탭 */}
        {activeMainTab === 'dev-mode' && (
          <div className="guide-section">
            <h2>■ Dev mode 활성화 하는 법</h2>
            
            <div className="guide-subsection">
              <h3>1. 환경설정 클릭</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/04-dev-mode/dev_mode-1.png')} 
                  alt="환경설정 클릭" 
                  style={{
                    ...squareImageStyle,
                    width: window.innerWidth > 768 ? '250px' : '70%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>2. 애플리케이션 클릭</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/04-dev-mode/dev_mode-2.png')} 
                  alt="애플리케이션 클릭" 
                  style={{
                    ...squareImageStyle,
                    width: window.innerWidth > 768 ? '250px' : '70%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>3. 헬스 플랫폼 클릭</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/04-dev-mode/dev_mode-3.png')} 
                  alt="헬스 플랫폼 클릭" 
                  style={{
                    ...squareImageStyle,
                    width: window.innerWidth > 768 ? '250px' : '70%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>4. 헬스 플랫폼을 10번 클릭</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/04-dev-mode/dev_mode-4.png')} 
                  alt="헬스 플랫폼을 10번 클릭" 
                  style={{
                    ...squareImageStyle,
                    width: window.innerWidth > 768 ? '250px' : '70%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>5. [Dev mode] 글자 나오면 성공!</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/04-dev-mode/dev_mode-5.png')} 
                  alt="[Dev mode] 글자 나오면 성공!" 
                  style={{
                    ...squareImageStyle,
                    width: window.innerWidth > 768 ? '250px' : '70%'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 페어링 탭 */}
        {activeMainTab === 'pairing' && (
          <div className="guide-section">
            <h2>■ 갤럭시 워치와 스마트폰 페어링 하는 법</h2>
            
            <div className="guide-subsection">
              <h3>1. 상단 메뉴 혹은 설정에서 Bluetooth 켠 후 앱 목록에서 Galaxy Wearable 찾아 실행</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair-1.png')} 
                  alt="삼성 스마트폰 홈화면에서 Galaxy Wearable 찾기" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>2. 자동 연결 혹은 기기 선택에서 스마트워치 선택</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair_2.png')} 
                  alt="Watch6 워치에 연결중 화면" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>3. 확인 클릭</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair-3.png')} 
                  alt="워치에 표시된 숫자가 일치하는지 확인하세요" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '65%',
                    display: 'inline-block',
                    marginRight: '5px',
                    verticalAlign: 'middle'
                  }}
                />
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair_number.png')} 
                  alt="워치 화면에서 시작중..." 
                  style={{
                    ...squareImageStyle,
                    width: window.innerWidth > 768 ? '200px' : '45%',
                    display: 'inline-block',
                    marginLeft: '5px',
                    verticalAlign: 'middle'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>4. 모두 동의 클릭 후 계속</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair-4.png')} 
                  alt="아래 항목에 동의하고 계속 진행" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>5. Google 계정 로그인(위와 같은 화면이 뜰 경우 다시 시도 클릭)</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair_2-1.png')} 
                  alt="Google 계정을 복사할 수 없습니다" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>6. 동의 클릭</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair_2-2.png')} 
                  alt="서비스 약관 동의" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>7. 다음 클릭</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair_2-3.png')} 
                  alt="워치 데이터 자동 백업" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>8. 모두 허용 클릭</h3>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: window.innerWidth > 768 ? 'repeat(4, 1fr)' : window.innerWidth > 480 ? 'repeat(2, 1fr)' : '1fr',
                gap: '15px',
                margin: '20px 0',
                justifyItems: 'center'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair_2-4.png')} 
                  alt="삼성 Smart Switch - 데이터 전송하기" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '200px' : '80%'
                  }}
                />
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair_2-5.png')} 
                  alt="삼성 Smart Switch의 필요한 사용을 위한 접근 권한 안내" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '200px' : '80%'
                  }}
                />
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair_2-6.png')} 
                  alt="백터리 사용량 최적화 동의" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '200px' : '80%'
                  }}
                />
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair_2-7.png')} 
                  alt="워치의 Smart Switch 사용 권한" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '200px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>9. 허용 클릭</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair_3-1.png')} 
                  alt="워치의 Smart Switch 사용 권한" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>10. 개인 설정 후 다음 클릭</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair_3-2.png')} 
                  alt="워치를 착용할 손목 설정" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>11. 동의 클릭</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair_3-3.png')} 
                  alt="사전 설치된 워치 앱에서 필요한 권한" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>12. 페어링 완료!</h3>
              <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <img 
                  src={getImageUrl('field-study-guide/03-pairing/galaxy_pair_3-4.png')} 
                  alt="완료 중... 페어링 완료" 
                  style={{
                    ...watchImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 기본 사용법 탭 */}
        {activeMainTab === 'basic-usage' && (
          <>
            {/* 전원 관리 서브탭 */}
            {activeSubTab === 'power' && (
              <>
                <div className="guide-section">
                  <h2>■ 전원 켜고 끄는 법</h2>
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img 
                      src={getImageUrl('field-study-guide/02-basic-usage/power/galaxy_watch_power_1.png')} 
                      alt="갤럭시 워치 전원 켜기" 
                      style={watchImageStyle}
                    />
                  </div>
                  
                  <h3>1. 전원 켜는 법</h3>
                  <ul>
                    <li>홈 버튼을 길게 누르면 전원이 켜집니다.</li>
                  </ul>
                  
                  <h3>2. 전원 끄는 법</h3>
                  <ul>
                    <li>홈 버튼과 뒤로가기 버튼을 동시에 길게 눌러 
                      <img 
                        src={getImageUrl('field-study-guide/02-basic-usage/power/galaxy_watch_power_button.png')} 
                        alt="전원 버튼" 
                        style={{ width: '30px', height: '30px', margin: '0 0px', verticalAlign: 'middle' }}
                      /> 
                      버튼을 클릭하면 전원이 꺼집니다.
                    </li>
                  </ul>
                </div>

                <div className="guide-section">
                  <h2>■ 화면 켜고 끄는 법</h2>
                  <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img 
                      src={getImageUrl('field-study-guide/02-basic-usage/power/galaxy_watch_power_2.png')} 
                      alt="갤럭시 워치 화면 제어" 
                      style={watchImageStyle}
                    />
                  </div>
                  
                  <h3>1. 화면 켜는 법</h3>
                  <ul>
                    <li>홈 버튼이나 뒤로 가기 버튼을 누르면 화면이 켜집니다.</li>
                    <li>화면을 짧게 터치하거나 손목을 올리면 켜집니다.</li>
                  </ul>
                  
                  <h3>2. 화면 끄는 법</h3>
                  <ul>
                    <li>손바닥으로 화면을 덮으면 꺼집니다.</li>
                    <li>일정 시간동안 사용하지 않으면 자동으로 화면이 꺼집니다.</li>
                  </ul>
                </div>
              </>
            )}

            {/* 화면 좌우상하 서브탭 */}
            {activeSubTab === 'basic' && (
              <>
                <div className="guide-section">
                  <h2>■ 화면 좌우상하 의미</h2>
                  
                  <div className="guide-subsection">
                    <h3>1. 화면을 왼쪽으로 밀면</h3>
                    <div style={{ textAlign: 'center', margin: '20px 0' }}>
                      <img 
                        src={getImageUrl('field-study-guide/02-basic-usage/basic/galaxywatch_basic_1.png')} 
                        alt="갤럭시 워치 활동 링" 
                        style={watchImageStyle}
                      />
                    </div>
                    <ul>
                      <li>타일들이 있어 개인 건강 기능등 확인할 수 있습니다.</li>
                    </ul>
                  </div>

                  <div className="guide-subsection">
                    <h3>2. 화면을 오른쪽으로 밀면</h3>
                    <div style={{ textAlign: 'center', margin: '20px 0' }}>
                      <img 
                        src={getImageUrl('field-study-guide/07-monitoring-usage/auto-measure/auto_measure-3.png')} 
                        alt="갤럭시 워치 알림" 
                        style={watchImageStyle}
                      />
                    </div>
                    <ul>
                      <li>알림을 확인할 수 있습니다.</li>
                      <li><span style={{color: 'red'}}>스트레스 점수 선택을 놓친 경우 알람을 눌러 점수를 다시 선택할 수 있습니다.</span></li>
                    </ul>
                  </div>

                  <div className="guide-subsection">
                    <h3>3. 화면을 아래로 밀면</h3>
                    <div style={{ textAlign: 'center', margin: '20px 0' }}>
                      <img 
                        src={getImageUrl('field-study-guide/02-basic-usage/basic/galaxywatch_basic_3.png')} 
                        alt="갤럭시 워치 빠른 설정" 
                        style={watchImageStyle}
                      />
                    </div>
                    <ul>
                      <li>빠른 설정창을 볼 수 있습니다.</li>
                    </ul>
                  </div>

                  <div className="guide-subsection">
                    <h3>4. 화면을 위로 밀면</h3>
                    <div style={{ textAlign: 'center', margin: '20px 0' }}>
                      <img 
                        src={getImageUrl('field-study-guide/02-basic-usage/basic/galaxywatch_basic_4.png')} 
                        alt="갤럭시 워치 앱 메뉴" 
                        style={watchImageStyle}
                      />
                    </div>
                    <ul>
                      <li>앱을 확인할 수 있습니다.</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* 하루 연상 단어 음성으로 녹음하기 탭 */}
        {activeMainTab === 'voice-recording' && (
          <div className="guide-section">
            <h2>■ 하루 연상 단어 음성으로 녹음하기</h2>
            
            <div className="guide-subsection">
              <h3>📝 연상단어 녹음 안내</h3>
              <ul style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
                <li>퇴근 후 오늘 떠오르는 단어 5개 음성과 기분 녹음</li>
                <li>소음 없는 곳에서 진행</li>
                <li>시작 시 “녹음 시작” 이라고 말한 뒤 녹음 진행</li>
                <li>예) 
                  <ul style={{ marginTop: '8px', fontSize: '15px' }}>
                    <li><span style={{ color: 'red', fontWeight: 'bold' }}>"녹음 시작"</span>, 짜증, 바쁨, 친구, 대형사고, 지하철 + 오늘 기분은 00하다</li>
                    <li><span style={{ color: 'red', fontWeight: 'bold' }}>"녹음 시작"</span>, 빙수, 달리기, 신기록, 즐거움, 피곤 + 오늘 기분은 00하다</li>
                  </ul>
                </li>
                <li>파일 이름은 이름 + 날짜 형식으로 저장 예) 김경찰0710</li>

              </ul>
            </div>

            <div className="guide-subsection">
              <h3>1. 음성 녹음앱 클릭</h3>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                gap: window.innerWidth <= 768 ? '20px' : '40px',
                margin: '30px 0'
              }}>
                <div style={{ textAlign: 'center', flex: '1', maxWidth: '100%' }}>
                  <img 
                    src={getImageUrl('field-study-guide/08-voice-recording/record1-1.png')}
                    alt="음성 녹음앱 클릭" 
                    style={{
                      maxWidth: '100%',
                      width: window.innerWidth > 768 ? '250px' : '90%',
                      height: 'auto',
                      borderRadius: '8px'
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div className="guide-subsection">
              <h3>2. 연상 단어 5개 녹음하기</h3>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                gap: window.innerWidth <= 768 ? '20px' : '40px',
                margin: '30px 0'
              }}>
                <div style={{ textAlign: 'center', flex: '1', maxWidth: '100%' }}>
                  <img 
                    src={getImageUrl('field-study-guide/08-voice-recording/record1-2.png')}
                    alt="연상 단어 5개 녹음하기" 
                    style={{
                      maxWidth: '100%',
                      width: window.innerWidth > 768 ? '250px' : '90%',
                      height: 'auto',
                      borderRadius: '8px'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>3. 녹음 후 저장 예) 김경찰0710</h3>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                gap: window.innerWidth <= 768 ? '20px' : '40px',
                margin: '30px 0'
              }}>
                <div style={{ textAlign: 'center', flex: '1', maxWidth: '100%' }}>
                  <img 
                    src={getImageUrl('field-study-guide/08-voice-recording/record2-1.png')}
                    alt="3. 녹음 후 저장 예) 김경찰0710" 
                    style={{
                      maxWidth: '100%',
                      width: window.innerWidth > 768 ? '250px' : '90%',
                      height: 'auto',
                      borderRadius: '8px'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>4. 파일 꾹 눌러 선택</h3>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                gap: window.innerWidth <= 768 ? '20px' : '40px',
                margin: '30px 0'
              }}>
                <div style={{ textAlign: 'center', flex: '1', maxWidth: '100%' }}>
                  <img 
                    src={getImageUrl('field-study-guide/08-voice-recording/record2-2.png')}
                    alt="4. 파일 꾹 눌러 선택" 
                    style={{
                      maxWidth: '100%',
                      width: window.innerWidth > 768 ? '250px' : '90%',
                      height: 'auto',
                      borderRadius: '8px'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>5. 카카오톡 아이콘 클릭</h3>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                gap: window.innerWidth <= 768 ? '20px' : '40px',
                margin: '30px 0'
              }}>
                <div style={{ textAlign: 'center', flex: '1', maxWidth: '100%' }}>
                  <img 
                    src={getImageUrl('field-study-guide/08-voice-recording/record2-3.png')}
                    alt="5. 카카오톡 아이콘 클릭" 
                    style={{
                      maxWidth: '100%',
                      width: window.innerWidth > 768 ? '250px' : '90%',
                      height: 'auto',
                      borderRadius: '8px'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="guide-subsection">
              <h3>6. 해당 연구원 1:1 카톡방에 파일 전송</h3>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                gap: window.innerWidth <= 768 ? '10px' : '15px',
                margin: '15px 0'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <img 
                    src={getImageUrl('field-study-guide/08-voice-recording/record2-4.png')}
                    alt="6. 해당 연구원 1:1 카톡방에 파일 전송-1" 
                    style={{
                      maxWidth: '100%',
                      width: window.innerWidth > 768 ? '200px' : '70%',
                      height: 'auto',
                      borderRadius: '8px'
                    }}
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <img 
                    src={getImageUrl('field-study-guide/08-voice-recording/record2-5.png')}
                    alt="6. 해당 연구원 1:1 카톡방에 파일 전송-2" 
                    style={{
                      maxWidth: '100%',
                      width: window.innerWidth > 768 ? '200px' : '70%',
                      height: 'auto',
                      borderRadius: '8px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 삼성 헬스 데이터 다운로드 및 전송 방법 탭 */}
        {activeMainTab === 'samsung-health-download' && (
          <div className="guide-section">
            <h2>■ 삼성 헬스 데이터 다운로드 방법</h2>
            
            <div className="guide-subsection">
              <h3>1. 삼성 헬스 앱 클릭</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_1/samsung_health_download_1-2.png')}
                  alt="삼성 헬스 앱 아이콘 클릭" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>2. 메뉴 버튼 클릭</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_1/samsung_health_download_1-3.png')}
                  alt="삼성 헬스 메인 화면" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>3. 설정 버튼 클릭</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_1/samsung_health_download_1-1.png')}
                  alt="우측 상단 메뉴 버튼 클릭" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>4. 하단 부분에 개인 데이터 다운로드 클릭</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_1/samsung_health_download_1-4.png')}
                  alt="설정 메뉴 클릭" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>5. 다운로드 클릭</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_1/samsung_health_download_1-5.png')}
                  alt="개인 데이터 다운로드 메뉴" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>6. 액세스 팝업 허용 클릭</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_2/samsung_health_download_2-1.png')}
                  alt="앱 접근 허용" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>7. 다운로드 중</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_2/samsung_health_download_2-2.png')}
                  alt="허용 안함 선택" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>8. 다운 완료 후 파일보기 클릭</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_2/samsung_health_download_2-3.png')}
                  alt="개인 데이터 다운로드 클릭" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>9. 좌측 상단 뒤로가기 버튼 클릭</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_2/samsung_health_download_2-4.png')}
                  alt="다운로드 버튼 클릭" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>10. 파일 꾹 눌러 선택</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_2/samsung_health_download_2-5.png')}
                  alt="압축 진행 중" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>11. 더보기 클릭 후 압축 클릭</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_3/samsung_health_download_3-1.png')}
                  alt="액세스 팝업 허용" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>12. 압축 버튼 클릭</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_3/samsung_health_download_3-2.png')}
                  alt="다운로드 진행 중" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>13. 폴더 압축 중</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_3/samsung_health_download_3-3.png')}
                  alt="폴더 압축 중" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>14. 압축 완료 후 공유 클릭</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_3/samsung_health_download_3-4.png')}
                  alt="위로 가기 버튼 클릭" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>

            <div className="guide-subsection">
              <h3>15. dw2@kist.re.kr로 전송</h3>
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '20px 0'
              }}>
                <img 
                  src={getImageUrl('field-study-guide/09-samsung-health-download/samsung_health_download_3/samsung_health_download_3-5.png')}
                  alt="파일 선택하기" 
                  style={{
                    ...phoneImageStyle,
                    width: window.innerWidth > 768 ? '300px' : '80%'
                  }}
                />
              </div>
            </div>
          </div>
        )}
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

export default FieldStudyGuide;
