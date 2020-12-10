import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import {Button, SearchBar} from 'react-native-elements';
import getUser from 'services/getUser';
import getGroups from 'services/getGroups';
import addUsertoGroup from 'services/addUsertoGroup';

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
  const { dni, user } = useUser()
  const { userToken } = useAuth()
  const [ search, setSearch ] = useState('')
  const [ usuarioACambiar, setUsuarioACambiar ] = useState(null)
  const [ isLoadingSearch, setLoadingSearch ] = useState(false)
  const [ noEncontrado, setNoEncontrado ] = useState(false)
  const [ isLoadingGroups, setLoadingGroups ] = useState(true)
  
  const [ groups, setGroups ] = useState([])
  const [ mapGroups, setMapGroups ] = useState([])

  function pertenece(nombre, grupos) {
    let x
    grupos.forEach(gr => {
    if(gr.name == nombre.name){ x = true }})

    return x
  }

  useEffect(()=> {
    async function fetchGroups() {       
      const obtenido = await getGroups()
      setGroups(obtenido)
      
      setLoadingGroups(false)
    } 
    fetchGroups()
  },[])

  useEffect (()  => {
    if(usuarioACambiar != null && usuarioACambiar.dni != undefined) {
      setNoEncontrado(false)
      groups.forEach(gr => {
        if(pertenece(gr, usuarioACambiar.groups)){
          setMapGroups(prevState => [...prevState, {
            "name": gr.name,
            "state": true,
          }])
        }
        else{
          setMapGroups(prevState => [...prevState, {
          "name": gr.name,
          "state": false,
        }])
        }
      })
    }
    else{
      setNoEncontrado(true)
    }
    setLoadingSearch(false)
  }, [usuarioACambiar])

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

  const handleAssignRol = (value) => {
    let val = value
    console.log(mapGroups[1].state)
    mapGroups[1].state = !val.state
  }

  const handlePatchUser = () => {
    addUsertoGroup({dni: usuarioACambiar.dni, data: mapGroups, accessToken: userToken})
  }

  const handleSearch = () => {
    setUsuarioACambiar(null)
    setLoadingSearch(true)
    
    getUser({dni: search, accessToken: userToken })
      .then(setUsuarioACambiar)

   
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
     <>
    <SearchBar
      placeholder="Buscar por DNI"
      onChangeText={(value) => handleSearchBar(value)}
      value={search}
      keyboardType="numeric"
      containerStyle={{backgroundColor: "#00707d"}}
      inputContainerStyle={{backgroundColor: "#FFFFFF"}}
      inputStyle={styles.textfilter}
      placeholderTextColor={"gray"}
    />
      <View style={styles.container}>
      {isLoadingSearch && spinnerPaciente}
     
      {usuarioACambiar != null && usuarioACambiar != undefined && isLoadingGroups == false &&
      <View style={{borderWidth:1, borderColor: '#00707d', width:"100%", marginBottom:"5%"}}>
        <Text h2 style={styles.textoDatosDNI}>{usuarioACambiar.last_name}, {usuarioACambiar.first_name} </Text> 
        <Text h2 style={styles.textoDatos}>DNI: {usuarioACambiar.dni}</Text> 
        <Text h2 style={styles.textoDatos}>Nacimiento: {usuarioACambiar.bod}</Text> 
        <Text h2 style={styles.textoDatos}>Género: {usuarioACambiar.gender}</Text> 
        <Text h2 style={styles.textoDatos}>Roles: </Text> 

        {usuarioACambiar && mapGroups.map(rol => {
        return <TouchableOpacity 
          key={rol.name}
          style={{width:"100%", padding: "1%", paddingLeft:"10%", paddingRight:"5%"}}       
          onPress={() => handleAssignRol(rol)}
          >
          <View style={rol.state ? styles.rolEncendido: styles.rolApagado}>
            <Image
            //style={[styles.text, touched && invalid ? styles.textinvalid : styles.textvalid]}
              style={{ width: 25, height: 25, margin:"2%", marginBottom:"3%"}}
              source={getIcon(rol.name)} 
            />
            <Text h2 style={styles.textoRol}>{rol.name}</Text> 
          </View>
        </TouchableOpacity> 
        })}
        <Button 
          buttonStyle={styles.botonMenuHomeAzul} 
          onPress={handlePatchUser} 
          titleStyle={styles.botonTexto}
          title='Guardar cambios'/>
      </View>
      }

      {noEncontrado && !isLoadingSearch && usuarioNoEncontrado}
     
      {!isLoadingSearch && 
        <Button 
          buttonStyle={styles.botonMenuHomeAzul} 
          onPress={handleSearch} 
          titleStyle={styles.botonTexto}
          title='Buscar'/>
      }
      
    </View>
    </>
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
      backgroundColor:"#fcad03",
      borderWidth: 1,
      borderColor: "#ad7600",
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOpacity: 1,
      elevation: 5,
      shadowRadius: 15 ,
      shadowOffset : { width: 1, height: 13},
    },

    botonMenuHomeAzul: {
      marginLeft:"5%",
      marginRight:"5%",
      margin:"2%",
      borderRadius:10, 
      flexDirection: 'row', 
      alignSelf: 'center', 
      width:"95%", 
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
      fontSize: 30,
    },

    textfilter:{
      color: "black",
      fontSize: 25,
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
  