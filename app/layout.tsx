import type React from "react"
import type { Metadata } from "next"
import { Familjen_Grotesk, Source_Serif_4, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const sans = Familjen_Grotesk({ subsets: ["latin"], variable: "--font-sans" })
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Vitor Rezende - Portfolio",
  description: "Software Engineer | FullStack & Mobile Developer",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
