"use client";

import { useState } from "react";
import CalculatorShell, { Result } from "@/components/CalculatorShell";
import { getCalculator } from "@/lib/calculators";

const meta = getCalculator("date")!;

// 오늘 날짜를 YYYY-MM-DD 형식으로 (input[type=date] 기본값용)
function todayStr() {
  const d = new Date();
  const pad = (x: number) => String(x).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:focus:border-gray-300 dark:focus:ring-gray-300 [color-scheme:light] dark:[color-scheme:dark]"
      />
    </label>
  );
}

export default function DatePage() {
  const [start, setStart] = useState(todayStr());
  const [end, setEnd] = useState(todayStr());

  const startDate = new Date(start);
  const endDate = new Date(end);
  const valid = !isNaN(startDate.getTime()) && !isNaN(endDate.getTime());

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const diffDays = valid
    ? Math.round((endDate.getTime() - startDate.getTime()) / MS_PER_DAY)
    : 0;

  const label =
    diffDays === 0
      ? "같은 날이에요"
      : diffDays > 0
        ? `${diffDays.toLocaleString()}일 남았어요 (D-${diffDays})`
        : `${Math.abs(diffDays).toLocaleString()}일 지났어요 (D+${Math.abs(diffDays)})`;

  return (
    <CalculatorShell title={meta.title} description={meta.description}>
      <div className="space-y-4">
        <DateField label="시작 날짜" value={start} onChange={setStart} />
        <DateField label="목표/종료 날짜" value={end} onChange={setEnd} />
      </div>

      {valid && <Result label="두 날짜 사이" value={label} />}
    </CalculatorShell>
  );
}
