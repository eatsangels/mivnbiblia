-- Seed data for Events table
-- Images from Unsplash

INSERT INTO events (title, slug, description, event_date, start_time, end_time, location, image, is_featured, is_published, category, capacity, speaker)
VALUES
-- Featured Events
('Noche de Adoración: Cielos Abiertos', 'noche-adoracion-cielos-abiertos', 'Únete a nosotros para una noche poderosa de alabanza y adoración donde buscaremos la presencia de Dios juntos. Tendremos invitados especiales y un tiempo de ministración profética.', '2026-02-15 19:00:00+00', '2026-02-15 19:00:00+00', '2026-02-15 22:00:00+00', 'Santuario Principal', 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=2073', true, true, 'Culto', 500, 'Pastor Juan Pérez'),

('Conferencia de Mujeres: Valientes y Esforzadas', 'conferencia-mujeres-valientes', 'Un día diseñado para empoderar a las mujeres de fe. Talleres sobre liderazgo, familia y propósito divino. Incluye almuerzo y cuidado de niños.', '2026-03-08 09:00:00+00', '2026-03-08 09:00:00+00', '2026-03-08 16:00:00+00', 'Salón de Eventos MIVN', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=2064', true, true, 'Congreso', 300, 'Profeta Ana García'),

('Retiro Juvenil: Despertar 2026', 'retiro-juvenil-despertar', 'Un fin de semana inolvidable en las montañas. Juegos extremos, fogatas, y encuentros genuinos con Dios. ¡No te lo puedes perder!', '2026-04-10 17:00:00+00', '2026-04-10 17:00:00+00', '2026-04-12 12:00:00+00', 'Campamento Monte Horeb', 'https://images.unsplash.com/photo-1526638684360-92641f902787?auto=format&fit=crop&q=80&w=2574', true, true, 'Campamento', 150, 'Líder Carlos Torres'),

-- Regular Events
('Seminario de Finanzas Bíblicas', 'seminario-finanzas', 'Aprende principios bíblicos para manejar tus finanzas, salir de deudas y prosperar en el Reino. Trae tu libreta y muchas ganas de aprender.', '2026-02-20 19:30:00+00', '2026-02-20 19:30:00+00', '2026-02-20 21:00:00+00', 'Aula 3 - Edificio Educativo', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=2000', false, true, 'Taller', 50, 'Hermano Pedro Martínez'),

('Vigilia de Oración Intercesora', 'vigilia-oracion', 'Una noche dedicada a interceder por nuestra nación, familias y la iglesia global. "Si mi pueblo se humillare... yo sanaré su tierra".', '2026-02-27 22:00:00+00', '2026-02-27 22:00:00+00', '2026-02-28 04:00:00+00', 'Capilla de Oración', 'https://images.unsplash.com/photo-1510936111840-65e151ad71bb?auto=format&fit=crop&q=80&w=2090', false, true, 'Oración', 100, 'Equipo de Intercesión'),

('Clase de Bautismo', 'clase-bautismo', 'Preparación para los nuevos creyentes que desean dar el paso de fe del bautismo en agua. Requisito indispensable para la ceremonia del próximo mes.', '2026-02-12 19:00:00+00', '2026-02-12 19:00:00+00', '2026-02-12 20:30:00+00', 'Sala de Conferencias', 'https://images.unsplash.com/photo-1505506874110-6a7a69069d08?auto=format&fit=crop&q=80&w=987', false, true, 'Clase', 20, 'Pastora Elena');
