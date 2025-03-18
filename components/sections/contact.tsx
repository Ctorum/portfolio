"use client"

import Link from "next/link"
import { Phone, Mail, Github, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"
import { useAnimationOnScroll } from "@/hooks/use-animation-on-scroll"

export default function Contact() {
  const { t } = useLanguage()
  const [sectionRef, isVisible] = useAnimationOnScroll<HTMLElement>()

  const contactItems = [
    {
      icon: <Phone className="h-5 w-5 text-blue-500" />,
      title: t.contact.phone,
      content: "+55 (11) 9 8608-0044",
      delay: 0,
    },
    {
      icon: <Mail className="h-5 w-5 text-blue-500" />,
      title: t.contact.email,
      content: "dev.rezendevitor@gmail.com",
      delay: 100,
    },
    {
      icon: <Github className="h-5 w-5 text-blue-500" />,
      title: t.contact.portfolio,
      content: (
        <Link
          href="https://ctorum.github.io/portfolio"
          target="_blank"
          className="text-zinc-100 flex items-center hover:text-blue-400 transition-colors"
        >
          ctorum.github.io/portfolio <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      ),
      delay: 200,
    },
    {
      icon: <MapPin className="h-5 w-5 text-blue-500" />,
      title: t.contact.location,
      content: "São Paulo, Brasil",
      delay: 300,
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
          <span className="text-blue-500">&lt;</span> {t.contact.title} <span className="text-blue-500">/&gt;</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            {contactItems.map((item, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
                style={{ transitionDelay: `${item.delay}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-zinc-400 text-sm">{item.title}</h3>
                  <div className="text-zinc-100">{item.content}</div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`bg-zinc-900/50 rounded-lg p-6 border border-zinc-800 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <h3 className="text-xl font-semibold mb-4">{t.contact.formTitle}</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-zinc-400 mb-1">
                  {t.contact.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-zinc-400 mb-1">
                  {t.contact.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-zinc-400 mb-1">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                ></textarea>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-105">
                {t.contact.sendButton}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

