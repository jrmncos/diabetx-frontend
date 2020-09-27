import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Login({navigation}){

    return(
        <View style={styles.container}>
        <Text>Sistema de seguimiento de Enfermdades Cronicas no transmisibles</Text>
        <StatusBar style="auto" />
        <Button title="Ingresar" onPress={()=> navigation.navigate('Home')}/>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  