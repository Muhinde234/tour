import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EMMA TOUR AND TRAVEL AGENCY | Say Yes To New World",
  description:
    "EMMA TOUR AND TRAVEL AGENCY (ETTA) is your trusted partner in tourism and education consultancy, crafting unforgettable travel experiences and life-changing study abroad opportunities from Kigali, Rwanda and Nairobi, Kenya.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mulish.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
