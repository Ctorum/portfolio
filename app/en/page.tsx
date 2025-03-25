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
import { en } from "@/translations/en"

export default function EnglishPage() {
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
        <LanguageSwitcher currentLang="en" />
        <ScrollToTop />
        <Hero translations={en.hero} />
        <About translations={en.about} />
        <Experience
          translations={{
            title: en.experience.title,
            workTab: en.experience.workTab,
            educationTab: en.experience.educationTab,
            location: en.experience.location,
            companies: en.companies,
            education: en.education,
          }}
        />
        <Skills
          translations={{
            title: en.skills.title,
            featuredTitle: en.skills.featuredTitle,
            categories: en.skills.categories,
          }}
        />
        <Projects translations={en.projects} />
        <Contact translations={en.contact} />
        <Footer translations={en.footer} />
      </main>
    </>
  )
}

