"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"

type Line = { k: "cmd" | "out"; text: string; href?: string }

export interface TerminalData {
  lang: "en" | "pt"
  name: string
  location: string
  core: string[]
  skills: { label: string; items: string[] }[]
  jobs: { when: string; name: string; position: string }[]
  projects: string[]
  learning: string[]
  email: string
  github: string
  s: {
    inputLabel: string
    helpTitle: string
    notFound: string
    tryHelp: string
    hint: string
    skip: string
    projectsCount: string
    help: Record<string, string>
  }
}

const SCRIPT = ["whoami", "skills --core", "experience --latest", "projects --count", "learning"]
const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ")
const out = (...a: (string | [string, string])[]): Line[] =>
  a.map((x) => (typeof x === "string" ? { k: "out", text: x } : { k: "out", text: x[0], href: x[1] }))
const cmd = (text: string): Line => ({ k: "cmd", text })

export default function Terminal({ d }: { d: TerminalData }) {
  const router = useRouter()
  const { s } = d
  const other = d.lang === "en" ? "pt" : "en"

  const reg = useMemo<Record<string, Line[]>>(() => {
    const jobs = d.jobs.map((j) => `${j.when.padEnd(10)} ${j.name} / ${j.position}`)
    return {
      whoami: out(d.name, d.location),
      "skills --core": out(d.core.join("  ")),
      skills: out(...d.skills.map((g) => `${g.label.padEnd(18)} ${g.items.join(", ")}`)),
      "experience --latest": out(...jobs.slice(0, 2)),
      experience: out(...jobs),
      "projects --count": out(`${d.projects.length} ${s.projectsCount}`),
      projects: out(...d.projects.map((p, i) => `${String(i + 1).padStart(2, "0")} ${p}`)),
      learning: out(...d.learning),
      contact: out([d.email, `mailto:${d.email}`], [d.github, `https://${d.github}`]),
      help: out(s.helpTitle, ...Object.entries(s.help).map(([k, v]) => `  ${k.padEnd(11)} ${v}`)),
    }
  }, [d, s])

  const finalLines = useMemo(() => SCRIPT.flatMap((c) => [cmd(c), ...reg[c]]), [reg])
  const names = useMemo(() => [...Object.keys(reg).filter((k) => !k.includes("--")), "lang", "clear"], [reg])

  // Server renders the finished transcript; on mount it replays unless motion is reduced.
  const [lines, setLines] = useState<Line[]>(finalLines)
  const [typing, setTyping] = useState<string | null>(null)
  const [done, setDone] = useState(true)
  const skip = useRef(false)
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const history = useRef<string[]>([])
  const hIdx = useRef(0)
  const [value, setValue] = useState("")

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let dead = false
    skip.current = false
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, skip.current ? 0 : ms))
    setLines([])
    setTyping("")
    setDone(false)
    ;(async () => {
      for (const c of SCRIPT) {
        for (let i = 1; i <= c.length && !skip.current; i++) {
          setTyping(c.slice(0, i))
          await sleep(35)
          if (dead) return
        }
        if (skip.current) break
        await sleep(450)
        setLines((l) => [...l, cmd(c), ...reg[c]])
        setTyping("")
        await sleep(1400)
        if (dead) return
      }
      if (dead) return
      setLines(finalLines)
      setTyping(null)
      setDone(true)
    })()
    return () => {
      dead = true
    }
  }, [reg, finalLines])

  // Only a deliberate gesture skips: Escape, or a click inside the terminal.
  useEffect(() => {
    if (done) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && (skip.current = true)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [done])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight })
  }, [lines, typing, done])

  function exec(raw: string) {
    const c = norm(raw)
    if (!c) return
    history.current.push(raw.trim())
    hIdx.current = history.current.length
    if (c === "clear") return setLines([])
    if (c === "lang") {
      setLines((l) => [...l, cmd(raw.trim())])
      return router.push(`/${other}`)
    }
    const res = reg[c] ?? out(`${s.notFound} ${c}. ${s.tryHelp}`)
    setLines((l) => [...l, cmd(raw.trim()), ...res])
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab") {
      e.preventDefault()
      const m = names.filter((n) => value && n.startsWith(value.toLowerCase()))
      if (m.length === 1) setValue(m[0])
    } else if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault()
      const h = history.current
      hIdx.current = Math.max(0, Math.min(h.length, hIdx.current + (e.key === "ArrowUp" ? -1 : 1)))
      setValue(h[hIdx.current] ?? "")
    }
  }

  const prompt = <span className="select-none text-accent">$ </span>

  return (
    <div>
      <div
        className="border bg-well"
        onClickCapture={() => !done && (skip.current = true)}
        onClick={() => done && !window.getSelection()?.toString() && inputRef.current?.focus()}
      >
        {!done && (
          <div className="sr-only">
            {finalLines.map((l, i) => (
              <p key={i}>{l.text}</p>
            ))}
          </div>
        )}
        <div
          ref={logRef}
          role={done ? "log" : undefined}
          aria-hidden={!done}
          className="h-[21rem] overflow-y-auto p-4 font-mono text-[0.8125rem] leading-relaxed md:p-5 md:text-sm"
        >
          {lines.map((l, i) =>
            l.k === "cmd" ? (
              <div key={i} className="mt-2 first:mt-0 break-words">
                {prompt}
                {l.text}
              </div>
            ) : (
              <div key={i} className="whitespace-pre-wrap break-words text-mute">
                {l.href ? (
                  <a href={l.href} className="ulink text-ink" rel="noopener">
                    {l.text}
                  </a>
                ) : (
                  l.text
                )}
              </div>
            ),
          )}
          {typing !== null && (
            <div className="mt-2 first:mt-0">
              {prompt}
              {typing}
              <span className="term-cursor inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-accent" />
            </div>
          )}
          {done && (
            <form
              className="mt-2 flex"
              onSubmit={(e) => {
                e.preventDefault()
                exec(value)
                setValue("")
              }}
            >
              <label htmlFor="term-input" className="sr-only">
                {s.inputLabel}
              </label>
              {prompt}
              <input
                id="term-input"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent pl-1 text-ink caret-accent outline-none"
              />
            </form>
          )}
        </div>
      </div>
      <p className="meta mt-3">
        {done ? (
          <>
            {s.hint}{" "}
            <button type="button" onClick={() => exec("help")} className="ulink text-ink">
              help
            </button>
          </>
        ) : (
          s.skip
        )}
      </p>
    </div>
  )
}
