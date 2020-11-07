import React, { useState, useCallback, useContext } from 'react'
import { UserContext } from 'context/UserContext'
import  loginUserService from 'services/login'
import getUserService from 'services/getUser'
import * as SecureStore from 'expo-secure-store';


export default function useUser(){
    const {accessToken, setAccessToken, user, setUser, dni, setDni} = useContext(UserContext)
    const [state, setState] = useState({loading: false, error: false})
    
    const login = useCallback(({dni, password}) => {
        setState({loading: true, error: false})
        loginUserService({dni, password})
        .then(token => {
            console.log(token)
            SecureStore.setItemAsync('accessToken', token.access_token)
            // Falta el refresh token
            setState({loading: false, error: false})
            setDni(dni)
            setAccessToken(token.access_token)
        })
        .catch(err =>{
            setState({loading: false, error: true})
            console.log(err)
        })
    }, [setAccessToken, setDni])

    const logout = useCallback(() => {
        SecureStore.deleteItemAsync('accessToken')
        setAccessToken('')
    }, [setAccessToken])
    /*
    const getUser = ({dni, access_token}) => {
        getUserService({dni, access_token})
        .then(user => setUser(user))
        .then(err => {
            console.log(err)
        })
    }
    */
    return{
        isLogged: typeof accessToken == 'string',
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        user: user,
        login,
        logout,
    }
}