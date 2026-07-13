"use client";

import { Suspense } from "react";
import CalculatorShell, {
  NumberField,
  Result,
} from "@/components/CalculatorShell";
import ShareButton from "@/components/ShareButton";
import { useShareableState } from "@/lib/useShareableState";
import { getCalculator } from "@/lib/calculators";

const meta = getCalculator("bmi")!;

// WHO 성인 BMI 분류 기준 (kg/m²)
//  - 저체중: < 18.5
//  - 정상:   18.5 ~ 24.9
//  - 과체중: 25.0 ~ 29.9
//  - 비만:   ≥ 30.0
function classifyBmi(bmi: number): string {
  if (bmi < 18.5) return "저체중";
  if (bmi < 25) return "정상";
  if (bmi < 30) return "과체중";
  return "비만";
}

function BmiCalculator() {
  const { values, setField, buildShareUrl } = useShareableState({
    height: "",
    weight: "",
  });

  const heightCm = parseFloat(values.height) || 0;
  const weightKg = parseFloat(values.weight) || 0;

  // cm → m 변환 후 BMI = 몸무게(kg) / 키(m)²
  const heightM = heightCm / 100;
  const bmi =
    heightM > 0 && weightKg > 0 ? weightKg / (heightM * heightM) : 0;
  const bmiRounded = Math.round(bmi * 10) / 10; // 소수 첫째자리
  const category = classifyBmi(bmiRounded);

  return (
    <CalculatorShell title={meta.title} description={meta.description}>
      <div className="space-y-4">
        <NumberField
          label="키"
          value={values.height}
          onChange={(v) => setField("height", v)}
          suffix="cm"
          placeholder="170"
        />
        <NumberField
          label="몸무게"
          value={values.weight}
          onChange={(v) => setField("weight", v)}
          suffix="kg"
          placeholder="65"
        />
      </div>

      {heightCm > 0 && weightKg > 0 && (
        <>
          <Result
            label="BMI"
            value={`${bmiRounded.toFixed(1)} (${category})`}
          />
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            BMI는 참고용 지표일 뿐 의학적 진단이 아닙니다. 건강 상태가
            궁금하면 전문의와 상담하세요.
          </p>
          <ShareButton getUrl={buildShareUrl} />
        </>
      )}
    </CalculatorShell>
  );
}

export default function BmiPage() {
  // useSearchParams는 정적 생성 시 Suspense 경계 안에 있어야 합니다.
  return (
    <Suspense>
      <BmiCalculator />
    </Suspense>
  );
}
