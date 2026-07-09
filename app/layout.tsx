import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "생활 계산기 모음",
  description: "할인, 더치페이, 날짜, 단위 변환을 한곳에서.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
