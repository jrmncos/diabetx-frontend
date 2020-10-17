import React,{useState, createContext} from 'react'

export const RegistroContext = createContext()

export const RegistroProvider = ({ children }) => {
    const [dni, setDni] = useState(0)

    return(
        <RegistroContext.Provider value="40861249">
            {children}
        </RegistroContext.Provider>
    )
}