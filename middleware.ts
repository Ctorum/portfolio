import { type NextRequest, NextResponse } from "next/server"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // If the user is already on a language route, don't redirect
  if (pathname.startsWith("/en") || pathname.startsWith("/pt")) {
    return NextResponse.next()
  }

  // Get the preferred language from the Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || ""
  const locale = acceptLanguage.includes("pt") ? "pt" : "en"

  // Create the new URL with the appropriate language prefix
  const newUrl = new URL(`/${locale}${pathname}`, request.url)

  return NextResponse.redirect(newUrl)
}

