import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
    // 1. Update session (refresh tokens if needed)
    const { supabase, response, user } = await updateSession(request)

    // 2. Define protected routes
    const path = request.nextUrl.pathname
    const isProtected = path.startsWith('/admin') || path.startsWith('/dashboard') || path.startsWith('/perfil')
    const isAuthRoute = path.startsWith('/login') || path.startsWith('/signup') || path.startsWith('/auth')

    // 3. Auth Logic
    if (isProtected && !user) {
        // Redirect to login if accessing protected route without user
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/login'
        redirectUrl.searchParams.set('next', path)
        return NextResponse.redirect(redirectUrl)
    }

    if (isAuthRoute && user) {
        // Redirect to dashboard if accessing auth routes while logged in
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/dashboard'
        return NextResponse.redirect(redirectUrl)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder content
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
