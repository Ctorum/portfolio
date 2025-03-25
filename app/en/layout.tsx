import type React from "react"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vitor Rezende - Portfolio",
  description: "Software Engineer | FullStack & Mobile Developer",
}

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen`}>{children}</body>
    </html>
  )
}

