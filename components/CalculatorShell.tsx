import { ReactNode } from "react";

// 각 계산기 페이지의 공통 껍데기(제목 + 설명 + 본문 카드).
// 계산기마다 반복되는 레이아웃을 여기로 모아 일관성을 유지합니다.
export default function CalculatorShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      <p className="mt-1 text-gray-500 dark:text-gray-400">{description}</p>
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {children}
      </div>
    </section>
  );
}

// 계산기 입력에서 반복적으로 쓰는 숫자 입력 필드.
export function NumberField({
  label,
  value,
  onChange,
  suffix,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </span>
      <div className="mt-1 flex items-center overflow-hidden rounded-lg border border-gray-300 transition-[border-color,box-shadow] duration-200 focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:focus-within:border-gray-300 dark:focus-within:ring-gray-300">
        <input
          type="number"
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3 py-2 outline-none dark:text-gray-100 dark:placeholder:text-gray-500"
        />
        {suffix && (
          <span className="select-none px-3 text-sm text-gray-400">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

// 결과를 강조해서 보여주는 박스.
// key={value}로 값이 바뀔 때마다 등장 애니메이션이 다시 재생됩니다.
export function Result({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div
      key={value}
      className="mt-6 animate-fade-slide-in rounded-xl bg-gray-900 px-5 py-4 text-white dark:bg-gray-100 dark:text-gray-900"
    >
      <div className="text-sm text-gray-300 dark:text-gray-500">{label}</div>
      <div className="mt-1 text-3xl font-bold tabular-nums">{value}</div>
    </div>
  );
}
