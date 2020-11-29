import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react'
import { useUser } from 'hooks/useUser';

import alerta from 'recursos/alertas.png'

export default function BarraAlerta({alertas}){
  const { user } = useUser()
  const [ cargandoAlertas, setCargandoAlertas ] = useState(true)

  useEffect(() => {
    console.log("ALERTAS IN BARRA ALERTA:")
    console.log(alertas)
    // if(alertas.size > 0){
      setCargandoAlertas(false)
    // }
    return () => {
    }
  }, [])
  return(
  <>
   <TouchableOpacity 
   onPress={(() => console.log("alertas"))}
   style={styles.barraAlerta}>      
    <View style={styles.barraAlerta}>
        <Image
          style={styles.imagen}
          source={alerta}
        />
    <Text>{alertas} </Text>

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

  imagen:{
    margin: "1%", 
    width: 50, 
    height: 50, 
    backgroundColor:"#fcad03"
  },
})