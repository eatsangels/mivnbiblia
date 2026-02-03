-- Agregar campos avanzados para diplomas en user_certificates
ALTER TABLE user_certificates
ADD COLUMN IF NOT EXISTS program_name TEXT,
ADD COLUMN IF NOT EXISTS member_text TEXT,
ADD COLUMN IF NOT EXISTS seal_url TEXT,
ADD COLUMN IF NOT EXISTS signer1_name TEXT,
ADD COLUMN IF NOT EXISTS signer1_title TEXT,
ADD COLUMN IF NOT EXISTS signer2_name TEXT,
ADD COLUMN IF NOT EXISTS signer2_title TEXT,
ADD COLUMN IF NOT EXISTS show_lessons BOOLEAN,
ADD COLUMN IF NOT EXISTS title_text TEXT,
ADD COLUMN IF NOT EXISTS lessons_completed TEXT[];

-- Comentarios
COMMENT ON COLUMN user_certificates.program_name IS 'Copia del nombre del programa al momento de emisión';
COMMENT ON COLUMN user_certificates.member_text IS 'Copia del texto de membresía';
COMMENT ON COLUMN user_certificates.seal_url IS 'Copia del sello/logo';
COMMENT ON COLUMN user_certificates.signer1_name IS 'Copia del nombre firmante 1';
COMMENT ON COLUMN user_certificates.signer1_title IS 'Copia del cargo firmante 1';
COMMENT ON COLUMN user_certificates.signer2_name IS 'Copia del nombre firmante 2';
COMMENT ON COLUMN user_certificates.signer2_title IS 'Copia del cargo firmante 2';
COMMENT ON COLUMN user_certificates.show_lessons IS 'Si debe mostrar lista de lecciones';
COMMENT ON COLUMN user_certificates.title_text IS 'Título del diploma';
COMMENT ON COLUMN user_certificates.lessons_completed IS 'Array de lecciones completadas';
