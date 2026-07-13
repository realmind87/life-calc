import Link from "next/link";
import { calculators } from "@/lib/calculators";
import ThemeToggle from "@/components/ThemeToggle";

// 상단 네비게이션.
// 모바일에서 링크가 로고와 한 줄에 몰리지 않도록
// 1줄: 브랜드 + 테마 토글 / 2줄: 가로 스크롤 칩 링크 로 나눕니다.
export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto max-w-2xl px-4 pt-3">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="shrink-0 text-base font-bold text-gray-900 sm:text-lg dark:text-gray-100"
          >
            생활 계산기
          </Link>
          <ThemeToggle />
        </div>

        <div className="-mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {calculators.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            >
              {c.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
