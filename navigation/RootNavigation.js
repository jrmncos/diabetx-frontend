import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login'
import Home from '../screens/Home'
import Geolocalizacion from '../screens/Geolocalizacion';
import Panel from '../screens/Panel';
import Registro from '../screens/Registro';
import Perfil from '../screens/Perfil';
import DniScanner from '../components/DniScanner';
import Notificacion from '../screens/Notificacion';

const Stack = createStackNavigator()

export default function RootNavigation(){

    return(
    <Stack.Navigator initialRouteName={'Login'} screenOptions={{
        headerStyle: {
          backgroundColor:"#5cc101",
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} options={{title: 'Bienvenido al Sistema'}}/>
        <Stack.Screen name="Geolocalizacion" component={Geolocalizacion}/>
        <Stack.Screen name="Panel" component={Panel}/>
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="DniScanner" component={DniScanner} />
        <Stack.Screen name="Notificacion" component={Notificacion} />
      </Stack.Navigator>
      )
}
/*
        <Stack.Screen name="Paciente" component={Paciente} options={({ route }) => ({ title: route.params.name })}/>
*/