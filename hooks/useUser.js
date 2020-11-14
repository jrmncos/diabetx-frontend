import React from 'react'
import { UserContext } from 'context/UserContext'


export const useUser = ()=>{
    const {dni, getUser} = React.useContext(UserContext)

    return {
        dni: dni,
    }
}