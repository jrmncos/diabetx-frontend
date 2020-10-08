import React, { useEffect, useState } from 'react'
import { Button,SafeAreaView,  StyleSheet, Text, View, Dimensions, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, Overlay, Circle} from "react-native-maps";

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import marker from '../assets/corazon.png'

export default function GeoUsuario({navigation}){

  const [errorMsg, setErrorMsg] = useState(null);
  
  useEffect(() => {
    (async () => {
      Location.requestPermissionsAsync().then(status => {
        console.log(status)
      if(status.granted){
        console.log("Tengo permisos")
        Location.getCurrentPositionAsync({}).then(location => {
          console.log(location)
          setMapDate({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01})})
      }
      else{
        setErrorMsg("Recuerde que es obligatorio ingresar su domicilio para registrarse.");
        console.log("Localización por defecto.")
        setMapDate({ 
          latitude: -34.783177,
          longitude: -58.836571,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        })
      }
    })
      // let { status } = await Location.requestPermissionsAsync();
      // if (status !== 'granted') {
      //   setErrorMsg("Recuerde que es obligatorio ingresar su domicilio para registrarse.");
      //   setMapDate({ 
      //     latitude: -34.783177,
      //     longitude: -58.836571,
      //     latitudeDelta: 0.01,
      //     longitudeDelta: 0.01
      //   })
      // }
      // else{
      //   console.log("tenemos permisos!")
      //   let location = await Location.getCurrentPositionAsync({});
      //   console.log(location)
      //   setMapDate({  latitude: location.latitude,
      //     longitude: location.longitude,
      //     latitudeDelta: 0.01,
      //     longitudeDelta: 0.01})
      // }

    })();
  }, []);

  const [mapData, setMapDate] = useState({
    latitude: -34.783177,
    longitude: -58.836571,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });

  const [markerData, setMarkerData] = useState({
    latitude: -34.783177,
    longitude: -58.836571,
  })

  const markerChange = (markerDataChange) => {  
    setMapDate(markerDataChange)
   }

  return (
    <View style={styles.map}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapData}
        onRegionChangeComplete={markerChange}

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