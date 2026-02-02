import { InstituteHeader } from "@/components/institute/InstituteHeader";
import { InstituteSidebar } from "@/components/institute/InstituteSidebar";
import { Catalog } from "@/components/institute/Catalog";
import { getCatalogCourses, getAllCategories } from "../actions";

export default async function CatalogPage() {
    const courses = await getCatalogCourses();
    const categories = await getAllCategories();

    return (
        <div className="min-h-screen bg-[#F6F7F8] dark:bg-[#05070A] text-[#0f161a] dark:text-white font-lexend">
            <InstituteHeader />

            <main className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 p-6">
                <InstituteSidebar categories={categories} />
                <Catalog initialCourses={courses} categories={categories} />
            </main>
        </div>
    );
}
