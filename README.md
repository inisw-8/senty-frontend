# 📊 Senty - Sentiment Analysis Dashboard

> 트윗 기반 IT 기업 감성 분석 인터랙티브 대시보드

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-4.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Recharts](https://img.shields.io/badge/Recharts-2.6-8884D8?style=for-the-badge)](https://recharts.org)

---

## 🌟 프로젝트 하이라이트

<div align="center">

| 🎨 모던 UI | 📈 인터랙티브 차트 | 🔍 실시간 분석 |
|:----------:|:------------------:|:--------------:|
| 인디고 다크 테마 | Recharts 기반 | Mock 데이터 지원 |
| 글래스모피즘 | 동적 시각화 | API 연동 가능 |

</div>

---

## 🎬 데모

### 메인 대시보드
- 🌙 **다크 테마**: 인디고 블루 기반 모던 디자인
- 📊 **실시간 차트**: 감성 분포, 토픽 비율, 상관관계 시각화
- 🎛️ **탭 네비게이션**: 9개 토픽을 효율적으로 탐색

### 주요 기능
- ✅ 전체 토픽 감성 분포 파이 차트
- ✅ 일별 토픽 비율 라인 차트
- ✅ 감성 점수-주가 지수 상관관계 그래프
- ✅ 토픽별 워드 클라우드
- ✅ 상관관계 순위 테이블

---

## 🚀 빠른 시작

```bash
# 1. 레포지토리 클론
git clone https://github.com/inisw-8/senty-frontend.git
cd senty-frontend

# 2. 의존성 설치
npm install --legacy-peer-deps

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 확인
open http://localhost:5173
```

---

## 🏗️ 프로젝트 구조

```
senty/
├── 📄 index.html                # HTML 진입점
├── 📄 vite.config.js            # Vite 설정
├── 📄 tailwind.config.js        # Tailwind 설정
├── 📄 package.json              # 의존성
│
└── 📁 src/
    ├── 📄 App.jsx               # 앱 루트
    ├── 📄 main.jsx              # React 진입점
    ├── 📄 index.css             # 글로벌 스타일 + 애니메이션
    │
    ├── 📁 pages/
    │   └── OneReport.jsx        # 📊 메인 리포트 페이지
    │
    ├── 📁 components/
    │   ├── MainContent.jsx      # 메인 콘텐츠 + 탭 인터페이스
    │   ├── Sidebar.jsx          # 사이드바 네비게이션
    │   ├── BigCharacter.jsx     # 핵심 지표 카드
    │   ├── SentimentDist.jsx    # 🥧 감성 분포 파이 차트
    │   ├── TopicProportion.jsx  # 📈 토픽 비율 라인 차트
    │   ├── CorrLine.jsx         # 📉 상관관계 라인 차트
    │   ├── WordCloud.jsx        # ☁️ 워드 클라우드
    │   └── TopicValueTable.jsx  # 📋 데이터 테이블
    │
    └── 📁 data/
        └── mockData.js          # 🎭 Mock 데이터
```

---

## 🔬 기술 스택

### 프론트엔드

| 기술 | 버전 | 용도 |
|------|------|------|
| **React** | 18.2 | UI 라이브러리 |
| **Vite** | 4.3 | 빌드 도구 (HMR 지원) |
| **Tailwind CSS** | 3.3 | 유틸리티 CSS |
| **Recharts** | 2.6 | 차트 시각화 |
| **react-wordcloud** | 1.2 | 워드 클라우드 |
| **react-scroll** | 1.8 | 스무스 스크롤 |
| **Heroicons** | 2.0 | 아이콘 |

---

## 🎨 디자인 시스템

### 컬러 팔레트

```css
/* 주요 색상 */
--indigo-500: #6366f1;    /* 주요 액센트 */
--sky-400: #38bdf8;       /* 보조 액센트 */
--slate-900: #0f172a;     /* 배경 */
--green-400: #4ade80;     /* 긍정 지표 */
--rose-400: #fb7185;      /* 부정 지표 */
```

### UI 컴포넌트

#### 글래스모피즘 카드
```jsx
<div className="glassmorphism p-6 rounded-2xl border border-indigo-500/10">
  {/* 콘텐츠 */}
</div>
```

#### 인디고 글로우 효과
```css
.glow-indigo {
  animation: glow-indigo 1.5s infinite alternate;
}
```

---

## 📊 데이터 구조

### API 응답 형식

```typescript
interface ReportData {
  total_topic: {
    tweet_number: number;           // 총 트윗 수
    sentiment_dist: SentDistModel[];  // 감성 분포
    sentiment_dist_rank: TopicValue[]; // 감성 분포 순위
    corr_rank_list: TopicValue[];      // 상관관계 순위
    topic_proportions: TopicProportion[]; // 토픽 비율
  };
  topics: TopicModel[];  // 개별 토픽 상세
}

interface TopicModel {
  topic_name: string;
  tweet_number: number;
  sentiment_dist: SentDistModel[];
  topic_words: TopicWord[];
  correlations: CorrelationModel;
  sentiment_corr: CorrLine[];
  positive_words: SentKeyword[];
  negative_words: SentKeyword[];
}
```

---

## 🧮 분석 방법론

### 1. LDA 토픽 모델링
```
트윗 텍스트 → 전처리 → LDA → 9개 토픽 추출
```

### 2. RoBERTa 감성 분석
```
트윗 → RoBERTa 모델 → 긍정/부정/중립 분류
```

### 3. 일별 감성 점수 계산
```
Score = ((긍정 수 - 부정 수) / 전체 트윗) × (1 - 중립 비율)
```

### 4. Pearson 상관계수
```python
correlation, p_value = scipy.stats.pearsonr(sentiment, stock_index)
```

---

## 📈 주요 발견

| 토픽 | 상관계수 | p-value | 해석 |
|------|----------|---------|------|
| **GPU** | **-0.68** | 0.002 | 강한 음의 상관 ⚡ |
| Apple | -0.45 | 0.018 | 중간 음의 상관 |
| AI/ML | -0.38 | 0.035 | 약한 음의 상관 |

> 💡 **핵심 인사이트**: GPU 토픽에서 감성 점수와 주가 지수 간 강한 음의 상관관계 발견!

---

## 🔧 설정

### API 연동 vs Mock 데이터

```javascript
// src/pages/OneReport.jsx
const USE_API = false;  // true: 백엔드 API, false: Mock 데이터
```

### 백엔드 API 엔드포인트
```javascript
const API_URL = 'http://localhost:8000/api';
```

---

## 📦 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과물
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
```

### Vercel 배포
```bash
npm i -g vercel
vercel --prod
```

---

## 🔗 관련 레포지토리

| 레포 | 설명 |
|------|------|
| [🤖 AI Modeling](https://github.com/inisw-8/ai-modeling) | LDA + RoBERTa 모델링 |
| [📥 Data Gathering](https://github.com/inisw-8/data-gathering) | 트윗 데이터 수집 |
| [🖥️ Web Server](https://github.com/inisw-8/web-server) | FastAPI 백엔드 |
| [🔬 Our Efforts](https://github.com/inisw-8/our-efforts) | R&D 실험 기록 |
| [📊 Frontend (원본)](https://github.com/inisw-8/frontend) | 프론트엔드 원본 |

---

## 👥 팀 정보

**INISW 8기 프로젝트**

- 역할: AI 모델링, 데이터 수집, 프론트엔드, 백엔드
- 기간: 2023.05 ~ 2023.06

---

## 📄 라이선스

MIT License

---

<div align="center">

**📊 Senty - 트윗으로 읽는 시장의 감성**

*Twitter 데이터 기반 IT 기업 감성 분석 대시보드*

[🚀 Live Demo](https://senty.vercel.app) · [🐛 Report Bug](https://github.com/inisw-8/senty-frontend/issues) · [✨ Request Feature](https://github.com/inisw-8/senty-frontend/issues)

</div>
