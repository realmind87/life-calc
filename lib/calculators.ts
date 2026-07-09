// 계산기 메타데이터를 한곳에서 관리합니다.
// 새 계산기를 추가할 때 여기에 항목만 추가하면
// 홈 화면 목록과 네비게이션에 자동으로 반영됩니다.

export type Calculator = {
  slug: string; // URL 경로 (/discount 등)
  title: string; // 화면에 보이는 이름
  description: string; // 짧은 설명
  emoji: string; // 목록에서 쓸 아이콘 (임시)
};

export const calculators: Calculator[] = [
  {
    slug: "discount",
    title: "할인 계산기",
    description: "원가와 할인율로 최종 가격을 계산해요. 이중 할인도 지원해요.",
    emoji: "🏷️",
  },
  {
    slug: "split",
    title: "더치페이 계산기",
    description: "총액을 인원수로 나눠 1인당 금액을 알려줘요.",
    emoji: "🧾",
  },
  {
    slug: "date",
    title: "날짜 계산기",
    description: "두 날짜 사이의 일수와 디데이를 계산해요.",
    emoji: "📅",
  },
  {
    slug: "unit",
    title: "단위 변환기",
    description: "길이·무게·온도 같은 기본 단위를 변환해요.",
    emoji: "📏",
  },
];

export function getCalculator(slug: string): Calculator | undefined {
  return calculators.find((c) => c.slug === slug);
}
