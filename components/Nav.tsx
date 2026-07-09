import Link from "next/link";
import { calculators } from "@/lib/calculators";

// 상단 네비게이션. calculators 레지스트리를 그대로 순회하므로
// 계산기를 추가하면 여기도 자동으로 늘어납니다.
export default function Nav() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-10">
      <nav className="mx-auto max-w-2xl px-4 py-3 flex items-center gap-4">
        <Link href="/" className="font-bold text-gray-900">
          생활 계산기
        </Link>
        <div className="flex gap-3 text-sm text-gray-600 overflow-x-auto">
          {calculators.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="whitespace-nowrap hover:text-gray-900 transition-colors"
            >
              {c.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
