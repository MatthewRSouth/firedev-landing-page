import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-noto-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FireDev — Fast Websites for Growing Businesses",
  description:
    "We build fast, professional websites for businesses worldwide, with deep expertise serving clients in Japan. Book a free discovery call today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmSans.variable} ${notoSansJP.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
