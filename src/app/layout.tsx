import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Your Online Store | ExpressIT BD",
  description:
    "Launch your eCommerce store with ExpressIT BD. Choose your store name, domain, location, category, currency, and contact email in minutes.",
  keywords: [
    "create store",
    "eCommerce store setup",
    "online shop builder",
    "ExpressIT BD",
    "free online store",
    "create eCommerce website",
    "store domain check",
    "online business",
    "custom domain shop",
  ],
  openGraph: {
    title: "Create Your Online Store | ExpressIT BD",
    description:
      "Launch your eCommerce store with ExpressIT BD. Choose your store name, domain, location, category, currency, and contact email in minutes.",
    type: "website",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
