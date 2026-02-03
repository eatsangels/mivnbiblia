-- Agregar campos de texto personalizables para diplomas en la tabla user_certificates
ALTER TABLE user_certificates
ADD COLUMN IF NOT EXISTS intro_text TEXT,
ADD COLUMN IF NOT EXISTS completion_text TEXT,
ADD COLUMN IF NOT EXISTS signature_title TEXT;

-- Comentarios para documentación
COMMENT ON COLUMN user_certificates.intro_text IS 'Copia del texto introductorio del curso al momento de emisión';
COMMENT ON COLUMN user_certificates.completion_text IS 'Copia del texto de completación del curso al momento de emisión';
COMMENT ON COLUMN user_certificates.signature_title IS 'Copia del título de firma del curso al momento de emisión';
