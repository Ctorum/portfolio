"use client"

import { useState, useEffect } from "react"
import LanguageSwitcher from "@/components/language-switcher"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Experience from "@/components/sections/experience"
import Skills from "@/components/sections/skills"
import Projects from "@/components/sections/projects"
import Contact from "@/components/sections/contact"
import Footer from "@/components/sections/footer"
import AnimatedBackground from "@/components/animated-background"
import ScrollToTop from "@/components/scroll-to-top"
import { pt } from "@/translations/pt"

export default function PortuguesePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Force a resize event to ensure the background adjusts properly
    window.dispatchEvent(new Event("resize"))
  }, [])

  if (!mounted) return null

  return (
    <>
      <AnimatedBackground />
      <main className="relative text-zinc-100">
        <LanguageSwitcher currentLang="pt" />
        <ScrollToTop />
        <Hero translations={pt.hero} />
        <About translations={pt.about} />
        <Experience
          translations={{
            title: pt.experience.title,
            workTab: pt.experience.workTab,
            educationTab: pt.experience.educationTab,
            location: pt.experience.location,
            companies: pt.companies,
            education: pt.education,
          }}
        />
        <Skills
          translations={{
            title: pt.skills.title,
            featuredTitle: pt.skills.featuredTitle,
            categories: pt.skills.categories,
          }}
        />
        <Projects translations={pt.projects} />
        <Contact translations={pt.contact} />
        <Footer translations={pt.footer} />
      </main>
    </>
  )
}

