"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { Provider } from "react-redux";
import { store } from "@/features/store/root-store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={clsx(inter.className, "h-screen w-screen overflow-hidden")}>{children}</body>
      </Provider>
    </html>
  );
}
