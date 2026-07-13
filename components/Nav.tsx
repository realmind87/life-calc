import Link from "next/link";
import { calculators } from "@/lib/calculators";
import ThemeToggle from "@/components/ThemeToggle";

// 상단 네비게이션. calculators 레지스트리를 그대로 순회하므로
// 계산기를 추가하면 여기도 자동으로 늘어납니다.
export default function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/80">
      <nav className="mx-auto flex max-w-2xl items-center gap-4 px-4 py-3">
        <Link
          href="/"
          className="shrink-0 font-bold text-gray-900 dark:text-gray-100"
        >
          생활 계산기
        </Link>
        <div className="flex gap-3 overflow-x-auto text-sm text-gray-600 dark:text-gray-400">
          {calculators.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="whitespace-nowrap transition-colors hover:text-gray-900 dark:hover:text-gray-100"
            >
              {c.title}
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}
