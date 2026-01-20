import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TerminosPage() {
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
                <h1 className="text-4xl font-bold mb-6 font-serif">Términos y Condiciones</h1>
                <p className="mb-4 text-muted-foreground">
                    Última actualización: {new Date().toLocaleDateString('es-ES')}
                </p>

                <div className="prose prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-primary">1. Aceptación de los Términos</h2>
                        <p>
                            Bienvenido al Santuario Digital del Ministerio Internacional Vida Nueva (MIVN). Al acceder y utilizar nuestra plataforma de estudio bíblico, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, le rogamos que no utilice nuestros servicios.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-primary">2. Descripción del Servicio</h2>
                        <p>
                            MIVN proporciona una plataforma digital destinada al estudio profundo de las Sagradas Escrituras, crecimiento espiritual y comunidad. Nuestros servicios incluyen acceso a materiales de lectura, herramientas de estudio, foros de discusión y contenido multimedia.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-primary">3. Conducta del Usuario</h2>
                        <p>
                            Nos esforzamos por mantener un ambiente de respeto, amor y edificación mutua. Al utilizar nuestros servicios, usted se compromete a:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                            <li>Tratar a todos los miembros de la comunidad con respeto y consideración cristiana.</li>
                            <li>No publicar contenido ofensivo, difamatorio, obsceno o que incite al odio.</li>
                            <li>No utilizar la plataforma para fines comerciales o publicidad no autorizada.</li>
                            <li>Respetar la privacidad y los derechos de los demás usuarios.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-primary">4. Propiedad Intelectual</h2>
                        <p>
                            Todo el contenido presente en esta plataforma, incluyendo textos, gráficos, logotipos, imágenes, clips de audio y software, es propiedad del Ministerio Internacional Vida Nueva o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual. El contenido bíblico es utilizado bajo las licencias correspondientes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-primary">5. Limitación de Responsabilidad</h2>
                        <p>
                            El Ministerio Internacional Vida Nueva proporciona este servicio "tal cual" y "según disponibilidad". Aunque nos esforzamos por ofrecer contenido preciso y edificante, no garantizamos que el servicio sea ininterrumpido o esté libre de errores. MIVN no será responsable por daños directos, indirectos, incidentales o consecuentes resultantes del uso o la imposibilidad de usar nuestros servicios.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-primary">6. Modificaciones</h2>
                        <p>
                            Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio. Se recomienda revisar periódicamente esta página para estar al tanto de cualquier cambio.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-3 text-primary">7. Contacto</h2>
                        <p>
                            Si tiene alguna pregunta sobre estos Términos y Condiciones, por favor contáctenos a través de nuestros canales oficiales de comunicación.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
