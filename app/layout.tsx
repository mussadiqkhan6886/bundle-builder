import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "@/lib/font";

export const metadata: Metadata = {
  title: "Take Home Bundle Builder",
  description: "A take home frontend test from ecom experts building bundle builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full ${poppins.className} antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
