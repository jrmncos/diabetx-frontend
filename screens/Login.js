import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Button, Input, Icon, Header, Divider } from 'react-native-elements';

export default function Login({navigation}){
    return(
      <View style={styles.container}>
        <Text
        style = {styles.textSubtitulo}>
          Sistema de seguimiento de Enfermdades Cronicas no transmisibles</Text>

        <Text h2 style={styles.ingresar}>INGRESAR</Text> 
        
        <Input
          placeholder='DNI' 
          style={styles.textoFormulario}
          keyboardType = 'numeric'
          leftIcon={
            <Icon
              name='address-card'  
              color='#00a7ba'
              type='font-awesome'
            />
          }
        />

        <Input placeholder="Contraseña" 
        style={styles.textoFormulario}
          leftIcon={
            <Icon
            name='lock'
            type='font-awesome'
            color='#00a7ba'
          />
          }
          secureTextEntry={true} 
        />

        <StatusBar/>

        <TouchableOpacity 
          style={{width:"100%", padding: "2%"}}       
          onPress={() => navigation.navigate('Home')}>
          <View style={styles.botonMenuHomeAzul}>
            <Text h2 style={styles.botonTexto}>Ingresar</Text> 
          </View>
        </TouchableOpacity>

        <Divider style={styles.divisorInferior} />
        
        <TouchableOpacity 
          style={{width:"100%", padding: "2%"}}       
          onPress={() => navigation.navigate('Registro')}>
          <View style={styles.botonMenuHomeVerde}>
            <Text h2 style={styles.botonTexto}>Registrarse</Text> 
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{width:"100%", padding: "2%"}}       
          onPress={() => navigation.navigate('Registro')}>
          <View style={styles.botonMenuHomeVerde}>
            <Text h2 style={styles.botonTexto}>Recuperar Clave</Text> 
          </View>
        </TouchableOpacity>
   
        <Text
        style = {styles.textFirma}>
        Todos los derechos reservados 2020: Gerc0s, Dub.</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    botonMenuHomeVerde: {
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

    botonMenuHomeAzul: {
      borderRadius:10, 
      flexDirection: 'row', 
      alignSelf: 'center', 
      width:"100%", 
      backgroundColor: '#00a7ba',
      borderWidth: 1,
      borderColor: "#00707d",
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOpacity: 1,
      elevation: 5,
      shadowRadius: 15 ,
      shadowOffset : { width: 1, height: 13},
    },

    ingresar: {
      color:"#00a7ba",
      fontSize: 40,
      paddingTop:"2%",
      paddingBottom:"2%",
    },

    textoFormulario: {
      color:"#00a7ba",
      fontSize: 40,
    },

    textSubtitulo:{
      fontSize: 15,
      textAlign: "center",
      marginTop: "10%",
      marginBottom: "10%",
      color: "#696969",
    },

    textFirma:{
      fontSize: 12,
      textAlign: "center",
      marginTop: "10%",
      marginBottom: "10%",
      color: "#909090",
    },

    botonTexto:{
      padding:"5%",
      width:"100%",
      textAlign:"center",
      color: "white",
      fontSize: 35,
    },

    divisorInferior:{
      backgroundColor: "#00a7ba",
      width: "95%",
      height: 1,
    }
  });
  