-- Agregar campos avanzados para diplomas profesionales en courses
ALTER TABLE courses 
ADD COLUMN IF NOT EXISTS diploma_program_name TEXT,
ADD COLUMN IF NOT EXISTS diploma_member_text TEXT DEFAULT 'es un miembro del programa académico',
ADD COLUMN IF NOT EXISTS diploma_seal_url TEXT,
ADD COLUMN IF NOT EXISTS diploma_signer1_name TEXT,
ADD COLUMN IF NOT EXISTS diploma_signer1_title TEXT,
ADD COLUMN IF NOT EXISTS diploma_signer2_name TEXT,
ADD COLUMN IF NOT EXISTS diploma_signer2_title TEXT,
ADD COLUMN IF NOT EXISTS diploma_show_lessons BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS diploma_title_text TEXT DEFAULT 'CERTIFICADO DE ESTUDIOS',
ADD COLUMN IF NOT EXISTS diploma_lessons_list TEXT[] DEFAULT '{}';

-- Comentarios
COMMENT ON COLUMN courses.diploma_program_name IS 'Nombre del programa académico mostrado en el diploma';
COMMENT ON COLUMN courses.diploma_member_text IS 'Texto de membresía del programa';
COMMENT ON COLUMN courses.diploma_seal_url IS 'URL del sello/logo central del diploma';
COMMENT ON COLUMN courses.diploma_signer1_name IS 'Nombre del primer firmante';
COMMENT ON COLUMN courses.diploma_signer1_title IS 'Cargo del primer firmante';
COMMENT ON COLUMN courses.diploma_signer2_name IS 'Nombre del segundo firmante';
COMMENT ON COLUMN courses.diploma_signer2_title IS 'Cargo del segundo firmante';
COMMENT ON COLUMN courses.diploma_show_lessons IS 'Mostrar lista de lecciones en el diploma';
COMMENT ON COLUMN courses.diploma_title_text IS 'Título principal del diploma';
COMMENT ON COLUMN courses.diploma_lessons_list IS 'Array de lecciones/módulos completados';
