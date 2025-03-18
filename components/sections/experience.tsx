"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ExperienceCard from "@/components/ui/experience-card"
import EducationCard from "@/components/ui/education-card"
import { useLanguage } from "@/context/language-context"
import { useAnimationOnScroll } from "@/hooks/use-animation-on-scroll"

export default function Experience() {
  const { t } = useLanguage()
  const [sectionRef, isVisible] = useAnimationOnScroll<HTMLElement>()

  return (
    <section
      ref={sectionRef}
      className={`py-20 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="text-blue-500">&lt;</span> {t.experience.title} <span className="text-blue-500">/&gt;</span>
        </h2>

        <Tabs defaultValue="experience" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-zinc-900/50">
            <TabsTrigger
              value="experience"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              {t.experience.workTab}
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all duration-300"
            >
              {t.experience.educationTab}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experience" className="space-y-6">
            {[
              { company: t.companies.mbras, delay: 0 },
              { company: t.companies.ibvi, delay: 100 },
              { company: t.companies.stMarche, delay: 200 },
              { company: t.companies.criative, delay: 300 },
              { company: t.companies.rzti, delay: 400 },
              { company: t.companies.guilu, delay: 500 },
            ].map((item, index) => (
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
                  location={t.experience.location}
                  responsibilities={item.company.responsibilities}
                />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            {[
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
            ].map((item, index) => (
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
                  location={t.experience.location}
                />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

