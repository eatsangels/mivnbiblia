"use client";

import { useState } from "react";
import { createWeeklyActivity, updateWeeklyActivity, deleteWeeklyActivity, type WeeklyActivity } from "@/app/(estudio)/admin/settings/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Save, X, Calendar } from "lucide-react";
import { toast } from "sonner";

interface WeeklyActivitiesManagerProps {
    activities: WeeklyActivity[];
}

export function WeeklyActivitiesManager({ activities: initialActivities }: WeeklyActivitiesManagerProps) {
    const [activities, setActivities] = useState(initialActivities);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        day_of_week: '',
        title: '',
        time: '',
        description: '',
        category: 'general',
        icon_name: 'Star',
        color: '#4AA3DF',
        is_active: true,
        display_order: activities.length + 1,
    });

    const resetForm = () => {
        setFormData({
            day_of_week: '',
            title: '',
            time: '',
            description: '',
            category: 'general',
            icon_name: 'Star',
            color: '#4AA3DF',
            is_active: true,
            display_order: activities.length + 1,
        });
        setEditingId(null);
        setIsAdding(false);
    };

    const handleEdit = (activity: WeeklyActivity) => {
        setFormData({
            day_of_week: activity.day_of_week,
            title: activity.title,
            time: activity.time || '',
            description: activity.description || '',
            category: activity.category || 'general',
            icon_name: activity.icon_name || 'Star',
            color: activity.color || '#4AA3DF',
            is_active: activity.is_active || false,
            display_order: activity.display_order || 1,
        });
        setEditingId(activity.id);
        setIsAdding(false);
    };

    const handleSave = async () => {
        try {
            if (editingId) {
                const result = await updateWeeklyActivity(editingId, formData);
                if (result.error) {
                    toast.error(result.error);
                } else {
                    toast.success('Actividad actualizada');
                    setActivities(prev => prev.map(a => a.id === editingId ? { ...a, ...formData } : a));
                    resetForm();
                }
            } else {
                const result = await createWeeklyActivity(formData);
                if (result.error) {
                    toast.error(result.error);
                } else if (result.data) {
                    toast.success('Actividad creada');
                    setActivities(prev => [...prev, result.data]);
                    resetForm();
                }
            }
        } catch (error) {
            toast.error('Error al guardar la actividad');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar esta actividad?')) return;

        try {
            const result = await deleteWeeklyActivity(id);
            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Actividad eliminada');
                setActivities(prev => prev.filter(a => a.id !== id));
            }
        } catch (error) {
            toast.error('Error al eliminar la actividad');
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-playfair font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <Calendar className="w-6 h-6 text-mivn-blue" /> Actividades Semanales
                    </h3>
                    {!isAdding && !editingId && (
                        <Button
                            onClick={() => setIsAdding(true)}
                            className="bg-mivn-blue text-white rounded-2xl px-6 py-3"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Agregar Actividad
                        </Button>
                    )}
                </div>

                {/* Form for adding/editing */}
                {(isAdding || editingId) && (
                    <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                        <h4 className="font-bold text-slate-900 dark:text-white">
                            {editingId ? 'Editar Actividad' : 'Nueva Actividad'}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Día de la Semana</Label>
                                <Input
                                    value={formData.day_of_week}
                                    onChange={(e) => setFormData(prev => ({ ...prev, day_of_week: e.target.value }))}
                                    placeholder="Martes"
                                    className="rounded-2xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Título</Label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Círculo de Oración"
                                    className="rounded-2xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Hora</Label>
                                <Input
                                    value={formData.time}
                                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                                    placeholder="7:00 PM"
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
                                    <option value="general">General</option>
                                    <option value="prayer">Oración</option>
                                    <option value="study">Estudio</option>
                                    <option value="youth">Jóvenes</option>
                                    <option value="kids">Niños</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label>Color (Hex)</Label>
                                <Input
                                    value={formData.color}
                                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                                    placeholder="#4AA3DF"
                                    className="rounded-2xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Ícono (Lucide)</Label>
                                <Input
                                    value={formData.icon_name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, icon_name: e.target.value }))}
                                    placeholder="Star"
                                    className="rounded-2xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Descripción</Label>
                            <Textarea
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Tiempo de intercesión y comunión"
                                rows={2}
                                className="rounded-2xl"
                            />
                        </div>

                        <div className="flex gap-3 justify-end">
                            <Button
                                onClick={resetForm}
                                variant="outline"
                                className="rounded-2xl"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="bg-mivn-blue text-white rounded-2xl"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Guardar
                            </Button>
                        </div>
                    </div>
                )}

                {/* List of activities */}
                <div className="space-y-3">
                    {activities.map((activity) => (
                        <div
                            key={activity.id}
                            className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-slate-700"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                                    style={{ backgroundColor: activity.color || undefined }}
                                >
                                    {activity.day_of_week.slice(0, 2)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{activity.title}</h4>
                                    <p className="text-sm text-slate-500">
                                        {activity.day_of_week} • {activity.time}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => handleEdit(activity)}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl"
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    onClick={() => handleDelete(activity.id)}
                                    variant="outline"
                                    size="sm"
                                    className="rounded-xl text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
