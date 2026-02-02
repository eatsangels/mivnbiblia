-- Sembrar lecciones para el curso "Fundamentos de la Fe" (usando su ID conocido)
DO $$
DECLARE
    course_id_var UUID := '25b519b7-8598-4fdd-9023-5d0705cd9734';
BEGIN
    -- 1. Asegurar que el curso sea público y activo
    UPDATE courses 
    SET is_published = true, 
        is_active = true,
        instructor_name = 'Pastor Carlos Martínez',
        total_lessons = 5,
        updated_at = NOW()
    WHERE id = course_id_var;

    -- 2. Insertar lecciones si no existen
    IF NOT EXISTS (SELECT 1 FROM course_lessons WHERE course_id = course_id_var) THEN
        INSERT INTO course_lessons (course_id, title, description, content, video_url, duration_minutes, order_index, created_at)
        VALUES 
        (
            course_id_var,
            'La Naturaleza de Dios',
            'Comprendiendo quién es Dios y sus atributos eternos.',
            '<h1>Introducción</h1><p>Dios es espíritu, infinito, eterno e inmutable en su ser, sabiduría, poder, santidad, justicia, bondad y verdad.</p>',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ', -- Video URL dummy
            45,
            1,
            NOW()
        ),
        (
            course_id_var,
            'La Oración Efectiva',
            'Cómo comunicarnos con Dios de manera que transforme nuestras vidas.',
            '<h1>¿Qué es orar?</h1><p>Orar no es solo pedir, es conectar el corazón humano con el propósito divino.</p>',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            30,
            2,
            NOW()
        ),
        (
            course_id_var,
            'La Autoridad de la Biblia',
            'Por qué confiamos en las Escrituras como nuestra guía final.',
            '<h1>Inspiración Divina</h1><p>Toda la Escritura es inspirada por Dios y útil para enseñar, para redargüir, para corregir, para instruir en justicia.</p>',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            50,
            3,
            NOW()
        ),
        (
            course_id_var,
            'El Espíritu Santo en el Creyente',
            'El rol activo del Espíritu Santo en nuestra vida diaria.',
            '<h1>Nuestro Ayudador</h1><p>El Espíritu Santo nos guía a toda verdad y nos da poder para ser testigos.</p>',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            40,
            4,
            NOW(),
            NOW()
        ),
        (
            course_id_var,
            'Caminando en Fe',
            'Aplicando los principios bíblicos a las decisiones cotidianas.',
            '<h1>Fe es Acción</h1><p>La fe sin obras está muerta. Aprenderemos cómo vivir lo que creemos.</p>',
            'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            55,
            5,
            NOW()
        );
    END IF;

    -- 3. También publicar otros cursos de prueba para el catálogo
    UPDATE courses 
    SET is_published = true 
    WHERE id IN (
        '432bca94-8175-45b5-b349-2aaa97088961', -- Liderazgo Nivel 1
        '10ba6644-6480-4fd1-98d5-e51233841fbb'  -- Vida en el Espíritu
    );

END $$;
