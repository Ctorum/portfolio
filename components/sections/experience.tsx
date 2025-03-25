"use client"

import { useMemo } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExperienceCard from "@/components/ui/experience-card"
import EducationCard from "@/components/ui/education-card"
import { useAnimationOnScroll } from "@/hooks/use-animation-on-scroll"

interface ExperienceTranslations {
  title: string
  workTab: string
  educationTab: string
  location: string
  companies: any
  education: any
}

interface ExperienceProps {
  translations: ExperienceTranslations
}

export default function Experience({ translations: t }: ExperienceProps) {
  const [sectionRef, isVisible] = useAnimationOnScroll<HTMLElement>()

  const workExperience = useMemo(
    () => [
      { company: t.companies.mbras, delay: 0 },
      { company: t.companies.ibvi, delay: 100 },
      { company: t.companies.stMarche, delay: 200 },
      { company: t.companies.criative, delay: 300 },
      { company: t.companies.rzti, delay: 400 },
      { company: t.companies.guilu, delay: 500 },
    ],
    [t.companies],
  )

  const educationItems = useMemo(
    () => [
      {
        institution: t.education.unasp.institution,
        degree: t.education.unasp.degreeEngineering,
        period: t.education.unasp.periodEngineering,
        delay: 0,
      },
      {
        institution: t.education.unasp.institution,
        degree: t.education.unasp.degreeHighSchool,
        period: t.education.unasp.periodHighSchool,
        delay: 100,
      },
      {
        institution: t.education.rocketseat.institution,
        degree: t.education.rocketseat.degree,
        period: t.education.rocketseat.period,
        delay: 200,
      },
    ],
    [t.education],
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

        <Tabs defaultValue="experience" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-zinc-900/50">
            <TabsTrigger
              value="experience"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              {t.workTab}
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              {t.educationTab}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experience" className="space-y-6">
            {workExperience.map((item, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${item.delay}ms` }}
              >
                <ExperienceCard
                  company={item.company.name}
                  position={item.company.position}
                  period={item.company.period}
                  location={t.location}
                  responsibilities={item.company.responsibilities}
                />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            {educationItems.map((item, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${item.delay}ms` }}
              >
                <EducationCard
                  institution={item.institution}
                  degree={item.degree}
                  period={item.period}
                  location={t.location}
                />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

