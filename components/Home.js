import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Home({navigation}){

    return(
        <View style={styles.container}>
        <Text>El home</Text>
        <Button title="Mapa interactivo CNT" onPress={()=> navigation.navigate('Geolocalizacion')}/>
        <Button title="Panel de control" onPress={()=> navigation.navigate('Panel')}/>
        <StatusBar style="auto" />
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
  