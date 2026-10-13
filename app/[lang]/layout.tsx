import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Familjen_Grotesk, Source_Serif_4, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "../globals.css"

const sans = Familjen_Grotesk({ subsets: ["latin"], variable: "--font-sans" })
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" })
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

const locales = ["en", "pt"] as const
type Locale = (typeof locales)[number]

const meta: Record<Locale, { title: string; description: string }> = {
  en: { title: "Vitor Rezende - Portfolio", description: "Software Engineer | FullStack & Mobile Developer" },
  pt: {
    title: "Vitor Rezende - Portfólio",
    description: "Engenheiro de Software | Desenvolvedor FullStack & Mobile",
  },
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!(lang in meta)) return {}
  return { ...meta[lang as Locale], alternates: { languages: { en: "/en", "pt-BR": "/pt" } } }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!(lang in meta)) notFound()
  return (
    <html
      lang={lang === "pt" ? "pt-BR" : "en"}
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
    >
      <body className="min-h-screen" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
