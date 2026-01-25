"use client";

import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { X, Camera } from "lucide-react";

interface QRScannerProps {
    onScan: (data: string) => void;
    onClose: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Delay initialization to ensure the element is in the DOM
        const timer = setTimeout(() => {
            try {
                const scanner = new Html5QrcodeScanner(
                    "qr-reader",
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                        aspectRatio: 1.0
                    },
                    false
                );

                scanner.render(
                    (decodedText) => {
                        onScan(decodedText);
                        scanner.clear().catch(console.error);
                    },
                    (errorMessage) => {
                        // Suppress constant scanning errors
                    }
                );

                scannerRef.current = scanner;
            } catch (err: any) {
                console.error("QR Scanner Error:", err);
                setError("No se pudo acceder a la cámara. Asegúrate de dar permisos.");
            }
        }, 100);

        return () => {
            clearTimeout(timer);
            if (scannerRef.current) {
                scannerRef.current.clear().catch(console.error);
            }
        };
    }, [onScan]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl p-6">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-white/10 rounded-full text-slate-500 hover:text-red-500 transition-colors z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-mivn-blue/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Camera className="w-6 h-6 text-mivn-blue" />
                    </div>
                    <h3 className="text-xl font-playfair font-bold text-slate-900 dark:text-white">Escáner de Inventario</h3>
                    <p className="text-sm text-slate-500 mt-1">Apunta la cámara al código QR del activo</p>
                </div>

                <div id="qr-reader" className="w-full overflow-hidden rounded-2xl border-2 border-slate-100 dark:border-slate-800" />

                {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm text-center font-medium">
                        {error}
                    </div>
                )}

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold uppercase text-xs tracking-widest transition-colors"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}
