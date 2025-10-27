import cn from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";

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
        className={cn(inter.className, "antialiased min-h-screen flex flex-col dark:bg-slate-900 dark:text-slate-400")}
      >
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
