import type { Metadata } from "next";
import { Noto_Nastaliq_Urdu } from "next/font/google";

import "@/styles/globals.css";

import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-urdu",
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
      <body className={`${notoNastaliqUrdu.variable} ${notoNastaliqUrdu.className}`}>

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
