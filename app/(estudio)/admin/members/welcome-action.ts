"use server";

import { sendWelcomeEmail } from "@/lib/email/actions";

// This action can be called when an admin manually creates a member
// or hooked into a future webhook handler for Supabase User Created events
export async function triggerWelcomeEmail(email: string, name: string) {
    // Basic validation
    if (!email || !name) {
        return { success: false, error: "Missing email or name" };
    }

    try {
        const result = await sendWelcomeEmail(email, name);
        return result;
    } catch (error) {
        console.error("Failed to trigger welcome email:", error);
        return { success: false, error };
    }
}
