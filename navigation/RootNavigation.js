import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Login from 'screens/Login'
import Home from 'screens/Home'
import Geolocalizacion from 'screens/Geolocalizacion';
import Panel from 'screens/Panel';
import Registro from 'screens/Registro';
import Perfil from 'screens/Perfil';
import DniScanner from 'components/DniScanner';
import Notificacion from 'screens/Notificacion';
import FormACDiabetes from 'components/FormACDiabetes'

const Stack = createStackNavigator()

export default function RootNavigation(){

    return(
    <Stack.Navigator initialRouteName={'Iniciar sesion'} screenOptions={{
        headerStyle: {
          backgroundColor:"#5cc101",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="Iniciar sesion" component={Login} title="Iniciar Sesión"/>
        <Stack.Screen name="Inicio" component={Home} title="Página Principal"/>
        <Stack.Screen name="Geolocalizacion" component={Geolocalizacion} title="Mapa ECNT"/>
        <Stack.Screen name="Panel" component={Panel} title="Panel de Control"/>
        <Stack.Screen name="Registro" component={Registro} title="Registrar Usuario"/>
        <Stack.Screen name="Perfil" component={Perfil} title="Perfil de Usuario"/>
        <Stack.Screen name="Notificacion" component={Notificacion} title="Notificaciones" />
        <Stack.Screen name="FormACDiabetes" component={FormACDiabetes} title="Formulario Autocontrol Diabetes" />
      </Stack.Navigator>
      )
}
