import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { AnimationProvider } from "@/providers/AnimationProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Atomity Challenge",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans`}>
        <AnimationProvider>
          <QueryProvider>{children}</QueryProvider>
        </AnimationProvider>
      </body>
    </html>
  );
}