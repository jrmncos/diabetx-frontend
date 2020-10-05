import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View, Dimensions, Image, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Circle } from 'react-native-maps';

// Geocoder.init("AIzaSyDFZlvMAtiN5FKA1dhJ7K5xG7Yy9MhZOhA");


import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


const ecnt = ['diabetes', 'epoc', 'hipertension']

export default function Geolocalizacion({navigation}){

    const [pacientes, setPacientes] = useState([])

    const[locationsGeodecoding, setLocationsGeodecoding] = useState(() => () => console.log("default ooops"));



    useEffect(()=>{
      fetch('http://192.168.1.38:8000/hospital/users/')
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        //console.log(parseFloat(data[0].latitude))
        //console.log({latitude: parseFloat(data[0].latitude), longitude: parseFloat(data[0].longitude)})
        //console.log({latitude: -34.784509, longitude: -58.834529})
        //Hardcoding de ECNT
        let pacientesBackend = data.map((paciente) => {
          paciente.ecnt = ecnt[Math.floor(Math.random() * ecnt.length)] 
          return paciente
        })

        setPacientes(pacientesBackend)
        console.log(pacientes)
      })
      //getLocationPermissions()
    }, [])

  
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
        {pacientes && pacientes.map(paciente => {
          {console.log("HOLA")}
          {console.log(paciente)}
          return (<Circle
                  key={paciente.dni}
                  center = {{latitude: parseFloat(paciente.latitude), longitude: parseFloat(paciente.longitude)}}
                  radius = { 50 }
                  strokeWidth = { 1 }
                  strokeColor = { '#1a66ff' }
                  fillColor = { 'rgba(230,238,255,0.5)' }
                  />
            )  
        })}
        
      
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
  