"use client"

import { useEffect, useState } from "react"
import {
  Code,
  Layout,
  Server,
  Database,
  Brain,
  Smartphone,
  Layers,
  PenToolIcon as Tool,
  Cloud,
  Terminal,
  FileCode,
  Cpu,
  Globe,
  Workflow,
} from "lucide-react"
import { useLanguage } from "@/context/language-context"
import { Badge } from "@/components/ui/badge"
import { useAnimationOnScroll } from "@/hooks/use-animation-on-scroll"

export default function Skills() {
  const { t } = useLanguage()
  const [sectionRef, isVisible] = useAnimationOnScroll<HTMLElement>()
  const [animatedSkills, setAnimatedSkills] = useState<{ [key: string]: number }>({})

  // Featured skills with higher prominence
  const featuredSkills = [
    {
      name: "TypeScript",
      icon: <FileCode className="h-6 w-6" />,
      level: 95,
      color: "bg-blue-500",
    },
    {
      name: "Python",
      icon: <Terminal className="h-6 w-6" />,
      level: 90,
      color: "bg-yellow-500",
    },
    {
      name: "React Native",
      icon: <Smartphone className="h-6 w-6" />,
      level: 95,
      color: "bg-cyan-500",
    },
    {
      name: "Terraform",
      icon: <Workflow className="h-6 w-6" />,
      level: 85,
      color: "bg-purple-500",
    },
    {
      name: "PyTorch",
      icon: <Brain className="h-6 w-6" />,
      level: 80,
      color: "bg-orange-500",
    },
  ]

  // Animate skill bars when they become visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const animatedValues: { [key: string]: number } = {}

        featuredSkills.forEach((skill) => {
          animatedValues[skill.name] = skill.level
        })

        setAnimatedSkills(animatedValues)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setAnimatedSkills({})
    }
  }, [isVisible, featuredSkills])

  // Other skills organized by category
  const skillCategories = [
    {
      title: t.skills.categories.languages,
      skills: [
        { name: "JavaScript", icon: <Code className="h-4 w-4" /> },
        { name: "GO", icon: <FileCode className="h-4 w-4" /> },
        { name: "Rust", icon: <FileCode className="h-4 w-4" /> },
      ],
      icon: <Code className="h-6 w-6 text-blue-500" />,
    },
    {
      title: t.skills.categories.frontend,
      skills: [
        { name: "React.js", icon: <Layout className="h-4 w-4" /> },
        { name: "Expo", icon: <Smartphone className="h-4 w-4" /> },
        { name: "Next.js", icon: <Layout className="h-4 w-4" /> },
        { name: "Tailwind CSS", icon: <Layout className="h-4 w-4" /> },
      ],
      icon: <Layout className="h-6 w-6 text-blue-500" />,
    },
    {
      title: t.skills.categories.backend,
      skills: [
        { name: "Node.js", icon: <Server className="h-4 w-4" /> },
        { name: "Express", icon: <Server className="h-4 w-4" /> },
        { name: "FastAPI", icon: <Server className="h-4 w-4" /> },
        { name: "Ruby on Rails", icon: <Server className="h-4 w-4" /> },
      ],
      icon: <Server className="h-6 w-6 text-blue-500" />,
    },
    {
      title: t.skills.categories.cloud,
      skills: [
        { name: "AWS", icon: <Cloud className="h-4 w-4" /> },
        { name: "GCP", icon: <Cloud className="h-4 w-4" /> },
        { name: "Serverless", icon: <Cloud className="h-4 w-4" /> },
        { name: "LocalStack", icon: <Layers className="h-4 w-4" /> },
      ],
      icon: <Cloud className="h-6 w-6 text-blue-500" />,
    },
    {
      title: t.skills.categories.databases,
      skills: [
        { name: "SQL", icon: <Database className="h-4 w-4" /> },
        { name: "NoSQL", icon: <Database className="h-4 w-4" /> },
        { name: "Relational Databases", icon: <Database className="h-4 w-4" /> },
        { name: "Non-relational Databases", icon: <Database className="h-4 w-4" /> },
      ],
      icon: <Database className="h-6 w-6 text-blue-500" />,
    },
    {
      title: t.skills.categories.ai,
      skills: [
        { name: "TensorFlow", icon: <Brain className="h-4 w-4" /> },
        { name: "AI Models", icon: <Cpu className="h-4 w-4" /> },
        { name: "Intelligent Applications", icon: <Brain className="h-4 w-4" /> },
      ],
      icon: <Brain className="h-6 w-6 text-blue-500" />,
    },
    {
      title: t.skills.categories.mobile,
      skills: [
        { name: "iOS", icon: <Smartphone className="h-4 w-4" /> },
        { name: "Android", icon: <Smartphone className="h-4 w-4" /> },
        { name: "Cross-platform", icon: <Globe className="h-4 w-4" /> },
        { name: "Native Modules", icon: <Cpu className="h-4 w-4" /> },
      ],
      icon: <Smartphone className="h-6 w-6 text-blue-500" />,
    },
    {
      title: t.skills.categories.tools,
      skills: [
        { name: "Git", icon: <Tool className="h-4 w-4" /> },
        { name: "Linux (Arch)", icon: <Terminal className="h-4 w-4" /> },
        { name: "Version Control", icon: <Tool className="h-4 w-4" /> },
        { name: "CI/CD", icon: <Workflow className="h-4 w-4" /> },
      ],
      icon: <Tool className="h-6 w-6 text-blue-500" />,
    },
  ]

  return (
    <section
      ref={sectionRef}
      className={`py-20 bg-zinc-950/50 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="text-blue-500">&lt;</span> {t.skills.title} <span className="text-blue-500">/&gt;</span>
        </h2>

        {/* Featured Skills */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">{t.skills.featuredTitle}</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {featuredSkills.map((skill, index) => (
              <div
                key={skill.name}
                className={`flex flex-col items-center transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-20 h-20 rounded-full ${skill.color} bg-opacity-20 flex items-center justify-center mb-3 transition-all duration-500 ${
                    isVisible ? "scale-100" : "scale-0"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full ${skill.color} bg-opacity-30 flex items-center justify-center animate-pulse`}
                  >
                    <span className="text-white">{skill.icon}</span>
                  </div>
                </div>
                <h4 className="font-semibold text-lg mb-2">{skill.name}</h4>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${skill.color} transition-all duration-1500 ease-out`}
                    style={{ width: `${animatedSkills[skill.name] || 0}%` }}
                  ></div>
                </div>
                <span
                  className="mt-1 text-sm font-medium text-zinc-400"
                  style={{
                    counterReset: `count ${Math.round(animatedSkills[skill.name] || 0)}`,
                  }}
                >
                  <span className="[counter-increment:count_1] before:content-[counter(count)'%']"></span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Other Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 hover:border-blue-500/30 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${categoryIndex * 100 + 500}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="animate-pulse">{category.icon}</div>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skill.name}
                    variant="outline"
                    className={`bg-zinc-800/70 text-zinc-300 border-zinc-700 flex items-center gap-1.5 py-1.5 transition-all duration-500 ${
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
                    style={{ transitionDelay: `${categoryIndex * 100 + skillIndex * 50 + 700}ms` }}
                  >
                    <span className="text-blue-400">{skill.icon}</span>
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

