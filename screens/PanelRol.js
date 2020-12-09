import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {Button, SearchBar} from 'react-native-elements';
import getUser from 'services/getUser';

import FormECNT from 'components/FormECNT'
import {useUser} from 'hooks/useUser'
import {useAuth} from 'hooks/useAuth'
import {usePaciente} from 'hooks/usePaciente'
import busqueda from 'recursos/busqueda.png'

import paciente_f from 'imgUsuario/paciente_mujer.png'
import paciente_m from 'imgUsuario/paciente_hombre.png'
import profds_f from 'imgUsuario/pds_mujer.png'
import profds_m from 'imgUsuario/pds_hombre.png'
import corazon from 'recursos/corazon.png'

export default function PanelRol({navigation}){
  const {dni, user} = useUser()
  const {userToken} = useAuth()
  const [search, setSearch] = useState('')
  const [ usuarioACambiar, setUsuarioACambiar ] = useState(null)
  const [isLoadingSearch, setLoadingSearch ] = useState(false)
  const [ noEncontrado, setNoEncontrado ] = useState(false)


  function getIcon(rol) {
    if(rol == "Paciente"){
      return ((usuarioACambiar.gender === "Femenino") ? paciente_f : paciente_m) 
    }
    else if(rol == "Profesional de Salud"){
      return ((usuarioACambiar.gender === "Femenino") ? profds_f : profds_m) 
    }
    else if(rol == "Promotor de Salud"){
      return((usuarioACambiar.gender === "Femenino") ? paciente_f : paciente_m) 
    }
    else
      return corazon
  }

  const handleAddPaciente = async ()=> {

    setUsuarioACambiar(null)
    setLoadingSearch(true)
    console.log("ENVIO: "+search)
    const searchResult = await getUser({dni: search, accessToken: userToken }) 
    console.log("SERARCH RESULT: "+searchResult)
    if(searchResult != null && searchResult.dni != undefined){
      setUsuarioACambiar(searchResult)
      console.log(searchResult.dni)
      setLoadingSearch(false)
      setNoEncontrado(false)
    }
    else{
      setNoEncontrado(true)
      setLoadingSearch(false)
    }
  }

  const usuarioNoEncontrado = 
  <>
    <Image
      style={{ width: 100, height: 100, margin:"2%"}}
      source={require('recursos/404.gif')} 
    />
    <Text>DNI: {search} no encontrado!</Text>
  </>

  const spinnerPaciente = 
  <Image
    style={{ width: 50, height: 50, margin:"2%"}}
    source={require('recursos/cargando.gif')} 
  />

  const handleSearchBar = (value) => {
    setSearch(value)
  }
   return(
      <View style={styles.container}>
        <View style={{flexDirection: 'row', width:"100%", backgroundColor: '#00a7ba'}}>
          <Image
            style={{ width: 50, height: 50, backgroundColor:"#00a7ba", marginRight:"2%"}}
            source={busqueda} 
          />
        <SearchBar
            style={{ marginRight:"70%"}}
            placeholder="Buscar por DNI"
            onChangeText={(value) => handleSearchBar(value)}
            value={search}
            keyboardType="numeric"
            containerStyle={{backgroundColor: "#00a7ba"}}
            inputContainerStyle={{backgroundColor: "#FFFFFF",}}
            inputStyle={styles.textfilter}
            searchIcon={null}
            placeholderTextColor={"gray"}
          />
      </View>

      {isLoadingSearch && spinnerPaciente}
     
      {usuarioACambiar != null && usuarioACambiar != undefined &&
      <View style={{borderWidth:1, borderColor: '#5cc101', width:"100%"}}>
        <Text h2 style={styles.textoDatosDNI}>{usuarioACambiar.last_name}, {usuarioACambiar.first_name} </Text> 
        <Text h2 style={styles.textoDatos}>DNI: {usuarioACambiar.dni}</Text> 
        <Text h2 style={styles.textoDatos}>Nacimiento: {usuarioACambiar.bod}</Text> 
        <Text h2 style={styles.textoDatos}>Género: {usuarioACambiar.gender}</Text> 
        <Text h2 style={styles.textoDatos}>Roles: </Text> 
        {usuarioACambiar && usuarioACambiar.groups.map(rol => 
        {return (<TouchableOpacity 
          key={rol.name}
          style={{width:"100%", padding: "1%", paddingLeft:"10%", paddingRight:"5%"}}       
          onPress={() => selectRole(rol.name)}>
          <View style={styles.rolEncendido}>
            <Image
              style={{ width: 25, height: 25, margin:"2%", marginBottom:"3%"}}
              source={getIcon(rol.name)} 
            />
            <Text h2 style={styles.textoRol}>{rol.name}</Text> 
          </View>
        </TouchableOpacity>)})}
      </View>
      }

      {noEncontrado && !isLoadingSearch && usuarioNoEncontrado}
      
      {!isLoadingSearch && 
      <Button 
        buttonStyle={styles.botonMenuHomeAzul} 
        onPress={handleAddPaciente} 
        titleStyle={styles.botonTexto}
        title='Buscar'/>}
      
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    rolEncendido: {
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

    rolApagado: {
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

    botonTexto:{
      padding:"5%",
      width:"100%",
      textAlign:"center",
      color: "white",
      fontSize: 35,
    },

    textfilter:{
      width:'50%',
      color: "black",
      fontSize: 20,
    },

    textoRol:{
      paddingTop:"1.5%",
      color: "white",
      fontSize: 25,
    },

    textoDatosDNI:{
      fontSize: 30,
      backgroundColor:"#00a7ba",
      width:"100%",
      alignSelf: "flex-start",
      color: "#FFFFFF",
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
  