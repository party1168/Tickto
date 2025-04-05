import type { Metadata } from "next";
import "./globals.css";
import MiniKitProvider from "../components/minikit-provider";
import ErudaInit from "@/components/eruda-init";
import WorldAppAuth from "../components/world-app-auth";

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
  return (
    <html lang="en">
      <body>
        <ErudaInit />
        <MiniKitProvider>
          <WorldAppAuth />
          {children}
        </MiniKitProvider>
      </body>
    </html>
  );
}
