import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeContext";

export const metadata: Metadata = {
  title: "Albireo | Next-Generation Trading Intelligence & Prop Firm Analytics",
  description: "Institutional-grade prop firm drawdown analytics, sentiment tracking, and risk management systems engineered for scaling traders.",
  keywords: ["prop firm simulator", "drawdown calculator", "COT report analyzer", "trade journal", "FTMO calculator", "trading tools"],
  openGraph: {
    title: "Albireo | Next-Generation Trading Intelligence",
    description: "Institutional-grade prop firm drawdown analytics, sentiment tracking, and risk management systems engineered for scaling traders.",
    type: "website",
    locale: "en_US",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-hero-bg text-foreground font-sora antialiased selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider>
          <Header />
          <main className="flex-1 w-full flex flex-col relative z-10 pt-20 md:pt-24">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
