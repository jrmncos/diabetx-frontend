import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Geolocalizacion({navigation}){

    return(
        <View style={styles.container}>
        <Text>Aca va el mapa de Geolocalizacion</Text>
        <StatusBar style="auto" />
        <Button title="Volver al Home" onPress={()=> navigation.goBack()}/>
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
  