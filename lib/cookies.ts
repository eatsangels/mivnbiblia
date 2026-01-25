export type CookieCategory = 'essential' | 'analytics' | 'marketing';

export interface CookiePreferences {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
    timestamp: number;
}

const COOKIE_CONSENT_KEY = 'mivn_cookie_consent';

export const defaultPreferences: CookiePreferences = {
    essential: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    timestamp: Date.now(),
};

export function getCookiePreferences(): CookiePreferences | null {
    if (typeof window === 'undefined') return null;

    try {
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!stored) return null;
        return JSON.parse(stored);
    } catch {
        return null;
    }
}

export function setCookiePreferences(preferences: CookiePreferences): void {
    if (typeof window === 'undefined') return;

    const prefs = {
        ...preferences,
        essential: true, // Always true
        timestamp: Date.now(),
    };

    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
}

export function hasGivenConsent(): boolean {
    return getCookiePreferences() !== null;
}

export function acceptAllCookies(): void {
    setCookiePreferences({
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: Date.now(),
    });
}

export function acceptEssentialOnly(): void {
    setCookiePreferences({
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: Date.now(),
    });
}

export function canUseAnalytics(): boolean {
    const prefs = getCookiePreferences();
    return prefs?.analytics ?? false;
}

export function canUseMarketing(): boolean {
    const prefs = getCookiePreferences();
    return prefs?.marketing ?? false;
}
