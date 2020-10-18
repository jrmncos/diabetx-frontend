import React, { useEffect, useState, useContext } from 'react'
import { Button,SafeAreaView,  StyleSheet, View, Dimensions, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import * as Location from 'expo-location'

import marker from '../assets/marker.png'
import { RegistroContext } from './RegistroContext'
export default function GeoUsuario({navigation}){

  const [permisoUbicacion, setPermisoUbicacion] = useState(false)
  const [mapData, setMapDate] = useState({
    latitude: -34.783177,
    longitude: -58.836571,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  })

  const  context  = useContext(RegistroContext)
  
  useEffect(() => {
    console.log(context.location)
    if(context.location!=null){
      setMapDate(context.location)
    }
    else if(!permisoUbicacion){
      (async () => {
        Location.requestPermissionsAsync().then(status => {
          console.log('AKA2')
          if(status.granted){
            setPermisoUbicacion(true)
            Location.getCurrentPositionAsync({}).then(location => {
              console.log('AKA')
              setMapDate({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01})
            })
          }
          else{
            //setErrorMsg("Recuerde que es obligatorio ingresar su domicilio para registrarse.")
            //console.log("Localización por defecto.")
            setMapDate({ 
              latitude: -34.783177,
              longitude: -58.836571,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            })
          }
        })
      })()
    }
  }, [])
  /*
  useEffect(() => {
    (async () => {
      
    })()
  }, [permisoUbicacion])
  */
  const markerChange = (markerDataChange) => {  
    setMapDate(markerDataChange)
    context.setLocation(markerDataChange)
   }
   return (
    <View style={{flex:1}}>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle} 
        region={mapData}
        onRegionChangeComplete={markerChange}
       />
      <View style={styles.markerFixed}>
          <Image style={styles.marker} source={marker} />
      </View>
      <SafeAreaView style={styles.footerButton}>
      </SafeAreaView>
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
  footerButton: {
    bottom: 15,
    position: 'absolute',

    width: '90%',
    padding: '5%',
    marginLeft:"5%",

    fontSize: 30
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height -Dimensions.get('window').height*0.35,
  },
  textoCheckBox: { 
    color: "white",
    fontSize: 23,
    paddingLeft: 6,
  },
  footerTop: {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  top: 10,
  left:10,
  position: 'absolute',
  width: '50%'
  },
  
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
});