import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';

export default function Home({navigation}){
  const [nombre, setNombre] = useState()
  const [apellido, setApellido] = useState()
  const [lastAlert, setLastAlert] = useState()
  const [dni, setDni] = useState()

  useEffect(() => {
    setLastAlert("12/10/2020 17:22")
    setNombre("Santiago")
    setApellido("Galván")
    setDni("38692907")
    return () => {
    }
  }, [])

    return(
      <View style={styles.container}>
        <View style={{marginBottom:"5%", flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#00a7ba'}}>
          <Image
            style={{ width: 70, height: 70, backgroundColor:"#00a7ba"}}
            source={require('../assets/paciente.png')} 
          />
          <Text h2 style={styles.textoRol}>{nombre} {apellido}</Text> 
        </View>

        <TouchableOpacity 
          style={{width:"100%", marginBottom:"5%"}}       
          onPress={() => Alert.alert("Menu alertas", "Deberían listarse")}>
          <View style={{flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#fcad03'}}>
            <Image
              style={{ width: 70, height: 70}}
              source={require('../assets/alertas.png')} 
            />
            <Text h2 style={styles.textoRol}>Menú alertas</Text> 
          </View>
          <View style={{borderWidth:1, borderColor: '#fcad03', width:"100%"}}>
            <Text h2 style={styles.textoAlertaCabecera}>Ultima alerta: {lastAlert}</Text> 
            <Text h2 style={styles.textoAlerta}>Resultado: </Text> 
          </View>
        </TouchableOpacity>
         
        <TouchableOpacity 
          style={{width:"100%", marginBottom:"5%"}}       
          onPress={() => Alert.alert("Datos personales")}>
          <View style={{flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#5cc101'}}>
            <Image
              style={{ width: 70, height: 70}}
              source={require('../assets/corazon.png')} 
            />
            <Text h2 style={styles.textoRol}>Datos personales</Text> 
          </View>
          <View style={{borderWidth:1, borderColor: '#5cc101', width:"100%"}}>
            <Text h2 style={styles.textoAlertaCabecera}>Datos personales:</Text> 
            <Text h2 style={styles.textoDatos}>{apellido}, {nombre} </Text> 
            <Text h2 style={styles.textoDatos}>DNI: {dni}</Text> 
            <Text h2 style={styles.textoDatos}>Bla bla bla </Text> 
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{width:"100%", marginBottom:"5%"}}       
          onPress={() => Alert.alert("Menu CNT", "Deberían listarse")}>
          <View style={{flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#00a7ba'}}>
            <Image
              style={{ width: 70, height: 70}}
              source={require('../assets/archivo-medico.png')} 
            />
            <Text h2 style={styles.textoRol}>Menú ECNT</Text> 
          </View>
          <View style={{borderWidth:1, borderColor: '#00a7ba', width:"100%"}}>
            <Text h2 style={styles.textoAlertaCabecera}>ECNT asignadas:</Text> 
            <Text h2 style={styles.textoAlerta}>Diabetes, Hipertensión</Text> 
          </View>
        </TouchableOpacity>
      

      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    botonAzulMarino:{
      width: '95%',
      padding: '5%',
      backgroundColor: '#00a7ba',
      justifyContent: 'space-evenly',
    },

    botonVerdeClaro:{
      width: '95%',
      padding: '5%',
      backgroundColor: '#5cc101',
      justifyContent: 'space-evenly',
    },

    botonTexto:{
      color: "white",
      fontSize: 30,
    },

    textoRol:{
      paddingLeft:"5%",
      paddingTop:"5%",
      color: "white",
      fontSize: 30,
    },

    textoDatos:{
      color: "#101010",
      marginLeft:"5%",
      textAlign:"left",
      fontSize: 25,
    },

    textoAlerta:{
      marginLeft:"2%",
      color: "#101010",
      textAlign:"left",
      fontSize: 30,
    },
    
    textoAlertaCabecera:{
      marginLeft:"2%",
      color: "#00a7ba",
      textAlign:"left",
      fontSize: 30,
    },

    textoNombreUsuario:{
      color: "#00a7ba",
      textAlign:"center",
      fontSize: 30,
    },

    divisorInferior:{
      backgroundColor: "#00a7ba",
      width: "95%",
      height: 1,
    }

  });
  