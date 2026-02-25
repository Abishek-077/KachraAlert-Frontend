import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Noto_Sans_Devanagari } from "next/font/google";
import Providers from "./providers";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-inter" });
const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-nepali"
});

export const metadata: Metadata = {
  title: "KacharaAlert",
  description: "Smart Waste Management",
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${manrope.className} ${manrope.variable} ${notoSansDevanagari.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
