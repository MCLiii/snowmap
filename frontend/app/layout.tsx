import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snowmap - Your Ultimate Ski Vacation Planner",
  description: "Discover the best ski resorts, book ski hotels, find rental options, and plan your perfect ski vacation all in one place with Snowmap.",
  keywords: "ski resorts, ski vacation, ski hotels, ski rentals, skiing, snowboarding, ski planning, snowmap",
  author: "Snowmap Team",
  robots: "index, follow",
  og: {
    title: "Snowmap - Your Ultimate Ski Vacation Planner",
    description: "Discover the best ski resorts, book ski hotels, find rental options, and plan your perfect ski vacation all in one place with Snowmap.",
    type: "website",
    url: "https://www.snowmap.com",
    image: "https://www.snowmap.com/og-image.jpg"
  },
  twitter: {
    card: "summary_large_image",
    site: "@Snowmap",
    title: "Snowmap - Your Ultimate Ski Vacation Planner",
    description: "Discover the best ski resorts, book ski hotels, find rental options, and plan your perfect ski vacation all in one place with Snowmap.",
    image: "https://www.snowmap.com/twitter-image.jpg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
