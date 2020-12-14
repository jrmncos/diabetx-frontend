import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Login from 'screens/Login'
import Home from 'screens/Home'
import Geolocalizacion from 'screens/Geolocalizacion';
import Panel from 'screens/Panel';
import Registro from 'screens/Registro';
import Perfil from 'screens/Perfil';
import PanelRol from 'screens/PanelRol'
import Notificador from 'screens/Notificador';
import NotificacionDetalle from 'screens/NotificacionDetalle'
import Notificaciones from 'screens/Notificaciones'
import FormACDiabetes from 'components/FormACDiabetes'
import { useAuth } from 'hooks/useAuth'

const Stack = createStackNavigator()


export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function RootNavigation() {
  const {status} = useAuth()

  return (
    <Stack.Navigator initialRouteName={'Iniciar sesion'} screenOptions={{
      headerStyle: {
        backgroundColor: "#5cc101",
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    {status == "signIn" ? (
      <>
      <Stack.Screen name="Inicio" component={Home} title="Página Principal" />
      <Stack.Screen name="Geolocalizacion" component={Geolocalizacion} options={{title:"Geolocalización"}} />
      <Stack.Screen name="Panel" component={Panel} options={{title:"Panel de control"}} />
      <Stack.Screen name="Registro" component={Registro} title="Registrar Usuario" />
      <Stack.Screen name="Perfil" component={Perfil} options= {{title:"Perfil de Usuario"}} />
      <Stack.Screen name="Notificador" component={Notificador} options={{title:"Notificador"}} />
      <Stack.Screen name="FormACDiabetes" component={FormACDiabetes} options= {{title:"Autocontrol"}} />
      <Stack.Screen name="NotificacionDetalle" component={NotificacionDetalle} options= {{title:"Notificación"}}/>
      <Stack.Screen name="Notificaciones" component={Notificaciones} title="Notificaciones"/>
      <Stack.Screen name="PanelRol" component={PanelRol} options={{title:"Panel roles"}}/>
      
      </>
    ): (
      <>
      <Stack.Screen name="Iniciar sesion" component={Login} options={{title:"Iniciar Sesión"}} />
      <Stack.Screen name="Registro" component={Registro} title="Registrar Usuario" />
      </>
    )}
    </Stack.Navigator>
  )
}
