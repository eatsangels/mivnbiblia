"use client";

import { useState, useEffect } from "react";
import { createSmallGroup, updateSmallGroup, deleteSmallGroup, type SmallGroup, getGroupMembers, updateMembershipStatus, deleteMembership, type GroupMember } from "@/app/(estudio)/admin/groups/actions";
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
    const [managingGroupId, setManagingGroupId] = useState<string | null>(null);
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
            members_count: group.members_count || 0,
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
                                        onClick={() => setManagingGroupId(group.id)}
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-500"
                                        title="Gestionar Miembros"
                                    >
                                        <Users className="w-3.5 h-3.5" />
                                    </Button>
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

            {/* Membership Management Modal */}
            {managingGroupId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-2xl max-h-[80vh] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col">
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Gestionar Miembros</h3>
                                <p className="text-slate-500 text-sm">Administra las solicitudes y miembros del grupo.</p>
                            </div>
                            <Button onClick={() => setManagingGroupId(null)} variant="ghost" size="icon" className="rounded-full">
                                <X className="w-6 h-6" />
                            </Button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8">
                            <GroupMembersList groupId={managingGroupId} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function GroupMembersList({ groupId }: { groupId: string }) {
    const [members, setMembers] = useState<GroupMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMembers = async () => {
        setIsLoading(true);
        const data = await getGroupMembers(groupId);
        setMembers(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchMembers();
    }, [groupId]);

    const handleStatusUpdate = async (membershipId: string, status: 'approved' | 'rejected') => {
        const result = await updateMembershipStatus(membershipId, status);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(status === 'approved' ? 'Miembro aprobado' : 'Solicitud rechazada');
            setMembers(prev => prev.map(m => m.id === membershipId ? { ...m, status } : m));
        }
    };

    const handleToggleRole = async (membershipId: string, currentRole: 'member' | 'leader') => {
        const newRole = currentRole === 'member' ? 'leader' : 'member';
        // Note: I'll update updateMembershipStatus in actions.ts to handle role as well
        const result = await updateMembershipStatus(membershipId, undefined as any, newRole);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(newRole === 'leader' ? 'Ascendido a Líder' : 'Removido como Líder');
            setMembers(prev => prev.map(m => m.id === membershipId ? { ...m, role: newRole } : m));
        }
    };

    const handleDeleteMembership = async (membershipId: string) => {
        if (!confirm('¿Estás seguro de eliminar este registro? Esto permitirá que la persona pueda volver a solicitar unirse.')) return;

        const result = await deleteMembership(membershipId);
        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('Registro eliminado');
            setMembers(prev => prev.filter(m => m.id !== membershipId));
        }
    };

    if (isLoading) return <div className="text-center py-10">Cargando miembros...</div>;

    const pending = members.filter(m => m.status === 'pending');
    const approved = members.filter(m => m.status === 'approved');
    const rejected = members.filter(m => m.status === 'rejected');

    return (
        <div className="space-y-8">
            {pending.length > 0 && (
                <div className="space-y-4">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500">Solicitudes Pendientes ({pending.length})</h5>
                    <div className="space-y-3">
                        {pending.map(m => (
                            <div key={m.id} className="flex items-center justify-between p-4 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm relative">
                                        {m.profile?.avatar_url && <Image src={m.profile.avatar_url} alt={m.profile.full_name || ''} fill className="object-cover" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-slate-900 dark:text-white">{m.profile?.full_name || 'Usuario desconocido'}</p>
                                        <p className="text-[10px] text-slate-500">Solicitó unirse {new Date(m.joined_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => handleStatusUpdate(m.id, 'approved')} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-4 h-9 text-xs font-bold">Aprobar</Button>
                                    <Button onClick={() => handleStatusUpdate(m.id, 'rejected')} variant="ghost" className="text-red-500 hover:bg-red-50 rounded-xl px-4 h-9 text-xs font-bold">Rechazar</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Miembros Aprobados ({approved.length})</h5>
                {approved.length === 0 ? (
                    <p className="text-sm text-slate-400 italic text-center py-4">No hay miembros aprobados aún.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-3">
                        {approved.map(m => (
                            <div key={m.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-2xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white relative">
                                        {m.profile?.avatar_url && <Image src={m.profile.avatar_url} alt={m.profile.full_name || ''} fill className="object-cover" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-slate-900 dark:text-white">{m.profile?.full_name}</p>
                                        <button
                                            onClick={() => handleToggleRole(m.id, m.role)}
                                            className="text-[9px] font-black bg-mivn-blue/10 text-mivn-blue px-2 py-0.5 rounded-full uppercase tracking-widest hover:bg-mivn-blue hover:text-white transition-colors"
                                            title="Cambiar rol"
                                        >
                                            {m.role === 'leader' ? 'Líder' : 'Miembro'}
                                        </button>
                                    </div>
                                </div>
                                <Button onClick={() => handleStatusUpdate(m.id, 'rejected')} variant="ghost" className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full w-8 h-8 p-0">
                                    <X className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {rejected.length > 0 && (
                <div className="space-y-4">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">Solicitudes Rechazadas ({rejected.length})</h5>
                    <div className="grid grid-cols-1 gap-3">
                        {rejected.map(m => (
                            <div key={m.id} className="flex items-center justify-between p-4 bg-red-50/30 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-2xl">
                                <div className="flex items-center gap-3 opacity-60">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white relative">
                                        {m.profile?.avatar_url && <Image src={m.profile.avatar_url} alt={m.profile.full_name || ''} fill className="object-cover" />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-slate-900 dark:text-white">{m.profile?.full_name}</p>
                                        <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">Rechazado</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button onClick={() => handleStatusUpdate(m.id, 'approved')} variant="outline" className="text-emerald-500 border-emerald-100 hover:bg-emerald-50 rounded-xl h-8 text-[10px] font-bold">Reconsiderar</Button>
                                    <Button onClick={() => handleDeleteMembership(m.id)} variant="ghost" className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full w-8 h-8 p-0">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
