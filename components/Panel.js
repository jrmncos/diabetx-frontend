import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Paciente from './Paciente';

export default function Panel({navigation}){

    return(
        <View style={styles.container}>
        <Text>El Panel de control</Text>
        <Paciente dni={40861249} nombre={"German"} domicilio={"Irigoin 4182"}/>
        <Paciente dni={40861249} nombre={"Dub"} domicilio={"Los patos 4182"}/>
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
  