import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Love Advice AI",
  description: "Get relationship advice from our AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
