import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Parses a biblical reference string (e.g., "Génesis 1:1" or "Juan 3:16")
 * and returns a link to the Bible Reader.
 */
export function getBibleLinkFromRef(ref: string): string {
    if (!ref) return "/read/Genesis/1";

    // Standardize some naming if needed
    let cleanRef = ref.trim();

    // Split by space to separate book from chapter/verses
    // Handle cases like "1 Juan", "2 Crónicas"
    const parts = cleanRef.split(' ');

    let book = "";
    let chapter = "1";

    if (parts.length >= 2) {
        // If it starts with a number (1, 2, 3), combine the first two parts
        if (/^[1-3]$/.test(parts[0])) {
            book = `${parts[0]} ${parts[1]}`;
            // If there's a third part, it's the chapter
            if (parts[2]) {
                chapter = parts[2].split(':')[0].split('-')[0].split('–')[0];
            }
        } else {
            book = parts[0];
            chapter = parts[1].split(':')[0].split('-')[0].split('–')[0];
        }
    } else {
        book = parts[0];
    }

    // Basic cleaning of chapter (remove commas, semicolons if any)
    chapter = chapter.replace(/[^0-9]/g, '');
    if (!chapter) chapter = "1";

    return `/read/${encodeURIComponent(book)}/${chapter}`;
}
