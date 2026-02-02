import { ContactInfo } from "@/components/website/ContactInfo";
import { getSiteSettings } from "@/lib/queries/settings";

export default async function Page() {
    const settings = await getSiteSettings();
    return <ContactInfo settings={settings} />;
}
