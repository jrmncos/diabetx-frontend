import React, { useState, useCallback, useContext, useEffect } from 'react'
import { AuthContext } from 'context/AuthContext'
import { useUser } from 'hooks/useUser'
import  loginUserService from 'services/login'


export const useAuth = ()=>{
    const {signIn, signOut, status, userToken} = React.useContext(AuthContext)
    const {saveDni, removeDni, dni} = useUser()
    const [logginInfo, setLogginInfo] = useState({loading: false, error: false})

    const login = ({dni, password}) => {
        console.log(dni)
        console.log(password)
        setLogginInfo({loading: true, error: false})
        loginUserService({dni, password})
        .then(token => {
            console.log(token)
            signIn(token.access_token)
            saveDni(dni)
            setLogginInfo({loading: false, error: false})
        })
        .catch(err =>{
            setLogginInfo({loading: false, error: true})
            console.log(err)
        })
    }

    const logout = () => {
        signOut()
        removeDni(dni)
    }

    return {
        status: status,
        login: login,
        logout: logout,
        isLoginLoading: logginInfo.loading,
        hasLoginError: logginInfo.error,
        userToken: userToken

    }
}

/*
export default function useUser(){
    const {user, setDni, isLogged, setIsLogged} = useContext(UserContext)
    const [state, setState] = useState({loading: false, error: false})

    useEffect(() => {
        console.log("Hook user")
        SecureStore.getItemAsync('isLogged')
        .then(resp => setIsLogged(Boolean(resp)))
    }, [])
    
    const login = ({dni, password}) => {
        setState({loading: true, error: false})
        loginUserService({dni, password})
        .then(token => {
            console.log(token)
            SecureStore.setItemAsync('accessToken', token.access_token)
            SecureStore.setItemAsync('isLogged', 'true')
            setDni(dni)
            setIsLogged(true)
            setState({loading: false, error: false})
        })
        .catch(err =>{
            setState({loading: false, error: true})
            console.log(err)
        })
    }

    const logout = () => {
        SecureStore.deleteItemAsync('accessToken')
        SecureStore.setItemAsync('isLogged', 'false')
        setIsLogged((prev) => !prev)
        console.log("Me desloguie")
        console.log(isLogged)
        console.log("Fin de login")
    }
 
    return{
        isLogged: isLogged,
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        user: user,
        login,
        logout,
    }
}
*/