import React,{useState, createContext, useEffect} from 'react'
import getUser from 'services/getUser'
export const  UserContext = createContext()
import * as SecureStore from 'expo-secure-store';

export const UserProvider = ({children}) =>{
    const [accessToken, setAccessToken]  = useState(SecureStore.getItemAsync('accessToken'))
    const [user, setUser] = useState(null)
    const [dni, setDni] = useState('')

    useEffect(()=>{
        console.log("Effect Context User")
        console.log("Tengo el token?: " +  String(typeof accessToken == 'string'))

        if(typeof accessToken == 'string'){
            console.log(accessToken)
            getUser({accessToken, dni})
            .then(user => setUser(user))
        }
    }, [accessToken])

    return (<UserContext.Provider value={{
        accessToken,
        setAccessToken,
        user,
        setUser,
        dni,
        setDni
    }}>
        {children}
    </UserContext.Provider>
    )
}