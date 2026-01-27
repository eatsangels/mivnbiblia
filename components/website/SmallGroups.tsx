"use client";

import { Users, Filter, MessageSquare, Heart, Church, ArrowRight, User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const SmallGroups = () => {
    const groups = [
        {
            name: "Generación Diferente",
            category: "Jóvenes",
            leader: "Daniel & Sara",
            desc: "Un espacio para jóvenes que buscan vivir su fe de manera radical y transformar su entorno.",
            members: 42,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCNpXgnxQfZmXRN-w3dy5wYKwJTSwYpQnK7JUjyKCcW10BhbC71E9zAYvQTvHrQb9ALTKYZP0AaHvUyWSFLRcMjz5KeymsXAyPblUzxjO81DZEN8jrU9UW3vGiStkLENkfOHZVzHe_mZC-rblH59ZqMuLwovq34ckBTeIY6w69VSS8HHzLQBTgjtfq9UhOyH-FQcCuLXd3wLKP8w0shI0KMzDf8G8lskjPdMKfBqwwRSSCSretZKieW0LVg_s7tFlQI17MpkG2-D0",
            leaderImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDR7iCvWXZW4a1HD4EgTJkOGf0IMdkEbbe7mOosOOfRHXDUEv_vrvduZJ21OLaM-mHeS1bOmVrK2pUlpAVkydWszBAjPD9yTP7XO6z8bUpcSXR_lhltvef2m_vwFXNsxfOnQB881A2Rngdufyd5r9FMdKtrQ86QeSX0EotBXtjqiHTDIuO2FjFa8DG_G5LoVMcVtUapPw3KRp0FVrVYSDXlXrJkj1phBuEhPFG3kHSnF8qdpN-lOabRg0PHfdAXa_G-9WtPhMaPXc8"
        },
        {
            name: "Matrimonios Firmes",
            category: "Parejas",
            leader: "Los Pastores Luis Santana y Mercedes Trinidad",
            desc: "Edificando familias sólidas sobre la roca que es Cristo. Charlas, cenas y oración.",
            members: 28,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsZyVlHkGKkZEBAj_cFkMttR3q40_Ep-GlEUzsIJwhcw93wIBfrBQ0gpmSPai62XAaGvZHihXwfTrdqyKZ-4SUXqGQlhHmS0_5L3yd3kmLL7bbDYDHkAKLvfhZ7EQ-zvsycXDoVINsc2Wphsf8xONHFvKhpktLdFLztVEVeHqq9B2tfH2mbAaDtvNMiJ3W2_GO5EAqYwyToBf3U_ML05auYT9T1dSVR3ChxpyF_--1vpedFhkJBvBQWjVNt_JiEhiLp68hbM6EmYY",
            leaderImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFz5FugS3R9vYpK03oGD5yzPG5741GaICRXIk_Xl7c0Fl3bkcqU1Ykc8XIsFgI6sNKQSmy_iMbzGOIXMZsBxUOtafVzIQ89DCSwnEFXyPgIcuZCNIV44MEQ4rvZiOm9KzHg4zhtI4v1rx4WBWzx-AXAMREAViHq4Nyr9K4-faV0N7Qdtv7lpnl62_ylnElDJPioV_0XEtInl2pCw5-_4-dZ4zd6XrX8f0SIqVdiDsrC86JIyx5YQZDngkOrfKepkYUTwBCuXHPCgM"
        },
        {
            name: "Corazón de Adorador",
            category: "Alabanza",
            leader: "Marcos Villa",
            desc: "Más que música, buscamos la presencia de Dios en cada nota y cada palabra.",
            members: 15,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDl1JRUc2a9aoqdKiwejpZEb2XwSXCgAOS4fzAua-Ljm5bzde9jmk2SMdf3WDxW-fm-h0cwuSdDzEQYWWcNatjKfJSXXY6dGqix2gjeaXOsxkc-zOwCmV95P1RBbhLgnhUqHogbo9mr550atCPWdrDLBAnYPS0UzPSv5GqclLjRwUD-20mc51FDrpwMS5KZICbFraVtexmRpvGoNjTSraxS2ij9_Yf5A-WwPnxRLL-Vu5JhEiXWFmCpMQzsrhLD9fjKmI1IA02pUro",
            leaderImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIyRwxUBdAiw2q8wChBYbxfnPqmqC-hVKCTekrcTnHY1BvAJA8sjAztPGW61zdxw7snwIpVuj1D24aY1s0NtL2zaHAfYOI89hzs2_b8W75ydoGMIJObZ5yGFp9s-h0NIYrNW2wEjLvStvnvsZWHyhpulDltFaQG8IdZQQJWOJzWF1eDSWPbhxTcV-UX5AfOJJnVz3yTzmVOtDWi_ySkLvT9kGM2maKThzTov9BqN80E2exL3IMeLtWYo2RNuiUVAEpFg1ctg1kNu0"
        },
        {
            name: "Guerreros de Oración",
            category: "Oración",
            leader: "Hna. Martha",
            desc: "Intercediendo por nuestra comunidad, nación y las peticiones de cada hermano.",
            members: 50,
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_WyDVeL2fSGuzMLWFLKuw5MjW0Xce3Dw7oGXdeO-I2f4G-AhvSiTNK9bswiNKmzSOPH0iJYxnjVuA9ftDJPFD0bu_rMHFKdY2lQ7aa-Z5kBBIUlECdjVKqwpnaeZFHYjxVzX5BQWH-oS6WUS-28yehr9DFWH-uz3CyS-9_mniwtgwYinhGdtruVYyIZ_lk0wkKA-oyc4PXScnoPx-sAF9PMBSXh3-EJL_Ss_ECBaxbQOkZ98gudm8JyDmyezPKd2vw2rLb0aMcz8",
            leaderImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA61KfSY1e6npwROVYLTmlrZzu8Y95YkgFeu1D7E21bKOT3gdO6gJKH7sqgzY1-HF-yca5WxqWBH1RC01w87NkLpfivUfPE4aGT5y1tqpWQfoNLouxwrg4WR9OyeWdBc867I4dikeCP2-NrXL1QP4VeTVyIluYRzgGu5imo261KXzgXDhyMXi5WB0A6h-UKQqfObE4R9OwvvanLn4PMg40QMAH7tXx13CH4Tq-zw_9qK6XcQkyN98diNMH3y1aTDvKceC32jWUje2w"
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden border-b border-slate-200 dark:border-slate-800">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6Y86Q9waCGihkQFzuPGGB-y56zb_QGBgTrG8HkHje-qjfYX4QskFrDIKvHIVO9HlP0nUcS4FjSPPiKHk61MOhsipOLfN-QH0Audn8Gmi8QtO0qXlLoH9OGm0mviYUEv7XBa0myRhZv14a7jFmZHmNB6HABLXircyh90QVwXZdJ3A7AzlLdr2tmDYpXlklyNnK73Ws6aDuzu5wbkajUclSOGysM5OkUTUQfZtT_GZq6Tmm3rm_G0AfVqeSWawKpleVxTlBHH1ajUI"
                        alt="Comunidad MIVN"
                        fill
                        className="object-cover opacity-10 dark:opacity-5 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 dark:via-[#050b14]/50 to-white dark:to-[#050b14]" />
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-8 animate-in fade-in duration-1000">
                    <h1 className="font-playfair text-5xl md:text-7xl text-slate-900 dark:text-white font-bold leading-tight">Encuentra tu Comunidad</h1>
                    <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-600 dark:text-slate-400 italic font-light">
                        "De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas." <br />
                        <span className="text-mivn-blue font-bold not-italic text-sm uppercase tracking-widest">— 2 Corintios 5:17</span>
                    </p>
                    <div className="flex justify-center gap-6 pt-6">
                        <a href="#groups" className="bg-mivn-gold text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all">Ver Grupos</a>
                        <a href="#feed" className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-10 py-4 rounded-full font-bold hover:bg-slate-50 transition-all">Actividad Reciente</a>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Groups List */}
                    <div className="lg:col-span-2 space-y-12" id="groups">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
                            <h2 className="text-4xl font-playfair font-bold text-slate-900 dark:text-white">Grupos Pequeños</h2>
                            <div className="flex items-center gap-3 text-slate-400">
                                <Filter className="w-5 h-5" />
                                <select className="bg-transparent border-none text-sm font-bold focus:ring-0 cursor-pointer hover:text-mivn-blue transition-colors uppercase tracking-widest">
                                    <option>Todos los tipos</option>
                                    <option>Jóvenes</option>
                                    <option>Parejas</option>
                                    <option>Estudio Bíblico</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {groups.map((group) => (
                                <div key={group.name} className="group bg-white dark:bg-slate-900/50 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500">
                                    <div className="h-56 relative overflow-hidden">
                                        <Image src={group.image} alt={group.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <span className="absolute top-6 left-6 bg-mivn-blue/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
                                            {group.category}
                                        </span>
                                    </div>
                                    <div className="p-10 space-y-6">
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-mivn-blue transition-colors">{group.name}</h3>
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-mivn-gold/50">
                                                <Image src={group.leaderImage} alt={group.leader} fill className="object-cover" />
                                            </div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Líder: <span className="font-bold text-slate-700 dark:text-slate-200">{group.leader}</span></p>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                            {group.desc}
                                        </p>
                                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                            <div className="flex items-center text-slate-400 gap-2">
                                                <Users className="w-4 h-4" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{group.members} Miembros</span>
                                            </div>
                                            <button className="bg-mivn-blue text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-mivn-blue/20">
                                                Unirse
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Feed */}
                    <aside className="space-y-12" id="feed">
                        <div className="space-y-8">
                            <h3 className="text-3xl font-playfair font-bold text-slate-900 dark:text-white">Actividad Reciente</h3>
                            <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-sm space-y-10">

                                {/* Feed Item 1 */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex-shrink-0 relative overflow-hidden">
                                        <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzGyUmf4tniVAHAf_Ls1x_NEmpa2e-66syXDjmG-zchKjvvQ-mGmYzHtXQcdT9vS-o1m-nEF2r8LuUXQHOzoOAfA4XLnmM9IuSKUkDsjEIsrUzkv-A7al_8mL3vwlwk9QpexnjujLqdSegiIX1KhbwLuAtMfh6xINPqRsUPiWMApjlj2V1YR8WwaSyj6r2VvDbXonM4PS83ThgIAcX5jlFZ8c65jlRvPPun8pccPpgkVWA5VHybbdu6EdFe8Oz6o6c-zEj05mDEUI" alt="User" fill className="object-cover" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Juan Pérez <span className="text-slate-500 font-light">en Generación Diferente</span></p>
                                        <p className="text-[10px] text-mivn-blue font-black uppercase tracking-widest">Hace 2 horas</p>
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                            <p className="text-sm text-slate-600 dark:text-slate-400 italic">"¡Increíble tiempo de estudio anoche! Gracias a todos los que asistieron. 🙌"</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Feed Item 2 */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex-shrink-0 relative overflow-hidden">
                                        <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1tDPLlpE1GMumRXmYdyXcOi4jSwovZmCH1lyP9zXvl5foLm9bC26wlymD-SC-3HH4N1mgUL1ymn9vcUfwaq4N0GsK9RJpifw8X7XS8EgtJPdkqkLOyVltaFYYIAyHWnmG0molcjk7hP9BgQ69BFYRw3ZtT1EeZCmBHPbE8ElF2dMwiwf72FrbdL45exUtOSpmB4JVbWFYJGWJrhWkaY40wxrLpTX6d719Ze1f-6jjehB8PKGVC4XvuY6xpWaHtD61goJMlhF4VuE" alt="User" fill className="object-cover" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Mercedes Trinidad <span className="text-slate-500 font-light">subió una foto</span></p>
                                        <p className="text-[10px] text-mivn-blue font-black uppercase tracking-widest">Hace 5 horas</p>
                                        <div className="relative h-40 w-full rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
                                            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCXP05QC4XfA1a0QoThCrYpBgEA680cS7I1q2ugZTmWv2zBpSV-hvsD5TthR8eKnl2PrmtPO1uGF5bf5SHp8S6Y2b-QNb5CpNUaU3ZjKfw0nZutrqxXn5aFBr7T5z3SZeA5sYupCOb-jsz0MBu7ejl3hVi0EiK1-vcgy8Io-5qGgtF2km4Zvr-WtIPT9mbOLV3lQlF-xdOJJCrOcdG4WQdbUbutG0kzGVjxgD2y2dbt7e8u0Dnkmg5uycUcpaYa0-vtRmNqrC_VYY" alt="Meeting" fill className="object-cover" />
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full pt-6 border-t border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-widest text-mivn-blue hover:text-mivn-gold transition-colors flex items-center justify-center gap-2">
                                    Ver todo el feed <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* CTA Card */}
                        <div className="bg-mivn-blue p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <Church className="absolute -right-8 -bottom-8 text-white/5 w-40 h-40 group-hover:rotate-12 transition-transform duration-700" />
                            <div className="relative z-10 space-y-6">
                                <h4 className="text-2xl font-bold text-white">¿No encuentras tu lugar?</h4>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    Escríbenos y te ayudaremos a encontrar el grupo que mejor se adapte a tu etapa de vida y dones espirituales.
                                </p>
                                <Link href="/contacto" className="inline-block bg-white text-mivn-blue px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-mivn-gold hover:text-white transition-all shadow-xl">
                                    Contactar Líder
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};
