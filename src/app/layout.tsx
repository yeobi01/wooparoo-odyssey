import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import SEO from "@/app/seo";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SEO />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
