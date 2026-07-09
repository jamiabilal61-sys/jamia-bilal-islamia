import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";

import "@/styles/globals.css";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "جامعہ بلال الاسلامیہ لاہور",
  description: "علم، عمل اور اخلاق کا عظیم گہوارہ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ur" dir="rtl">
      <body className={notoSansArabic.className}>
        {children}
      </body>
    </html>
  );
}