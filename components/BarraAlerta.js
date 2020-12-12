import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React from 'react'

import MarqueeText from 'react-native-marquee';

import alerta from 'recursos/alertas.png'

export default function BarraAlerta({alertas=[]}){
  
  return(
  <>
   <TouchableOpacity 
   style={styles.barraAlerta}>      
    <View style={styles.barraAlerta}>
        <Image
          style={styles.imagen}
          source={alerta}
        />
        <MarqueeText
          style={{paddingTop:10, marginLeft:5, fontSize: 30, color:"#FFFFFF", width:"80%"}}
          duration={16000}
          marqueeOnStart
          loop
          marqueeDelay={1000}
          marqueeResetDelay={1500}
        >
          {alertas.length > 0 && alertas[alertas.length-1].detalles}
        </MarqueeText>
    </View>
    </TouchableOpacity>
  </> 
  )
}

const styles = StyleSheet.create({
  
  barraAlerta:{
    flexDirection: 'row', 
    width:"100%", 
    backgroundColor: 
    '#fcad03', 
    borderWidth:1,
    borderColor:'#bf8300'
  },

  textoUltimaAlerta:{
    paddingLeft:"5%",
    paddingTop:"4%",
    paddingBottom:"10%",
    color: "white",
    fontSize: 35,
  },

  imagen:{
    margin: "1%", 
    width: 50, 
    height: 50, 
    backgroundColor:"#fcad03"
  },
})