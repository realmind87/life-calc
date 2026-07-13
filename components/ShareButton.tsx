"use client";

import { useState } from "react";

// 현재 계산 상태가 담긴 링크를 주소창에 반영하고 클립보드에 복사합니다.
// getUrl은 useShareableState의 buildShareUrl을 넘기면 됩니다.
export default function ShareButton({ getUrl }: { getUrl: () => string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = getUrl();

    // 전체 페이지 이동 없이 주소창만 갱신 (뒤로가기 기록도 남기지 않음)
    window.history.replaceState(null, "", url);

    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // http 환경이나 권한 문제로 클립보드가 막힐 수 있어요.
      // 그래도 주소창에는 링크가 반영되어 있으니 복사됨으로 처리합니다.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleShare}
      className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg border py-2 text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
        copied
          ? "animate-copy-pop border-emerald-500 bg-emerald-500 text-white dark:border-emerald-400 dark:bg-emerald-400 dark:text-gray-900"
          : "border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
      }`}
    >
      {copied ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            className="h-4 w-4"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          링크가 복사됐어요
        </>
      ) : (
        "이 계산 링크 복사"
      )}
    </button>
  );
}
