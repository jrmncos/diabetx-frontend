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
        <Stack.Screen name="Iniciar sesion" component={Login} />
        <Stack.Screen name="Inicio" component={Home}/>
        <Stack.Screen name="Geolocalizacion" component={Geolocalizacion}/>
        <Stack.Screen name="Panel" component={Panel}/>
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Notificacion" component={Notificacion} />
        <Stack.Screen name="FormACDiabetes" component={FormACDiabetes} />
      </Stack.Navigator>
      )
}
