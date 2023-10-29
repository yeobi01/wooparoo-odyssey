import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import SEO from "@/app/seo";

import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SEO />
      <body className="flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
