"use client";

import { ZoomIn, Share2, Play, Expand } from "lucide-react";
import Image from "next/image";

export const Gallery = () => {
    const images = [
        { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyxOiElUEkpswZ9p_2BhVHhSaqs45Pk2d-yhDBHyUV06mJH6ZtkLAMXFxfr0bkLvxw_5lKXgz9AJ0AxQU9hR8DvtbHh7301ZpmsE-AfjAxTdn2cK9ejEHLqyEyYVlk_kE342VHEUeafC0Nn2ql58hSRvS81labU6Yshz1JMEpQ9hIEiSlxzboGWSWg0Dr4sfNOU19fWlaC1034xO4lmO1-7DoP32EiAZprQUTSkYoXONWTfJBj2a0Rb5aVoYh0179HT0s9trVPue8", title: "Adoración Dominical", size: "lg" },
        { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNmO_RFlOSgTxutJ-siYpHnFR7W3AyUuxbavNgvvsv-MagobrKAuha4W2BsGtfcYduAJEjdTLh7zoUb5R2ySQvpHFc75lSHgzCZv_82I_jJGkBSSl-Iq6MdHqZDh0XZbASYRFtqz_Fgn2va3An7bv2t7XovSR_QaQjGo0DMFf8CYsWbLOOKoxI29B_B3DKFMknC4OMrGlGz6quXrzxNpE6xCT5KkIGagOhPOJ3j_-SUwxkQ3FVvUy62fX68HIQIJQ3aeMn8hg2Me4", title: "Congreso Vida", video: true },
        { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgddV9FBiVk5JWyORDsU9yxMNQaT9Gfr0dXRrbdO0qZZzYsezcPCKeZqmXApYaciuTdQXjIxag0xb4jY5NoKIW7R5P0V9TPF9fp6eqnQDeMTAlpktO47go9C2NOMOy6mNYvQo1zDaPqRyVl2By8x25HOpKG4pFe79cM67mc8lWfRz5vFZ5wm_nVE_wddjnNBMYzBNfkEeiswrvNvqdwWyw1Pv6BeocnvohiewwmcL4KHo308XRsU_9i-aUnLC7GuQ2WZmHrbFdEOg", title: "Misión Amazonas" },
        { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5vrGB9d95YKOCYBXx4b9Yz-OcwNpSGg2AOR4tYfN76rAqcLHeLcz6_RmgHu4CwXssrGdgYXeMOpT5_tNZ34GRiiE0lXRjo5k-rOyukCxXmf-wLSAfR-VLPBVkShbfU8HA0IqKIJr66_poAixwd3iJ7lBPzs5PjE8TGYlojHIU1nLX5LvqdrEnERu4GJBdHCfosTc_H5k2hNBV-vZ1zTOb4w_A2AhKb08bRb6oYsnKC2Givfx14uHJpLlFOdeuxrs9BTxXNlYvbOQ", title: "Noche de Clamor" },
        { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBgLhjNt90iZAHQaoOK5n4QeC7DMtaUBEKiJPYGbf6gV-oafxoGqy-3sC88MGiExcAokqONgrc7QHgh4UPFYr5hu4-fbEALVmOkN1Ce1iKojzQVC1nxKdRtCHEuiO6qvq6g8Gc9P97huCu-Qk4q1roJP1LRh-Ua-i2ozKP9ulWlBcm_NEb_xbwKDd__4sOur8TybGpDQm_Z6948eREGAg6KtIid4ker3msm6DZdVSShJubUnxUMOisNl2aC9mhNhYm-ColI7iIiIdE", title: "Bautizos 2023", video: true },
        { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBT8CUt7OtvhJROXi3Cs5oMTS7Hj5w6z4tBNWIOjl57rFnUNIRRejvRrMoOUZVQjslLI70VKx5HE3j7exsSmdgY6VIBZSvfvGz34NEbv5akdXlHHJz55CPR519dS0nZg-jgS2lozCFpErZGM-B2amOaZ-btE2Zj99y5fAyik7H8Wj5-HurxmcSnkpZyemH_36z-q6mXFez0lCv5OMTCyACLvh8HFqyode3S3L9dt3QWHXL8kt6mOdDSa5pHCD-vWcACop3FQysQKVw", title: "Cena de Gala" }
    ];

    return (
        <section className="bg-mivn-bg-dark py-32 px-4">
            <div className="max-w-7xl mx-auto space-y-20">

                {/* Header */}
                <div className="text-center space-y-6 max-w-3xl mx-auto">
                    <span className="text-mivn-gold font-black uppercase tracking-[0.5em] text-xs">Momentos Eternos</span>
                    <h2 className="text-5xl md:text-7xl font-playfair font-bold text-white">Nuestra Vida en Comunidad</h2>
                    <p className="text-xl text-gray-400 font-light leading-relaxed italic">
                        Un registro visual de la fe, el amor y los momentos que definen nuestra familia espiritual.
                    </p>
                </div>

                {/* Masonry-style Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {images.map((img, i) => (
                        <div key={i} className="relative group rounded-[3rem] overflow-hidden border border-white/10 break-inside-avoid shadow-2xl">
                            <Image
                                src={img.src}
                                alt={img.title}
                                width={800}
                                height={800}
                                className="w-full h-auto object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                            />

                            {/* Video Overlay */}
                            {img.video && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-mivn-blue/20 flex items-center justify-center border border-mivn-blue/40 group-hover:bg-mivn-blue group-hover:scale-110 transition-all">
                                        <Play className="w-6 h-6 text-white fill-current" />
                                    </div>
                                </div>
                            )}

                            {/* Hover Text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-mivn-bg-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-10">
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-playfair font-bold text-white uppercase tracking-wider">{img.title}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-mivn-gold font-black uppercase tracking-widest">Octubre 2023</span>
                                        <div className="flex gap-4">
                                            <ZoomIn className="w-4 h-4 text-white hover:text-mivn-blue cursor-pointer" />
                                            <Share2 className="w-4 h-4 text-white hover:text-mivn-blue cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* More Button */}
                <div className="text-center pt-8">
                    <button className="text-gray-600 hover:text-mivn-gold font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-4 mx-auto py-6 group">
                        Cargar Galería Completa <Expand className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    </button>
                </div>

            </div>
        </section>
    );
};
