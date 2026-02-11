import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
        const cookieStore = {
            getAll: () => [],
            set: () => { },
        } as any // We need a proper cookie store implementation for server actions/route handlers

        // However, since we are in a route handler, we should use the cookies() from next/headers
        // But since we are using the @supabase/ssr package, we follow their pattern:

        // Actually, let's use the createServerClient from our lib/supabase or construct it here
        // adapting to the existing project structure. 
        // The existing lib/supabase.ts exports createServerClient but it might need cookies passed to it if it doesn't handle them.
        // Let's check lib/supabase.ts again in previous turn.
        // It uses createClient from @supabase/supabase-js for createServerClient, which is for Server Components/Actions 
        // keeping it simple.

        // For the route handler, we need to handle cookies manually with NextResponse
        const response = NextResponse.redirect(`${origin}${next}`)

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return request.cookies.get(name)?.value
                    },
                    set(name: string, value: string, options: CookieOptions) {
                        response.cookies.set({
                            name,
                            value,
                            ...options,
                        })
                    },
                    remove(name: string, options: CookieOptions) {
                        response.cookies.set({
                            name,
                            value: '',
                            ...options,
                        })
                    },
                },
            }
        )

        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            return response
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/login?error=auth-code-error`)
}
