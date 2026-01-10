export interface BookMetadata {
    title: string;
    image: string;
    author: string;
    date: string;
    context: string;
    themes: string[];
    intro: string;
    relatedVerses: Array<{ ref: string; text: string; }>;
}

export const BIBLE_METADATA: Record<string, BookMetadata> = {
    "Juan": {
        title: "Evangelio según Juan",
        image: "/bible-covers/juan.jpg",
        author: "Juan el Apóstol",
        date: "90 d.C.",
        context: "Escrito en Éfeso para fortalecer la fe de los cristianos y evangelizar a los no creyentes, enfatizando la divinidad de Cristo frente a herejías tempranas.",
        themes: ["Divinidad de Jesús", "Vida Eterna", "Luz vs Tinieblas", "Creer/Fe"],
        intro: "Juan presenta a Jesús no solo como el Mesías judío, sino como el Logos eterno, el Hijo de Dios que revela al Padre.",
        relatedVerses: [
            { ref: "Lucas 19:10", text: "Porque el Hijo del Hombre vino a buscar y a salvar lo que se había perdido." },
            { ref: "Romanos 5:8", text: "Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros." },
            { ref: "1 Juan 4:9", text: "En esto se mostró el amor de Dios para con nosotros, en que Dios envió a su Hijo unigénito al mundo..." }
        ]
    },
    "Génesis": {
        title: "Génesis",
        image: "/bible-covers/genesis-v2.jpg",
        author: "Moisés",
        date: "1440 a.C.",
        context: "El libro de los orígenes. Narra la creación, la caída del hombre y la elección de la familia de Abraham para bendecir a las naciones.",
        themes: ["Creación", "Pacto", "Providencia", "Pecado y Redención"],
        intro: "Génesis establece el escenario para toda la Biblia, mostrando cómo Dios comienza su plan de redención a través de un pueblo elegido.",
        relatedVerses: [
            { ref: "Juan 1:1", text: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios." },
            { ref: "Hebreos 11:3", text: "Por la fe entendemos haber sido constituido el universo por la palabra de Dios..." },
            { ref: "Salmos 8:3", text: "Cuando veo tus cielos, obra de tus dedos, La luna y las estrellas que tú formaste..." }
        ]
    },
    "Romanos": {
        title: "Epístola a los Romanos",
        image: "/bible-covers/romanos.jpg",
        author: "Pablo",
        date: "57 d.C.",
        context: "La exposición más sistemática del evangelio, escrita a la iglesia en la capital del imperio para unificar a judíos y gentiles.",
        themes: ["Justicia de Dios", "Justificación por Fe", "Santificación", "Soberanía"],
        intro: "Pablo articula magistralmente cómo el evangelio revela la justicia de Dios, salvando a todo aquel que cree.",
        relatedVerses: [
            { ref: "Gálatas 2:16", text: "sabiendo que el hombre no es justificado por las obras de la ley, sino por la fe de Jesucristo..." },
            { ref: "Habacuc 2:4", text: "He aquí que aquel cuya alma no es recta, se enorgullece; mas el justo por su fe vivirá." },
            { ref: "Efesios 2:8", text: "Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios." }
        ]
    },
    "Éxodo": {
        title: "Éxodo",
        image: "/bible-covers/genesis-v2.jpg",
        author: "Moisés",
        date: "1445 a.C.",
        context: "Narra la liberación de Israel de la esclavitud en Egipto, el pacto en el Sinaí y la construcción del Tabernáculo.",
        themes: ["Redención", "La Ley", "Presencia de Dios", "Pacto"],
        intro: "Dios escucha el clamor de su pueblo y levanta a Moisés para liberarlos, estableciéndolos como una nación santa.",
        relatedVerses: [
            { ref: "Hebreos 11:23-29", text: "Por la fe Moisés, cuando nació, fue escondido por sus padres... Por la fe pasaron el Mar Rojo..." },
            { ref: "1 Corintios 10:1-4", text: "nuestros padres todos estuvieron bajo la nube, y todos pasaron el mar..." }
        ]
    },
    "Salmos": {
        title: "Salmos",
        image: "/bible-covers/salmos.jpg",
        author: "David y otros",
        date: "1000-400 a.C.",
        context: "El himnario de Israel. Una colección de oraciones, poemas y cánticos que expresan toda la gama de emociones humanas ante Dios.",
        themes: ["Adoración", "Lamento", "Confianza", "Reinado de Dios"],
        intro: "Desde valles oscuros hasta cumbres de alabanza, los Salmos nos enseñan cómo relacionarnos honestamente con Dios.",
        relatedVerses: [
            { ref: "Efesios 5:19", text: "hablando entre vosotros con salmos, con himnos y cánticos espirituales, cantando y alabando al Señor..." },
            { ref: "Santiago 5:13", text: "¿Está alguno entre vosotros afligido? Haga oración. ¿Está alguno alegre? Cante alabanzas." }
        ]
    },
    "Mateo": {
        title: "Evangelio según Mateo",
        image: "/bible-covers/mateo.jpg",
        author: "Mateo",
        date: "60-65 d.C.",
        context: "Escrito principalmente para judíos, demostrando que Jesús es el Mesías prometido que cumple las profecías del Antiguo Testamento.",
        themes: ["Reino de los Cielos", "Cumplimiento Profético", "Discipulado"],
        intro: "Mateo presenta a Jesús como el nuevo Moisés y el Rey Davidico, estableciendo el Reino de los Cielos en la tierra.",
        relatedVerses: [
            { ref: "Miqueas 5:2", text: "Pero tú, Belén Efrata... de ti me saldrá el que será Señor en Israel..." },
            { ref: "Génesis 12:3", text: "y serán benditas en ti todas las familias de la tierra." }
        ]
    },
    "Apocalipsis": {
        title: "Apocalipsis",
        image: "/bible-covers/apocalipsis.jpg",
        author: "Juan",
        date: "95 d.C.",
        context: "Revelación dada a Juan en Patmos para alentar a las iglesias perseguidas con la visión del triunfo final de Cristo.",
        themes: ["Soberanía Divina", "Juicio Final", "Nueva Creación", "Victoria del Cordero"],
        intro: "La revelación de Jesucristo sobre las cosas que deben suceder pronto, culminando en la renovación de todas las cosas.",
        relatedVerses: [
            { ref: "Daniel 7:13-14", text: "Miraba yo en la visión de la noche, y he aquí... uno como un hijo de hombre..." },
            { ref: "Isaías 65:17", text: "Porque he aquí que yo crearé nuevos cielos y nueva tierra..." }
        ]
    },
    // Fallback genérico para otros libros
    "DEFAULT": {
        title: "Libro Bíblico",
        image: "/bible-covers/genesis-v2.jpg",
        author: "Autor Bíblico",
        date: "Antigüedad",
        context: "Este libro forma parte del canon inspirado de las Escrituras, revelando el carácter de Dios y su plan para la humanidad.",
        themes: ["Redención", "Revelación", "Fe", "Obediencia"],
        intro: "Explore este libro para descubrir más sobre la historia de la salvación y la voluntad de Dios para su pueblo.",
        relatedVerses: [
            { ref: "2 Timoteo 3:16", text: "Toda la Escritura es inspirada por Dios, y útil para enseñar, para redargüir..." },
            { ref: "Salmos 119:105", text: "Lámpara es a mis pies tu palabra, Y lumbrera a mi camino." }
        ]
    }
};

export function getBookMetadata(bookName: string): BookMetadata {
    const meta = BIBLE_METADATA[bookName] || { ...BIBLE_METADATA["DEFAULT"], title: bookName };

    if (meta.image && meta.image.startsWith('/')) {
        return meta;
    }

    // Generate slug for local image
    const slug = bookName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .toLowerCase()
        .replace(/ /g, "-") // spaces to hyphens
        .replace(/[^a-z0-9-]/g, ""); // strict hygiene

    return {
        ...meta,
        image: `/bible-covers/${slug}.jpg`
    };
}
