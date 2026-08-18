import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

const MIN_FONT_SIZE = 16
const MAX_FONT_SIZE = 22
const STEP = 2

interface FontSizeContextType {
    fontSize: number
    increaseFontSize: () => void
    decreaseFontSize: () => void
}

const FontSizeContext = createContext<FontSizeContextType | null>(null)

export function FontSizeProvider({ children }: { children: ReactNode }) {
    const [fontSize, setFontSize] = useState(MIN_FONT_SIZE)

    useEffect(() => {
        const saved = localStorage.getItem('fontSize')
        if (saved) setFontSize(Number(saved))
    }, [])

    useEffect(() => {
        document.documentElement.style.fontSize = `${fontSize}px`
        localStorage.setItem('fontSize', String(fontSize))
    }, [fontSize])

    function increaseFontSize() {
        setFontSize((prev) => Math.min(prev + STEP, MAX_FONT_SIZE))
    }

    function decreaseFontSize() {
        setFontSize((prev) => Math.max(prev - STEP, MIN_FONT_SIZE))
    }

    return (
        <FontSizeContext.Provider
            value={{ fontSize, increaseFontSize, decreaseFontSize }}
        >
            {children}
        </FontSizeContext.Provider>
    )
}

export function useFontSize() {
    const context = useContext(FontSizeContext)
    if (!context)
        throw new Error('useFontSize måste användas inom FontSizeProvider')
    return context
}
