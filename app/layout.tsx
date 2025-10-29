import cn from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { RootProviders } from "@/context/RootProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omnistrate Engineering Blog",
  description: "Engineering insights and technical articles from the Omnistrate team."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "scroll-smooth antialiased min-h-screen flex flex-col dark:bg-slate-900 dark:text-slate-400"
        )}
      >
        <RootProviders>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </RootProviders>
      </body>
    </html>
  );
}
