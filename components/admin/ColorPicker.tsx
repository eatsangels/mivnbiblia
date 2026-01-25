"use client";

import { useState } from "react";
import { Palette } from "lucide-react";

interface ColorPickerProps {
    label: string;
    value: string;
    onChange: (color: string) => void;
    description?: string;
}

export function ColorPicker({ label, value, onChange, description }: ColorPickerProps) {
    const [localValue, setLocalValue] = useState(value);

    const handleChange = (newColor: string) => {
        setLocalValue(newColor);
        onChange(newColor);
    };

    return (
        <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                {label}
            </label>
            {description && (
                <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
            )}
            <div className="flex items-center gap-4">
                {/* Color Preview */}
                <div
                    className="w-16 h-16 rounded-xl border-4 border-white dark:border-slate-800 shadow-lg transition-transform hover:scale-110"
                    style={{ backgroundColor: localValue }}
                />

                {/* Color Input */}
                <div className="flex-1 space-y-2">
                    <div className="relative">
                        <input
                            type="color"
                            value={localValue}
                            onChange={(e) => handleChange(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <Palette className="w-5 h-5 text-mivn-blue" />
                            <span className="font-mono text-sm font-bold text-slate-700 dark:text-slate-300">
                                {localValue.toUpperCase()}
                            </span>
                        </div>
                    </div>

                    {/* Text Input for manual entry */}
                    <input
                        type="text"
                        value={localValue}
                        onChange={(e) => handleChange(e.target.value)}
                        placeholder="#000000"
                        className="w-full px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-mivn-blue"
                        pattern="^#[0-9A-Fa-f]{6}$"
                    />
                </div>
            </div>
        </div>
    );
}
