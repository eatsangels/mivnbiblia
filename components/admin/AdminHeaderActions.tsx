"use client";

import { Bell, Settings } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export function AdminHeaderActions() {
    return (
        <div className="flex items-center gap-3">
            <Link href="/admin/settings" className="flex size-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-mivn-blue transition-colors outline-none">
                <Settings className="w-5 h-5" />
            </Link>
            <button
                onClick={() => toast.info("Sin notificaciones nuevas")}
                className="flex size-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-mivn-blue transition-colors outline-none relative"
                title="Sin notificaciones nuevas"
            >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 size-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900 hidden"></span>
            </button>
        </div>
    );
}
