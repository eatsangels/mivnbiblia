import { NextRequest, NextResponse } from "next/server";
import { sendWelcomeEmail } from "@/lib/email/actions";

// Secure this endpoint with a secret if possible
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
    try {
        // Optional: Verify secret header if you set one
        // const signature = req.headers.get("x-webhook-secret");
        // if (WEBHOOK_SECRET && signature !== WEBHOOK_SECRET) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        const body = await req.json();
        const { record, type, table } = body;

        // Verify this is an INSERT on 'profiles'
        if (type !== "INSERT" || table !== "profiles") {
            return NextResponse.json({ message: "Ignored event" }, { status: 200 });
        }

        const { email, full_name } = record;

        if (!email) {
            return NextResponse.json({ error: "No email found in record" }, { status: 400 });
        }

        const name = full_name || "Miembro";

        console.log(`Sending welcome email to ${email}`);

        const result = await sendWelcomeEmail(email, name);

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: "Email sent" });

    } catch (error: any) {
        console.error("Webhook error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
