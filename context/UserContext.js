import React, {useState, createContext} from 'react'
import 'services/getUser'
import { getDni, setDni, removeDni } from 'services/tokenStorage.js';

export const UserContext = React.createContext({
    status: 'idle',
    dni: null,
    saveDni: (dni) => {},
    removeDni: (dni) => {}
})

export const UserRef = React.createRef();

export const UserProvider = ({children}) => {
    //const {accessToken} = useAuth()
    const [state, dispatch] = React.useReducer(UserReducer, {
        dni: 'idle',
        user: null,
    })
    //getUser({dni, accesToken})

    React.useEffect(() => {
        const initState = async () => {
          try {
            const userDni = await getDni();
            if (userDni !== null) {
              dispatch({ type: 'DNI_EXIST', dni: userDni });
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
                dispatch({ type: 'DNI_EXIST', dni });
                await setToken(dni);
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
        };
      case 'DNI_NOT_EXIST':
        return {
          ...prevState,
          dni: 'idle',
        };
    }
  };