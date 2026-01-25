import * as React from 'react';
import { EmailLayout } from '../EmailLayout';

interface NewsletterTemplateProps {
    title: string;
    content: string; // HTML content supported
}

export const NewsletterTemplate: React.FC<NewsletterTemplateProps> = ({
    title,
    content
}) => (
    <EmailLayout previewText={title}>
        <h2 style={{
            color: '#0f172a',
            fontSize: '26px',
            margin: '0 0 20px 0',
            borderBottom: '2px solid #f1f5f9',
            paddingBottom: '16px'
        }}>
            {title}
        </h2>

        <div
            style={{ fontSize: '16px', lineHeight: '28px', color: '#334155' }}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    </EmailLayout>
);
