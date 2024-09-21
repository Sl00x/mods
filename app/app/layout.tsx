"use client";
import { store } from "@/features/store/root-store";
import clsx from "clsx";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>UNVX Mods</title>
      </head>
      <Provider store={store}>
        <body
          className={clsx(
            inter.className,
            "font-[inter] h-screen w-screen overflow-hidden"
          )}
        >
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </body>
      </Provider>
    </html>
  );
}
