import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Button, Input, Icon, Header } from 'react-native-elements';

export default function Login({navigation}){

    return(
      
        <View style={styles.container}>
        <Header 
        barStyle="light-content" 
        centerComponent={{ text: 'ACA VA EL LOGO', style: { color: '#fff' } }}
        containerStyle={{
          backgroundColor: '#5cc101',
          justifyContent: 'space-around',
        }}
        />
        <Text>Sistema de seguimiento de Enfermdades Cronicas no transmisibles</Text>

        <Text h2 style={styles.ingresar}>INGRESAR------------------------</Text> 
        
        <Input
          placeholder='DNI' 
          style={styles.DNI}
          keyboardType = 'numeric'
          leftIcon={
            <Icon
              name='user'  
              color='#0e6338'
              type='font-awesome'
            />
          }
        />

        <Input placeholder="Password" 
        style={styles.password}
          leftIcon={
            <Icon
            name='lock'
            type='font-awesome'
            color='#0e6338'
          />
          }
          secureTextEntry={true} 
        />

            <StatusBar/>
            <Button 
            buttonStyle={{
              fontSize: 23,
              width: '95%',
              padding: '5%',
              backgroundColor: '#5cc101',
              justifyContent: 'space-evenly',
            }}
              title="Ingresar" 
              onPress={()=> navigation.navigate('Home')}/> 

            <Button 
            buttonStyle={{
              fontSize: 23,
              width: '95%',
              padding: '5%',
              backgroundColor: '#5cc101',
              justifyContent: 'space-evenly',
            }}
              title="Registrarse" 
              onPress={()=> navigation.navigate('Home')}/> 

            <Button 
            buttonStyle={{
              fontSize: 23,
              width: '95%',
              padding: '5%',
              backgroundColor: '#5cc101',
              justifyContent: 'space-evenly',
            }}
              title="Recuperar Clave" 
              onPress={()=> navigation.navigate('Home')}/> 
        </View>
      
    )

  
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ingresar: {
      color:"#00a7ba",
      fontSize: 40,
    },
    DNI: {
      color:"#056832",
      fontSize: 40,
    },
    password: {
      fontSize: 40,
    },
  });
  