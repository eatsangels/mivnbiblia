"use client"

import * as React from "react"
import { Search, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type UserResult = {
    id: string
    full_name: string | null
    avatar_url: string | null
    email: string | null
}

interface UserSearchProps {
    onSelect: (user: UserResult) => void
    onCancel?: () => void
    label?: string
    className?: string
}

export function UserSearch({ onSelect, onCancel, label = "Escribe el nombre del miembro...", className }: UserSearchProps) {
    const [query, setQuery] = React.useState("")
    const [results, setResults] = React.useState<UserResult[]>([])
    const [loading, setLoading] = React.useState(false)
    const supabase = createClient()

    // Debounce search
    React.useEffect(() => {
        const handler = setTimeout(async () => {
            if (query.trim().length < 2) {
                setResults([])
                return
            }

            setLoading(true)
            const { data, error } = await supabase
                .from('profiles')
                .select('id, full_name, avatar_url, email')
                .ilike('full_name', `%${query}%`)
                .limit(5)

            if (!error && data) {
                setResults(data)
            }
            setLoading(false)
        }, 500)

        return () => clearTimeout(handler)
    }, [query])

    return (
        <div className={cn("relative w-full", className)}>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                    autoFocus
                    placeholder={label}
                    className="pl-11 pr-4 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-mivn-blue/20 transition-all shadow-sm"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-mivn-blue" />}
            </div>

            {results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <ul className="divide-y divide-slate-50 dark:divide-white/5">
                        {results.map(user => (
                            <li
                                key={user.id}
                                onClick={() => {
                                    onSelect(user)
                                    setQuery("")
                                    setResults([])
                                }}
                                className="p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-mivn-blue/10 flex items-center justify-center text-mivn-blue text-xs font-bold overflow-hidden shrink-0">
                                    {user.avatar_url ? (
                                        <img src={user.avatar_url} alt={user.full_name || ""} className="w-full h-full object-cover" />
                                    ) : (
                                        user.full_name?.[0] || "?"
                                    )}
                                </div>
                                <div className="text-left overflow-hidden">
                                    <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user.full_name}</p>
                                    <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {query.length > 2 && results.length === 0 && !loading && (
                <div className="absolute top-full left-0 right-0 mt-2 p-4 text-center text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl z-50">
                    No se encontraron usuarios.
                </div>
            )}
        </div>
    )
}
