export function TermsContent() {
    return (
        <div className="prose prose-invert max-w-none space-y-6 text-sm text-gray-300">
            <p className="text-muted-foreground">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
            <section>
                <h3 className="text-lg font-semibold mb-2 text-gold-500">1. Aceptación de los Términos</h3>
                <p>
                    Bienvenido al Santuario Digital del Ministerio Internacional Vida Nueva (MIVN). Al acceder y utilizar nuestra plataforma de estudio bíblico, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, le rogamos que no utilice nuestros servicios.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-2 text-gold-500">2. Descripción del Servicio</h3>
                <p>
                    MIVN proporciona una plataforma digital destinada al estudio profundo de las Sagradas Escrituras, crecimiento espiritual y comunidad. Nuestros servicios incluyen acceso a materiales de lectura, herramientas de estudio, foros de discusión y contenido multimedia.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-2 text-gold-500">3. Conducta del Usuario</h3>
                <p>
                    Nos esforzamos por mantener un ambiente de respeto, amor y edificación mutua. Al utilizar nuestros servicios, usted se compromete a:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Tratar a todos los miembros de la comunidad con respeto y consideración cristiana.</li>
                    <li>No publicar contenido ofensivo, difamatorio, obsceno o que incite al odio.</li>
                    <li>No utilizar la plataforma para fines comerciales o publicidad no autorizada.</li>
                    <li>Respetar la privacidad y los derechos de los demás usuarios.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-2 text-gold-500">4. Propiedad Intelectual</h3>
                <p>
                    Todo el contenido presente en esta plataforma, incluyendo textos, gráficos, logotipos, imágenes, clips de audio y software, es propiedad del Ministerio Internacional Vida Nueva o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual. El contenido bíblico es utilizado bajo las licencias correspondientes.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-2 text-gold-500">5. Limitación de Responsabilidad</h3>
                <p>
                    El Ministerio Internacional Vida Nueva proporciona este servicio "tal cual" y "según disponibilidad". Aunque nos esforzamos por ofrecer contenido preciso y edificante, no garantizamos que el servicio sea ininterrumpido o esté libre de errores. MIVN no será responsable por daños directos, indirectos, incidentales o consecuentes resultantes del uso o la imposibilidad de usar nuestros servicios.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-2 text-gold-500">6. Modificaciones</h3>
                <p>
                    Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el sitio. Se recomienda revisar periódicamente esta página para estar al tanto de cualquier cambio.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-2 text-gold-500">7. Contacto</h3>
                <p>
                    Si tiene alguna pregunta sobre estos Términos y Condiciones, por favor contáctenos a través de nuestros canales oficiales de comunicación.
                </p>
            </section>
        </div>
    );
}
