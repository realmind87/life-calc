"use client";

import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

// 계산기 상태를 URL 검색 파라미터와 연동하는 훅.
//
// 동작:
//  1) 첫 렌더에서 URL(?price=...&rate1=...)을 읽어 초기값으로 사용
//  2) 입력은 평소처럼 로컬 state로 관리 (타이핑이 매끄럽도록)
//  3) buildShareUrl()로 현재 값이 담긴 공유용 URL을 생성
//
// 매 키 입력마다 router.replace로 URL을 바꾸는 방식도 가능하지만,
// 그러면 입력할 때마다 네비게이션이 일어나 렉이 생기고 커서가 튈 수 있어요.
// 그래서 "편집은 로컬 state, 공유할 때만 URL 생성" 방식을 택했습니다.
export function useShareableState<T extends Record<string, string>>(
  defaults: T,
) {
  const searchParams = useSearchParams();

  // 초기값을 URL에서 한 번만 읽어옵니다. (게으른 초기화)
  const [values, setValues] = useState<T>(() => {
    const init = { ...defaults };
    (Object.keys(defaults) as (keyof T)[]).forEach((key) => {
      const fromUrl = searchParams.get(key as string);
      if (fromUrl !== null) init[key] = fromUrl as T[keyof T];
    });
    return init;
  });

  const setField = useCallback((key: keyof T, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  // 현재 값들을 쿼리스트링으로 담은 절대 URL을 만듭니다.
  const buildShareUrl = useCallback(() => {
    const params = new URLSearchParams();
    Object.entries(values).forEach(([k, v]) => {
      if (v !== "") params.set(k, v as string);
    });
    const qs = params.toString();
    return `${window.location.origin}${window.location.pathname}${qs ? "?" + qs : ""}`;
  }, [values]);

  return { values, setField, buildShareUrl };
}
