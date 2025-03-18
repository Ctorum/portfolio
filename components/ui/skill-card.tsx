import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface Skill {
  name: string
  icon: ReactNode
}

interface SkillCardProps {
  title: string
  skills: Skill[]
  icon: ReactNode
}

export default function SkillCard({ title, skills, icon }: SkillCardProps) {
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

