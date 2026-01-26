import { getSiteSettings } from "@/lib/queries/settings";
import { Facebook, Instagram, Youtube, MessageCircle, MapPin, Phone, Mail, ChevronRight, Church } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export async function Footer() {
    const settings = await getSiteSettings();
    const currentYear = new Date().getFullYear();

    // Get colors from settings or use defaults
    const footerBgColor = settings.footer_bg_color || '#4AA3DF';
    const footerTextColor = settings.footer_text_color || '#FFFFFF';
    const footerBottomBg = settings.footer_bottom_bg || '#0f172a';
    const logoUrl = settings.logo_footer_url || settings.logo_url || '/logo_mivn.png';

    return (
        <footer className="w-full font-lexend">
            {/* Top Section: Multi-column layout with dynamic background */}
            <div
                className="px-6 md:px-20 lg:px-40 py-20"
                style={{
                    backgroundColor: footerBgColor,
                    color: footerTextColor
                }}
            >
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">

                    {/* Column 1: Brand Identity & Mission */}
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl overflow-hidden p-1">
                                <Image src={logoUrl} alt="MIVN" width={48} height={48} className="object-contain" />
                            </div>
                            <h2 className="text-3xl font-black leading-none tracking-tighter italic">
                                {settings.site_name || 'MIVN'}
                            </h2>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed font-light">
                            {settings.site_tagline || 'Transformando vidas a través del amor de Cristo.'}
                        </p>
                        {/* Social Media Icons in Gold */}
                        <div className="flex gap-4 pt-4">
                            {[
                                { icon: Facebook, href: settings.facebook_url || "https://www.facebook.com/profile.php?id=61586324631409" },
                                { icon: Instagram, href: settings.instagram_url || "https://www.instagram.com/mivn2604" },
                                { icon: Youtube, href: settings.youtube_url || "https://www.youtube.com/@mivn2604" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-mivn-gold hover:text-white border border-mivn-gold/30 transition-all duration-300"
                                >
                                    <social.icon className="w-5 h-5 text-mivn-gold group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col gap-8">
                        <h3 className="text-mivn-gold text-[10px] font-black tracking-[0.3em] uppercase">Enlaces Rápidos</h3>
                        <ul className="flex flex-col gap-4 text-sm">
                            {[
                                { name: "Inicio", href: "/" },
                                { name: "Devocionales", href: "/devocionales" },
                                { name: "Comunidad", href: "/grupos" },
                                { name: "Ministerios", href: "/ministerios" },
                                { name: "Eventos", href: "/eventos" },
                                { name: "Recursos", href: "/recursos" },
                                { name: "Sobre Nosotros", href: "/sobre-nosotros" },
                                { name: "Política de Cookies", href: "/politica-de-cookies" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-mivn-gold transition-colors flex items-center gap-2 group">
                                        <ChevronRight className="w-4 h-4 text-mivn-gold/50 group-hover:translate-x-1 transition-transform" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="flex flex-col gap-8">
                        <h3 className="text-mivn-gold text-[10px] font-black tracking-[0.3em] uppercase">Contacto</h3>
                        <div className="flex flex-col gap-6 text-sm">
                            <div className="flex gap-4 items-start group">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                                    <MapPin className="text-mivn-gold w-5 h-5" />
                                </div>
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address || "100 Hurricane Shoals Rd NW, Suite F, Lawrenceville, GA 30043")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-mivn-gold transition-colors leading-relaxed cursor-pointer"
                                >
                                    {settings.address || "100 Hurricane Shoals Rd NW, Suite F, Lawrenceville, GA 30043"}
                                </a>
                            </div>

                            <div className="flex gap-4 items-center group">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                                    <Phone className="text-mivn-gold w-5 h-5" />
                                </div>
                                <a className="hover:text-mivn-gold transition-colors font-bold" href={`tel:${settings.contact_phone || '+17705248414'}`}>
                                    {settings.contact_phone || "+1 (770) 524-8414"}
                                </a>
                            </div>

                            <div className="flex gap-4 items-center group">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/5">
                                    <Mail className="text-mivn-gold w-5 h-5" />
                                </div>
                                <a className="hover:text-mivn-gold transition-colors font-bold" href={`mailto:${settings.contact_email || 'eatsangelsgaming@gmail.com'}`}>
                                    {settings.contact_email || "eatsangelsgaming@gmail.com"}
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Service Times */}
                    <div className="flex flex-col gap-8">
                        <h3 className="text-mivn-gold text-[10px] font-black tracking-[0.3em] uppercase">Horarios de Culto</h3>
                        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border-l-4 border-mivn-gold border border-white/5 space-y-6">
                            {settings.service_time_sunday && (
                                <div className="space-y-2">
                                    <p className="text-mivn-gold text-[10px] font-black uppercase tracking-widest">Domingos</p>
                                    <p className="text-2xl font-black">{settings.service_time_sunday}</p>
                                </div>
                            )}
                            {settings.service_time_wednesday && (
                                <div className="space-y-2">
                                    <p className="text-mivn-gold text-[10px] font-black uppercase tracking-widest">Miércoles</p>
                                    <p className="text-2xl font-black">{settings.service_time_wednesday}</p>
                                </div>
                            )}
                            <div className="pt-4 border-t border-white/20">
                                <p className="text-xs text-white/70 italic">¡Te esperamos con los brazos abiertos!</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Section: Copyright with dynamic background */}
            <div
                className="px-6 md:px-20 lg:px-40 py-8"
                style={{
                    backgroundColor: footerBottomBg,
                    color: 'rgba(255, 255, 255, 0.6)'
                }}
            >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    <div className="flex items-center gap-3">
                        <Church className="w-5 h-5 text-mivn-gold" />
                        <p>
                            © {currentYear} <span className="font-bold text-white">{settings.site_name || 'MIVN'}</span>. Todos los derechos reservados.
                        </p>
                    </div>
                    <div className="flex gap-8 text-xs">
                        <Link href="/politica-de-cookies" className="hover:text-mivn-gold transition-colors">
                            Política de Cookies
                        </Link>
                        <Link href="/privacidad" className="hover:text-mivn-gold transition-colors">
                            Privacidad
                        </Link>
                        <Link href="/terminos" className="hover:text-mivn-gold transition-colors">
                            Términos
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
