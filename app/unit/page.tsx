"use client";

import { useState } from "react";
import CalculatorShell, {
  NumberField,
  Result,
} from "@/components/CalculatorShell";
import { getCalculator } from "@/lib/calculators";

const meta = getCalculator("unit")!;

// 각 카테고리의 단위 정의.
// 길이·무게는 "기준 단위 대비 배율"로 표현하고,
// 온도는 공식이 달라 따로 처리합니다.
const categories = {
  길이: {
    units: { m: 1, km: 1000, cm: 0.01, mm: 0.001, inch: 0.0254, ft: 0.3048 },
  },
  무게: {
    units: { g: 1, kg: 1000, mg: 0.001, lb: 453.592, oz: 28.3495 },
  },
} as const;

type CategoryKey = keyof typeof categories | "온도";

export default function UnitPage() {
  const [category, setCategory] = useState<CategoryKey>("길이");
  const [value, setValue] = useState("");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("km");

  const v = parseFloat(value) || 0;
  let result = "";

  if (category === "온도") {
    // 온도는 배율로 못 바꾸므로 개별 변환
    result = convertTemp(v, from, to).toLocaleString("ko-KR", {
      maximumFractionDigits: 2,
    });
  } else {
    const units = categories[category].units as Record<string, number>;
    const base = v * units[from]; // 기준 단위로 환산 후
    const out = base / units[to]; // 목표 단위로
    result = out.toLocaleString("ko-KR", { maximumFractionDigits: 4 });
  }

  const unitList =
    category === "온도"
      ? ["C", "F", "K"]
      : Object.keys(categories[category].units);

  // 카테고리를 바꾸면 단위 선택도 그 카테고리의 첫 두 개로 초기화
  function changeCategory(next: CategoryKey) {
    setCategory(next);
    const list =
      next === "온도" ? ["C", "F", "K"] : Object.keys(categories[next].units);
    setFrom(list[0]);
    setTo(list[1]);
  }

  return (
    <CalculatorShell title={meta.title} description={meta.description}>
      <div className="mb-4 flex gap-2">
        {(["길이", "무게", "온도"] as CategoryKey[]).map((c) => (
          <button
            key={c}
            onClick={() => changeCategory(c)}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              category === c
                ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <NumberField label="값" value={value} onChange={setValue} placeholder="1" />
        <div className="grid grid-cols-2 gap-3">
          <UnitSelect label="변환 전" value={from} onChange={setFrom} options={unitList} />
          <UnitSelect label="변환 후" value={to} onChange={setTo} options={unitList} />
        </div>
      </div>

      {value !== "" && (
        <Result label={`${value} ${from} =`} value={`${result} ${to}`} />
      )}
    </CalculatorShell>
  );
}

function UnitSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-gray-300 dark:focus:ring-gray-300"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

// 섭씨(C)를 거쳐 변환하는 방식으로 온도를 처리합니다.
function convertTemp(v: number, from: string, to: string): number {
  let c: number; // 일단 섭씨로
  if (from === "C") c = v;
  else if (from === "F") c = ((v - 32) * 5) / 9;
  else c = v - 273.15; // K

  if (to === "C") return c;
  if (to === "F") return (c * 9) / 5 + 32;
  return c + 273.15; // K
}
