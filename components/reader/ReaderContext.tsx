'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type FontSize = 'small' | 'normal' | 'large' | 'huge';

interface ReaderContextProps {
    fontSize: FontSize;
    setFontSize: (size: FontSize) => void;
}

const ReaderContext = createContext<ReaderContextProps | undefined>(undefined);

export function ReaderProvider({ children }: { children: ReactNode }) {
    const [fontSize, setFontSize] = useState<FontSize>('normal');

    return (
        <ReaderContext.Provider value={{ fontSize, setFontSize }}>
            {children}
        </ReaderContext.Provider>
    );
}

export function useReader() {
    const context = useContext(ReaderContext);
    if (context === undefined) {
        throw new Error('useReader must be used within a ReaderProvider');
    }
    return context;
}
