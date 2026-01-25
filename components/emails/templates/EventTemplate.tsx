import * as React from 'react';
import { EmailLayout } from '@/components/emails/EmailLayout';

interface EventTemplateProps {
    eventName: string;
    eventDate: string;
    eventDescription: string;
    imageUrl?: string;
    eventLink?: string;
}

export const EventTemplate: React.FC<EventTemplateProps> = ({
    eventName,
    eventDate,
    eventDescription,
    imageUrl,
    eventLink
}) => (
    <EmailLayout previewText={`No te pierdas: ${eventName}`}>
        <h2 style={{ color: '#0f172a', fontSize: '28px', margin: '0 0 10px 0', textAlign: 'center' }}>
            {eventName}
        </h2>
        <p style={{
            color: '#d4af37',
            fontSize: '18px',
            margin: '0 0 30px 0',
            fontWeight: 'bold',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '1px'
        }}>
            {eventDate}
        </p>

        {imageUrl && (
            <div style={{ marginBottom: '30px', borderRadius: '12px', overflow: 'hidden' }}>
                <img src={imageUrl} alt={eventName} style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>
        )}

        <div style={{ backgroundColor: '#f8fafc', padding: '24px', borderRadius: '12px', borderLeft: '4px solid #d4af37' }}>
            <p style={{ fontSize: '16px', lineHeight: '26px', margin: 0, whiteSpace: 'pre-wrap' }}>
                {eventDescription}
            </p>
        </div>

        {eventLink && (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <a href={eventLink} style={{
                    backgroundColor: '#0f172a',
                    color: '#ffffff',
                    padding: '16px 32px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    display: 'inline-block',
                    boxShadow: '0 4px 6px rgba(15, 23, 42, 0.2)'
                }}>
                    Registrarme al Evento
                </a>
            </div>
        )}
    </EmailLayout>
);
