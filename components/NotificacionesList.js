import React from 'react'
import NotificacionItem from 'components/NotificacionItem'

export default function PacienteList({notificaciones=[]}){

    return(
        <>
        {
            notificaciones.map((notificacion) => {
                return(
                    <NotificacionItem key={notificacion.id} notificacion={notificacion}/>
                )
            })
        }
        </>
    )
} 