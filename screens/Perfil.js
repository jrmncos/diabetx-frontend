import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import {Button} from 'react-native-elements';
import useUser from 'hooks/useUser';
import getPaciente from 'services/getPaciente';
import * as SecureStore from 'expo-secure-store';
import FormECNT from 'components/FormECNT'

export default function Perfil({navigation}){
    /*
    const [nombre, setNombre] = useState("Santiago")
    const [apellido, setApellido] = useState("Galvan")
    const [lastAlert, setLastAlert] = useState("12/10/2020 17:22")
    const [dni, setDni] = useState("38692907")
    */
  const {user} = useUser()
  const [paciente, setPaciente] = useState()
  const [loadingPaciente, isLoadingPaciente] = useState(true)
  const handleSubmitSave = () => { 

  }
  useEffect(()=> {
    async function fetchPaciente() {
      const dni = user.dni
      console.log("YENDO A BUSCAR EL PACIENTE...")
      const accessToken = await SecureStore.getItemAsync('accessToken')
      const paciente = await getPaciente({dni, accessToken})
      setPaciente(paciente)
      isLoadingPaciente(false)
    } 
    fetchPaciente()
  },[])

    return(
      <View style={styles.container}>
        {!loadingPaciente && console.log("PACI PACI: "+paciente)}
        <View style={{marginBottom:"5%", flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#00a7ba'}}>
          {user.gender == "Masculino" && 
          <Image
            style={{ width: 70, height: 70, backgroundColor:"#00a7ba"}}
            source={require('../assets/abuelo.png')} 
          />
          }
          {user.gender == "Femenino" && 
          <Image
            style={{ width: 70, height: 70, backgroundColor:"#00a7ba"}}
            source={require('../assets/abuela.png')} 
          />
          }
          <Text h2 style={styles.textoRol}>{user.first_name} {user.last_name}</Text> 
        </View>
        
        {/*
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
        */}
         
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
            <Text h2 style={styles.textoDatos}>{user.last_name}, {user.first_name} </Text> 
            <Text h2 style={styles.textoDatos}>DNI: {user.dni}</Text> 
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{width:"100%", marginBottom:"5%"}}>
        <FormECNT paciente={paciente}/>
        </TouchableOpacity>

        <View style={{alignContent:'center'}}>
          <Button 
              buttonStyle={styles.botonMenuHomeAzul}
              titleStyle={styles.botonTexto}
              title="Guardar cambios" 
              onPress={()=> handleSubmitSave() }
          /> 

        </View>
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
  