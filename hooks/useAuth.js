import React, { useState, useCallback, useContext, useEffect } from 'react'
import { AuthContext } from 'context/AuthContext'
import { useUser } from 'hooks/useUser'
import  loginUserService from 'services/login'


export const useAuth = ()=>{
    const {signIn, signOut, status, userToken} = React.useContext(AuthContext)
    const {saveDni, removeDni, dni} = useUser()
    const [logginInfo, setLogginInfo] = useState({loading: false, error: false})

    const login = ({dni, password}) => {
        setLogginInfo({loading: true, error: false})
        loginUserService({dni, password})
        .then(token => {
            signIn(token.access_token)
            saveDni(dni)
            setLogginInfo({loading: false, error: false})
        })
        .catch(err =>{
            setLogginInfo({loading: false, error: true})
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