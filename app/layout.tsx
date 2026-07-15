import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";

import "@/styles/globals.css";

import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur" dir="rtl">
      <body className={notoSansArabic.className}>

        <TopBar />

        <Header />

        <Navigation />

        <main>
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}