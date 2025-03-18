"use client"

import { useState, useEffect } from "react"
import { LanguageProvider } from "@/context/language-context"
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
import Image from "next/image"
import { MapPin, ChevronRight, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-zinc-950 text-zinc-100 relative overflow-hidden">
        <AnimatedBackground />
        <LanguageSwitcher />
        <ScrollToTop />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  )
}

function ExperienceCard({ company, position, period, location, responsibilities }) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
      <CardContent className="p-0">
        <div className="border-l-4 border-blue-500 p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
            <div>
              <h3 className="text-xl font-semibold">{position}</h3>
              <p className="text-blue-400">{company}</p>
              <div className="flex items-center text-zinc-400 text-sm mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {location}
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-zinc-800/50 text-zinc-300 border-zinc-700 flex items-center whitespace-nowrap"
            >
              <Calendar className="h-3 w-3 mr-1" />
              {period}
            </Badge>
          </div>
          <ul className="space-y-2">
            {responsibilities.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-zinc-300">
                <ChevronRight className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

function EducationCard({ institution, degree, period, location }) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
      <CardContent className="p-0">
        <div className="border-l-4 border-blue-500 p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
            <div>
              <h3 className="text-xl font-semibold">{degree}</h3>
              <p className="text-blue-400">{institution}</p>
              <div className="flex items-center text-zinc-400 text-sm mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {location}
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-zinc-800/50 text-zinc-300 border-zinc-700 flex items-center whitespace-nowrap"
            >
              <Calendar className="h-3 w-3 mr-1" />
              {period}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SkillCard({ title, skills, icon }) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 hover:border-blue-500/50 transition-colors group">
      <CardContent className="p-6">
        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <ul className="space-y-2">
          {skills.map((skill, index) => (
            <li key={index} className="flex items-center gap-2 text-zinc-300">
              <span className="text-blue-500">{skill.icon}</span>
              <span>{skill.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function ProjectCard({ title, description, tags, image }) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-blue-500/50 transition-colors group">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-zinc-400 mb-4 text-sm">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-zinc-800/50 text-zinc-300 border-zinc-700">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

