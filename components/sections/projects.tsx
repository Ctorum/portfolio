"use client"

import ProjectCard from "@/components/ui/project-card"
import { useLanguage } from "@/context/language-context"
import { useAnimationOnScroll } from "@/hooks/use-animation-on-scroll"

export default function Projects() {
  const { t } = useLanguage()
  const [sectionRef, isVisible] = useAnimationOnScroll<HTMLElement>()

  const projects = [
    {
      title: t.projects.serverlessApi.title,
      description: t.projects.serverlessApi.description,
      tags: ["AWS", "Serverless", "TypeScript", "Node.js"],
      image: "/placeholder.svg?height=200&width=400",
      delay: 0,
    },
    {
      title: t.projects.mobileEcommerce.title,
      description: t.projects.mobileEcommerce.description,
      tags: ["React Native", "Expo", "JavaScript", "Firebase"],
      image: "/placeholder.svg?height=200&width=400",
      delay: 100,
    },
    {
      title: t.projects.aiRecommendation.title,
      description: t.projects.aiRecommendation.description,
      tags: ["Python", "TensorFlow", "AI", "GCP"],
      image: "/placeholder.svg?height=200&width=400",
      delay: 200,
    },
    {
      title: t.projects.realEstate.title,
      description: t.projects.realEstate.description,
      tags: ["Next.js", "Tailwind", "Node.js", "MongoDB"],
      image: "/placeholder.svg?height=200&width=400",
      delay: 300,
    },
    {
      title: t.projects.devOps.title,
      description: t.projects.devOps.description,
      tags: ["Terraform", "AWS", "CI/CD", "Python"],
      image: "/placeholder.svg?height=200&width=400",
      delay: 400,
    },
    {
      title: t.projects.microservices.title,
      description: t.projects.microservices.description,
      tags: ["Microservices", "Docker", "Kubernetes", "Node.js"],
      image: "/placeholder.svg?height=200&width=400",
      delay: 500,
    },
  ]

  return (
    <section
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="text-blue-500">&lt;</span> {t.projects.title} <span className="text-blue-500">/&gt;</span>
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

