"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, FileIcon, Loader2 } from "lucide-react";
import { signCloudinaryParameters } from "@/app/actions/cloudinary";
import { toast } from "sonner";

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

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setUploading(true);
        // Optimistic preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setFileType(file.type.startsWith("video/") ? "video" : "image");

        try {
            const { timestamp, signature } = await signCloudinaryParameters();

            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
            formData.append("timestamp", timestamp.toString());
            formData.append("signature", signature);

            const uploadType = resourceType === "auto" ? "auto" : resourceType;

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${uploadType}/upload`,
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

            setPreview(secureUrl);
            onUploadComplete(secureUrl, file.type.startsWith("video/") ? "video" : "image");
            toast.success("Archivo subido correctamente");

        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(error.message || "Error al subir archivo");
            setPreview(null);
        } finally {
            setUploading(false);
        }
    }, [onUploadComplete, resourceType]);

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
        onUploadComplete("", "image"); // Reset
    };

    return (
        <div className="w-full">
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

                {preview ? (
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
