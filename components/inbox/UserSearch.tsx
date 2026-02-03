"use client"

import * as React from "react"
import { Search, Loader2, Plus, Check } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type UserResult = {
    id: string
    first_name: string | null
    last_name: string | null
    avatar_url: string | null
    email: string | null
}

interface UserSearchProps {
    onSelect: (user: UserResult) => void
    label?: string
    className?: string
    selectedIds?: string[]
}

export function UserSearch({ onSelect, label = "Buscar miembro...", className, selectedIds = [] }: UserSearchProps) {
    const [query, setQuery] = React.useState("")
    const [results, setResults] = React.useState<UserResult[]>([])
    const [loading, setLoading] = React.useState(false)
    const [showResults, setShowResults] = React.useState(false)
    const supabase = createClient()
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Fetch initial suggestions or search
    React.useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            let req = supabase
                .from('profiles')
                .select('id, first_name, last_name, avatar_url, email')
                .limit(10)

            if (query.trim().length >= 1) {
                req = req.or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
            }

            const { data, error } = await req

            if (!error && data) {
                setResults(data)
            }
            setLoading(false)
        }

        const handler = setTimeout(fetchUsers, 300)
        return () => clearTimeout(handler)
    }, [query])

    // Close results when clicking outside
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowResults(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [containerRef])

    return (
        <div ref={containerRef} className={cn("relative w-full", className)}>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                    onFocus={() => setShowResults(true)}
                    placeholder={label}
                    className="pl-11 pr-4 h-12 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-mivn-blue/20 transition-all shadow-sm"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-mivn-blue" />}
            </div>

            {showResults && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                    <ul className="divide-y divide-slate-50 dark:divide-white/5">
                        {results.map(user => {
                            const isSelected = selectedIds.includes(user.id)
                            return (
                                <li
                                    key={user.id}
                                    onClick={() => {
                                        if (!isSelected) {
                                            onSelect(user)
                                            // Optional: Keep open for multiple selection
                                            // setShowResults(false)
                                            // setQuery("") 
                                        }
                                    }}
                                    className={cn(
                                        "p-3 flex items-center gap-3 cursor-pointer transition-colors",
                                        isSelected ? "bg-mivn-blue/5 opacity-50 cursor-default" : "hover:bg-slate-50 dark:hover:bg-white/5"
                                    )}
                                >
                                    <div className="w-8 h-8 rounded-full bg-mivn-blue/10 flex items-center justify-center text-mivn-blue text-xs font-bold overflow-hidden shrink-0">
                                        {user.avatar_url ? (
                                            <img src={user.avatar_url} alt={`${user.first_name || ''} ${user.last_name || ''}`} className="w-full h-full object-cover" />
                                        ) : (
                                            user.first_name?.[0] || user.last_name?.[0] || "?"
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                                            {user.first_name || user.last_name
                                                ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
                                                : 'Usuario'}
                                        </p>
                                        <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                                    </div>
                                    <button
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                            isSelected ? "bg-green-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-mivn-blue hover:bg-mivn-blue hover:text-white"
                                        )}
                                    >
                                        {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}

            {showResults && !loading && results.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 p-4 text-center text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl z-50">
                    No se encontraron usuarios.
                </div>
            )}
        </div>
    )
}
