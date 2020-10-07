import React, { useEffect, useState } from 'react'
import { Button,SafeAreaView,  StyleSheet, Text, View, Dimensions, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, Overlay, Circle} from "react-native-maps";

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import marker from '../assets/corazon.png'

export default function GeoUsuario({navigation}){

  const [mapData, setMapDate] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

  const [markerData, setMarkerData] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163
  })

  const markerChange = (markerDataChange) => {
    console.log(markerDataChange)
    setMapDate(markerDataChange)
    //setMarkerData({latitude: markerDataChange.latitude, longitude: markerDataChange.longitude})
  }

  /*
  <Marker
            title="hola"
            coordinate={markerData}
            pinColor='violet'
            />
  */

  return (
    <View style={styles.map}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={mapData}
        onRegionChangeComplete={markerChange}

        /* (IsItMuted === true) ? 'On' : 'Off'; */
       />
      <View style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} />
      </View>
      <SafeAreaView style={styles.footer}>
          <Text style={styles.region}>{JSON.stringify(mapData, null, 2)}</Text>
      </SafeAreaView>    
      
    </View>  

  );
};
/*
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 48,
    width: 48
  },
});
*/
const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  marker: {
    height: 48,
    width: 48
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20
  }
})