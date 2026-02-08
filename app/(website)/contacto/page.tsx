import { ContactInfo } from "@/components/website/ContactInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contacto",
    description: "¿Tienes dudas o quieres visitarnos? Ponte en contacto con nosotros. Estamos aquí para servirte y caminar juntos en la fe.",
    openGraph: {
        title: "Contacto | MIVN",
        description: "Ponte en contacto con la familia Vida Nueva.",
    },
};
import { getSiteSettings } from "@/lib/queries/settings";

export default async function Page() {
    const settings = await getSiteSettings();
    return <ContactInfo settings={settings} />;
}
