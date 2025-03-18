"use client"

import { useLanguage } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt" : "en")
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={toggleLanguage}
        className="border-blue-500/30 text-zinc-100 hover:bg-zinc-800 flex items-center gap-2"
      >
        <Globe className="h-4 w-4" />
        {language === "en" ? "PT-BR" : "EN"}
      </Button>
    </div>
  )
}

