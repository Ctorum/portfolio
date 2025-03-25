"use client"

interface FooterTranslations {
  copyright: string
}

interface FooterProps {
  translations: FooterTranslations
}

export default function Footer({ translations: t }: FooterProps) {
  return (
    <footer className="py-6 border-t border-zinc-800">
      <div className="container mx-auto px-4 text-center text-zinc-500">
        <p className="animate-pulse">
          © {new Date().getFullYear()} Vitor Hugo Cabral Rezende. {t.copyright}
        </p>
      </div>
    </footer>
  )
}

