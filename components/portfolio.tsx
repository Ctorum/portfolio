import type React from "react"
import Image from "next/image"
import SiteHeader from "@/components/site-header"
import Terminal, { type TerminalData } from "@/components/terminal"
import type { en } from "@/translations/en"

type T = typeof en

const PHOTO =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Quick%20Share%20Mar%2018%202025.jpg-QbuFgZJlK0bFSyepSzl1AiGXEIqMbd.jpeg"
const EMAIL = "dev.rezendevitor@gmail.com"
const PHONE = { label: "+55 (11) 9 8608-0044", href: "tel:+5511986080044" }
const SITE = { label: "ctorum.github.io/portfolio", href: "https://ctorum.github.io/portfolio" }
const GITHUB = { label: "github.com/Ctorum", href: "https://github.com/Ctorum" }

// Tech names are language-neutral. `core` ones are set heavier.
const skills: { key: keyof T["skills"]["categories"]; items: string[]; core?: string[] }[] = [
  { key: "languages", items: ["Python", "TypeScript", "Go", "JavaScript"], core: ["Python", "TypeScript", "Go"] },
  { key: "frontend", items: ["Next.js", "React Native", "Expo", "React", "Tailwind CSS"], core: ["Next.js"] },
  {
    key: "backend",
    items: ["FastAPI", "Gin", "Fiber", "gRPC (Python/Go)", "Node.js", "Express", "Ruby on Rails"],
    core: ["FastAPI", "Gin", "Fiber", "gRPC (Python/Go)"],
  },
  { key: "cloud", items: ["AWS", "GCP", "Serverless", "Terraform", "LocalStack", "CI/CD"] },
  { key: "databases", items: ["SQL", "NoSQL"] },
  { key: "ai", items: ["TensorFlow", "PyTorch"], core: ["TensorFlow"] },
  { key: "tools", items: ["Git", "Linux (Arch)"] },
]

const projectTags = [
  ["Python", "FastAPI", "PostgreSQL", "Redis Streams", "Docker"],
  ["AWS", "Serverless", "TypeScript", "Node.js"],
  ["React Native", "Expo", "JavaScript", "Firebase"],
  ["Python", "TensorFlow", "GCP"],
  ["Next.js", "Tailwind", "Node.js", "MongoDB"],
  ["Terraform", "AWS", "CI/CD", "Python"],
  ["Docker", "Kubernetes", "Node.js"],
] as const

function Section({
  id,
  n,
  title,
  children,
  className = "",
}: {
  id: string
  n: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`border-t ${className}`}>
      <div className="mx-auto grid max-w-[76rem] gap-x-10 gap-y-8 px-5 md:grid-cols-12 md:px-10">
        <header className="md:col-span-3">
          <div className="md:sticky md:top-24">
            <p className="meta mb-2">{n}</p>
            <h2 className="text-2xl font-medium tracking-tight">{title}</h2>
          </div>
        </header>
        <div className="md:col-span-9">{children}</div>
      </div>
    </section>
  )
}

// Logos fetched from each company's own site. Others get an initial.
const logos: Record<string, string> = { riza: "/logos/riza.png", ibvi: "/logos/ibvi.png", mbras: "/logos/mbras.png" }

function Logo({ id, name }: { id: string; name: string }) {
  return (
    <span
      aria-hidden
      className="flex h-11 w-11 shrink-0 items-center justify-center border bg-[oklch(0.97_0.008_85)] p-1.5 font-medium text-[oklch(0.3_0.015_60)]"
    >
      {logos[id] ? (
        <Image src={logos[id]} alt="" width={64} height={64} className="h-full w-full object-contain" />
      ) : (
        name[0]
      )}
    </span>
  )
}

const period = (p: string) => p.replace(" - ", " – ")

