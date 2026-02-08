import { getSiteSettings } from "@/lib/queries/settings";

export default async function OrganizationSchema() {
    const settings = await getSiteSettings();

    const siteName = settings.site_name || "Ministerio Internacional Vida Nueva";
    const siteUrl = "https://mivn.online"; // Base URL
    const logoUrl = `${siteUrl}${settings.logo_url || "/logo_mivn.png"}`;
    const address = settings.address || "100 Hurricane Shoals Rd NW, Suite F, Lawrenceville, GA 30043";
    const phone = settings.contact_phone || "+1 (770) 524-8414";
    const facebook = settings.facebook_url || "https://www.facebook.com/profile.php?id=61586324631409";
    const instagram = settings.instagram_url || "https://www.instagram.com/mivn2604";
    const youtube = settings.youtube_url || "https://www.youtube.com/@mivn2604";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Church",
        "name": siteName,
        "url": siteUrl,
        "logo": logoUrl,
        "image": logoUrl,
        "description": settings.site_tagline || "Transformando vidas a través del amor de Cristo.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": address,
            "addressLocality": "Lawrenceville",
            "addressRegion": "GA",
            "postalCode": "30043",
            "addressCountry": "US"
        },
        "telephone": phone,
        "sameAs": [
            facebook,
            instagram,
            youtube
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
