import React from 'react'
import { UserContext } from 'context/UserContext'


export const useUser = () => {
    const {saveDni, removeDni, dni, user} = React.useContext(UserContext)

    return {
        dni: dni,
        user: user,
        saveDni: saveDni,
        removeDni: removeDni,
    }
}