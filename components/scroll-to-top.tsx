"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        variant="outline"
        size="icon"
        onClick={scrollToTop}
        className={`rounded-full bg-blue-600 hover:bg-blue-700 border-none shadow-md shadow-blue-500/20 transition-all duration-300 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ArrowUp className="h-5 w-5 text-white" />
        <span className="sr-only">Scroll to top</span>
      </Button>
    </div>
  )
}

