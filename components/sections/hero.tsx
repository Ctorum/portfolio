"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/context/language-context"

export default function Hero() {
  const { t } = useLanguage()
  const [isLoaded, setIsLoaded] = useState(false)
  const [typedText, setTypedText] = useState("")
  const fullText = t.hero.title.split(" ")[0]
  const typingSpeed = 150
  const typingRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setIsLoaded(true)

    // Typing animation for the first name
    let i = 0
    typingRef.current = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1))
        i++
      } else {
        if (typingRef.current) clearInterval(typingRef.current)
      }
    }, typingSpeed)

    return () => {
      if (typingRef.current) clearInterval(typingRef.current)
    }
  }, [fullText])

  const skills = [
    "TypeScript",
    "JavaScript",
    "Python",
    "GO",
    "Rust",
    "React Native",
    "AWS",
    "GCP",
    "TensorFlow",
    "Next.js",
    "Tailwind",
    "Express",
    "FastAPI",
    "Terraform",
  ]

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.2),transparent_50%)]"></div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div
            className={`order-2 md:order-1 transition-all duration-1000 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="text-blue-500 inline-block">{typedText}</span>
              <span className="inline-block">{" " + t.hero.title.split(" ").slice(1).join(" ")}</span>
            </h1>
            <h2
              className={`text-2xl md:text-3xl font-medium text-zinc-400 mb-6 transition-all duration-700 delay-300 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {t.hero.subtitle}
            </h2>
            <p
              className={`text-zinc-300 mb-8 text-lg transition-all duration-700 delay-500 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {t.hero.description}
            </p>
            <div
              className={`flex flex-wrap gap-3 mb-8 transition-all duration-700 delay-700 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {skills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className={`bg-zinc-800/50 text-blue-400 border-blue-500/30 hover:bg-zinc-800 transition-all duration-500 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                  style={{ transitionDelay: `${700 + index * 50}ms` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
            <div
              className={`flex flex-wrap gap-4 transition-all duration-700 delay-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <Button className="bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-105">
                <Mail className="mr-2 h-4 w-4" /> {t.hero.contactButton}
              </Button>
              <Button
                variant="outline"
                className="border-blue-500/30 text-zinc-100 hover:bg-zinc-800 transition-transform hover:scale-105"
              >
                <Github className="mr-2 h-4 w-4" /> {t.hero.projectsButton}
              </Button>
            </div>
          </div>
          <div
            className={`order-1 md:order-2 flex justify-center transition-all duration-1000 ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-zinc-900 overflow-hidden border-2 border-blue-500 animate-[float_6s_ease-in-out_infinite]">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Quick%20Share%20Mar%2018%202025.jpg-QbuFgZJlK0bFSyepSzl1AiGXEIqMbd.jpeg"
                  alt="Vitor Rezende"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

