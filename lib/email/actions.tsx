"use server";

import { resend } from "@/lib/resend";
import { WelcomeTemplate } from "@/components/emails/templates/WelcomeTemplate";
import { EventTemplate } from "@/components/emails/templates/EventTemplate";
import { NewsletterTemplate } from "@/components/emails/templates/NewsletterTemplate";

const FROM_EMAIL = 'Ministerio Internacional Vida Nueva <info@mivn.online>';

/**
 * Send Welcome Email to a single user
 */
export async function sendWelcomeEmail(email: string, firstName: string) {
    try {
        const data = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: '¡Bienvenido a la familia MIVN!',
            react: <WelcomeTemplate firstName={firstName} />,
        });
        return { success: true, data };
    } catch (error) {
        console.error("Error sending welcome email:", error);
        return { success: false, error };
    }
}

/**
 * Send Event Notification
 * Note: Resend Free tier limits recipients per request. For bulk, loop or use audiences.
 */
export async function sendEventEmail(
    recipients: string[],
    eventDetails: { name: string; date: string; description: string; imageUrl?: string; link?: string }
) {
    if (recipients.length === 0) return { success: false, error: "No recipients" };

    try {
        // Send individually to avoid exposing other emails (BCC logic handled by Resend batch or loop)
        // For simplicity in this demo, we send to the first one or batch if supported.
        // Ideally, specific implementation depends on volume.

        const data = await resend.emails.send({
            from: FROM_EMAIL,
            to: recipients, // Resend handles multiple recipients
            subject: `Evento: ${eventDetails.name}`,
            react: (
                <EventTemplate
                    eventName={eventDetails.name}
                    eventDate={eventDetails.date}
                    eventDescription={eventDetails.description}
                    imageUrl={eventDetails.imageUrl}
                    eventLink={eventDetails.link}
                />
            ),
        });
        return { success: true, data };
    } catch (error) {
        console.error("Error sending event email:", error);
        return { success: false, error };
    }
}

/**
 * Send Newsletter
 */
export async function sendNewsletter(recipients: string[], title: string, content: string) {
    if (recipients.length === 0) return { success: false, error: "No recipients" };

    try {
        const data = await resend.emails.send({
            from: FROM_EMAIL,
            to: recipients,
            subject: title,
            react: <NewsletterTemplate title={title} content={content} />,
        });
        return { success: true, data };
    } catch (error) {
        console.error("Error sending newsletter:", error);
        return { success: false, error };
    }
}
