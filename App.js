import 'react-native-gesture-handler';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login'
import Home from './components/Home'
import Geolocalizacion from './components/Geolocalizacion';
import Panel from './components/Panel';
import Paciente from './components/Paciente';


const Stack = createStackNavigator()


export default function App() {
  return (
    <NavigationContainer>    
    <Stack.Navigator initialRouteName="Login"       screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
