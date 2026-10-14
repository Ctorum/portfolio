import Portfolio from "@/components/portfolio"
import { en } from "@/translations/en"
import { pt } from "@/translations/pt"

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return lang === "pt" ? <Portfolio lang="pt" t={pt} /> : <Portfolio lang="en" t={en} />
}
