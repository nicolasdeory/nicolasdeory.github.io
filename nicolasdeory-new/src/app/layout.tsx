import type { Metadata } from "next";
import "@fontsource/instrument-serif";
import { SiteNav } from "@/components/SiteNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nicolás de Ory",
  description: "Nicolás de Ory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full">
        <SiteNav />
        {/* Offset for fixed desktop sidebar (`w-44` in SiteNav) */}
        <div className="min-h-full md:pl-44">{children}</div>
      </body>
    </html>
  );
}
