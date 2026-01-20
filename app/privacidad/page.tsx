import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacidadPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Link
                    href="/"
                    className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al Inicio
                </Link>
                <h1 className="text-4xl font-bold mb-6 font-serif">Política de Privacidad</h1>
                <p className="mb-4 text-muted-foreground">
                    Última actualización: {new Date().toLocaleDateString('es-ES')}
                </p>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-primary">1. Introducción</h2>
                        <p>
                            En el Ministerio Internacional Vida Nueva (MIVN), valoramos su privacidad y estamos comprometidos a proteger su información personal. Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos sus datos cuando utiliza nuestra plataforma Santuario Digital.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-primary">2. Información que Recopilamos</h2>
                        <p>
                            Podemos recopilar la siguiente información:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li><strong>Información de Registro:</strong> Nombre, dirección de correo electrónico y contraseña al crear una cuenta.</li>
                            <li><strong>Datos de Uso:</strong> Información sobre cómo interactúa con nuestros servicios, como los estudios bíblicos accedidos y el tiempo de permanencia.</li>
                            <li><strong>Información Voluntaria:</strong> Datos que usted decida compartir en su perfil o en los foros de la comunidad.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-primary">3. Uso de la Información</h2>
                        <p>
                            Utilizamos la información recopilada para:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Proporcionar y mantener nuestros servicios espirituales y educativos.</li>
                            <li>Personalizar su experiencia de estudio bíblico.</li>
                            <li>Comunicarnos con usted sobre actualizaciones, eventos y recursos del ministerio.</li>
                            <li>Mejorar y optimizar nuestra plataforma.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-primary">4. Protección de Datos</h2>
                        <p>
                            Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Sin embargo, recuerde que ningún método de transmisión por Internet es 100% seguro.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-primary">5. Compartir Información</h2>
                        <p>
                            No vendemos, comerciamos ni alquilamos su información personal a terceros. Podemos compartir información genérica agregada no vinculada a ninguna información de identificación personal con respecto a los visitantes y usuarios con nuestros socios de confianza y afiliados para los fines descritos anteriormente.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-primary">6. Sus Derechos</h2>
                        <p>
                            Usted tiene derecho a acceder, corregir o eliminar su información personal. Si desea ejercer estos derechos, por favor contáctenos a través de los medios proporcionados en la plataforma.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-primary">7. Cambios en esta Política</h2>
                        <p>
                            MIVN tiene la facultad de actualizar esta política de privacidad en cualquier momento. Le recomendamos que revise esta página con frecuencia para estar informado sobre cómo ayudamos a proteger la información personal que recopilamos.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
