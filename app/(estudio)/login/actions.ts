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
        .select('id')
        .eq('username', username)
        .single()

    if (profileError || !profile) {
        // If not found or error, return null
        return null
    }

    // Then get the user email via admin API using the ID found in profiles
    const { data: { user }, error: userError } = await supabaseAdmin.auth.admin.getUserById(profile.id)

    if (userError || !user) {
        return null
    }

    return user.email || null
}
