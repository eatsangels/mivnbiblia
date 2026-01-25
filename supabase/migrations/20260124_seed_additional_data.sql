-- Additional seed data for testing
-- Run this after the initial seed

-- Add more devotionals
INSERT INTO devotionals (title, slug, content, scripture_reference, author_name, publish_date, is_published) VALUES
('El Amor de Dios', 'amor-de-dios',
'<p>El amor de Dios es incondicional y eterno. No hay nada que puedas hacer para que Dios te ame más, y nada que puedas hacer para que te ame menos.</p>
<p><strong>Reflexión:</strong> ¿Cómo puedes compartir este amor con otros hoy?</p>',
'1 Juan 4:8',
'Pastor Juan Pérez',
CURRENT_DATE - INTERVAL ''1 day'',
true),

('La Paz que Sobrepasa Todo Entendimiento', 'paz-sobrepasa',
'<p>En medio de las tormentas de la vida, Dios nos ofrece una paz que va más allá de nuestra comprensión humana.</p>',
'Filipenses 4:7',
'Pastora María González',
CURRENT_DATE - INTERVAL ''2 days'',
true);

-- Add more events
INSERT INTO events (title, slug, description, event_date, end_date, location, is_featured, is_published) VALUES
('Noche de Alabanza', 'noche-alabanza',
'Una noche especial dedicada a la adoración y alabanza a Dios. Ven y experimenta Su presencia.',
CURRENT_DATE + INTERVAL ''7 days'',
NULL,
'Santuario Principal',
false,
true),

('Retiro de Jóvenes', 'retiro-jovenes',
'Fin de semana de retiro para jóvenes con actividades, enseñanza bíblica y mucha diversión.',
CURRENT_DATE + INTERVAL ''30 days'',
CURRENT_DATE + INTERVAL ''32 days'',
'Campamento Monte Hermón',
true,
true);

-- Add sample resources
INSERT INTO resources (category_id, title, slug, description, file_type, is_featured, is_published) 
SELECT 
    rc.id,
    'Guía de Estudio: Romanos',
    'guia-estudio-romanos',
    'Una guía completa para estudiar el libro de Romanos en grupos pequeños.',
    'pdf',
    true,
    true
FROM resource_categories rc WHERE rc.slug = 'estudios-biblicos';

INSERT INTO resources (category_id, title, slug, description, file_type, is_featured, is_published)
SELECT 
    rc.id,
    'Serie: El Poder de la Oración',
    'serie-poder-oracion',
    'Serie de sermones sobre la importancia y el poder de la oración.',
    'video',
    true,
    true
FROM resource_categories rc WHERE rc.slug = 'sermones';

-- Add testimonies
INSERT INTO testimonies (author_name, author_role, content, is_featured, is_approved, "order") VALUES
('Carlos Méndez', 'Miembro',
'Dios transformó mi vida completamente. Llegué a esta iglesia en mi momento más oscuro y encontré una familia que me amó incondicionalmente.',
true,
true,
1),

('Ana Rodríguez', 'Líder de Ministerio',
'Servir en MIVN ha sido una de las experiencias más gratificantes de mi vida. He visto a Dios obrar milagros.',
true,
true,
2);
