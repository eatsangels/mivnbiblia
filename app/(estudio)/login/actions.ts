'use server'

import { createClient } from '@supabase/supabase-js'

export async function getEmailByUsername(username: string): Promise<string | null> {
    // Ensure we have the service role key
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error('SUPABASE_SERVICE_ROLE_KEY is not defined')
        return null
    }

    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    )

    // First find the profile with this username
    // Service role bypasses RLS, so we can query profiles freely
    const { data: profile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .select('id, email')
        .ilike('username', username)
        .single()

    if (profileError || !profile) {
        return null
    }

    // If email is already in profile, return it
    if (profile.email) {
        return profile.email
    }

    // Otherwise get it via admin API
    const { data: { user }, error: userError } = await supabaseAdmin.auth.admin.getUserById(profile.id)

    if (userError || !user) {
        return null
    }

    return user.email || null
}
