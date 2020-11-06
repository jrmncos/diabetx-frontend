import React, { useState, useCallback, useContext } from 'react'
import { UserContext } from 'context/UserContext';import getUserService from 'services/getUser'
import * as SecureStore from 'expo-secure-store';

export default function usePaciente(){
    const {user} = useContext(UserContext)
    const [state, setState] = useState({loading: false, error: false})
    
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
        isLogged: Boolean(accessToken),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login,
        logout,
    }
}