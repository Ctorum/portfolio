"use client"

import { useLanguage } from "@/context/language-context"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="py-6 border-t border-zinc-800">
      <div className="container mx-auto px-4 text-center text-zinc-500">
        <p className="animate-pulse">
          © {new Date().getFullYear()} Vitor Hugo Cabral Rezende. {t.footer.copyright}
        </p>
      </div>
    </footer>
  )
}

