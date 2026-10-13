"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

interface SiteHeaderProps {
  lang: "en" | "pt"
  nav: { href: string; label: string }[]
}

export default function SiteHeader({ lang, nav }: SiteHeaderProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const other = lang === "en" ? "pt" : "en"

  // Root layout is shared by both locales, so set the document language here.
  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en"
  }, [lang])

  return (
    <header className="sticky top-0 z-40 border-b bg-paper">
      <div className="mx-auto flex h-14 max-w-[76rem] items-center justify-between px-5 md:px-10">
        <Link href={`/${lang}`} className="font-medium tracking-tight">
          Vitor Rezende
        </Link>
        <nav aria-label="Sections" className="hidden gap-7 text-[0.9375rem] md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-mute transition-colors hover:text-ink">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4 text-[0.9375rem]">
          <Link
            href={`/${other}`}
            hrefLang={other}
            lang={other}
            className="meta uppercase transition-colors hover:text-ink"
            aria-label={other === "pt" ? "Português" : "English"}
          >
            {other}
          </Link>
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label={lang === "pt" ? "Alternar tema" : "Toggle theme"}
            className="text-mute transition-colors hover:text-ink"
          >
            <Sun className="hidden h-[1.1rem] w-[1.1rem] dark:block" />
            <Moon className="h-[1.1rem] w-[1.1rem] dark:hidden" />
          </button>
        </div>
      </div>
    </header>
  )
}
