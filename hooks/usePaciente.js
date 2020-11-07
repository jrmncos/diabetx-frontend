import React, { useState, useCallback, useContext } from 'react'
import { UserContext } from 'context/UserContext';import getUserService from 'services/getUser'
import * as SecureStore from 'expo-secure-store';

export default function usePaciente(){
    const {user} = useContext(UserContext)
    const [state, setState] = useState({loading: false, error: false})

    return{
        isLogged: Boolean(accessToken),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login,
        logout,
    }
}