"use server";

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file: FormData) {
    try {
        const fileData = file.get("file") as File;
        if (!fileData) {
            return { error: "No file provided" };
        }

        // Convert file to base64
        const bytes = await fileData.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString("base64");
        const dataURI = `data:${fileData.type};base64,${base64}`;


        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: "testimonios",
            resource_type: "auto",
            transformation: [
                { width: 800, height: 800, crop: "limit" },
                { quality: "auto:good" },
                { fetch_format: "auto" },
            ],
        });

        return {
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return { error: "Error al subir la imagen" };
    }
}

export async function deleteFromCloudinary(publicId: string) {
    try {
        await cloudinary.uploader.destroy(publicId);
        return { success: true };
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        return { error: "Error al eliminar la imagen" };
    }
}
