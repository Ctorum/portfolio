import { redirect } from "next/navigation"

export default function Home() {
  // This is a fallback in case the middleware doesn't redirect
  redirect("/en")
  return null
}

