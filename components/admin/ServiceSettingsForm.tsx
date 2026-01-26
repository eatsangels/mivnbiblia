"use client";

import { useState } from "react";
import { updateServiceSettings, type ServiceSettings } from "@/app/(estudio)/admin/settings/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, User, FileText, MessageSquare, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ServiceSettingsFormProps {
    settings: ServiceSettings | null;
}

export function ServiceSettingsForm({ settings }: ServiceSettingsFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        next_service_title: settings?.next_service_title || '',
        next_service_preacher: settings?.next_service_preacher || '',
        next_service_date: settings?.next_service_date ? new Date(settings.next_service_date).toISOString().slice(0, 16) : '',
        next_service_location: settings?.next_service_location || '',
        next_service_series: settings?.next_service_series || '',
        next_service_description: settings?.next_service_description || '',
        offline_message: settings?.offline_message || '',
        offline_subtitle: settings?.offline_subtitle || '',
        google_maps_url: settings?.google_maps_url || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await updateServiceSettings({
                ...formData,
                next_service_date: new Date(formData.next_service_date).toISOString(),
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Configuración actualizada correctamente');
            }
        } catch (error) {
            toast.error('Error al actualizar la configuración');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
                <h3 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-mivn-blue" /> Información del Próximo Servicio
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="title" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <FileText className="w-4 h-4" /> Título del Mensaje
                        </Label>
                        <Input
                            id="title"
                            value={formData.next_service_title}
                            onChange={(e) => handleChange('next_service_title', e.target.value)}
                            placeholder="La Fe que Mueve Montañas"
                            className="rounded-2xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="preacher" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <User className="w-4 h-4" /> Predicador
                        </Label>
                        <Input
                            id="preacher"
                            value={formData.next_service_preacher}
                            onChange={(e) => handleChange('next_service_preacher', e.target.value)}
                            placeholder="Pastor David Morales"
                            className="rounded-2xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <Calendar className="w-4 h-4" /> Fecha y Hora
                        </Label>
                        <Input
                            id="date"
                            type="datetime-local"
                            value={formData.next_service_date}
                            onChange={(e) => handleChange('next_service_date', e.target.value)}
                            className="rounded-2xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <MapPin className="w-4 h-4" /> Ubicación
                        </Label>
                        <Input
                            id="location"
                            value={formData.next_service_location}
                            onChange={(e) => handleChange('next_service_location', e.target.value)}
                            placeholder="Auditorio Principal, MIVN"
                            className="rounded-2xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="series" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <FileText className="w-4 h-4" /> Serie
                        </Label>
                        <Input
                            id="series"
                            value={formData.next_service_series}
                            onChange={(e) => handleChange('next_service_series', e.target.value)}
                            placeholder="Serie: Fundamentos"
                            className="rounded-2xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="maps" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                            <MapPin className="w-4 h-4" /> URL de Google Maps
                        </Label>
                        <Input
                            id="maps"
                            value={formData.google_maps_url}
                            onChange={(e) => handleChange('google_maps_url', e.target.value)}
                            placeholder="https://maps.google.com/..."
                            className="rounded-2xl"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description" className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <FileText className="w-4 h-4" /> Descripción
                    </Label>
                    <Textarea
                        id="description"
                        value={formData.next_service_description}
                        onChange={(e) => handleChange('next_service_description', e.target.value)}
                        placeholder="Un mensaje poderoso sobre cómo la fe puede transformar nuestras vidas..."
                        rows={4}
                        className="rounded-2xl"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
                <h3 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <MessageSquare className="w-6 h-6 text-mivn-blue" /> Mensajes Personalizables
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="offline_message" className="text-slate-700 dark:text-slate-300">
                            Mensaje cuando NO hay transmisión
                        </Label>
                        <Input
                            id="offline_message"
                            value={formData.offline_message}
                            onChange={(e) => handleChange('offline_message', e.target.value)}
                            placeholder="No Estamos en Vivo"
                            className="rounded-2xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="offline_subtitle" className="text-slate-700 dark:text-slate-300">
                            Subtítulo (próximo servicio)
                        </Label>
                        <Input
                            id="offline_subtitle"
                            value={formData.offline_subtitle}
                            onChange={(e) => handleChange('offline_subtitle', e.target.value)}
                            placeholder="Próximo servicio: Domingo 10:00 AM"
                            className="rounded-2xl"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-6 bg-mivn-blue text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-mivn-blue/20 hover:scale-105 transition-all"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Guardando...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Guardar Cambios
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}
