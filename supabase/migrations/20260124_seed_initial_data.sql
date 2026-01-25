-- Migration: Seed Initial Data
-- Description: Insert initial data for CMS tables
-- Created: 2026-01-24

-- ============================================
-- NAVIGATION MENU
-- ============================================
INSERT INTO navigation_menus (id, name) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'main-nav');

INSERT INTO navigation_items (menu_id, label, url, "order") VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Estudio', '/read', 1),
('550e8400-e29b-41d4-a716-446655440000', 'Cultos', '/cultos', 2),
('550e8400-e29b-41d4-a716-446655440000', 'Recursos', '/recursos', 3),
('550e8400-e29b-41d4-a716-446655440000', 'Oración', '/oracion', 4),
('550e8400-e29b-41d4-a716-446655440000', 'Ministerios', '/ministerios', 5),
('550e8400-e29b-41d4-a716-446655440000', 'Eventos', '/eventos', 6),
('550e8400-e29b-41d4-a716-446655440000', 'Boletín', '/boletin', 7),
('550e8400-e29b-41d4-a716-446655440000', 'Devocional', '/devocionales', 8),
('550e8400-e29b-41d4-a716-446655440000', 'Nosotros', '/sobre-nosotros', 9);

-- ============================================
-- PAGES
-- ============================================
INSERT INTO pages (slug, title, subtitle, content, meta_description, is_published, "order") VALUES
('home', 'Bienvenidos a MIVN', 'Ministerio Internacional Vida Nueva', 
'<h2>Transformando vidas a través del amor de Cristo</h2>
<p>Somos una comunidad dedicada a la fe, la esperanza y el servicio al prójimo. Únete a nosotros en este viaje espiritual.</p>', 
'Ministerio Internacional Vida Nueva - Transformando vidas a través del amor de Cristo', 
true, 1),

('sobre-nosotros', 'Sobre Nosotros', 'Conoce nuestra historia y misión',
'<h2>Nuestra Historia</h2>
<p>El Ministerio Internacional Vida Nueva (MIVN) nació con la visión de llevar el mensaje de esperanza y transformación a través de Cristo.</p>
<h2>Nuestra Misión</h2>
<p>Predicar el evangelio, discipular creyentes y servir a nuestra comunidad con amor.</p>
<h2>Nuestros Valores</h2>
<ul>
<li>Fe en Jesucristo</li>
<li>Amor al prójimo</li>
<li>Integridad y transparencia</li>
<li>Servicio comunitario</li>
</ul>',
'Conoce la historia, misión y valores del Ministerio Internacional Vida Nueva',
true, 2);

-- ============================================
-- MINISTRIES
-- ============================================
INSERT INTO ministries (name, slug, description, leader_name, meeting_day, meeting_time, is_active, "order") VALUES
('Ministerio de Jóvenes', 'jovenes', 
'Un espacio para que los jóvenes crezcan en su fe, desarrollen sus talentos y sirvan a Dios con pasión.',
'Pastor Juan Pérez', 'Viernes', '7:00 PM', true, 1),

('Ministerio de Niños', 'ninos',
'Enseñando a los niños sobre el amor de Jesús a través de actividades dinámicas y educación bíblica.',
'Maestra María González', 'Domingo', '10:00 AM', true, 2),

('Ministerio de Adoración', 'adoracion',
'Guiando a la congregación en adoración y alabanza a través de la música y el canto.',
'Director Carlos Rodríguez', 'Domingo', '9:00 AM', true, 3),

('Ministerio de Mujeres', 'mujeres',
'Empoderando a las mujeres en su caminar con Cristo y fortaleciendo lazos de hermandad.',
'Líder Ana Martínez', 'Miércoles', '6:30 PM', true, 4),

('Ministerio de Hombres', 'hombres',
'Formando hombres de Dios comprometidos con su familia, iglesia y comunidad.',
'Líder Roberto Sánchez', 'Sábado', '8:00 AM', true, 5);

-- ============================================
-- RESOURCE CATEGORIES
-- ============================================
INSERT INTO resource_categories (name, slug, description, "order") VALUES
('Estudios Bíblicos', 'estudios-biblicos', 'Materiales para profundizar en la Palabra de Dios', 1),
('Sermones', 'sermones', 'Mensajes predicados en nuestros servicios', 2),
('Libros', 'libros', 'Libros cristianos recomendados', 3),
('Videos', 'videos', 'Contenido audiovisual edificante', 4),
('Música', 'musica', 'Alabanzas y adoración', 5);

-- ============================================
-- SITE SETTINGS
-- ============================================
INSERT INTO site_settings (key, value, type, description) VALUES
('site_name', 'Ministerio Internacional Vida Nueva', 'string', 'Nombre del sitio'),
('site_tagline', 'Transformando vidas a través del amor de Cristo', 'string', 'Lema del sitio'),
('contact_email', 'contacto@mivn.org', 'string', 'Email de contacto principal'),
('contact_phone', '+1 234 567 890', 'string', 'Teléfono de contacto'),
('address', 'Calle Principal #123, Ciudad de Fe, CP 54321', 'string', 'Dirección física'),
('facebook_url', 'https://facebook.com/mivn', 'string', 'URL de Facebook'),
('instagram_url', 'https://instagram.com/mivn', 'string', 'URL de Instagram'),
('youtube_url', 'https://youtube.com/@mivn', 'string', 'URL de YouTube'),
('service_time_sunday', '10:00 AM', 'string', 'Horario de culto dominical'),
('service_time_wednesday', '7:00 PM', 'string', 'Horario de culto entre semana');

-- ============================================
-- SAMPLE DEVOTIONAL
-- ============================================
INSERT INTO devotionals (title, slug, content, scripture_reference, author_name, publish_date, is_published) VALUES
('La Fe que Mueve Montañas', 'fe-que-mueve-montanas',
'<p>Hoy reflexionamos sobre el poder de la fe. Jesús nos enseñó que con fe del tamaño de un grano de mostaza, podemos mover montañas.</p>
<p>¿Qué montañas enfrentas hoy? ¿Problemas financieros? ¿Relaciones rotas? ¿Enfermedad? La fe no es la ausencia de duda, sino la decisión de confiar en Dios a pesar de las circunstancias.</p>
<p><strong>Oración:</strong> Señor, aumenta mi fe. Ayúdame a confiar en ti completamente, sabiendo que nada es imposible para ti. Amén.</p>',
'Mateo 17:20',
'Pastor Juan Pérez',
CURRENT_DATE,
true);

-- ============================================
-- SAMPLE EVENT
-- ============================================
INSERT INTO events (title, slug, description, event_date, location, is_featured, is_published) VALUES
('Conferencia Anual 2026', 'conferencia-anual-2026',
'Únete a nosotros para tres días de adoración, enseñanza y comunión. Tendremos invitados especiales, talleres y actividades para toda la familia.',
'2026-06-15 09:00:00',
'Centro de Convenciones Ciudad de Fe',
true,
true);
