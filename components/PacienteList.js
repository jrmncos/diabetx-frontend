import React from 'react'
import Paciente from 'components/Paciente'

export default function PacienteList({pacientesFiltered=[]}){

    return(
        <>
        {
            pacientesFiltered.map(paciente => {
                return(
                    <Paciente key={paciente.user.dni} paciente={paciente}/>
                )
            })
        }
        </>
    )
} 