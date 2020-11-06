import React from 'react'
import MapaGeolocalizacion from 'components/MapaGeolocalizacion'
import {View, Stylesheet} from 'react-native'

export default function Geolocalizacion({navigation}){
    return(
        <View>
            <MapaGeolocalizacion navigation={navigation}/>
        </View>
    )
}