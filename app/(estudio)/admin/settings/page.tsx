import { ServiceSettingsForm } from "@/components/admin/ServiceSettingsForm";
import { WeeklyActivitiesManager } from "@/components/admin/WeeklyActivitiesManager";
import { RolesManager } from "@/components/admin/RolesManager";
import { getServiceSettings, getWeeklyActivities, getRolesSummary, getUsersByRole } from "./actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

export default async function SettingsPage() {
    const [settings, activities, rolesSummary, initialUsers] = await Promise.all([
        getServiceSettings(),
        getWeeklyActivities(),
        getRolesSummary(),
        getUsersByRole('admin')
    ]);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Page Heading */}
            <div className="space-y-2">
                <h1 className="text-4xl font-playfair font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                    Configuración de <span className="text-mivn-blue italic">Servicios</span>
                </h1>
                <p className="text-slate-500 dark:text-gray-400 font-light italic text-lg leading-relaxed max-w-2xl">
                    Administra la información que se muestra en las páginas de Cultos y Transmisión en Vivo.
                </p>
            </div>

            <Tabs defaultValue="roles" className="w-full">
                <TabsList className="grid w-full max-w-xl grid-cols-3">
                    <TabsTrigger value="roles">Roles y Permisos</TabsTrigger>
                    <TabsTrigger value="service">Próximo Servicio</TabsTrigger>
                    <TabsTrigger value="activities">Actividades Semanales</TabsTrigger>
                </TabsList>

                <TabsContent value="roles" className="mt-8">
                    <RolesManager rolesSummary={rolesSummary} initialUsers={initialUsers} />
                </TabsContent>

                <TabsContent value="service" className="mt-8">
                    <ServiceSettingsForm settings={settings} />
                </TabsContent>

                <TabsContent value="activities" className="mt-8">
                    <WeeklyActivitiesManager activities={activities} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
