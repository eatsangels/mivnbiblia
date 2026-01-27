import { useState, useRef, useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Camera, Loader2, User as UserIcon, Check, X, Scissors } from 'lucide-react';
import Image from 'next/image';
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/image-utils";

import { signCloudinaryParameters } from '@/app/actions/cloudinary';

interface AvatarUploadProps {
    userId: string;
    initialUrl?: string;
    onUploadComplete?: (url: string) => void;
}

export function AvatarUpload({ userId, initialUrl, onUploadComplete }: AvatarUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(initialUrl || null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Cropping states
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleUploadToCloudinary = async (fileBlob: Blob | File) => {
        try {
            setUploading(true);

            // 1. Get Signature from Server
            const { timestamp, signature } = await signCloudinaryParameters({ folder: "avatars" });

            // 2. Upload to Cloudinary via REST API
            const formData = new FormData();
            formData.append("file", fileBlob);
            formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
            formData.append("timestamp", timestamp.toString());
            formData.append("signature", signature);
            formData.append("folder", "avatars");

            const uploadResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                throw new Error(errorData.error?.message || "Error al subir archivo a Cloudinary");
            }

            const uploadData = await uploadResponse.json();
            const publicUrl = uploadData.secure_url;

            // 3. Update Profile Table in Supabase
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('id', userId);

            if (updateError) throw updateError;

            setAvatarUrl(publicUrl);
            if (onUploadComplete) onUploadComplete(publicUrl);
            setImageToCrop(null);

        } catch (error: any) {
            console.error('Avatar upload error:', error);
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) return;

        const file = event.target.files[0];
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
            alert("Error al procesar el recorte de la imagen");
        }
    };

    return (
        <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gold-500/30 bg-gray-900 flex items-center justify-center relative shadow-2xl">
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt="Avatar"
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                    />
                ) : (
                    <UserIcon className="w-12 h-12 text-gray-700" />
                )}

                {uploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                        <Loader2 className="w-6 h-6 text-gold-500 animate-spin" />
                    </div>
                )}
            </div>

            <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="absolute bottom-0 right-0 p-2 bg-gold-600 rounded-full text-black hover:bg-gold-500 transition-colors shadow-lg active:scale-95 disabled:opacity-50"
                title="Cambiar foto de perfil"
            >
                <Camera className="w-4 h-4" />
            </button>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {/* Modal de Recorte de Avatar */}
            {imageToCrop && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-gray-900 w-full max-w-lg rounded-[2.5rem] overflow-hidden flex flex-col border border-white/10 shadow-3xl">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gold-500/10 rounded-xl text-gold-500">
                                    <Scissors className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-bold text-white uppercase tracking-tight">Recortar Foto</h3>
                            </div>
                            <button onClick={() => setImageToCrop(null)} className="text-gray-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="relative h-[350px] bg-black">
                            <Cropper
                                image={imageToCrop}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-gray-500">
                                    <span>Zoom</span>
                                    <span>{Math.round(zoom * 100)}%</span>
                                </div>
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="w-full h-1 bg-gray-800 rounded-full appearance-none cursor-pointer accent-gold-500"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-4">
                                <button
                                    onClick={() => setImageToCrop(null)}
                                    className="text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    disabled={uploading}
                                    onClick={confirmCrop}
                                    className="flex items-center gap-3 px-8 py-4 bg-gold-600 text-black rounded-2xl font-black uppercase tracking-widest text-[9px] hover:bg-gold-500 transition-all shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                    Guardar Foto
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
