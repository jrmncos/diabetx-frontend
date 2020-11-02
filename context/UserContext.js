import React,{useState, createContext, useEffect} from 'react'
import getUser from '../services/getUser'
export const  UserContext = createContext()
import * as SecureStore from 'expo-secure-store';

export const UserProvider = ({children}) =>{
    const [accessToken, setAccessToken]  = useState(SecureStore.getItemAsync('accessToken'))
    const [user, setUser] = useState(null)
    const [dni, setDni] = useState('')

    useEffect(()=>{
        if(!accessToken) return setUser(null)
        /*
        getUser({dni, accessToken})
        .then(user => setUser(user))
        */
    }, [accessToken, dni])

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