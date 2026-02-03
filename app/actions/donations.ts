"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type DonationStats = {
    totalGiven: number;
    lastDonationDate: string | null;
    lastDonationAmount: number | null;
};

export async function getDonationHistory() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data: donations } = await (supabase as any)
        .from("donations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    return donations || [];
}

export async function getDonationStats(): Promise<DonationStats> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return {
            totalGiven: 0,
            lastDonationDate: null,
            lastDonationAmount: null
        };
    }

    const { data: donations } = await (supabase as any)
        .from("donations")
        .select("amount, created_at")
        .eq("user_id", user.id)
        .eq("status", "completed");

    const totalGiven = donations?.reduce((sum: any, d: any) => sum + Number(d.amount), 0) || 0;

    // Get last donation (including pending for visibility, or strictly completed? let's do all for history context)
    // For stats usually we want confirmed.
    const lastDonation = donations?.[0]; // Assuming defined/ordered storage or we re-sort

    // Re-fetch sorted for last donation specific detail if needed, or sort here
    const sorted = donations?.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    const latest = sorted?.[0];

    return {
        totalGiven,
        lastDonationDate: latest?.created_at || null,
        lastDonationAmount: latest?.amount || null
    };
}

export async function createDonation(data: {
    amount: number;
    type: "ofrenda" | "diezmo" | "mision" | "otro";
    method: "card" | "zelle" | "paypal";
    reference_id?: string;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Debes iniciar sesión para ofrendar.");

    // Using any cast temporarily because database.types might be out of sync with 'type' column
    // The user needs to run the migration to add 'type' column.
    const { error } = await (supabase as any).from("donations").insert({
        user_id: user.id,
        amount: data.amount,
        type: data.type,
        payment_method: data.method,
        status: "pending",
        payment_id: data.reference_id,
        currency: "USD"
    } as any);

    if (error) {
        console.error("Error creating donation:", error);
        throw new Error("No se pudo registrar la ofrenda.");
    }

    revalidatePath("/ofrendas");
    revalidatePath("/dashboard/ofrendas");

    return { success: true };
}
