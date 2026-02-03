-- Agregar campos de texto personalizables para diplomas en la tabla courses
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS diploma_intro_text TEXT DEFAULT 'Este documento certifica que',
ADD COLUMN IF NOT EXISTS diploma_completion_text TEXT DEFAULT 'Ha completado satisfactoriamente el curso',
ADD COLUMN IF NOT EXISTS diploma_signature_title TEXT DEFAULT 'Director MIVN';

-- Comentarios para documentación
COMMENT ON COLUMN courses.diploma_intro_text IS 'Texto introductorio del diploma (antes del nombre del estudiante)';
COMMENT ON COLUMN courses.diploma_completion_text IS 'Texto de completación del diploma (después del nombre del estudiante)';
COMMENT ON COLUMN courses.diploma_signature_title IS 'Título/cargo de quien firma el diploma';
