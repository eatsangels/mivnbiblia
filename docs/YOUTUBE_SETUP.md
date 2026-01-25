# Guía: Cómo Obtener las Credenciales de YouTube API

## 1. Obtener YouTube API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. En el menú lateral, ve a **APIs y servicios** → **Biblioteca**
4. Busca "YouTube Data API v3" y haz clic en él
5. Haz clic en **Habilitar**
6. Ve a **APIs y servicios** → **Credenciales**
7. Haz clic en **Crear credenciales** → **Clave de API**
8. Copia la clave generada
9. (Opcional pero recomendado) Haz clic en la clave para editarla y restringir su uso:
   - **Restricciones de aplicación**: Sitios web
   - **Restricciones de API**: Solo YouTube Data API v3

## 2. Obtener YouTube Channel ID

### Opción A: Desde YouTube Studio
1. Ve a [YouTube Studio](https://studio.youtube.com/)
2. En el menú lateral, ve a **Configuración** → **Canal** → **Información básica**
3. Copia el **ID del canal** (empieza con `UC...`)

### Opción B: Desde la URL del canal
1. Ve a tu canal de YouTube
2. La URL será algo como: `https://www.youtube.com/@tucanal`
3. Haz clic derecho → Ver código fuente
4. Busca `"channelId"` o `"externalId"`
5. Copia el ID que empieza con `UC...`

## 3. Configurar Variables de Entorno

Agrega estas líneas a tu archivo `.env.local`:

```env
# YouTube API Configuration
YOUTUBE_API_KEY=tu_api_key_aqui
YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxx
```

**Nota**: `NEXT_PUBLIC_YOUTUBE_CHANNEL_ID` se usa en el cliente para el botón de suscripción.

## 4. Verificar que Funciona

1. Reinicia el servidor de desarrollo (`npm run dev`)
2. Ve a `/cultos` en tu navegador
3. Deberías ver:
   - Si hay un stream en vivo: El player con la transmisión
   - Si no hay stream: La galería de videos recientes del canal

## Límites de la API

La YouTube Data API tiene un límite de **10,000 unidades por día** (gratis).
- Cada búsqueda de videos cuesta ~100 unidades
- Cada consulta de detalles cuesta ~1 unidad por video

Con el caché implementado (revalidación cada 60 segundos para live, 1 hora para videos), no deberías tener problemas con el límite.
