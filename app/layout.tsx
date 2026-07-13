import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "생활 계산기 모음",
  description: "할인, 더치페이, 날짜, 단위 변환을 한곳에서.",
};

// React hydration 전에 테마를 적용해 깜빡임(FOUC)을 막습니다.
// localStorage에 light/dark가 있으면 그걸 쓰고, 없거나 system이면 OS 설정을 따릅니다.
const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored === 'dark' || (stored !== 'light' && preferDark);
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <ThemeProvider>
          <Nav />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
