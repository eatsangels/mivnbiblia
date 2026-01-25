"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { createResource, updateResource } from "@/app/(estudio)/admin/inventory/actions";
import { toast } from "sonner";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { ImageUploader } from "./ImageUploader";

interface ResourceEditDialogProps {
    resource?: any;
    isOpen: boolean;
    onClose: () => void;
}

export function ResourceEditDialog({ resource, isOpen, onClose }: ResourceEditDialogProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        file_type: "digital",
        file_url: "",
        external_url: "",
        is_published: true,
        is_featured: false,
    });

    useEffect(() => {
        if (resource) {
            setFormData({
                title: resource.title || "",
                description: resource.description || "",
                category: resource.category || "",
                file_type: resource.file_type || "digital",
                file_url: resource.file_url || "",
                external_url: resource.external_url || "",
                is_published: resource.is_published ?? true,
                is_featured: resource.is_featured ?? false,
            });
        } else {
            setFormData({
                title: "",
                description: "",
                category: "",
                file_type: "digital",
                file_url: "",
                external_url: "",
                is_published: true,
                is_featured: false,
            });
        }
    }, [resource, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as any;
        const checked = (e.target as any).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = (url: string) => {
        setFormData(prev => ({ ...prev, file_url: url }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (resource?.id) {
                const res = await updateResource(resource.id, formData);
                if (res.success) {
                    toast.success("Recurso actualizado con éxito");
                    onClose();
                } else {
                    toast.error(`Error: ${res.error}`);
                }
            } else {
                const res = await createResource(formData as any);
                if (res.success) {
                    toast.success("Recurso creado con éxito");
                    onClose();
                } else {
                    toast.error(`Error: ${res.error}`);
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("Ocurrió un error inesperado");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{resource ? "Editar Recurso" : "Agregar Nuevo Recurso"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4 max-h-[85vh] overflow-y-auto px-1">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Imagen del Recurso</label>
                        <ImageUploader
                            currentImage={formData.file_url}
                            onUploadComplete={handleImageUpload}
                            folder="resources"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium">Título</label>
                        <input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mivn-blue"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="description" className="text-sm font-medium">Descripción</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mivn-blue"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-medium">Categoría</label>
                            <input
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mivn-blue"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="file_type" className="text-sm font-medium">Tipo</label>
                            <select
                                id="file_type"
                                name="file_type"
                                value={formData.file_type}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mivn-blue"
                            >
                                <option value="digital">Digital (PDF/Doc)</option>
                                <option value="video">Video</option>
                                <option value="audio">Audio</option>
                                <option value="fisico">Físico (Activo)</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="file_url" className="text-sm font-medium">URL Manual (opcional)</label>
                        <input
                            id="file_url"
                            name="file_url"
                            value={formData.file_url}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mivn-blue"
                        />
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_published"
                                name="is_published"
                                checked={formData.is_published}
                                onChange={handleChange}
                                className="h-4 w-4 text-mivn-blue border-gray-300 rounded focus:ring-mivn-blue"
                            />
                            <label htmlFor="is_published" className="text-sm font-medium">Publicado</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="is_featured"
                                name="is_featured"
                                checked={formData.is_featured}
                                onChange={handleChange}
                                className="h-4 w-4 text-mivn-blue border-gray-300 rounded focus:ring-mivn-blue"
                            />
                            <label htmlFor="is_featured" className="text-sm font-medium">Destacado</label>
                        </div>
                    </div>

                    <DialogFooter className="pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-mivn-blue text-white px-6 py-2 rounded-xl text-sm font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-mivn-blue/20"
                        >
                            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                            {resource ? "Guardar Cambios" : "Crear Recurso"}
                        </button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
