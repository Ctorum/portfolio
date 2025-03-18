import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vitor Rezende's Portfolio",
  description:
    "A modern and responsive website showcasing my work and expertise",
  keywords: ["portfolio", "professional", "web development", "projects"],
  authors: [{ name: "Vitor Rezende" }],
  openGraph: {
    title: "Vitor Rezende's Portfolio",
    description:
      "A modern and responsive website showcasing my work and expertise",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitor Rezende's Portfolio",
    description:
      "A modern and responsive website showcasing my work and expertise",
  },
  robots: {
    index: true,
    follow: true,
  },
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
