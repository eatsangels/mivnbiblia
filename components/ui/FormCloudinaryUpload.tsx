"use client";

import { useState } from "react";
import { CloudinaryUpload } from "./CloudinaryUpload";

interface FormCloudinaryUploadProps {
    name: string;
    defaultValue?: string;
    label?: string;
    resourceType?: "image" | "video" | "auto";
}

export function FormCloudinaryUpload({
    name,
    defaultValue = "",
    label,
    resourceType = "auto",
}: FormCloudinaryUploadProps) {
    const [url, setUrl] = useState(defaultValue);

    return (
        <div className="space-y-2">
            <CloudinaryUpload
                currentUrl={url}
                onUploadComplete={(newUrl) => setUrl(newUrl)}
                resourceType={resourceType}
                label={label}
            />
            <input type="hidden" name={name} value={url} />
        </div>
    );
}
