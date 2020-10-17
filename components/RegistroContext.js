import React,{useState, createContext} from 'react'

export const RegistroContext = createContext()

export const RegistroProvider = ({ children }) => {
    const [dni, setDni] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [location, setLocation] = useState(null)
    const [password, setPassword] = useState('')

    return(
        <RegistroContext.Provider value={{
            dni: dni,
            setDni: setDni,
            nombre: nombre,
            setNombre: setNombre,
            apellido: apellido,
            setApellido: setApellido,
            password: password,
            setPassword: setPassword,
            location: location,
            setLocation: setLocation
        }}>
            {children}
        </RegistroContext.Provider>
    )
}