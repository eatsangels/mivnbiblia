"use client";

import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon, Check, Scissors } from "lucide-react";
import { signCloudinaryParameters } from "@/app/actions/cloudinary";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/image-utils";

interface ImageUploaderProps {
    onUploadComplete: (url: string, publicId: string) => void;
    currentImage?: string;
    bucket?: string; // Se mantiene por retrocompatibilidad pero no se usa
    folder?: string;
    aspectRatio?: number;
    circularCrop?: boolean;
}

export function ImageUploader({
    onUploadComplete,
    currentImage,
    folder = "uploads",
    aspectRatio = 16 / 9,
    circularCrop = false
}: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Cropping states
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleUploadToCloudinary = async (fileBlob: Blob | File) => {
        setUploading(true);
        setError(null);

        try {
            const { timestamp, signature } = await signCloudinaryParameters({ folder });

            const formData = new FormData();
            formData.append("file", fileBlob);
            formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
            formData.append("timestamp", timestamp.toString());
            formData.append("signature", signature);
            formData.append("folder", folder);

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || "Error al subir archivo a Cloudinary");
            }

            const data = await response.json();
            const secureUrl = data.secure_url;
            const publicId = data.public_id;

            setPreview(secureUrl);
            onUploadComplete(secureUrl, publicId);
            setImageToCrop(null);
        } catch (err: any) {
            console.error('Error uploading image to Cloudinary:', err);
            setError(err.message || 'Error al subir la imagen');
        } finally {
            setUploading(false);
        }
    };

    const processFile = async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError('Por favor selecciona una imagen válida');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError('La imagen no puede ser mayor a 5MB');
            return;
        }

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setImageToCrop(reader.result?.toString() || null);
        });
        reader.readAsDataURL(file);
    };

    const confirmCrop = async () => {
        if (!imageToCrop || !croppedAreaPixels) return;

        try {
            const croppedImage = await getCroppedImg(imageToCrop, croppedAreaPixels);
            if (croppedImage) {
                await handleUploadToCloudinary(croppedImage);
            }
        } catch (e) {
            console.error(e);
            setError("Error al procesar el recorte de la imagen");
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) await processFile(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) await processFile(file);
    };

    const removeImage = () => {
        setPreview(null);
        onUploadComplete('', '');
    };

    return (
        <div className="space-y-4">
            {preview ? (
                <div className="relative group rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-white/5 shadow-xl">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            type="button"
                            onClick={removeImage}
                            className="bg-white/20 backdrop-blur-md text-white p-3 rounded-xl hover:bg-red-500 transition-colors flex items-center gap-2 font-black uppercase tracking-widest text-[10px]"
                        >
                            <X className="w-4 h-4" /> Eliminar Imagen
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all duration-300 ${isDragging
                        ? "border-mivn-blue bg-mivn-blue/5 scale-[0.98] shadow-inner"
                        : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] hover:border-mivn-blue/50"
                        }`}
                >
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                        <div className="flex flex-col items-center justify-center pt-4 pb-4 px-8 text-center">
                            {uploading ? (
                                <div className="space-y-4">
                                    <div className="size-12 border-4 border-slate-100 border-t-mivn-blue rounded-full animate-spin mx-auto"></div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subiendo imagen...</p>
                                </div>
                            ) : (
                                <>
                                    <div className={`size-16 rounded-3xl flex items-center justify-center mb-4 transition-transform duration-300 ${isDragging ? 'bg-mivn-blue text-white scale-110 rotate-12' : 'bg-white dark:bg-white/5 text-slate-400 group-hover:scale-110'}`}>
                                        <Upload className="w-8 h-8" />
                                    </div>
                                    <p className="mb-1 text-sm text-slate-900 dark:text-white font-bold">
                                        {isDragging ? '¡Suéltala ahora!' : 'Arrastra y suelta tu imagen'}
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                        o haz clic para buscar (Máx 5MB)
                                    </p>
                                </>
                            )}
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                    </label>
                </div>
            )}

            {/* Modal de Recorte */}
            {imageToCrop && (
                <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[3rem] overflow-hidden flex flex-col shadow-2xl border border-white/10">
                        <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-mivn-blue/10 rounded-2xl text-mivn-blue">
                                    <Scissors className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Editar Imagen</h3>
                                    <p className="text-xs text-slate-500 font-medium">Ajusta el área que deseas mostrar</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setImageToCrop(null)}
                                className="p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-400 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="relative h-[400px] md:h-[500px] bg-slate-100 dark:bg-black/20">
                            <Cropper
                                image={imageToCrop}
                                crop={crop}
                                zoom={zoom}
                                aspect={aspectRatio}
                                cropShape={circularCrop ? 'round' : 'rect'}
                                showGrid={true}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>

                        <div className="p-10 space-y-8 bg-slate-50 dark:bg-white/5 mt-auto">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span>Zoom</span>
                                    <span>{Math.round(zoom * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-mivn-blue"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-6 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setImageToCrop(null)}
                                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    disabled={uploading}
                                    onClick={confirmCrop}
                                    className="flex items-center gap-4 px-10 py-5 bg-mivn-blue text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-mivn-blue/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {uploading ? (
                                        <>
                                            <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Subiendo...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Aplicar y Subir
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 p-4 rounded-[1.5rem] flex items-center gap-3 text-rose-500 animate-in fade-in slide-in-from-top-2 duration-300">
                    <X className="w-4 h-4 shrink-0" />
                    <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">{error}</p>
                </div>
            )}
        </div>
    );
}
