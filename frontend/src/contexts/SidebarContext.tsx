import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface SidebarContextType {
    isOpen: boolean
    toggleSidebar: () => void
    closeSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | null>(null)

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [ isOpen, setIsOpen] = useState(false)

    function toggleSidebar() {
        setIsOpen((prev) => !prev)
    }

    function closeSidebar() {
        setIsOpen(false)
    }

    return(
        <SidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar}}>
            {children}
        </SidebarContext.Provider>
    )
}

export function useSidebar() {
    const context = useContext(SidebarContext)
    if (!context) throw new Error("useSidebar måste användas inom sidebarprvidern")
        return context

}
