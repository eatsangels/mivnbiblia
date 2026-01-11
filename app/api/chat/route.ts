import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `Eres el "Asistente Socrático" de MIVN (Biblia). 
Tu misión es ayudar al usuario a profundizar en las escrituras bíblicas utilizando el método socrático.
En lugar de dar respuestas directas y dogmáticas, debes:
1. Hacer preguntas que inviten a la reflexión y al estudio personal.
2. Considerar el contexto histórico, cultural y literario de los pasajes.
3. Fomentar que el usuario compare diferentes versiones o pasajes relacionados.
4. Mantener un tono humilde, sabio y alentador.
5. Si el usuario te envía un versículo específico, enfócate en ese contexto pero sin ser limitante.
6. Tus respuestas deben ser breves (máximo 2-3 párrafos) y siempre terminar con una pregunta provocadora pero respetuosa.

IMPORTANTE: Responde siempre en ESPAÑOL. No inventes doctrinas, enfócate en el texto y su contexto histórico.`;

export async function POST(req: Request) {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
        return NextResponse.json({ error: 'GEMINI_API_KEY no configurada' }, { status: 500 });
    }

    try {
        const { messages, contextVerse } = await req.json();
        const lastUserMsg = messages[messages.length - 1].content;
        
        // Construir contents para la API de Google
        // NOTA: Gemini 2.0+ soporta system_instruction en v1beta, pero vía fetch 
        // inyectarlo en el historial es muy efectivo.
        const contents = messages.map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
        }));

        // Inyectar el system prompt y contexto en el mensaje de usuario más reciente
        // Buscamos el último mensaje de tipo 'user'
        for (let i = contents.length - 1; i >= 0; i--) {
            if (contents[i].role === 'user') {
                contents[i].parts[0].text = `${SYSTEM_PROMPT}\n\n` + 
                                           (contextVerse ? `Contexto del versículo: "${contextVerse}"\n\n` : '') + 
                                           `Usuario dice: ${contents[i].parts[0].text}`;
                break;
            }
        }

        // Usamos gemini-2.0-flash que apareció en tu lista de diagnósticos
        // Usamos v1beta para modelos 2.0
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Gemini API Error:', data);
            return NextResponse.json(
                { error: data.error?.message || 'Error en la API de Gemini' },
                { status: response.status }
            );
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            return NextResponse.json({ error: 'La IA no devolvió una respuesta válida.' }, { status: 500 });
        }

        return NextResponse.json({ content: text });
    } catch (error: any) {
        console.error('Critical Error in /api/chat:', error);
        return NextResponse.json(
            { error: `Error interno de conexión: ${error?.message}` },
            { status: 500 }
        );
    }
}
