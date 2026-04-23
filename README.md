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
