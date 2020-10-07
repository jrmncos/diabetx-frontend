import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View, Dimensions, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, Overlay, Circle} from "react-native-maps";

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function GeoUsuario({navigation}){

  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01
  });
  return (
    <View>
      <MapView 
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        region={region}
        onRegionChangeComplete={setRegion(region)}

       >
          <Marker 
            title="hola"
            coordinate={{ latitude: region.latitude, longitude: region.longitude}}
            pinColor='violet'/>
      </MapView> 
    </View>  

  );
};

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
});