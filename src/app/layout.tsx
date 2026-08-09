import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import AppLayoutShell from "@/components/layout/AppLayoutShell";

export const metadata: Metadata = {
  title: {
    default: "Albireo | Trading Intelligence Platform & SaaS OS",
    template: "%s | Albireo Platform",
  },
  description:
    "Trading Intelligence Platform, Monte Carlo Risk Engine, Prop Firm Analytics, Albireo Academy, and Operating System.",
  keywords: [
    "prop firm simulator",
    "drawdown calculator",
    "COT report analyzer",
    "trade journal",
    "FTMO calculator",
    "ECN trading terminal",
    "Monte Carlo stress test",
    "Albireo academy",
    "Albireo OS"
  ],
  authors: [{ name: "Kavin B Albireo", url: "https://t.me/+e5tkgGVt5mIxZjI1" }],
  creator: "Kavin B Albireo",
  publisher: "Albireo Systems",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Albireo | Trading Intelligence Platform & SaaS OS",
    description:
      "Trading Intelligence Platform, Monte Carlo Risk Engine, Prop Firm Analytics, and Albireo Academy.",
    siteName: "Albireo Platform",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Albireo | Trading Intelligence Platform",
    description:
      "Trading Intelligence Platform, Monte Carlo Risk Engine, Prop Firm Analytics, and Albireo Academy.",
    creator: "@KavinBAlbireo",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark" data-theme="dark">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-hero-bg text-foreground font-sora antialiased selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider>
          <AuthProvider>
            <AppLayoutShell>
              {children}
            </AppLayoutShell>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
