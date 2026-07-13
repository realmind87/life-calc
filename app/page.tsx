import Link from "next/link";
import { calculators } from "@/lib/calculators";

// 홈 화면: 계산기 목록을 카드로 보여줍니다.
// calculators 레지스트리 하나만 바라보므로, 계산기를 추가하면
// 여기 카드도 자동으로 생깁니다.
export default function Home() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-8 sm:py-10">
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">
        생활 계산기 모음
      </h1>
      <p className="mt-2 text-sm text-gray-500 sm:text-base dark:text-gray-400">
        자주 쓰는 계산들을 한곳에 모았어요. 필요한 걸 골라 쓰세요.
      </p>

      <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
        {calculators.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md active:scale-[0.99] sm:p-5 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
          >
            <div className="text-2xl sm:text-3xl">{c.emoji}</div>
            <div className="mt-2 font-semibold text-gray-900 group-hover:text-gray-700 sm:mt-3 dark:text-gray-100 dark:group-hover:text-gray-300">
              {c.title}
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {c.description}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
