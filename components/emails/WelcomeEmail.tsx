import * as React from 'react';

interface WelcomeEmailProps {
    firstName: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
    firstName,
}) => (
    <div style={{ fontFamily: 'Georgia, serif', color: '#333' }}>
        <h1 style={{ color: '#0f172a' }}>¡{firstName}, bienvenido/a a MIVN!</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Nos alegra mucho que te hayas unido a nuestra comunidad.
            En el Ministerio Internacional Visión de las Naciones estamos para servirte.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Explora nuestros recursos y mantente al tanto de nuestros próximos eventos.
        </p>
        <a href="https://mivn.org" style={{
            backgroundColor: '#0f172a',
            color: '#fff',
            padding: '12px 24px',
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'inline-block',
            marginTop: '20px'
        }}>
            Ir al Sitio Web
        </a>
    </div>
);
