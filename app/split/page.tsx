"use client";

import { Suspense } from "react";
import CalculatorShell, {
  NumberField,
  Result,
} from "@/components/CalculatorShell";
import ShareButton from "@/components/ShareButton";
import { useShareableState } from "@/lib/useShareableState";
import { getCalculator } from "@/lib/calculators";

const meta = getCalculator("split")!;

function SplitCalculator() {
  const { values, setField, buildShareUrl } = useShareableState({
    total: "",
    people: "",
  });

  const t = parseFloat(values.total) || 0;
  const n = parseInt(values.people) || 0;

  // 1인당 금액은 올림 처리해서 부족분이 생기지 않게 합니다.
  const perPerson = n > 0 ? Math.ceil(t / n) : 0;
  const collected = perPerson * n;
  const extra = collected - t;

  const won = (v: number) =>
    v.toLocaleString("ko-KR", { maximumFractionDigits: 0 }) + "원";

  return (
    <CalculatorShell title={meta.title} description={meta.description}>
      <div className="space-y-4">
        <NumberField
          label="총 금액"
          value={values.total}
          onChange={(v) => setField("total", v)}
          suffix="원"
          placeholder="48000"
        />
        <NumberField
          label="인원수"
          value={values.people}
          onChange={(v) => setField("people", v)}
          suffix="명"
          placeholder="4"
        />
      </div>

      {t > 0 && n > 0 && (
        <>
          <Result label="1인당 금액" value={won(perPerson)} />
          {extra > 0 && (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              올림으로 걷으면 총 {won(collected)}, {won(extra)}이 남아요.
            </p>
          )}
          <ShareButton getUrl={buildShareUrl} />
        </>
      )}
    </CalculatorShell>
  );
}

export default function SplitPage() {
  return (
    <Suspense>
      <SplitCalculator />
    </Suspense>
  );
}
