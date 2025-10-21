import { createContext, useState } from "react";

//1 Creamos el contexto, es el que consumiremos
export const FiltersContext = createContext()

//2 Creamos el proveedor del contexto, Provider, dara acceso a datos
export function FiltersProvider({ children }) {
    const [filters, setFilters] = useState({
        category: "all",
        minPrice: 0
    })
    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}