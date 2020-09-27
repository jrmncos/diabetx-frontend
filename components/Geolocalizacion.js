import React from 'react'
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView from 'react-native-maps';

export default function Geolocalizacion({navigation}){

    return(
      <View style={styles.container}>
        <MapView style={styles.mapStyle} />
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
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
  