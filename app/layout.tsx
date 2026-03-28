import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Multi TV",
  description: "Aynı anda birden fazla YouTube kanalını izleyin",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
