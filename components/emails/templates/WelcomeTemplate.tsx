import * as React from 'react';
import { EmailLayout } from '../EmailLayout';

interface WelcomeTemplateProps {
    firstName: string;
}

export const WelcomeTemplate: React.FC<WelcomeTemplateProps> = ({ firstName }) => (
    <EmailLayout previewText={`¡Bienvenido a la familia MIVN, ${firstName}!`}>
        <h2 style={{ color: '#0f172a', fontSize: '24px', margin: '0 0 20px 0' }}>
            ¡Hola, {firstName}!
        </h2>
        <p style={{ fontSize: '16px', lineHeight: '26px', margin: '0 0 20px 0' }}>
            Es un honor darte la bienvenida a la familia del <strong>Ministerio Internacional Vida Nueva</strong>.
            Nos alegra profundamente que hayas decidido unirte a nuestra comunidad de fe.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '26px', margin: '0 0 30px 0' }}>
            Aquí encontrarás un lugar para crecer, servir y conectarte con Dios.
            Te invitamos a explorar nuestros recursos y participar en nuestros próximos servicios.
        </p>

        <div style={{ textAlign: 'center', margin: '40px 0' }}>
            <a href="https://mivn.online" style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '14px 28px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '16px',
                display: 'inline-block'
            }}>
                Explorar MIVN Online
            </a>
        </div>
    </EmailLayout>
);
