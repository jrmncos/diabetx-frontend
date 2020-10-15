import 'react-native-gesture-handler';

import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login'
import Home from './components/Home'
import Geolocalizacion from './components/Geolocalizacion';
import Panel from './components/Panel';
import Paciente from './components/Paciente';
import Registro from './components/Registro';
import AsignarECNT from './components/AsignarECNT';
import GeoUsuario from './components/GeoUsuario';
import RegistroECNT from './components/RegistroECNT';


const Stack = createStackNavigator()


export default function App() {

  const [isLoggin, setIsLoggin] = useState(false)

  return (
    <NavigationContainer>    
    <Stack.Navigator initialRouteName={isLoggin ? 'Home': 'Login'} screenOptions={{
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
        <Stack.Screen name="Paciente" component={Paciente} options={({ route }) => ({ title: route.params.name })}/>
        <Stack.Screen name="Registro" component={Registro} />
        <Stack.Screen name="AsignarECNT" component={AsignarECNT} />
        <Stack.Screen name="GeoUsuario" component={GeoUsuario} />
        <Stack.Screen name="RegistroECNT" component={RegistroECNT} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
