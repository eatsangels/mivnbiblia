"use client";

import { Check, X, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { approvePrayerRequest, rejectPrayerRequest } from "../actions";
import { useRouter } from "next/navigation";

interface PrayerActionsProps {
    id: string;
}

export function PrayerActions({ id }: PrayerActionsProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleApprove = () => {
        startTransition(async () => {
            await approvePrayerRequest(id);
        });
    };

    const handleReject = () => {
        if (!confirm("¿Estás seguro de rechazar esta petición? Se eliminará permanentemente.")) return;

        startTransition(async () => {
            await rejectPrayerRequest(id);
        });
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleApprove}
                disabled={isPending}
                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50"
                title="Aprobar"
            >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
            </button>
            <button
                onClick={handleReject}
                disabled={isPending}
                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
                title="Rechazar"
            >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <X className="w-5 h-5" />}
            </button>
        </div>
    );
}
