import type React from "react"
import { Inter } from "next/font/google"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vitor Rezende - Portfólio",
  description: "Engenheiro de Software | Desenvolvedor FullStack & Mobile",
}

export default function PortugueseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen`}>{children}</body>
    </html>
  )
}

