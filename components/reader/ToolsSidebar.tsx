import { ArrowUpRight, MessageSquare, StickyNote, Bookmark, MoreHorizontal, CheckSquare, Square } from "lucide-react";
import { getBookMetadata } from "@/lib/bibleMetadata";

export function ToolsSidebar({ bookName }: { bookName: string }) {
    const meta = getBookMetadata(bookName);

    return (
        <aside className="w-full h-full flex flex-col gap-6 overflow-y-auto pl-2">

            {/* Related Verses */}
            <div className="shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-sm font-bold flex items-center gap-2">
                        <span className="text-gray-400">⚡</span> Relacionados
                    </h3>
                    <ArrowUpRight className="w-3 h-3 text-gray-500" />
                </div>

                <div className="space-y-3">
                    {meta.relatedVerses.map((item) => (
                        <div key={item.ref} className="bg-[#151b2b] hover:bg-[#1c2438] border border-white/5 hover:border-blue-500/30 rounded-lg p-3 transition-all cursor-pointer group">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-blue-300 group-hover:text-blue-200 text-xs font-bold transition-colors">{item.ref}</span>
                            </div>
                            <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed font-sans">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* User Notes */}
            <div className="shrink-0">
                <div className="flex items-center justify-between mb-2 mt-2">
                    <h3 className="text-white text-sm font-bold flex items-center gap-2">
                        <span className="text-gray-400">«</span> Mis Notas (5)
                    </h3>
                    <MoreHorizontal className="w-4 h-4 text-gray-600 cursor-pointer hover:text-white" />
                </div>

                <div className="bg-[#111623] rounded-xl overflow-hidden border border-white/5">
                    {[
                        "El amor de Dios es más grande y abacador de lo que pensiinos (Ef. 3:18)",
                        "\"¿Que signienica 'unigénito' en este contexto?",
                        "Un amor que fue hassa la cruz para salvarnos (Jn 12:32)"
                    ].map((note, i) => (
                        <div key={i} className="p-3 border-b border-white/5 hover:bg-white/5 cursor-pointer flex gap-2">
                            <span className="text-[10px] text-blue-500 mt-0.5">▶</span>
                            <p className="text-[11px] text-gray-400 leading-snug">{note}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* "Boca" / Other Tools Section */}
            <div className="mt-auto shrink-0">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white text-sm font-bold flex items-center gap-2">
                        <span className="text-gray-400">«</span> Boca
                    </h3>
                </div>

                <div className="space-y-2">
                    <button className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors text-left group">
                        <span className="text-gold-500">★</span>
                        <span className="text-xs font-bold text-gray-300 group-hover:text-white">Reiais unngelio</span>
                    </button>

                    <button className="w-full flex items-center gap-3 p-3 bg-[#1c2438] rounded-lg border border-blue-500/20 text-left group shadow-lg">
                        <CheckSquare className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold text-gray-200 group-hover:text-white">Tradiocards</span>
                        <span className="ml-auto text-[10px] text-gray-600 bg-black/20 px-1 rounded">⌘+T</span>
                    </button>

                    <button className="w-full flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors text-left group opacity-60 hover:opacity-100">
                        <Square className="w-4 h-4 text-gray-600" />
                        <span className="text-xs font-medium text-gray-400 group-hover:text-white">Tradicaidos</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
