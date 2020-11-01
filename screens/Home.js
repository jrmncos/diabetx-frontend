import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Button, Input, Icon, Header, Divider } from 'react-native-elements';

export default function Home({navigation}){

    return(
        <View style={styles.container}>
        <Header 
        barStyle="light-content" 
        centerComponent={ <Image
          style={{ width: 140, height: 40 }}
          source={require('../assets/mmplogo.png')} 
        />}
        containerStyle={{
          backgroundColor: '#5cc101',
          justifyContent: 'space-between',
        }}
        />

        {
        //Preguntar con qué rol está logeado
        
        //Profesional de la salud:
        }

        <View style={{flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#00a7ba'}}>
      
        <Image
          style={{ width: 70, height: 70, backgroundColor:"#00a7ba"}}
          source={require('../assets/doctor.png')} 
        />

        <Text h2 style={styles.textoRol}>Profesiona de la salud</Text> 

        </View>

        <Text h2 style={styles.textoBienvenida}>Bienvenido!</Text> 
        <Text h2 style={styles.textoNombreUsuario}>German Costilla</Text> 
        <Text h2 style={styles.textoBienvenida}>Selecciona una acción para continuar.</Text> 

        <Divider style={styles.divisorInferior} />

        <TouchableOpacity 
          style={{width:"100%", padding: "2%"}}       
          onPress={() => navigation.navigate('Geolocalizacion')}>
          <View style={styles.botonMenuHome}>
            <Image
              style={{ width: 50, height: 50, margin:"2%"}}
              source={require('../assets/mapa.png')} 
            />
            <Text h2 style={styles.textoRol}>Mapa Interactivo</Text> 
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{width:"100%", padding: "2%"}}       
          onPress={() => navigation.navigate('Geolocalizacion')}>
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
          onPress={() => navigation.navigate('Perfil')}>
          <View style={styles.botonMenuHome}>
            <Image
              style={{ width: 50, height: 50, margin:"2%"}}
              source={require('../assets/paciente.png')} 
            />
            <Text h2 style={styles.textoRol}>Perfil de usuario</Text> 
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{width:"100%", padding: "2%"}}       
          onPress={() => navigation.navigate('panel')}>
          <View style={styles.botonMenuHome}>
            <Image
              style={{ width: 50, height: 50, margin:"2%"}}
              source={require('../assets/seo.png')} 
            />
            <Text h2 style={styles.textoRol}>Panel de control</Text> 
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{width:"100%", padding: "2%"}}       
          onPress={() => navigation.navigate('panel')}>
          <View style={styles.botonMenuHome}>
            <Image
              style={{ width: 50, height: 50, margin:"2%"}}
              source={require('../assets/archivo-medico.png')} 
            />
            <Text h2 style={styles.textoRol}>Autocontrol</Text> 
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
  