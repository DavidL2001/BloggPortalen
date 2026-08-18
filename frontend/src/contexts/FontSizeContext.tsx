import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

type FontScale = 100 | 112 | 125 | 137

interface FontSizeContextType {
    scale: FontScale
    increaseFontSize: () => void
    decreaseFontSize: () => void
    resetFontSize: () => void
}

const STEPS: FontScale[] = [100, 112, 125, 137]

const FontSizeContext = createContext<FontSizeContextType | null>(null)

export function FontSizeProvider({ children }: { children: ReactNode }) {
    const [scale, setScale] = useState<FontScale>(100)

    useEffect(() => {
        const saved = localStorage.getItem('fontScale')
        if (saved && STEPS.includes(Number(saved) as FontScale)) {
            setScale(Number(saved) as FontScale)
        }
    }, [])

    useEffect(() => {
        document.documentElement.style.fontSize = `${scale}%`
        localStorage.setItem('fontScale', String(scale))
    }, [scale])

    function increaseFontSize() {
        setScale((prev) => {
            const index = STEPS.indexOf(prev)
            return STEPS[Math.min(index + 1, STEPS.length - 1)]
        })
    }

    function decreaseFontSize() {
        setScale((prev) => {
            const index = STEPS.indexOf(prev)
            return STEPS[Math.max(index - 1, 0)]
        })
    }

    function resetFontSize() {
        setScale(100)
    }

    return (
        <FontSizeContext.Provider
            value={{ scale, increaseFontSize, decreaseFontSize, resetFontSize }}
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
