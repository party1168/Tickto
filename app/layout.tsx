import type { Metadata } from "next";
import "./globals.css";
import eruda from "eruda";
import { useEffect } from "react";
import MiniKitProvider from "../components/minikit-provider";

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
      eruda.init();
    }
  }, []);
  return (
    <html lang="en">
      <MiniKitProvider>
        <body>{children}</body>
      </MiniKitProvider>
    </html>
  );
}
