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
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleShare}
      className="mt-4 w-full rounded-lg border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
    >
      {copied ? "링크가 복사됐어요" : "이 계산 링크 복사"}
    </button>
  );
}
