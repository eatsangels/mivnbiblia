"use client";

import { useState } from "react";
import { createSmallGroup, updateSmallGroup, deleteSmallGroup, type SmallGroup } from "@/app/(estudio)/admin/groups/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Save, X, Users, Image as ImageIcon, MapPin, Search } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { ImageUploader } from "./ImageUploader";

interface SmallGroupsManagerProps {
    groups: SmallGroup[];
}

export function SmallGroupsManager({ groups: initialGroups }: SmallGroupsManagerProps) {
    const [groups, setGroups] = useState(initialGroups);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'General',
        leader: '',
        description: '',
        members_count: 0,
        image_url: '',
        leader_image_url: '',
        schedule: '',
        location: '',
        latitude: 0,
        longitude: 0,
        is_location_public: true,
        is_active: true,
    });

    const resetForm = () => {
        setFormData({
            name: '',
            category: 'General',
            leader: '',
            description: '',
            members_count: 0,
            image_url: '',
            leader_image_url: '',
            schedule: '',
            location: '',
            latitude: 0,
            longitude: 0,
            is_location_public: true,
            is_active: true,
        });
        setEditingId(null);
        setIsAdding(false);
    };

    const handleEdit = (group: SmallGroup) => {
        setFormData({
            name: group.name,
            category: group.category,
            leader: group.leader,
            description: group.description || '',
            members_count: group.members_count,
            image_url: group.image_url || '',
            leader_image_url: group.leader_image_url || '',
            schedule: group.schedule || '',
            location: group.location || '',
            latitude: group.latitude || 0,
            longitude: group.longitude || 0,
            is_location_public: group.is_location_public ?? true,
            is_active: group.is_active,
        });
        setEditingId(group.id);
        setIsAdding(false);
    };

    const handleGeocode = async () => {
        if (!formData.location) {
            toast.error('Por favor, ingresa una ubicación primero');
            return;
        }

        const loadingToast = toast.loading('Buscando coordenadas...');
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.location)}`);
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                setFormData(prev => ({
                    ...prev,
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lon)
                }));
                toast.success('Coordenadas encontradas correctamente', { id: loadingToast });
            } else {
                toast.error('No se encontraron coordenadas para esta dirección', { id: loadingToast });
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            toast.error('Error al conectar con el servicio de mapas', { id: loadingToast });
        }
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                const result = await updateSmallGroup(editingId, formData);
                if (result.error) {
                    toast.error(result.error);
                } else {
                    toast.success('Grupo actualizado');
                    setGroups(prev => prev.map(g => g.id === editingId ? { ...g, ...formData, id: g.id } : g));
                    resetForm();
                }
            } else {
                const result = await createSmallGroup(formData);
                if (result.error) {
                    toast.error(result.error);
                } else if (result.data) {
                    toast.success('Grupo creado');
                    setGroups(prev => [...prev, result.data]);
                    resetForm();
                }
            }
        } catch (error) {
            toast.error('Error al guardar el grupo');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este grupo?')) return;

        try {
            const result = await deleteSmallGroup(id);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Grupo eliminado');
                setGroups(prev => prev.filter(g => g.id !== id));
            }
        } catch (error) {
            toast.error('Error al eliminar el grupo');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                        Gestión de <span className="text-mivn-blue italic">Grupos Pequeños</span>
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-xl">
                        Administra los grupos de "Encuentra tu Comunidad".
                    </p>
                </div>
                {!isAdding && !editingId && (
                    <Button
                        onClick={() => setIsAdding(true)}
                        className="bg-mivn-blue text-white rounded-2xl px-6 py-6 shadow-xl shadow-mivn-blue/20 hover:scale-105 transition-all text-xs font-black uppercase tracking-widest"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Nuevo Grupo
                    </Button>
                )}
            </div>

            {/* Form */}
            {(isAdding || editingId) && (
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        {editingId ? <Edit className="w-5 h-5 text-mivn-blue" /> : <Plus className="w-5 h-5 text-mivn-blue" />}
                        {editingId ? 'Editar Grupo' : 'Nuevo Grupo'}
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Nombre del Grupo</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Ej: Generación Diferente"
                                className="rounded-2xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Categoría</Label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2"
                            >
                                <option value="General">General</option>
                                <option value="Jóvenes">Jóvenes</option>
                                <option value="Parejas">Parejas</option>
                                <option value="Alabanza">Alabanza</option>
                                <option value="Oración">Oración</option>
                                <option value="Estudio">Estudio</option>
                                <option value="Niños">Niños</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label>Líder(es)</Label>
                            <Input
                                value={formData.leader}
                                onChange={(e) => setFormData(prev => ({ ...prev, leader: e.target.value }))}
                                placeholder="Ej: Daniel & Sara"
                                className="rounded-2xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Miembros (aprox)</Label>
                            <Input
                                type="number"
                                value={formData.members_count}
                                onChange={(e) => setFormData(prev => ({ ...prev, members_count: parseInt(e.target.value) || 0 }))}
                                className="rounded-2xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Horario (Opcional)</Label>
                            <Input
                                value={formData.schedule}
                                onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
                                placeholder="Ej: Viernes 7:00 PM"
                                className="rounded-2xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Ubicación (Dirección)</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={formData.location}
                                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                    placeholder="Ej: 123 Street, Atlanta, GA"
                                    className="rounded-2xl"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleGeocode}
                                    className="rounded-2xl shrink-0"
                                    title="Buscar coordenadas automáticamente"
                                >
                                    <MapPin className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Latitud (Google Maps)</Label>
                            <Input
                                type="number"
                                step="any"
                                value={formData.latitude}
                                onChange={(e) => setFormData(prev => ({ ...prev, latitude: parseFloat(e.target.value) || 0 }))}
                                placeholder="Ej: 18.4861"
                                className="rounded-2xl"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Longitud (Google Maps)</Label>
                            <Input
                                type="number"
                                step="any"
                                value={formData.longitude}
                                onChange={(e) => setFormData(prev => ({ ...prev, longitude: parseFloat(e.target.value) || 0 }))}
                                placeholder="Ej: -69.9312"
                                className="rounded-2xl"
                            />
                        </div>

                        <div className="space-y-2 flex flex-col justify-center">
                            <Label className="mb-2">Privacidad de Ubicación</Label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_location_public"
                                    checked={formData.is_location_public}
                                    onChange={(e) => setFormData(prev => ({ ...prev, is_location_public: e.target.checked }))}
                                    className="w-4 h-4 rounded border-slate-300 text-mivn-blue focus:ring-mivn-blue"
                                />
                                <Label htmlFor="is_location_public" className="text-sm font-normal cursor-pointer">
                                    Mostrar ubicación exacta en el mapa público
                                </Label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Imagen del Grupo</Label>
                            <ImageUploader
                                currentImage={formData.image_url || undefined}
                                onUploadComplete={(url: string) => setFormData(prev => ({ ...prev, image_url: url }))}
                                folder="groups"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Foto del Líder</Label>
                            <ImageUploader
                                currentImage={formData.leader_image_url || undefined}
                                onUploadComplete={(url: string) => setFormData(prev => ({ ...prev, leader_image_url: url }))}
                                folder="leaders"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Descripción</Label>
                        <Textarea
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Descripción breve del grupo..."
                            rows={3}
                            className="rounded-2xl"
                        />
                    </div>

                    <div className="flex gap-3 justify-end pt-4">
                        <Button
                            onClick={resetForm}
                            variant="outline"
                            className="rounded-2xl px-6"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="bg-mivn-blue text-white rounded-2xl px-6"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Guardar Grupo
                        </Button>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group) => (
                    <div key={group.id} className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500">
                        <div className="h-40 relative overflow-hidden">
                            {group.image_url ? (
                                <Image src={group.image_url} alt={group.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                                <div className="w-full h-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <ImageIcon className="w-8 h-8 text-slate-300" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <span className="absolute top-4 left-4 bg-mivn-blue/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                {group.category}
                            </span>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">{group.name}</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-200">
                                        {group.leader_image_url ? (
                                            <Image src={group.leader_image_url} alt={group.leader} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-slate-200" />
                                        )}
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Líder: <span className="font-bold">{group.leader}</span></p>
                                </div>
                            </div>

                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 min-h-[40px]">
                                {group.description}
                            </p>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <div className="flex items-center text-slate-400 gap-1.5">
                                    <Users className="w-3.5 h-3.5" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{group.members_count}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => handleEdit(group)}
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                                    >
                                        <Edit className="w-3.5 h-3.5 text-slate-500" />
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(group.id)}
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
