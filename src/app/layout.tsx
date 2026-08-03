import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeContext";

export const metadata: Metadata = {
  title: "Albireo | Prop Firm Drawdown Simulator & Trade Journal",
  description: "Built by a software engineer obsessed with market mechanics. Albireo provides retail & prop traders with institutional tools, drawdown simulation, and CFTC sentiment visualization.",
  keywords: ["prop firm simulator", "drawdown calculator", "COT report analyzer", "trade journal", "FTMO calculator", "trading tools"],
  openGraph: {
    title: "Albireo | Prop Firm Drawdown Simulator & Trade Journal",
    description: "Built by a software engineer obsessed with market mechanics. Albireo provides retail & prop traders with institutional tools, drawdown simulation, and CFTC sentiment visualization.",
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
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-albireo-blue text-text-primary antialiased">
        <ThemeProvider>
          <Header />
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
