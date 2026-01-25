"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CookiePreferences, getCookiePreferences, setCookiePreferences, defaultPreferences } from "@/lib/cookies";

interface CookieContextType {
    preferences: CookiePreferences;
    hasConsent: boolean;
    updatePreferences: (prefs: CookiePreferences) => void;
    acceptAll: () => void;
    acceptEssential: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export function CookieProvider({ children }: { children: ReactNode }) {
    const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
    const [hasConsent, setHasConsent] = useState(false);

    useEffect(() => {
        const stored = getCookiePreferences();
        if (stored) {
            setPreferences(stored);
            setHasConsent(true);
        }
    }, []);

    const updatePreferences = (prefs: CookiePreferences) => {
        setCookiePreferences(prefs);
        setPreferences(prefs);
        setHasConsent(true);
    };

    const acceptAll = () => {
        const prefs: CookiePreferences = {
            essential: true,
            analytics: true,
            marketing: true,
            timestamp: Date.now(),
        };
        updatePreferences(prefs);
    };

    const acceptEssential = () => {
        const prefs: CookiePreferences = {
            essential: true,
            analytics: false,
            marketing: false,
            timestamp: Date.now(),
        };
        updatePreferences(prefs);
    };

    return (
        <CookieContext.Provider value={{ preferences, hasConsent, updatePreferences, acceptAll, acceptEssential }}>
            {children}
        </CookieContext.Provider>
    );
}

export function useCookieConsent() {
    const context = useContext(CookieContext);
    if (!context) {
        throw new Error("useCookieConsent must be used within CookieProvider");
    }
    return context;
}
