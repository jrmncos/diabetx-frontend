import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { Circle } from 'react-native-maps';

// Geocoder.init("AIzaSyDFZlvMAtiN5FKA1dhJ7K5xG7Yy9MhZOhA");

const pacientesBackend = [
  {direccion: "Irigoin 4182, San Miguel", ecnt: "Diabetico"},
  {direccion: "Benito juarez 4182, San Miguel", ecnt: "Hipertension"},
  {direccion: "Defensa 2252, San Miguel", ecnt: "Diabetico"},
]


export default function Geolocalizacion({navigation}){

    const [pacientes, setPacientes] = useState('')

    // useEffect(() => {
    //   pacientesBackend.map((paciente)=>{
    //     Geocoder.from(paciente.direccion)
    //     .then(json => {
    //       var location = json.results[0].geometry.location;
    //       console.log(location);
    //     })
    //     .catch(error => console.warn(error));
    //       })
    // }, [])

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
  