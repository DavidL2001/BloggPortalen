import React, { createContext, useContext, useState, useEffect } from 'react'

interface ThemeContextType {
    theme: 'light' | 'dark'
    toggleTheme: () => void
}

//skapar contexten tom från början
const ThemeContext = createContext<ThemeContextType | null>(null)

//wrappar hela appen så alla komponenter kan komma åt temat
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    //hämtar sparat tema från local storage
    useEffect(() => {
        const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
        if (saved) setTheme(saved)
    }, [])

    //uppdetarar dark klassen på sidan och sparar valet varje gång den ändras
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        localStorage.setItem('theme', theme)
    }, [theme])

    //byter mellan ljust och mörkt läge
    function toggleTheme() {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    //gör theme och toggletheme tillgängliga för allt inuti denna komponent
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
//genväg för anndra komponeneter att läsa/byta tema
export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('useTheme måste användas inom ThemeProvider')
    return context
}
