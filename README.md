# Police Mind Survey

경찰 마음건강 설문 및 데이터 수집 안내 페이지 프로젝트입니다.  
GitHub Pages로 배포되며, 현재 공개 주소는 아래와 같습니다.

- 배포 URL: https://life-science-technology-inc.github.io/police-mind-survey/#/
- 데이터 수집 안내 URL: https://life-science-technology-inc.github.io/police-mind-survey/#/data-collection-guide

## 실행

```bash
npm install
npm start
```

## 빌드

```bash
npm run build
```

## 배포

```bash
npm run deploy
```

`package.json`의 `homepage` 설정을 기준으로 `gh-pages`를 사용해 배포합니다.

## 작업 내역

### 2026-04-23

- `src/components/DataCollectionGuide.js`의 모집 개요 문구 수정
  - 모집 기간: `26. 5. 4 (월)`
  - 모집 인원: `우울군 30, 스트레스 고위험군 30, 건강인 40`
  - 실험 기간:
    - `측정 시작 후 개인별 1주일`
    - `1차: 26. 5. 11 ~`
    - `2차: 26. 5. 26 ~`
- 참여 내용 및 과정 문구 수정
  - 8번: `알림은 매 정각마다 제공되며, 일 3회 이상 피드백이 요구됩니다.`
  - 12번: `일 1회 수면 설문, 일 1회 10분 간 챗봇 대화를 실행해 주세요.`
- `src/supabaseClient.js` 수정
  - Supabase 환경 변수가 없는 배포 빌드에서도 첫 화면이 비어버리지 않도록 초기화 로직 보완
  - 환경 변수가 없을 경우 페이지 렌더링은 유지하고 데이터 기능만 비활성화되도록 fallback 처리
- `.env.production` 추가
  - `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_KEY`를 GitHub Pages 배포 빌드 시점에 자동 주입되도록 설정
- GitHub Pages 재배포
  - 데이터 수집 안내 문구 수정 반영
  - 첫 화면 미노출 문제 수정 반영
- `src/components/DataCollectionGuide.js` 추가 수정
  - 안내 문구 `3주간` -> `1 주간`으로 변경
  - 실험 기간 표기를 `1차: 26. 5. 11(월) ~`, `2차: 26. 5. 26(화) ~`로 변경
  - `실증 실험 대기자 등록` 폼에 `희망 참여일` 체크박스 추가
    - `1차 (5월 11일-)`
    - `2차 (5월 26일-)`
    - `상관없음`
- 대기자 등록 데이터 확장
  - 저장 필드 `preferred_participation_rounds` 추가
  - 저장값 형식: `1차`, `2차`, `상관없음`, 또는 복수 선택 시 `1차, 2차`
- 관리자 조회 기능 확장
  - `src/components/AdminPage.js`에서 희망 참여일을 목록, 상세 정보, CSV 다운로드에 표시
- 백엔드 동기화 payload 확장
  - `src/services/backendSync.js`에 `preferred_participation_rounds` 포함
- DB 변경 스크립트 추가
  - `db/add_preferred_participation_rounds.sql`
  - `survey-person` 테이블에 `preferred_participation_rounds text` 컬럼 추가용 SQL 작성
- 희망 참여일 선택 UI 개선
  - `1차 / 2차 / 상관없음`이 동시에 선택되지 않도록 단일 선택 방식으로 변경
  - 체크박스형 UI를 카드형 라디오 선택 UI로 정리
- GitHub Pages 재배포
  - 희망 참여일 단일 선택 UI 및 스타일 개선 반영
- 희망 참여일 라디오 정렬 보정
  - 선택 원형 버튼과 텍스트 사이 간격 조정
  - 텍스트 세로 중앙 정렬 보정
- 관리자 페이지 표 조정
  - `희망 참여일` 컬럼을 `스트레스점수` 바로 다음 위치로 이동
  - 관리자 상단 충원 목표의 기본 fallback 값을 `30 / 30 / 40`으로 조정

### 2026-04-24

- Supabase 운영 환경 설정 갱신
  - `.env.production`의 Supabase URL과 anon key를 현재 운영 프로젝트 기준으로 교체
  - 관리자 로그인 오류 원인이던 이전 프로젝트 설정 불일치 해소
- 관리자 인증 오류 표시 개선
  - `src/components/AdminPage.js`에서 Supabase 인증 실패 시 실제 에러 메시지를 표시하도록 보완
- 등록 페이지 모집 상태 확인 방식 수정
  - `src/components/DataCollectionGuide.js`에서 모집 상태 확인을 직접 테이블 조회 대신 `get_recruitment_status` RPC 호출로 변경
  - 관리자 페이지에서는 모집중인데 등록 페이지에서만 `모집 상태를 확인할 수 없습니다`가 뜨던 문제 수정
- 희망 참여일 선택 문구 및 레이아웃 정리
  - `1차 실험(2026. 5. 11 ~)`, `2차 실험(2026. 5. 26 ~)`, `상관없음`으로 문구 통일
  - 라디오 원형 버튼과 텍스트 정렬이 어긋나던 문제 수정
- 관리자 페이지 개선
  - `희망 참여일` 컬럼을 `스트레스점수` 다음 칸에 표시하도록 유지
  - `희망 참여일` 컬럼도 정렬 가능하도록 연결
  - 비활성 정렬 상태에서도 `⇅` 표시가 보이도록 정렬 인디케이터 UI 보강
- GitHub Pages 재배포
  - 관리자 인증 수정, 모집 상태 확인 수정, 희망 참여일 UI/정렬 표시 수정 반영
