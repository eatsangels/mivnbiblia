"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { submitTestimony, updateTestimony, type TestimonySubmission } from "@/app/(estudio)/dashboard/testimonios/actions";
import { uploadToCloudinary } from "@/app/(estudio)/dashboard/testimonios/upload";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { toast } from "sonner";
import { MessageSquareHeart, Sparkles } from "lucide-react";

const CATEGORIES = [
    "Sanación",
    "Provisión",
    "Salvación",
    "Restauración",
    "Protección",
    "Milagro",
    "Otro"
];

interface TestimonyFormProps {
    existingTestimony?: {
        id: string;
        content: string;
        category: string | null;
        image: string | null;
    };
    onSuccess?: () => void;
}

export function TestimonyForm({ existingTestimony, onSuccess }: TestimonyFormProps) {
    const [content, setContent] = useState(existingTestimony?.content || "");
    const [category, setCategory] = useState(existingTestimony?.category || "");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(existingTestimony?.image || null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (content.trim().length < 50) {
            toast.error("El testimonio debe tener al menos 50 caracteres");
            return;
        }

        setIsSubmitting(true);

        let imageUrl = existingTestimony?.image || null;

        // Upload image to Cloudinary if a new image was selected
        if (imageFile) {
            const formData = new FormData();
            formData.append("file", imageFile);
            const uploadResult = await uploadToCloudinary(formData);

            if (uploadResult.error) {
                toast.error(uploadResult.error);
                setIsSubmitting(false);
                return;
            }

            imageUrl = uploadResult.url || null;
        }

        const data: TestimonySubmission = {
            content: content.trim(),
            category: category || undefined,
            image: imageUrl || undefined,
        };

        const result = existingTestimony
            ? await updateTestimony(existingTestimony.id, data)
            : await submitTestimony(data);

        setIsSubmitting(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(existingTestimony ? "Testimonio actualizado" : "Testimonio enviado para aprobación");
            if (!existingTestimony) {
                setContent("");
                setCategory("");
                setImageFile(null);
                setImagePreview(null);
            }
            onSuccess?.();
        }
    };

    const charCount = content.length;
    const minChars = 50;
    const isValid = charCount >= minChars;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gradient-to-br from-mivn-blue/5 to-purple-500/5 dark:from-mivn-blue/10 dark:to-purple-500/10 rounded-3xl p-8 border border-mivn-blue/10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-mivn-blue to-purple-500 flex items-center justify-center">
                        <MessageSquareHeart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {existingTestimony ? "Editar Testimonio" : "Comparte tu Testimonio"}
                        </h3>
                        <p className="text-sm text-slate-500">Tu historia puede inspirar a otros</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="image" className="text-sm font-bold text-slate-700 dark:text-slate-300">
                            Imagen (Opcional)
                        </Label>
                        <ImageUpload
                            onImageSelected={(file, preview) => {
                                setImageFile(file);
                                setImagePreview(preview);
                            }}
                            currentImageUrl={imagePreview || undefined}
                            onRemove={() => {
                                setImageFile(null);
                                setImagePreview(null);
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category" className="text-sm font-bold text-slate-700 dark:text-slate-300">
                            Categoría (Opcional)
                        </Label>
                        <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger className="h-12 rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                                <SelectValue placeholder="Selecciona una categoría" />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl">
                                {CATEGORIES.map((cat) => (
                                    <SelectItem key={cat} value={cat} className="rounded-xl">
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label htmlFor="content" className="text-sm font-bold text-slate-700 dark:text-slate-300">
                            Tu Testimonio *
                        </Label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Cuéntanos cómo Dios ha obrado en tu vida..."
                            className="mt-2 min-h-[200px] rounded-2xl border-slate-200 dark:border-slate-700 resize-none"
                            required
                        />
                        <div className="flex items-center justify-between mt-2">
                            <p className={`text-xs ${isValid ? 'text-emerald-500' : 'text-slate-400'}`}>
                                {charCount} / {minChars} caracteres mínimos
                            </p>
                            {isValid && (
                                <span className="text-xs text-emerald-500 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    ¡Listo para enviar!
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-mivn-blue to-purple-500 hover:from-mivn-blue/90 hover:to-purple-500/90 text-white font-bold text-base shadow-lg shadow-mivn-blue/20"
            >
                {isSubmitting ? "Enviando..." : existingTestimony ? "Actualizar Testimonio" : "Enviar Testimonio"}
            </Button>

            {!existingTestimony && (
                <p className="text-xs text-center text-slate-500">
                    Tu testimonio será revisado por nuestro equipo antes de publicarse
                </p>
            )}
        </form>
    );
}
