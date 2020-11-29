import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Login from 'screens/Login'
import Home from 'screens/Home'
import Geolocalizacion from 'screens/Geolocalizacion';
import Panel from 'screens/Panel';
import Registro from 'screens/Registro';
import Perfil from 'screens/Perfil';
import Notificacion from 'screens/Notificacion';
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
      <Stack.Screen name="Geolocalizacion" component={Geolocalizacion} title="Mapa ECNT" />
      <Stack.Screen name="Panel" component={Panel} title="Panel de Control" />
      <Stack.Screen name="Registro" component={Registro} title="Registrar Usuario" />
      <Stack.Screen name="Perfil" component={Perfil} title="Perfil de Usuario" />
      <Stack.Screen name="Notificacion" component={Notificacion} title="Notificaciones" />
      <Stack.Screen name="FormACDiabetes" component={FormACDiabetes} title="Formulario Autocontrol Diabetes" />
      <Stack.Screen name="NotificacionDetalle" component={NotificacionDetalle} title="NotificacionDetalle"/>
      <Stack.Screen name="Notificaciones" component={Notificaciones} title="Notificaciones"/>
      </>
    ): (
      <>
      <Stack.Screen name="Iniciar sesion" component={Login} title="Iniciar Sesión" />
      <Stack.Screen name="Registro" component={Registro} title="Registrar Usuario" />
      </>
    )}
    </Stack.Navigator>
  )
}
