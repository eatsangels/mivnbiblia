export function PrivacyContent() {
    return (
        <div className="prose prose-invert max-w-none space-y-6 text-sm text-gray-300">
            <p className="text-muted-foreground">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
            <section>
                <h3 className="text-lg font-semibold mb-2 text-gold-500">1. Introducción</h3>
                <p>
                    En el Ministerio Internacional Vida Nueva (MIVN), valoramos su privacidad y estamos comprometidos a proteger su información personal. Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos sus datos cuando utiliza nuestra plataforma Santuario Digital.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-2 text-gold-500">2. Información que Recopilamos</h3>
                <p>
                    Podemos recopilar la siguiente información:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li><strong>Información de Registro:</strong> Nombre, dirección de correo electrónico y contraseña al crear una cuenta.</li>
                    <li><strong>Datos de Uso:</strong> Información sobre cómo interactúa con nuestros servicios, como los estudios bíblicos accedidos y el tiempo de permanencia.</li>
                    <li><strong>Información Voluntaria:</strong> Datos que usted decida compartir en su perfil o en los foros de la comunidad.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-2 text-gold-500">3. Uso de la Información</h3>
                <p>
                    Utilizamos la información recopilada para:
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Proporcionar y mantener nuestros servicios espirituales y educativos.</li>
                    <li>Personalizar su experiencia de estudio bíblico.</li>
                    <li>Comunicarnos con usted sobre actualizaciones, eventos y recursos del ministerio.</li>
                    <li>Mejorar y optimizar nuestra plataforma.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-2 text-gold-500">4. Protección de Datos</h3>
                <p>
                    Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Sin embargo, recuerde que ningún método de transmisión por Internet es 100% seguro.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-2 text-gold-500">5. Compartir Información</h3>
                <p>
                    No vendemos, comerciamos ni alquilamos su información personal a terceros. Podemos compartir información genérica agregada no vinculada a ninguna información de identificación personal con respecto a los visitantes y usuarios con nuestros socios de confianza y afiliados para los fines descritos anteriormente.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-2 text-gold-500">6. Sus Derechos</h3>
                <p>
                    Usted tiene derecho a acceder, corregir o eliminar su información personal. Si desea ejercer estos derechos, por favor contáctenos a través de los medios proporcionados en la plataforma.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold mb-2 text-gold-500">7. Cambios en esta Política</h3>
                <p>
                    MIVN tiene la facultad de actualizar esta política de privacidad en cualquier momento. Le recomendamos que revise esta página con frecuencia para estar informado sobre cómo ayudamos a proteger la información personal que recopilamos.
                </p>
            </section>
        </div>
    );
}
