import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View, Dimensions, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Circle } from 'react-native-maps';

// Geocoder.init("AIzaSyDFZlvMAtiN5FKA1dhJ7K5xG7Yy9MhZOhA");


import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function Geolocalizacion({navigation}){

    const [pacientes, setPacientes] = useState([])

    const[locationsGeodecoding, setLocationsGeodecoding] = useState(() => () => console.log("default ooops"));


    useEffect(()=>{
      fetch('http://192.168.1.38:8000/hospital/users/')
      .then(response => response.json())
      .then(data => {
        setPacientes(data)
        setLocationsGeodecoding((pacientes) => { pacientes.map(paciente =>{
            return Location.geocodeAsync(paciente.location)
          })}
        )
        
      })
      //getLocationPermissions()
    }, [])
    

    useEffect(()=>{
      Promise.all(locationsGeodecoding(pacientes)).then((results) => {
        console.log("Results")
        console.log(results)
      })
    }, [pacientes])
  
    return(
      <View style={styles.container}>

        <MapView style={styles.mapStyle} 
        initialRegion={{
          latitude: -34.784509,
          longitude: -58.834529,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
      }}
      >
        <Circle
                
                center = {{
                  latitude: -34.784509,
                  longitude: -58.834529}}
                radius = { 50 }
                strokeWidth = { 1 }
                strokeColor = { '#1a66ff' }
                fillColor = { 'rgba(230,238,255,0.5)' }
        />

      </MapView>

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
  