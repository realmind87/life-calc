# 생활 계산기 모음

자주 쓰는 계산기를 한곳에 모은 Next.js 웹 앱입니다.

## 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인하세요.

## 구조

- `app/` — 라우트. 계산기마다 폴더 하나 (`/discount`, `/split`, `/date`, `/unit`)
- `components/` — Nav, CalculatorShell 등 공통 UI
- `lib/calculators.ts` — 계산기 메타데이터 레지스트리 (단일 진실 공급원)

### 계산기 추가하는 법

1. `lib/calculators.ts`에 항목 추가
2. `app/<slug>/page.tsx` 생성
   → 홈 목록과 네비게이션에는 자동 반영됩니다.

## 배포

Vercel에 GitHub 저장소를 연결하면 자동 배포됩니다.
