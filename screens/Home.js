import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { CheckBox, Divider } from 'react-native-elements';
import doctor from 'assets/docto.png'
import paciente from 'assets/abuelo.png'
import {useAuth} from 'hooks/useAuth'

export default function Home({navigation}){
  const [opcionesRol, cambiarVistaOPCRol] = useState(true)
  const [textoRol, setTextoRol] = useState("Profesional de la salud")
  const [imagenRol, setImagenRol] = useState(doctor)
<<<<<<< HEAD

  const {logout, user} = useUser()
=======
  const {logout} = useAuth()
  
>>>>>>> e0c0d5827010d7f87d2d56e6301872ac8bf318e5

  const handleExit = () => {
    logout()
    navigation.navigate('Iniciar sesion')
  }

  function cambiarTextos() {
    if(opcionesRol){
      setTextoRol("Paciente")
      setImagenRol(paciente) 
    }
    else{
      setTextoRol("Profesional de la salud")
      setImagenRol(doctor)
    }
  }

  return(
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#00a7ba'}}>
          <Image
            style={{ width: 70, height: 70, backgroundColor:"#00a7ba"}}
            source={imagenRol} 
          />
          <Text h2 style={styles.textoRol}>{textoRol}</Text> 
      </View>
   
      <Text h2 style={styles.textoBienvenida}>Bienvenido!</Text> 
      <Text h2 style={styles.textoNombreUsuario}>{/*user.first_name+" "+user.last_name*/}</Text> 
      <Text h2 style={styles.textoBienvenida}>Selecciona una acción para continuar.</Text> 

      <View>
        <CheckBox
          title={<Text>Cambiar vista: Paciente/Profesional</Text>}
          checked={opcionesRol}
          onPress={() => {
            cambiarTextos()
            cambiarVistaOPCRol(!opcionesRol)}}
        />
      </View>

      <Divider style={styles.divisorInferior} />
      
      {
        opcionesRol && 
        <>
        <TouchableOpacity 
          style={{width:"100%", padding: "2%"}}       
          onPress={() => navigation.navigate('Geolocalizacion')}>
          <View style={styles.botonMenuHome}>
            <Image
              style={{ width: 50, height: 50, margin:"2%"}}
              source={require('../assets/locationGeo.png')} 
            />
            <Text h2 style={styles.textoRol}>Mapa Interactivo</Text> 
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={{width:"100%", padding: "2%"}}       
          onPress={() => navigation.navigate('Notificacion')}>
          <View style={styles.botonMenuHome}>
            <Image
              style={{ width: 50, height: 50, margin:"2%"}}
              source={require('../assets/campana.png')} 
            />
            <Text h2 style={styles.textoRol}>Notificaciones</Text> 
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity 
          style={{width:"100%", padding: "2%"}}       
          onPress={() => navigation.navigate('Panel')}>
          <View style={styles.botonMenuHome}>
            <Image
              style={{ width: 50, height: 50, margin:"2%"}}
              source={require('../assets/paneldecontrol.png')} 
            />
            <Text h2 style={styles.textoRol}>Panel de control</Text> 
          </View>
        </TouchableOpacity>
        </>
        
      }
      {
        !opcionesRol &&
        <>
      <TouchableOpacity 
        style={{width:"100%", padding: "2%"}}       
        onPress={() => navigation.navigate('Perfil')}>
        <View style={styles.botonMenuHome}>
          <Image
            style={{ width: 60, height: 60, margin:"1%"}}
            source={require('../assets/abuelos.png')} 
          />
          <Text h2 style={styles.textoRol}>Perfil de usuario</Text> 
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={{width:"100%", padding: "2%"}}       
        onPress={() => navigation.navigate('FormACDiabetes')}>
        <View style={styles.botonMenuHome}>
          <Image
            style={{ width: 50, height: 50, margin:"2%"}}
            source={require('../assets/archivo-medico.png')} 
          />
          <Text h2 style={styles.textoRol}>Autocontrol</Text> 
        </View>
      </TouchableOpacity>
      </>
      }

      <TouchableOpacity
        style={{width:"100%", padding: "2%"}}       
        onPress={() => { handleExit()}}>
        <View style={styles.botonSalir}>
          <Image
            style={{ width: 50, height: 50, margin:"2%"}}
            source={require('../assets/archivo-medico.png')} 
          />
          <Text h2 style={styles.textoRol}>Salir</Text> 
        </View>
      </TouchableOpacity>
      
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    botonMenuHome: {
      borderRadius:10, 
      flexDirection: 'row', 
      alignSelf: 'center', 
      width:"100%", 
      backgroundColor: '#5cc101',
      borderWidth: 1,
      borderColor: "#479801",
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOpacity: 1,
      elevation: 5,
      shadowRadius: 15 ,
      shadowOffset : { width: 1, height: 13},
    },

    botonSalir: {
      borderRadius:10, 
      flexDirection: 'row', 
      alignSelf: 'center', 
      width:"100%", 
      backgroundColor: '#fcad03',
      borderWidth: 1,
      borderColor: "#d99400",
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOpacity: 1,
      elevation: 5,
      shadowRadius: 15 ,
      shadowOffset : { width: 1, height: 13},
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
      paddingTop:"4%",
      color: "white",
      fontSize: 30,
    },

    textoBienvenida:{
      color: "#101010",
      textAlign:"center",
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
  