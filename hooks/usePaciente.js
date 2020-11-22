import React from 'react'
import { PacienteContext } from 'context/PacienteContext'

export const usePaciente = () => {
    const { paciente, setPaciente} = React.useContext(PacienteContext)
    
    return {
        paciente: paciente,
    }
}