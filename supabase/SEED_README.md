# 🌱 Supabase Seed Data

Este archivo contiene datos de ejemplo para poblar la base de datos de MIVN Biblia.

## 📋 Datos Incluidos

El seed crea:
- ✅ **5 Categorías de Recursos** (Estudio Bíblico, Liderazgo, Niños, Oración, Discipulado)
- ✅ **5 Recursos** (1 destacado: "Fundamentos para Líderes de Hoy")
- ✅ **3 Devocionales** (incluyendo uno para hoy)
- ✅ **4 Eventos** (Vigilia, Grupo de Jóvenes, Culto, Escuela Bíblica)
- ✅ **4 Ministerios** (Alabanza, Niños, Jóvenes, Intercesión)
- ✅ **3 Peticiones de Oración** (ejemplos)
- ✅ **3 Suscriptores al Boletín**
- ✅ **Configuración del Sitio**

## 🚀 Cómo Ejecutar

### Opción 1: Supabase Local (Recomendado para desarrollo)

```bash
# Asegúrate de que Supabase esté corriendo localmente
npx supabase start

# Ejecuta el seed
npx supabase db seed
```

### Opción 2: Supabase Remoto (Producción)

```bash
# Ejecuta el seed en tu proyecto remoto
npx supabase db seed --db-url "postgresql://postgres:[PASSWORD]@[PROJECT_REF].supabase.co:5432/postgres"
```

O también puedes:

1. Ir a tu proyecto en Supabase Dashboard
2. SQL Editor
3. Copiar y pegar el contenido de `supabase/seed.sql`
4. Ejecutar

## ⚠️ Notas Importantes

1. **URLs de Archivos**: Los recursos tienen URLs de ejemplo (`https://example.com/...`). Deberás reemplazarlas con URLs reales de archivos subidos a Supabase Storage.

2. **Imágenes**: Las imágenes usan URLs de Unsplash. Son funcionales pero considera subir tus propias imágenes a Supabase Storage.

3. **Fechas de Eventos**: Los eventos se crean con fechas relativas a la fecha actual:
   - Vigilia: +7 días
   - Grupo de Jóvenes: +3 días
   - Culto: +5 días

4. **Devocional de Hoy**: Se crea automáticamente un devocional para la fecha actual.

## 🔄 Resetear Datos

Si quieres limpiar y volver a ejecutar el seed:

```bash
# Resetear la base de datos local
npx supabase db reset

# Esto ejecutará automáticamente las migraciones y el seed
```

## 📝 Personalización

Puedes editar `supabase/seed.sql` para:
- Cambiar los textos y descripciones
- Agregar más datos de ejemplo
- Modificar las URLs de imágenes
- Ajustar fechas y horarios

## ✅ Verificación

Después de ejecutar el seed, verifica que los datos se crearon:

1. Ve a `http://localhost:3000/recursos` - Deberías ver 5 recursos
2. Ve a `http://localhost:3000/eventos` - Deberías ver 4 eventos
3. Ve a `http://localhost:3000/ministerios` - Deberías ver 4 ministerios
4. Ve a `http://localhost:3000` - El devocional de hoy debería aparecer

## 🎯 Próximos Pasos

Después de ejecutar el seed:

1. **Sube archivos reales** a Supabase Storage
2. **Actualiza las URLs** de los recursos con las URLs reales
3. **Personaliza el contenido** según tus necesidades
4. **Agrega más datos** desde el panel de admin en `/admin/gestion-web`
