-- Seed data for MIVN Biblia
-- Run with: npx supabase db seed

-- ============================================
-- PAGES (CMS)
-- ============================================
INSERT INTO pages (slug, title, subtitle, content, meta_description, is_published, "order") VALUES
(
    'inicio',
    'Bienvenidos a Vida Nueva',
    'Transformando vidas a través del amor de Cristo',
    '<h2>Nuestra Misión</h2><p>Existimos para glorificar a Dios y hacer discípulos de todas las naciones.</p><h2>Nuestros Cultos</h2><p>Únete a nosotros cada domingo a las 10:00 AM para un tiempo de alabanza y enseñanza de la Palabra.</p>',
    'Página de inicio del Ministerio Internacional Vida Nueva',
    true,
    1
),
(
    'sobre-nosotros',
    'Nuestra Historia',
    'Conoce más sobre el Ministerio Internacional Vida Nueva',
    '<h2>Quiénes Somos</h2><p>Somos una comunidad de creyentes dedicados a servir a Dios y al prójimo. Nuestra iglesia fue fundada con la visión de impactar nuestra ciudad con el mensaje de esperanza del Evangelio.</p><h2>Nuestros Valores</h2><ul><li>Amor Incondicional</li><li>Excelencia en el Servicio</li><li>Crecimiento Espiritual</li><li>Comunidad Unida</li></ul>',
    'Conoce la historia, visión y valores de MIVN',
    true,
    2
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- RESOURCE CATEGORIES
-- ============================================
INSERT INTO resource_categories (name, slug, description) VALUES
('Estudio Bíblico', 'estudio-biblico', 'Recursos para profundizar en el estudio de la Palabra'),
('Liderazgo', 'liderazgo', 'Herramientas para líderes y servidores ministeriales'),
('Niños', 'ninos', 'Materiales educativos para ministerio infantil'),
('Oración', 'oracion', 'Guías y recursos para la vida de oración'),
('Discipulado', 'discipulado', 'Materiales para el crecimiento espiritual')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- RESOURCES
-- ============================================
INSERT INTO resources (
    title, 
    slug, 
    description, 
    category_id,
    file_type,
    file_url,
    thumbnail,
    is_featured,
    is_published
) VALUES
(
    'Fundamentos para Líderes de Hoy',
    'fundamentos-lideres-hoy',
    'Un manual exhaustivo que explora los pilares del servicio cristiano en el siglo XXI. Ideal para grupos de discipulado y formación ministerial intensa.',
    (SELECT id FROM resource_categories WHERE slug = 'liderazgo' LIMIT 1),
    'pdf',
    'https://example.com/fundamentos-lideres.pdf',
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=800',
    true,
    true
),
(
    'El Poder de la Oración Diaria',
    'poder-oracion-diaria',
    'Una guía práctica para desarrollar una vida de comunión constante con Dios.',
    (SELECT id FROM resource_categories WHERE slug = 'oracion' LIMIT 1),
    'pdf',
    'https://example.com/oracion-diaria.pdf',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    false,
    true
),
(
    'Aventuras Bíblicas para Pequeños',
    'aventuras-biblicas-ninos',
    'Manual de actividades y dibujos para colorear basado en los evangelios.',
    (SELECT id FROM resource_categories WHERE slug = 'ninos' LIMIT 1),
    'pdf',
    'https://example.com/aventuras-biblicas.pdf',
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800',
    false,
    true
),
(
    'Estudio de Efesios en 40 Días',
    'estudio-efesios-40-dias',
    'Plan de lectura y preguntas de reflexión para grupos pequeños o estudio personal.',
    (SELECT id FROM resource_categories WHERE slug = 'estudio-biblico' LIMIT 1),
    'pdf',
    'https://example.com/efesios-40-dias.pdf',
    'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800',
    false,
    true
),
(
    'Manual de Gestión Ministerial',
    'manual-gestion-ministerial',
    'Herramientas organizativas para pastores y servidores locales.',
    (SELECT id FROM resource_categories WHERE slug = 'liderazgo' LIMIT 1),
    'pdf',
    'https://example.com/gestion-ministerial.pdf',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    false,
    true
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- DEVOTIONALS
-- ============================================
INSERT INTO devotionals (
    title,
    slug,
    content,
    scripture_reference,
    publish_date,
    is_published
) VALUES
(
    'Nueva Criatura en Cristo',
    'nueva-criatura-cristo',
    '<p>Cada día es una oportunidad para comenzar de nuevo. En Cristo, nuestro pasado ya no define nuestro futuro. Hoy te invitamos a reflexionar sobre la renovación espiritual que Dios ofrece a todos los que creen en Él.</p><p>La transformación no es instantánea, pero es real. Dios trabaja en nosotros día a día, moldeándonos a la imagen de Cristo.</p>',
    '2 Corintios 5:17',
    CURRENT_DATE,
    true
),
(
    'La Paz que Sobrepasa Todo Entendimiento',
    'paz-sobrepasa-entendimiento',
    '<p>En medio de las tormentas de la vida, Dios nos ofrece una paz que el mundo no puede dar. Esta paz no depende de nuestras circunstancias, sino de nuestra relación con Cristo.</p>',
    'Filipenses 4:7',
    CURRENT_DATE + INTERVAL '1 day',
    true
),
(
    'Fortaleza en la Debilidad',
    'fortaleza-debilidad',
    '<p>Cuando reconocemos nuestra debilidad, abrimos espacio para que el poder de Dios se manifieste en nuestras vidas. No tenemos que ser fuertes por nosotros mismos.</p>',
    '2 Corintios 12:9',
    CURRENT_DATE + INTERVAL '2 days',
    true
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- EVENTS
-- ============================================
INSERT INTO events (
    title,
    slug,
    description,
    event_date,
    location,
    image,
    is_featured,
    is_published
) VALUES
(
    'Vigilia de Oración',
    'vigilia-oracion-octubre',
    'Únete a nosotros para una noche de adoración y oración intercesora por nuestra comunidad y nación. Horario: 7:00 PM - 10:00 PM',
    (CURRENT_DATE + INTERVAL '7 days')::TIMESTAMPTZ + INTERVAL '19 hours',
    'Templo Central',
    'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=800',
    true,
    true
),
(
    'Grupo de Jóvenes',
    'grupo-jovenes-semanal',
    'Encuentro semanal de jóvenes con alabanza, enseñanza y comunión. Horario: 6:30 PM - 8:30 PM',
    (CURRENT_DATE + INTERVAL '3 days')::TIMESTAMPTZ + INTERVAL '18 hours 30 minutes',
    'Salón Comunitario',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
    true,
    true
),
(
    'Culto de Adoración',
    'culto-adoracion-domingo',
    'Servicio dominical con predicación de la Palabra y adoración congregacional. Horario: 10:00 AM - 12:00 PM',
    (CURRENT_DATE + INTERVAL '5 days')::TIMESTAMPTZ + INTERVAL '10 hours',
    'Auditorio Principal',
    'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800',
    true,
    true
),
(
    'Escuela Bíblica Dominical',
    'escuela-biblica-dominical',
    'Clases de estudio bíblico para todas las edades. Horario: 9:00 AM - 10:00 AM',
    (CURRENT_DATE + INTERVAL '5 days')::TIMESTAMPTZ + INTERVAL '9 hours',
    'Salones de Clase',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=800',
    false,
    true
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- MINISTRIES
-- ============================================
INSERT INTO ministries (
    name,
    slug,
    description,
    leader_name,
    leader_email,
    meeting_day,
    meeting_time,
    location,
    image,
    is_active
) VALUES
(
    'Ministerio de Alabanza',
    'alabanza',
    'Guiamos a la congregación en adoración a través de la música y el canto.',
    'Carlos Méndez',
    'alabanza@mivn.org',
    'Miércoles',
    '7:00 PM',
    'Templo Central',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    true
),
(
    'Ministerio de Niños',
    'ninos',
    'Enseñamos la Palabra de Dios a los más pequeños de manera creativa y divertida.',
    'María González',
    'ninos@mivn.org',
    'Domingo',
    '10:00 AM',
    'Salón Infantil',
    'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800',
    true
),
(
    'Ministerio de Jóvenes',
    'jovenes',
    'Espacio para que los jóvenes crezcan en su fe y desarrollen su identidad en Cristo.',
    'David Ramírez',
    'jovenes@mivn.org',
    'Viernes',
    '7:00 PM',
    'Salón de Jóvenes',
    'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
    true
),
(
    'Ministerio de Intercesión',
    'intercesion',
    'Nos dedicamos a la oración por las necesidades de la iglesia y la comunidad.',
    'Ana Torres',
    'oracion@mivn.org',
    'Martes y Jueves',
    '6:00 AM',
    'Sala de Oración',
    'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&q=80&w=800',
    true
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- SITE SETTINGS
-- ============================================
INSERT INTO site_settings (key, value, type, description) VALUES
('site_name', 'Ministerio Internacional Vida Nueva', 'string', 'Nombre del sitio'),
('site_description', 'Transformando vidas a través del amor de Cristo', 'string', 'Descripción del sitio'),
('contact_email', 'contacto@mivn.org', 'string', 'Email de contacto'),
('contact_phone', '+1 234 567 890', 'string', 'Teléfono de contacto'),
('address', 'Calle Principal #123, Ciudad de Fe, CP 54321', 'string', 'Dirección física'),
('facebook_url', 'https://facebook.com/mivn', 'string', 'URL de Facebook'),
('instagram_url', 'https://instagram.com/mivn', 'string', 'URL de Instagram'),
('youtube_url', 'https://youtube.com/@mivn', 'string', 'URL de YouTube'),
('primary_color', '#3B82F6', 'string', 'Color primario'),
('secondary_color', '#F59E0B', 'string', 'Color secundario')
ON CONFLICT (key) DO UPDATE SET
    value = EXCLUDED.value,
    updated_at = NOW();

-- ============================================
-- PRAYER REQUESTS (Examples)
-- ============================================
INSERT INTO prayer_requests (
    requester_name,
    email,
    request,
    is_anonymous,
    is_approved,
    is_answered
) VALUES
(
    'Juan Pérez',
    'juan@example.com',
    'Por sanidad de mi madre que está enferma',
    false,
    true,
    false
),
(
    'Anónimo',
    'anonimo@example.com',
    'Por restauración familiar',
    true,
    true,
    false
),
(
    'María López',
    'maria@example.com',
    'Por provisión económica',
    false,
    false,
    false
)
ON CONFLICT DO NOTHING;

-- ============================================
-- NEWSLETTER SUBSCRIPTIONS (Examples)
-- ============================================
INSERT INTO newsletter_subscriptions (
    email,
    name,
    is_active
) VALUES
('suscriptor1@example.com', 'Pedro Martínez', true),
('suscriptor2@example.com', 'Laura Sánchez', true),
('suscriptor3@example.com', 'Roberto García', true)
ON CONFLICT (email) DO NOTHING;


-- ============================================
-- BULLETINS
-- ============================================
INSERT INTO bulletins (
    title,
    slug,
    content,
    pdf_url,
    publish_date,
    is_published
) VALUES
(
    'Boletín Mensual - Enero 2026',
    'boletin-enero-2026',
    'Bienvenido a nuestro primer boletín del año. En esta edición compartimos los planes y metas para nuestro ministerio en el 2026, testimonios de bendición y el calendario de actividades del mes.',
    'https://example.com/boletin-enero-2026.pdf',
    CURRENT_DATE,
    true
),
(
    'Boletín Mensual - Diciembre 2025',
    'boletin-diciembre-2025',
    'Especial de Navidad: Celebrando el nacimiento de nuestro Salvador. Resumen de las misiones de fin de año y anuncios para el servicio de Año Nuevo.',
    'https://example.com/boletin-diciembre-2025.pdf',
    CURRENT_DATE - INTERVAL '1 month',
    true
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- TESTIMONIES
-- ============================================
INSERT INTO testimonies (
    author_name,
    author_role,
    content,
    image,
    is_featured,
    is_approved,
    "order"
) VALUES
(
    'Juan Martínez',
    'Miembro de la Iglesia',
    'Llegué al Ministerio Vida Nueva en un momento de gran oscuridad en mi vida. A través de la comunidad y la enseñanza de la Palabra, encontré la esperanza y la paz que solo Cristo puede dar.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    true,
    true,
    1
),
(
    'Elena García',
    'Líder de Jóvenes',
    'Ver a nuestros jóvenes apasionarse por Jesús y servir a los demás es el mayor testimonio de que Dios está obrando poderosamente en nuestra congregación.',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    true,
    true,
    2
),
(
    'Roberto Cruz',
    'Pastor Invitado',
    'La calidez y el compromiso de esta iglesia con las misiones es algo verdaderamente inspirador. Dios está usando a MIVN para alcanzar a las naciones.',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    false,
    true,
    3
)
ON CONFLICT DO NOTHING;

-- ============================================
-- DONATION CAMPAIGNS
-- ============================================
INSERT INTO donation_campaigns (
    name,
    slug,
    description,
    goal_amount,
    current_amount,
    start_date,
    end_date,
    image,
    is_active
) VALUES
(
    'Construcción Nuevo Templo',
    'construccion-nuevo-templo',
    'Estamos recaudando fondos para la ampliación de nuestro santuario principal para poder recibir a más familias de nuestra comunidad.',
    50000.00,
    12500.00,
    CURRENT_DATE - INTERVAL '2 months',
    CURRENT_DATE + INTERVAL '6 months',
    'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800',
    true
),
(
    'Misiones Internacionales 2026',
    'misiones-internacionales-2026',
    'Apoya nuestro viaje misionero a Ecuador y Perú, llevando el evangelio y ayuda humanitaria a las comunidades más necesitadas.',
    10000.00,
    3450.00,
    CURRENT_DATE,
    CURRENT_DATE + INTERVAL '4 months',
    'https://images.unsplash.com/photo-1545231027-63b3f16246c7?auto=format&fit=crop&q=80&w=800',
    true
)
ON CONFLICT (slug) DO NOTHING;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '✅ Seed data inserted successfully!';
    RAISE NOTICE '📊 Created:';
    RAISE NOTICE '   - 5 Resource Categories';
    RAISE NOTICE '   - 5 Resources (1 featured)';
    RAISE NOTICE '   - 3 Devotionals';
    RAISE NOTICE '   - 4 Events';
    RAISE NOTICE '   - 4 Ministries';
    RAISE NOTICE '   - 10 Site Settings (key-value pairs)';
    RAISE NOTICE '   - 3 Prayer Requests';
    RAISE NOTICE '   - 3 Newsletter Subscriptions';
    RAISE NOTICE '   - 2 Bulletins';
    RAISE NOTICE '   - 3 Testimonies';
    RAISE NOTICE '   - 2 Donation Campaigns';
    RAISE NOTICE '';
    RAISE NOTICE '🎉 Your database is completely ready!';
    RAISE NOTICE '📄 Check /recursos, /eventos, /ministerios, /boletin, /testimonios';
END $$;
