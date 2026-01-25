import * as React from 'react';

interface EmailLayoutProps {
    children: React.ReactNode;
    previewText?: string;
    verse?: { text: string; reference: string };
}

// MIVN Brand Colors
const colors = {
    navy: '#0f172a',
    gold: '#d4af37',
    gray: '#f8fafc',
    text: '#334155',
    white: '#ffffff'
};

const defaultVerse = {
    text: "Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
    reference: "Jeremías 29:11"
};

export const EmailLayout: React.FC<EmailLayoutProps> = ({
    children,
    previewText,
    verse = defaultVerse,
}) => {
    return (
        <div style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            backgroundColor: colors.gray,
            padding: '40px 20px',
            color: colors.text,
        }}>
            {previewText && (
                <div style={{ display: 'none', fontSize: '1px', lineHeight: '1px', maxHeight: '0px', maxWidth: '0px', opacity: 0, overflow: 'hidden' }}>
                    {previewText}
                </div>
            )}

            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                backgroundColor: colors.white,
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
                {/* Header */}
                <div style={{
                    backgroundColor: colors.navy,
                    padding: '32px 20px',
                    textAlign: 'center',
                    borderBottom: `4px solid ${colors.gold}`
                }}>
                    <h1 style={{
                        color: colors.white,
                        margin: 0,
                        fontSize: '24px',
                        letterSpacing: '2px',
                        textTransform: 'uppercase'
                    }}>
                        Ministerio Internacional <span style={{ color: colors.gold }}>Vida Nueva</span>
                    </h1>
                </div>

                {/* Body */}
                <div style={{ padding: '40px 30px' }}>
                    {children}
                </div>

                {/* Footer */}
                <div style={{
                    backgroundColor: '#f1f5f9',
                    padding: '30px',
                    textAlign: 'center',
                    borderTop: '1px solid #e2e8f0'
                }}>
                    <div style={{ marginBottom: '24px' }}>
                        <p style={{
                            fontStyle: 'italic',
                            color: colors.navy,
                            fontSize: '16px',
                            margin: '0 0 8px 0',
                            fontWeight: 500
                        }}>
                            "{verse.text}"
                        </p>
                        <p style={{
                            color: colors.gold,
                            fontSize: '14px',
                            margin: 0,
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            {verse.reference}
                        </p>
                    </div>

                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                        <p style={{ margin: '0 0 16px 0', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                            Este correo fue enviado desde una dirección de notificaciones. <br />
                            Por favor, no respondas a este mensaje.
                        </p>
                        <p style={{ margin: '0 0 8px 0' }}>
                            Si necesitas contactarnos, escríbenos a: <br />
                            <a href="mailto:Mivn202604@gmail.com" style={{ color: colors.gold, fontWeight: 'bold', textDecoration: 'none', fontSize: '14px' }}>
                                Mivn202604@gmail.com
                            </a>
                        </p>
                        <p style={{ margin: '16px 0 8px 0' }}>
                            © {new Date().getFullYear()} Ministerio Internacional Vida Nueva. Todos los derechos reservados.
                        </p>
                        <p style={{ margin: 0 }}>
                            <a href="https://mivn.online" style={{ color: colors.navy, textDecoration: 'none' }}>Visita nuestro sitio web</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
