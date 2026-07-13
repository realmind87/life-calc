import Link from "next/link";
import { calculators } from "@/lib/calculators";

// 홈 화면: 계산기 목록을 카드로 보여줍니다.
// calculators 레지스트리 하나만 바라보므로, 계산기를 추가하면
// 여기 카드도 자동으로 생깁니다.
export default function Home() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
        생활 계산기 모음
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        자주 쓰는 계산들을 한곳에 모았어요. 필요한 걸 골라 쓰세요.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {calculators.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
          >
            <div className="text-3xl">{c.emoji}</div>
            <div className="mt-3 font-semibold text-gray-900 group-hover:text-gray-700 dark:text-gray-100 dark:group-hover:text-gray-300">
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
