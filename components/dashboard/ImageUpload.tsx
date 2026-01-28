"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface ImageUploadProps {
    onImageSelected: (file: File, croppedImageUrl: string) => void;
    currentImageUrl?: string;
    onRemove?: () => void;
}

export function ImageUpload({ onImageSelected, currentImageUrl, onRemove }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [crop, setCrop] = useState<Crop>({
        unit: "%",
        width: 90,
        height: 90,
        x: 5,
        y: 5,
    });
    const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
    const [showEditor, setShowEditor] = useState(false);
    const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setOriginalImage(reader.result as string);
                setShowEditor(true);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
        },
        maxFiles: 1,
        multiple: false,
    });

    const getCroppedImg = useCallback(
        async (image: HTMLImageElement, crop: PixelCrop): Promise<Blob> => {
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");

            if (!ctx) {
                throw new Error("No 2d context");
            }

            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            return new Promise((resolve, reject) => {
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error("Canvas is empty"));
                            return;
                        }
                        resolve(blob);
                    },
                    "image/jpeg",
                    0.95
                );
            });
        },
        []
    );

    const handleCropComplete = useCallback(async () => {
        if (!imageElement || !completedCrop || !selectedFile) return;

        try {
            const croppedBlob = await getCroppedImg(imageElement, completedCrop);
            const croppedFile = new File([croppedBlob], selectedFile.name, {
                type: "image/jpeg",
            });
            const croppedUrl = URL.createObjectURL(croppedBlob);
            setPreview(croppedUrl);
            setShowEditor(false);
            onImageSelected(croppedFile, croppedUrl);
        } catch (error) {
            console.error("Error cropping image:", error);
        }
    }, [imageElement, completedCrop, selectedFile, getCroppedImg, onImageSelected]);

    const handleRemove = () => {
        setPreview(null);
        setOriginalImage(null);
        setSelectedFile(null);
        setShowEditor(false);
        onRemove?.();
    };

    if (showEditor && originalImage) {
        return (
            <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                    <ReactCrop
                        crop={crop}
                        onChange={(c) => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={undefined}
                    >
                        <img
                            src={originalImage}
                            alt="Crop preview"
                            onLoad={(e) => setImageElement(e.currentTarget)}
                            className="max-w-full h-auto"
                        />
                    </ReactCrop>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleCropComplete} className="flex-1">
                        Aplicar Recorte
                    </Button>
                    <Button
                        onClick={() => {
                            setShowEditor(false);
                            setOriginalImage(null);
                        }}
                        variant="outline"
                    >
                        Cancelar
                    </Button>
                </div>
            </div>
        );
    }

    if (preview) {
        return (
            <div className="relative">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                    onClick={handleRemove}
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                >
                    <X className="h-4 w-4" />
                </Button>
                <Button
                    onClick={() => setShowEditor(true)}
                    variant="secondary"
                    size="sm"
                    className="absolute bottom-2 right-2"
                >
                    Editar
                </Button>
            </div>
        );
    }

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
                    ? "border-primary bg-primary/5"
                    : "border-gray-300 dark:border-gray-600 hover:border-primary/50"
                }`}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-2">
                {isDragActive ? (
                    <>
                        <Upload className="h-12 w-12 text-primary" />
                        <p className="text-sm text-primary font-medium">
                            Suelta la imagen aquí...
                        </p>
                    </>
                ) : (
                    <>
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Arrastra una imagen aquí o haz clic para seleccionar
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            PNG, JPG, GIF hasta 10MB
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
