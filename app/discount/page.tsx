"use client";

import { Suspense } from "react";
import CalculatorShell, {
  NumberField,
  Result,
} from "@/components/CalculatorShell";
import ShareButton from "@/components/ShareButton";
import { useShareableState } from "@/lib/useShareableState";
import { getCalculator } from "@/lib/calculators";

const meta = getCalculator("discount")!;

function DiscountCalculator() {
  // useState 대신 URL 연동 훅을 사용합니다.
  // 기본값을 빈 문자열로 두고, URL에 값이 있으면 그걸로 채워집니다.
  const { values, setField, buildShareUrl } = useShareableState({
    price: "",
    rate1: "",
    rate2: "", // 추가(이중) 할인율 — 선택
  });

  const p = parseFloat(values.price) || 0;
  const r1 = parseFloat(values.rate1) || 0;
  const r2 = parseFloat(values.rate2) || 0;

  // 이중 할인은 곱셈으로 적용: 원가 × (1 - r1) × (1 - r2)
  const final = p * (1 - r1 / 100) * (1 - r2 / 100);
  const saved = p - final;

  const won = (n: number) =>
    n.toLocaleString("ko-KR", { maximumFractionDigits: 0 }) + "원";

  return (
    <CalculatorShell title={meta.title} description={meta.description}>
      <div className="space-y-4">
        <NumberField
          label="원가"
          value={values.price}
          onChange={(v) => setField("price", v)}
          suffix="원"
          placeholder="10000"
        />
        <NumberField
          label="할인율"
          value={values.rate1}
          onChange={(v) => setField("rate1", v)}
          suffix="%"
          placeholder="30"
        />
        <NumberField
          label="추가 할인율 (선택)"
          value={values.rate2}
          onChange={(v) => setField("rate2", v)}
          suffix="%"
          placeholder="10"
        />
      </div>

      {p > 0 && (
        <>
          <Result label="최종 가격" value={won(final)} />
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            {won(saved)} 아꼈어요 (원가의 {Math.round((saved / p) * 100)}%)
          </p>
          <ShareButton getUrl={buildShareUrl} />
        </>
      )}
    </CalculatorShell>
  );
}

export default function DiscountPage() {
  // useSearchParams는 정적 생성 시 Suspense 경계 안에 있어야 합니다.
  return (
    <Suspense>
      <DiscountCalculator />
    </Suspense>
  );
}
