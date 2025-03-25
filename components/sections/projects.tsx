"use client"

import { useMemo } from "react"
import ProjectCard from "@/components/ui/project-card"
import { useAnimationOnScroll } from "@/hooks/use-animation-on-scroll"

interface ProjectItem {
  title: string
  description: string
}

interface ProjectsTranslations {
  title: string
  serverlessApi: ProjectItem
  mobileEcommerce: ProjectItem
  aiRecommendation: ProjectItem
  realEstate: ProjectItem
  devOps: ProjectItem
  microservices: ProjectItem
}

interface ProjectsProps {
  translations: ProjectsTranslations
}

export default function Projects({ translations: t }: ProjectsProps) {
  const [sectionRef, isVisible] = useAnimationOnScroll<HTMLElement>()

  const projects = useMemo(
    () => [
      {
        title: t.serverlessApi.title,
        description: t.serverlessApi.description,
        tags: ["AWS", "Serverless", "TypeScript", "Node.js"],
        image: "/placeholder.svg?height=200&width=400",
        delay: 0,
      },
      {
        title: t.mobileEcommerce.title,
        description: t.mobileEcommerce.description,
        tags: ["React Native", "Expo", "JavaScript", "Firebase"],
        image: "/placeholder.svg?height=200&width=400",
        delay: 100,
      },
      {
        title: t.aiRecommendation.title,
        description: t.aiRecommendation.description,
        tags: ["Python", "TensorFlow", "AI", "GCP"],
        image: "/placeholder.svg?height=200&width=400",
        delay: 200,
      },
      {
        title: t.realEstate.title,
        description: t.realEstate.description,
        tags: ["Next.js", "Tailwind", "Node.js", "MongoDB"],
        image: "/placeholder.svg?height=200&width=400",
        delay: 300,
      },
      {
        title: t.devOps.title,
        description: t.devOps.description,
        tags: ["Terraform", "AWS", "CI/CD", "Python"],
        image: "/placeholder.svg?height=200&width=400",
        delay: 400,
      },
      {
        title: t.microservices.title,
        description: t.microservices.description,
        tags: ["Microservices", "Docker", "Kubernetes", "Node.js"],
        image: "/placeholder.svg?height=200&width=400",
        delay: 500,
      },
    ],
    [t.serverlessApi, t.mobileEcommerce, t.aiRecommendation, t.realEstate, t.devOps, t.microservices],
  )

  return (
    <section
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="text-blue-500">&lt;</span> {t.title} <span className="text-blue-500">/&gt;</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${project.delay}ms` }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

