"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { en } from "@/translations/en"
import { pt } from "@/translations/pt"

type Language = "en" | "pt"
type Translations = typeof en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const translations = language === "en" ? en : pt

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }

  return context
}

