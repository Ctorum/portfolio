"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

interface LanguageSwitcherProps {
  currentLang: "en" | "pt"
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const targetLang = currentLang === "en" ? "pt" : "en"
  const targetLabel = currentLang === "en" ? "PT-BR" : "EN"

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        asChild
        className="bg-zinc-800/90 border-blue-500 text-white hover:bg-blue-600 hover:text-white flex items-center gap-2 shadow-md shadow-blue-500/20"
      >
        <Link href={`/${targetLang}`}>
          <Globe className="h-4 w-4" />
          {targetLabel}
        </Link>
      </Button>
    </div>
  )
}

