import React, {useState, useCallback, useContext} from 'react'
import {UserContext} from '../context/UserContext'
import  {loginUser} from '../services/ApiLogin'

export default function useUser(){
    const {token, setToken} = useContext(UserContext)
    const [state, setState] = useState({loading: false, error: true})
    
    const login = ({dni, password}) => {
        console.log("Hook user")
        setState({loading: true, error: false})
        loginUser({dni, password}).then(token => {
            console.log(token)
            setState({loading: false, error: false})
            setToken(token)
        })
        .catch(err =>{
            setState({loading: false, error: true})
            console.log(err)
        })
    }

    const logout = useCallback(()=>{
        setToken('')
    }, [setToken])

    return{
        isLogged: Boolean(token),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login
    }
}