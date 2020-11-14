import React,{useState, createContext} from 'react'
import { RegistroContext } from './RegistroContext'

export const PacienteContext = createContext()

export const PacienteProvider = ({ children }) => {
    const [paciente, setPaciente] = useState(null)

    return(
        <RegistroContext.Provider value = {{paciente, setPaciente}}>
            {children}
        </RegistroContext.Provider>
    )
}