import React, {useState, createContext} from 'react'
import  getUser  from 'services/getUser'
import { getDni, setDni, getToken, removeDni } from 'services/tokenStorage.js';

export const UserContext = React.createContext({
    status: 'idle',
    dni: null,
    saveDni: (dni) => {},
    removeDni: (dni) => {}
})

export const UserRef = React.createRef();

export const UserProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(UserReducer, {
        dni: 'idle',
        user: null,
    })

    React.useEffect(() => {
        const initState = async () => {
          try {
            const userDni = await getDni();
            console.log("Effect del User Context")
            console.log(userDni)
            if (userDni !== null) {
              const accessToken = await getToken()
              const user = await getUser({dni: userDni, accessToken})
              dispatch({ type: 'DNI_EXIST', dni: userDni, user: user });
            } else {
              dispatch({ type: 'DNI_NOT_EXIST' });
            }
          } catch (e) {
            // catch error here
            // Maybe sign_out user!
          }
        };
        initState();
      }, []);

    React.useImperativeHandle(UserRef, () => userActions);

    const userActions = React.useMemo(() => ({
            saveDni: async (dni) => {
                const accessToken = await getToken()
                const user = await getUser({dni: dni, accessToken})
                console.log("Action")
                console.log(user)
                dispatch({ type: 'DNI_EXIST', dni: dni, user: user });
                await setDni(dni);
            },
            removeDni: async(dni) =>{
                dispatch({ type: 'DNI_NOT_EXIST' });
                await removeDni(dni);
            }
    }),[]);
    
    return (
        <UserContext.Provider value={{ ...state, ...userActions }}>
            {children}
        </UserContext.Provider>
    )
}

const UserReducer = (prevState, action) => {
    switch (action.type) {
      case 'DNI_EXIST':
        return {
          ...prevState,
          dni: action.dni,
          user: action.user
        };
      case 'DNI_NOT_EXIST':
        return {
          ...prevState,
          dni: 'idle',
          user: null
        };
    }
  };