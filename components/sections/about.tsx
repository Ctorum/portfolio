"use client"

import { useMemo } from "react"
import { Code, Server, Smartphone, Cloud, Brain } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAnimationOnScroll } from "@/hooks/use-animation-on-scroll"

interface AboutHighlights {
  fullstack: string
  backend: string
  mobile: string
  cloud: string
  ai: string
}

interface AboutTranslations {
  title: string
  summary: string
  highlights: AboutHighlights
  interests: string[]
}

interface AboutProps {
  translations: AboutTranslations
}

export default function About({ translations: t }: AboutProps) {
  const [sectionRef, isVisible] = useAnimationOnScroll<HTMLElement>()

  const highlights = useMemo(
    () => [
      {
        icon: <Code className="h-5 w-5 text-blue-500" />,
        title: "Full-Stack Developer",
        description: t.highlights.fullstack,
      },
      {
        icon: <Server className="h-5 w-5 text-blue-500" />,
        title: "Back-End Specialist",
        description: t.highlights.backend,
      },
      {
        icon: <Smartphone className="h-5 w-5 text-blue-500" />,
        title: "Mobile Expert",
        description: t.highlights.mobile,
      },
      {
        icon: <Cloud className="h-5 w-5 text-blue-500" />,
        title: "Cloud Architecture",
        description: t.highlights.cloud,
      },
      {
        icon: <Brain className="h-5 w-5 text-blue-500" />,
        title: "AI Enthusiast",
        description: t.highlights.ai,
      },
    ],
    [t.highlights],
  )

  return (
    <section
      ref={sectionRef}
      className={`py-16 bg-zinc-950/50 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="text-blue-500">&lt;</span> {t.title} <span className="text-blue-500">/&gt;</span>
        </h2>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className={`bg-zinc-900/50 rounded-lg p-6 border border-zinc-800 hover:border-blue-500/30 transition-all duration-500 transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {item.icon}
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                </div>
                <p className="text-zinc-300">{item.description}</p>
              </div>
            ))}
          </div>

          <div
            className={`bg-zinc-900/50 rounded-lg p-6 border border-zinc-800 text-center transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <p className="text-zinc-300 leading-relaxed mb-4 max-w-3xl mx-auto">{t.summary}</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {t.interests.map((interest, index) => (
                <Badge
                  key={index}
                  className={`bg-zinc-800 text-zinc-300 transition-all duration-500 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

