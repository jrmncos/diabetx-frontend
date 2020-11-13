import * as React from 'react';
import { getToken, setToken, removeToken } from 'services/tokenStorage.js';

export const AuthContext = React.createContext({
    status: 'idle',
    userToken: null,
    signIn: () => {},
    signOut: () => {},
})

export const AuthRef = React.createRef();

export const AuthProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(AuthReducer, {
        status: 'idle',
        userToken: null,
    })

    React.useEffect(() => {
        const initState = async () => {
          try {
            const userToken = await getToken();
            if (userToken !== null) {
              dispatch({ type: 'SIGN_IN', token: userToken });
            } else {
              dispatch({ type: 'SIGN_OUT' });
            }
          } catch (e) {
            // catch error here
            // Maybe sign_out user!
          }
        };
        initState();
      }, []);

      React.useImperativeHandle(AuthRef, () => authActions);

    const authActions = React.useMemo(() => ({
            signIn: async (token) => {
                dispatch({ type: 'SIGN_IN', token });
                await setToken(token);
            },
            signOut: async () => {
                await removeToken(); // TODO: use Vars
                dispatch({ type: 'SIGN_OUT' });
            },
        }),[]);
    
    return (
        <AuthContext.Provider value={{ ...state, ...authActions }}>
            {children}
        </AuthContext.Provider>
    )
}

const AuthReducer = (prevState, action) => {
    switch (action.type) {
      case 'SIGN_IN':
        return {
          ...prevState,
          status: 'signIn',
          userToken: action.token,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          status: 'signOut',
          userToken: null,
        };
    }
  };


