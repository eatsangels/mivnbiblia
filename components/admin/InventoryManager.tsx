"use client";

import {
    Package, QrCode, FileText, PlusCircle, Box, AlertTriangle,
    Construction, BadgePlus, Search, SlidersHorizontal, Mic,
    Piano, Video, Armchair, Edit2, ChevronLeft, ChevronRight,
    ShoppingBag, HelpCircle, Trash2
} from "lucide-react";
import { useState } from "react";
import { ResourceEditDialog } from "./ResourceEditDialog";
import { deleteResource } from "@/app/(estudio)/admin/inventory/actions";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRScanner } from "./QRScanner";

export interface InventoryManagerProps {
    initialResources: any[];
}

export function InventoryManager({ initialResources }: InventoryManagerProps) {
    const [selectedResource, setSelectedResource] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [qrResource, setQrResource] = useState<any>(null);
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    const handleAdd = () => {
        setSelectedResource(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (resource: any) => {
        setSelectedResource(resource);
        setIsDialogOpen(true);
    };

    const handleShowQr = (resource: any) => {
        setQrResource(resource);
    };

    const handleScan = (decodedText: string) => {
        setIsScannerOpen(false);
        const resource = initialResources.find(r => r.id === decodedText);

        if (resource) {
            toast.success(`Activo encontrado: ${resource.title}`);
            handleEdit(resource);
        } else {
            toast.error("El código escaneado no coincide con ningún activo de la base de datos.");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de que deseas eliminar este recurso?")) {
            try {
                const res = await deleteResource(id);
                if (res.success) {
                    toast.success("Recurso eliminado");
                } else {
                    toast.error(`Error: ${res.error}`);
                }
            } catch (error) {
                toast.error("Error al eliminar");
            }
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {isScannerOpen && (
                <QRScanner
                    onScan={handleScan}
                    onClose={() => setIsScannerOpen(false)}
                />
            )}
            <ResourceEditDialog
                key={selectedResource?.id || 'new'}
                resource={selectedResource}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />

            {/* QR Code Modal */}
            <Dialog open={!!qrResource} onOpenChange={() => setQrResource(null)}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-playfair font-bold text-center">Etiqueta QR de Activo</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-center py-10 space-y-6">
                        <div className="p-4 bg-white rounded-2xl border-2 border-slate-100 shadow-sm">
                            {qrResource && (
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrResource.id)}`}
                                    alt="QR Code"
                                    className="w-48 h-48"
                                />
                            )}
                        </div>
                        <div className="text-center">
                            <h4 className="font-black text-slate-900 uppercase tracking-tighter text-lg">{qrResource?.title}</h4>
                            <p className="text-xs text-slate-500 font-mono mt-1">ID: {qrResource?.id?.split('-')[0]}...</p>
                        </div>
                        <button
                            onClick={() => window.print()}
                            className="w-full bg-mivn-blue text-white py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:brightness-110 transition-all"
                        >
                            Imprimir Etiqueta
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Help Guide Modal */}
            <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-playfair font-bold text-slate-900 leading-tight">Guía de Gestión de Inventario</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-6 overflow-y-auto max-h-[70vh] pr-2">
                        <section className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-mivn-blue/5 rounded-2xl border border-mivn-blue/10">
                                <Box className="w-5 h-5 text-mivn-blue" />
                                <h4 className="font-bold text-slate-900">Clasificación de Recursos</h4>
                            </div>
                            <div className="text-sm text-slate-600 leading-relaxed pl-2">
                                Clasifica tus activos correctamente para facilitar la búsqueda:
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li><span className="font-bold">Digital</span>: Libros, PDFs, documentos de estudio.</li>
                                    <li><span className="font-bold">Físico</span>: Equipos electrónicos, mobiliario, instrumentos.</li>
                                    <li><span className="font-bold">Multimedia</span>: Videos de sermones o tracks de audio.</li>
                                </ul>
                            </div>
                        </section>

                        <section className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-mivn-gold/5 rounded-2xl border border-mivn-gold/10">
                                <QrCode className="w-5 h-5 text-mivn-gold" />
                                <h4 className="font-bold text-slate-900">Control por Códigos QR</h4>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed pl-2">
                                Ya puedes generar etiquetas QR para cada activo. Haz clic en el icono de QR en la lista de recursos para ver e imprimir la etiqueta del ítem.
                            </p>
                        </section>

                        <section className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <AlertTriangle className="w-5 h-5 text-slate-400" />
                                <h4 className="font-bold text-slate-900">Estados de Publicación</h4>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed pl-2">
                                Marca como <span className="italic">Destacado</span> aquellos recursos que deben aparecer en la página de inicio o en la sección principal de recursos.
                            </p>
                        </section>
                    </div>
                </DialogContent>
            </Dialog>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Gestor de <span className="text-mivn-blue italic">Inventario</span>
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-xl">
                        Panel central administrativo de activos de Ministerio Internacional Vida Nueva.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsScannerOpen(true)}
                        className="flex items-center gap-2 px-5 py-3 bg-mivn-blue/10 text-mivn-blue border border-mivn-blue/20 rounded-xl font-bold text-sm hover:bg-mivn-blue/20 transition-all shadow-lg active:scale-95"
                    >
                        <QrCode className="w-5 h-5" /> <span>Escanear QR</span>
                    </button>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 px-5 py-3 bg-mivn-gold text-white rounded-xl font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-mivn-gold/20"
                    >
                        <PlusCircle className="w-5 h-5" /> <span>Agregar</span>
                    </button>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Ítems</p>
                        <div className="p-2 bg-mivn-blue/10 rounded-lg">
                            <Box className="w-5 h-5 text-mivn-blue" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">{initialResources.length}</p>
                    <p className="text-[10px] text-slate-400 font-medium">En el sistema</p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 shadow-xl group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recursos Digitales</p>
                        <div className="p-2 bg-mivn-gold/10 rounded-lg">
                            <FileText className="w-5 h-5 text-mivn-gold" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                        {initialResources.filter(r => r.file_type === 'digital' || !r.file_type).length}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Table Section */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <h2 className="text-xl font-playfair font-bold text-slate-900 dark:text-white">Registro General de Recursos</h2>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 dark:bg-white/5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Ítem</th>
                                        <th className="px-6 py-4">Tipo</th>
                                        <th className="px-6 py-4">Categoría</th>
                                        <th className="px-6 py-4 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {initialResources.length > 0 ? (
                                        initialResources.map((item, i) => (
                                            <tr key={item.id || i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-mivn-blue/10 flex items-center justify-center text-mivn-blue">
                                                            <Package className="w-5 h-5" />
                                                        </div>
                                                        <span className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-medium uppercase text-slate-500">
                                                    {item.file_type || 'Digital'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400`}>
                                                        {item.category || 'General'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleShowQr(item)}
                                                            className="p-2 text-mivn-gold hover:bg-mivn-gold/10 rounded-lg transition-colors"
                                                            title="Ver Código QR"
                                                        >
                                                            <QrCode className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleEdit(item)}
                                                            className="p-2 text-mivn-blue hover:bg-mivn-blue/10 rounded-lg transition-colors"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-slate-400 italic">No se encontraron recursos</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                {/* Sidebar Column */}
                <div className="flex flex-col gap-6">
                    <div className="bg-mivn-blue rounded-[2.5rem] p-8 text-white shadow-xl shadow-mivn-blue/20 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 text-white">
                                <HelpCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-playfair font-bold mb-2">Ayuda Administrativa</h3>
                            <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium">¿Necesitas ayuda para categorizar un nuevo activo?</p>
                            <button
                                onClick={() => setIsHelpOpen(true)}
                                className="bg-white text-mivn-blue px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/90 transition-all shadow-lg active:scale-95"
                            >
                                Ver Guía
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