export default function Portfolio({ lang, t }: { lang: "en" | "pt"; t: T }) {
  const jobs = Object.entries(t.companies).map(([key, c]) => ({ ...c, key }))
  const education = [
    { name: t.education.unasp.institution, degree: t.education.unasp.degreeEngineering, when: t.education.unasp.periodEngineering },
    { name: t.education.unasp.institution, degree: t.education.unasp.degreeHighSchool, when: t.education.unasp.periodHighSchool },
    { name: t.education.rocketseat.institution, degree: t.education.rocketseat.degree, when: t.education.rocketseat.period },
  ]
  const projects = [
    t.projects.fidcEvaluator,
    t.projects.serverlessApi,
    t.projects.mobileEcommerce,
    t.projects.aiRecommendation,
    t.projects.realEstate,
    t.projects.devOps,
    t.projects.microservices,
  ]
  const short = (p: string) => {
    const y = p.match(/\d{4}/g) ?? []
    const end = /Present|Presente/.test(p) ? (lang === "pt" ? "agora" : "now") : y[1]
    return `${y[0]}-${end}`
  }
  const terminal: TerminalData = {
    lang,
    name: "Vitor Hugo Cabral Rezende",
    location: t.experience.location,
    core: skills.flatMap((g) => g.core ?? []),
    skills: skills.map((g) => ({ label: t.skills.categories[g.key], items: g.items })),
    jobs: jobs.map((j) => ({ when: short(j.period), name: j.name, position: j.position })),
    projects: projects.map((p) => p.title),
    learning: t.terminal.learning,
    email: EMAIL,
    github: GITHUB.label,
    s: t.terminal,
  }
  const nav = [
    { href: "#about", label: t.about.title },
    { href: "#experience", label: t.experience.title },
    { href: "#skills", label: t.skills.title },
    { href: "#projects", label: t.projects.title },
    { href: "#contact", label: t.contact.title },
  ]

  return (
    <>
      <SiteHeader lang={lang} nav={nav} />
      <main>
        {/* Hero */}
        <section className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-[76rem] flex-col justify-end px-5 pb-14 pt-24 md:px-10 md:pb-20">
          <h1
            className="rise text-balance font-medium leading-[0.92] tracking-[-0.035em]"
            style={{ fontSize: "clamp(3.25rem, 10.5vw, 9.5rem)" }}
          >
            Vitor Rezende
          </h1>
          <div className="mt-12 grid gap-x-10 gap-y-8 md:mt-16 md:grid-cols-12">
            <div className="rise md:col-span-3" style={{ "--d": "150ms" } as React.CSSProperties}>
              <Image
                src={PHOTO}
                alt="Vitor Rezende"
                width={600}
                height={750}
                priority
                className="aspect-[4/5] w-full max-w-[16rem] object-cover md:max-w-none"
              />
              <p className="meta mt-3">{t.experience.location}</p>
            </div>
            <div className="md:col-span-7">
              <p
                className="rise text-2xl font-medium leading-snug tracking-tight md:text-3xl"
                style={{ "--d": "250ms" } as React.CSSProperties}
              >
                {t.hero.subtitle.replace(" | ", ", ")}
              </p>
              <div className="rise mt-6" style={{ "--d": "350ms" } as React.CSSProperties}>
                <Terminal d={terminal} />
              </div>
              <p
                className="rise mt-6 flex flex-wrap gap-x-8 gap-y-2 font-medium"
                style={{ "--d": "450ms" } as React.CSSProperties}
              >
                <a href="#contact" className="text-accent underline decoration-1 underline-offset-4 hover:decoration-2">
                  {t.hero.contactButton} →
                </a>
                <a href="#projects" className="ulink">
                  {t.hero.projectsButton}
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* About */}
        <Section id="about" n="01" title={t.about.title} className="py-[clamp(4rem,9vw,8rem)]">
          <div className="grid gap-x-10 gap-y-6 font-serif text-lg lg:grid-cols-2">
            <p className="lg:col-span-2 text-2xl leading-snug md:text-[1.75rem]">{t.about.paragraph1}</p>
            <p className="text-mute">{t.about.paragraph2}</p>
            <p className="text-mute">{t.about.paragraph3}</p>
          </div>
          <dl className="mt-14 divide-y border-y">
            {Object.entries(t.about.highlights).map(([k, v]) => (
              <div key={k} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="meta uppercase">{k === "fullstack" ? "Full-stack" : k === "ai" ? "AI" : k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="meta mt-6">{t.about.interests.join("  ·  ")}</p>
        </Section>

        {/* Experience */}
        <Section id="experience" n="02" title={t.experience.title} className="py-[clamp(3.5rem,7vw,6rem)]">
          <ol className="divide-y border-b">
            {jobs.map((j) => (
              <li key={j.name + j.period} className="grid gap-x-8 gap-y-3 py-7 sm:grid-cols-[14rem_1fr]">
                <p className="meta pt-1">{period(j.period)}</p>
                <div>
                  <div className="flex items-center gap-4">
                    <Logo id={j.key} name={j.name} />
                    <h3 className="text-xl font-medium tracking-tight">
                      {j.name} <span className="font-normal text-mute">/ {j.position}</span>
                    </h3>
                  </div>
                  <ul className="mt-4 max-w-[65ch] space-y-1.5 text-mute">
                    {j.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <h3 className="meta mt-14 uppercase">{t.experience.educationTab}</h3>
          <ol className="mt-3 divide-y border-y">
            {education.map((e) => (
              <li key={e.degree} className="grid gap-x-8 gap-y-1 py-5 sm:grid-cols-[14rem_1fr]">
                <p className="meta pt-1">{period(e.when)}</p>
                <p>
                  <span className="font-medium">{e.degree}</span>
                  <span className="text-mute"> / {e.name}</span>
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Skills */}
        <Section id="skills" n="03" title={t.skills.title} className="py-[clamp(3.5rem,7vw,6rem)]">
          <dl className="divide-y border-y">
            {skills.map((g) => (
              <div key={g.key} className="grid gap-1 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <dt className="meta pt-1 uppercase">{t.skills.categories[g.key]}</dt>
                <dd className="text-xl leading-snug tracking-tight">
                  {g.items.map((s, i) => (
                    <span key={s}>
                      <span className={g.core?.includes(s) ? "font-semibold" : "text-mute"}>{s}</span>
                      {i < g.items.length - 1 && <span className="text-mute">, </span>}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* Projects */}
        <Section id="projects" n="04" title={t.projects.title} className="py-[clamp(3.5rem,7vw,6rem)]">
          <ol className="divide-y border-y">
            {projects.map((p, i) => (
              <li key={p.title} className="group grid gap-x-8 gap-y-2 py-8 sm:grid-cols-[3rem_1fr]">
                <span className="meta pt-2 transition-colors group-hover:text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-2xl font-medium tracking-tight md:text-3xl">{p.title}</h3>
                  <p className="mt-2 max-w-[60ch] text-mute">{p.description}</p>
                  <p className="meta mt-3">{projectTags[i].join(", ")}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* Contact */}
        <Section id="contact" n="05" title={t.contact.title} className="py-[clamp(4rem,9vw,8rem)]">
          <a
            href={`mailto:${EMAIL}`}
            className="block break-words font-medium leading-tight tracking-[-0.03em] text-accent underline decoration-1 underline-offset-[0.12em] hover:decoration-2"
            style={{ fontSize: "clamp(1.75rem, 5.2vw, 4.25rem)" }}
          >
            {EMAIL}
          </a>
          <dl className="mt-14 grid gap-x-8 gap-y-5 text-lg sm:grid-cols-2">
            <div>
              <dt className="meta uppercase">{t.contact.phone}</dt>
              <dd>
                <a href={PHONE.href} className="ulink">
                  {PHONE.label}
                </a>
              </dd>
            </div>
            <div>
              <dt className="meta uppercase">{t.contact.location}</dt>
              <dd>{t.experience.location}</dd>
            </div>
            <div>
              <dt className="meta uppercase">GitHub</dt>
              <dd>
                <a href={GITHUB.href} className="ulink" rel="noopener">
                  {GITHUB.label}
                </a>
              </dd>
            </div>
            <div>
              <dt className="meta uppercase">{t.contact.portfolio}</dt>
              <dd>
                <a href={SITE.href} className="ulink" rel="noopener">
                  {SITE.label}
                </a>
              </dd>
            </div>
          </dl>
        </Section>
      </main>

      <footer className="border-t">
        <p className="meta mx-auto max-w-[76rem] px-5 py-6 md:px-10">
          © {new Date().getFullYear()} Vitor Hugo Cabral Rezende. {t.footer.copyright}
        </p>
      </footer>
    </>
  )
}
