"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2, Check, ZoomIn } from "lucide-react";
import { signCloudinaryParameters } from "@/app/actions/cloudinary";
import { toast } from "sonner";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/canvasUtils";

interface CloudinaryUploadProps {
    onUploadComplete: (url: string, type: "image" | "video") => void;
    currentUrl?: string;
    resourceType?: "image" | "video" | "auto";
    label?: string;
}

export function CloudinaryUpload({
    onUploadComplete,
    currentUrl,
    resourceType = "auto",
    label = "Arrastra y suelta archivos aquí",
}: CloudinaryUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentUrl || null);
    const [fileType, setFileType] = useState<"image" | "video" | null>(null);

    // Cropping State
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [isCropping, setIsCropping] = useState(false);

    // Determine type of existing url if provided
    useState(() => {
        if (currentUrl) {
            const ext = currentUrl.split('.').pop()?.toLowerCase();
            if (ext && ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
                setFileType('image');
            } else if (ext && ['mp4', 'webm', 'mov'].includes(ext)) {
                setFileType('video');
            }
        }
    });

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const uploadFile = async (file: File | Blob, type: "image" | "video") => {
        setUploading(true);
        try {
            const { timestamp, signature } = await signCloudinaryParameters();

            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
            formData.append("timestamp", timestamp.toString());
            formData.append("signature", signature);

            const uploadType = resourceType === "auto" ? "auto" : resourceType; // Or rely on detected type

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${type === 'video' ? 'video' : 'image'}/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || "Error al subir archivo");
            }

            const data = await response.json();
            const secureUrl = data.secure_url;

            setFileType(type);
            setPreview(secureUrl);
            onUploadComplete(secureUrl, type);
            toast.success("Archivo subido correctamente");

            // Cleanup crop state
            setIsCropping(false);
            setImageSrc(null);

        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(error.message || "Error al subir archivo");
            setPreview(null);
        } finally {
            setUploading(false);
        }
    };

    const handleCropSave = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        try {
            const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
            if (croppedImageBlob) {
                await uploadFile(croppedImageBlob, "image");
            }
        } catch (e) {
            console.error(e);
            toast.error("Error al recortar la imagen");
        }
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        const isVideo = file.type.startsWith("video/");

        if (isVideo) {
            // Videos upload directly without crop
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
            setFileType("video");
            await uploadFile(file, "video");
        } else {
            // Images go to cropper first
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImageSrc(reader.result?.toString() || "");
                setIsCropping(true);
            });
            reader.readAsDataURL(file);
        }
    }, [uploadFile]); // Dependency strictly on upload helper

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: resourceType === 'image'
            ? { 'image/*': [] }
            : resourceType === 'video'
                ? { 'video/*': [] }
                : { 'image/*': [], 'video/*': [] },
        maxFiles: 1,
    });

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        setFileType(null);
        setImageSrc(null);
        setIsCropping(false);
        onUploadComplete("", "image");
    };

    const cancelCrop = () => {
        setImageSrc(null);
        setIsCropping(false);
        setPreview(currentUrl || null);
    };

    return (
        <div className="w-full">
            {/* Cropping Modal Overlay */}
            {isCropping && imageSrc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col h-[80vh]">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 z-10">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Editar Imagen</h3>
                            <button onClick={cancelCrop} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="relative flex-1 bg-slate-900 w-full">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={4 / 3} // Default aspect, maybe make dynamic?
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                objectFit="contain"
                            />
                        </div>

                        <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-6">
                            <div className="flex items-center gap-4">
                                <ZoomIn className="w-5 h-5 text-slate-500" />
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-mivn-blue"
                                />
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={cancelCrop}
                                    className="px-6 py-2.5 rounded-xl font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleCropSave}
                                    disabled={uploading}
                                    className="px-6 py-2.5 rounded-xl font-bold bg-mivn-blue text-white hover:bg-mivn-blue/90 transition-all shadow-lg shadow-mivn-blue/20 flex items-center gap-2"
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Subiendo...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="w-4 h-4" />
                                            Guardar y Subir
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div
                {...getRootProps()}
                className={`
                    relative flex flex-col items-center justify-center w-full h-64 
                    border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
                    ${isDragActive
                        ? "border-mivn-blue bg-blue-50/50 dark:bg-blue-900/20"
                        : "border-slate-300 dark:border-slate-700 hover:border-mivn-blue hover:bg-slate-50 dark:hover:bg-slate-900/50"
                    }
                `}
            >
                <input {...getInputProps()} />

                {preview && !isCropping ? (
                    <div className="relative w-full h-full p-2">
                        {fileType === "video" ? (
                            <video
                                src={preview}
                                className="w-full h-full object-contain rounded-lg"
                                controls
                            />
                        ) : (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-contain rounded-lg"
                            />
                        )}

                        {!uploading && (
                            <button
                                onClick={removeFile}
                                className="absolute top-4 right-4 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600 transition-colors backdrop-blur-sm"
                            >
                                <X size={20} />
                            </button>
                        )}

                        {uploading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] rounded-lg">
                                <Loader2 className="w-10 h-10 text-white animate-spin" />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-center p-6 space-y-4">
                        <div className={`p-4 rounded-full ${isDragActive ? "bg-blue-100 dark:bg-blue-900/40" : "bg-slate-100 dark:bg-slate-800"}`}>
                            <Upload className={`w-8 h-8 ${isDragActive ? "text-mivn-blue" : "text-slate-400"}`} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                {isDragActive ? "Suelta el archivo aquí" : label}
                            </p>
                            <p className="text-xs text-slate-500 max-w-[200px]">
                                SVG, PNG, JPG, GIF o Video (MP4, WEBM)
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
