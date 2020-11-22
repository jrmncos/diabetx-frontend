import React,{useState, createContext} from 'react'

export const RegistroContext = createContext()

export const RegistroProvider = ({ children }) => {
    const [bod, setBod] = useState('')
    const [genero, setGenero] = useState('')
    const [ dni, setDni] = useState('')
    const [ nombre, setNombre] = useState('')
    const [ apellido, setApellido] = useState('')
    const [ location, setLocation] = useState(null)
    const [ password, setPassword] = useState('')
    const [ errorEnPrimerFormulario, setErrorEnPrimerFormulario ] = useState(true)
    const [ errorEnPass, setErrorEnPass ] = useState(true)

    return(
        <RegistroContext.Provider value={{
            dni: dni,
            setDni: setDni,
            bod: bod,
            setBod: setBod,
            genero: genero,
            setGenero: setGenero,
            nombre: nombre,
            setNombre: setNombre,
            apellido: apellido,
            setApellido: setApellido,
            password: password,
            setPassword: setPassword,
            location: location,
            setLocation: setLocation,
            errorEnPrimerFormulario: errorEnPrimerFormulario, 
            setErrorEnPrimerFormulario: setErrorEnPrimerFormulario, 
            errorEnPass: errorEnPass,
            setErrorEnPass: setErrorEnPass,
        }}>
            {children}
        </RegistroContext.Provider>
    )
}