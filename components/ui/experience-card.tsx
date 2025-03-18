import { ChevronRight, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ExperienceCardProps {
  company: string
  position: string
  period: string
  location: string
  responsibilities: string[]
}

export default function ExperienceCard({ company, position, period, location, responsibilities }: ExperienceCardProps) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
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
              <li
                key={index}
                className="flex items-start gap-2 text-zinc-300 transition-all duration-300 hover:translate-x-1"
              >
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

