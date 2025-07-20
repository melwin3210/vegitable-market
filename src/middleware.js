import { NextResponse } from "next/server"

export function middleware(request) {
  const timestamp = new Date().toISOString()
  const method = request.method
  const path = request.nextUrl.pathname

  // Log to server console
  console.log(`[${timestamp}] ${method} ${path}`)

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}