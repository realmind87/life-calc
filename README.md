# 생활 계산기 모음

자주 쓰는 계산기를 한곳에 모은 Next.js 웹 앱입니다.  
계산 상태를 URL로 공유할 수 있고, 다크모드·마이크로 인터랙션·반응형 UI를 지원합니다.

## 라이브

- **프로덕션:** https://life-calc-coral.vercel.app
- **저장소:** https://github.com/realmind87/life-calc

### 페이지 URL

| 페이지 | URL |
|--------|-----|
| 홈 | https://life-calc-coral.vercel.app |
| 할인 계산기 | https://life-calc-coral.vercel.app/discount |
| 더치페이 계산기 | https://life-calc-coral.vercel.app/split |
| 날짜 계산기 | https://life-calc-coral.vercel.app/date |
| 단위 변환기 | https://life-calc-coral.vercel.app/unit |
| BMI 계산기 | https://life-calc-coral.vercel.app/bmi |

### 공유 URL 예시

- BMI: https://life-calc-coral.vercel.app/bmi?height=170&weight=65
- 할인: https://life-calc-coral.vercel.app/discount?price=10000&rate1=30
- 더치페이: https://life-calc-coral.vercel.app/split?total=48000&people=4

## 기능

### 계산기

| 경로 | 이름 | 설명 |
|------|------|------|
| `/discount` | 할인 계산기 | 원가·할인율(이중 할인)로 최종 가격 계산, URL 공유 |
| `/split` | 더치페이 계산기 | 총액 ÷ 인원 → 1인당 금액(올림), URL 공유 |
| `/date` | 날짜 계산기 | 두 날짜 사이 일수·디데이 |
| `/unit` | 단위 변환기 | 길이·무게·온도 변환 |
| `/bmi` | BMI 계산기 | 키(cm)·몸무게(kg)로 BMI·분류, URL 공유 |

### UX

- **다크모드** — Nav 토글, `localStorage` 유지, OS `prefers-color-scheme` 기본값 존중
- **마이크로 인터랙션** — 결과 fade/slide 등장, 버튼·입력 트랜지션, 링크 복사 성공 피드백
- **반응형** — 모바일 여백·폰트·터치 타깃, Nav 계산기 칩 가로 스크롤
- **URL 공유** — `useShareableState`로 입력값을 쿼리스트링에 담아 공유 (예: `/bmi?height=170&weight=65`)

## 기술 스택

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 3 (`darkMode: "class"`)

## 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인하세요.

```bash
npm run build   # 프로덕션 빌드
npm start       # 빌드 결과 실행
```

## 구조

```
app/
  layout.tsx          # 루트 레이아웃, 테마 초기화 스크립트, ThemeProvider
  page.tsx            # 홈 (계산기 목록 카드)
  globals.css
  discount|split|date|unit|bmi/
    page.tsx          # 각 계산기 페이지
components/
  Nav.tsx             # 상단 네비 + 테마 토글
  ThemeProvider.tsx   # 테마 상태 (light / dark / system)
  ThemeToggle.tsx     # 라이트·다크 전환 버튼
  CalculatorShell.tsx # 공통 레이아웃, NumberField, Result
  ShareButton.tsx     # 링크 복사
lib/
  calculators.ts      # 계산기 메타데이터 레지스트리 (단일 진실 공급원)
  useShareableState.ts # URL 쿼리 ↔ 입력 상태 연동 훅
tailwind.config.ts    # darkMode, 커스텀 animation
```

## 계산기 추가하는 법

1. `lib/calculators.ts`에 항목 추가 (`slug`, `title`, `description`, `emoji`)
2. `app/<slug>/page.tsx` 생성  
   - `CalculatorShell`, `NumberField`, `Result` 재사용  
   - URL 공유가 필요하면 `useShareableState` + `ShareButton` + `Suspense` (기존 `/discount`, `/split`, `/bmi` 참고)
3. 홈 목록과 Nav에는 레지스트리 기준으로 자동 반영됩니다.

## 구현 메모

### 다크모드

- Tailwind `class` 전략: `<html class="dark">`일 때 `dark:` 유틸 적용
- `layout.tsx` 인라인 스크립트로 첫 페인트 전 테마 적용 (FOUC 방지)
- 저장값 없으면 `system`, 토글 후에는 `light` / `dark`로 고정 저장

### URL 공유

- 편집은 로컬 state로 처리해 입력 렉을 줄임
- 공유 시에만 `buildShareUrl()`로 쿼리 생성
- `useSearchParams` 사용 페이지는 `Suspense` 경계 필요

### BMI

- 공식: `몸무게(kg) / (키(m))^2` — 키는 cm → m 변환 (`/ 100`)
- WHO 성인 분류: 저체중 < 18.5 / 정상 < 25 / 과체중 < 30 / 비만 ≥ 30
- 결과는 참고용이며 의학적 진단이 아님을 UI에 안내

## 배포

Vercel에 GitHub 저장소를 연결하면 `main` push 시 자동 배포됩니다.  
현재 프로덕션 주소: https://life-calc-coral.vercel.app
