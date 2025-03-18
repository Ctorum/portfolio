import { Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface EducationCardProps {
  institution: string
  degree: string
  period: string
  location: string
}

export default function EducationCard({ institution, degree, period, location }: EducationCardProps) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
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

