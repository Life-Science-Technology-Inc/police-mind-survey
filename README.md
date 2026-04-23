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
