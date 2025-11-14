import cn from "classnames";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "highlight.js/styles/github-dark.css";

import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { RootProviders } from "@/context/RootProvider";
import { SITE_URL } from "@/constants/site";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Omnistrate Engineering Blog",
  description: "Engineering insights and technical articles from the Omnistrate team.",
  openGraph: {
    title: "Omnistrate Engineering Blog",
    description: "Engineering insights and technical articles from the Omnistrate team.",
    images: "/logos/omnistrate-logo-black-font.png"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
  },
  twitter: {
    site: "@omnistrate"
  },
  facebook: {
    appId: "omnistrate"
  }
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
          <main className="flex-1">
            <Suspense>{children}</Suspense>
          </main>
          <Footer />
        </RootProviders>
      </body>
    </html>
  );
}
