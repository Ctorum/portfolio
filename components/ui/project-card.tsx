import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
}

export default function ProjectCard({ title, description, tags, image }: ProjectCardProps) {
  return (
    <Card className="bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/10">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
        <p className="text-zinc-400 mb-4 text-sm">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-zinc-800/50 text-zinc-300 border-zinc-700 transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-500/30"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

