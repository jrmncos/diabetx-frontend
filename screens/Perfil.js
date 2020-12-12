import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import {Button} from 'react-native-elements';
import getPaciente from 'services/getPaciente';

import FormECNT from 'components/FormECNT'
import {useUser} from 'hooks/useUser'
import {useAuth} from 'hooks/useAuth'
import {usePaciente} from 'hooks/usePaciente'

export default function Perfil({navigation}){
   const [paciente, setPaciente] = useState()
   const [loadingPaciente, setLoadingPaciente] = useState(true)   
   const {dni, user} = useUser()
   const {userToken} = useAuth()

   useEffect(()=> {
      async function fetchPaciente() {       
        const paciente = await getPaciente({dni, accessToken:userToken})
        setPaciente(paciente)
        setLoadingPaciente(false)
      } 
      fetchPaciente()
    },[])

   const spinnerPaciente = <Image
    style={{ width: 50, height: 50, margin:"2%"}}
    source={require('recursos/cargando.gif')} 
   />

   return(
      <View style={styles.container}>
        
      
        {loadingPaciente && spinnerPaciente}
        <TouchableOpacity 
          style={{width:"100%", marginBottom:"5%"}}       
          onPress={() => Alert.alert("Datos personales")}>
          <View style={{flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#00a7ba'}}>
            <Image
              style={{ width: 70, height: 70}}
              source={require('../assets/corazon.png')} 
            />
            <Text h2 style={styles.textoRol}>Datos personales</Text> 
          </View>
          <View style={{borderWidth:1, borderColor: '#5cc101', width:"100%"}}>
            <Text h2 style={styles.textoDatos}>{user.last_name}, {user.first_name} </Text> 
            <Text h2 style={styles.textoDatos}>{user.dni}</Text> 
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{width:"100%", marginBottom:"5%"}}>
          {paciente && <FormECNT paciente={paciente}/>}
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

    botonMenuHomeAzul: {
      textAlign:'center',
      margin: "2%",
      padding:"3%",
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
  