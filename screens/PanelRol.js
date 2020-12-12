import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import {Button, SearchBar} from 'react-native-elements';
import getUser from 'services/getUser';
import getGroups from 'services/getGroups';
import patchGroups from 'services/patchGroups';

import {useUser} from 'hooks/useUser'
import {useAuth} from 'hooks/useAuth'

import helpers from '../helpers/getIcon'

export default function PanelRol({navigation}){
  const { dni, user } = useUser()
  const { userToken } = useAuth()
  const [ search, setSearch ] = useState('')
  const [ usuarioACambiar, setUsuarioACambiar ] = useState(null)
  const [ isLoadingSearch, setLoadingSearch ] = useState(false)
  const [ noEncontrado, setNoEncontrado ] = useState(false)
  const [ isLoadingGroups, setLoadingGroups ] = useState(true)
  const [ ultimoDNIBuscado, setUltimoDNIBuscado ] = useState("")

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
      let idMG = 0
      setMapGroups([])
      setNoEncontrado(false)
      groups.forEach(gr => {
        let id = idMG
        if(pertenece(gr, usuarioACambiar.groups)){
          setMapGroups(prevState => [...prevState, {
            "id": id, 
            "name": gr.name,
            "state": true,
          }])
        }
        else{
          setMapGroups(prevState => [...prevState, {
          "id": id,
          "name": gr.name,
          "state": false,
        }])
        }
        idMG++
      })
    }
    else if(ultimoDNIBuscado != ""){
      setNoEncontrado(true)
    }
    setLoadingSearch(false)
  }, [usuarioACambiar])

  const handleAssignRol = (value) => {
    setMapGroups(mapGroups.map(item => 
      item.id === value.id 
      ? {...item, state : !value.state}
      : item))
  }

  const handleSearch  = async () => {
    if(search == ""){
      setNoEncontrado(false)
    }
    setUsuarioACambiar(null)
    setLoadingSearch(true)
    setUltimoDNIBuscado(search)

    await getUser({dni: search, accessToken: userToken })
      .then(setUsuarioACambiar)
  }

  const handlePatchUser = () => {
    patchGroups({user: usuarioACambiar, groups: mapGroups})
  }

  const handleSearchBar = (value) => {
    setSearch(value)
  }

  const gifCat404 = 
  <>
    <Image
      style={{ width: 100, height: 100, margin:"2%"}}
      source={require('recursos/404.gif')} 
    />
    <Text>DNI: {ultimoDNIBuscado} no encontrado!</Text>
  </>

  const spinnerLoading = 
  <Image
    style={{ width: 50, height: 50, margin:"2%"}}
    source={require('recursos/cargando.gif')} 
  />

   return(
    <ScrollView>
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
          
      {!noEncontrado && usuarioACambiar != null && usuarioACambiar != undefined && isLoadingGroups == false &&
      <View style={{borderWidth:1, borderColor: '#00707d', width:"100%", marginBottom:"1%"}}>
        <Text h2 style={styles.textoDatosDNI}>{usuarioACambiar.last_name}, {usuarioACambiar.first_name} </Text> 
        <Text h2 style={styles.textoDatos}>DNI: {usuarioACambiar.dni}</Text> 
        <Text h2 style={styles.textoDatos}>Nacimiento: {usuarioACambiar.bod}</Text> 
        <Text h2 style={styles.textoDatos}>Género: {usuarioACambiar.gender}</Text> 
        <Text h2 style={styles.textoDatos}>Roles: </Text> 
 

        {mapGroups.map(rol => {
        return <TouchableOpacity 
          key={rol.name}
          style={{width:"100%", padding: "1%", paddingLeft:"5%", paddingRight:"5%"}}       
          onPress={() => handleAssignRol(rol)}
          >
          <View style={mapGroups[rol.id].state ? styles.rolEncendido: styles.rolApagado}>
            <Image 
            //style={[styles.text, touched && invalid ? styles.textinvalid : styles.textvalid]}
              style={{ width: 25, height: 25, margin:"2%", marginBottom:"3%"}}
              source={helpers.getIconRol(rol.name)} 
            />
            <Text h2 style={styles.textoRol}>{rol.name}</Text> 
          </View>
        </TouchableOpacity> 
        })}
        <Button 
          buttonStyle={styles.botonMenuHomeAzul} 
          onPress={handlePatchUser} 
          titleStyle={styles.botonTexto}
          title='Guardar'/>
      </View>
      }

      {isLoadingSearch && spinnerLoading} 
      {!isLoadingSearch && noEncontrado && gifCat404}
      {!isLoadingSearch && noEncontrado &&
        <Text h2 style={styles.textSubtitulo}>
        Ingrese un DNI para empezar </Text>
      }
      {!isLoadingSearch && 
        <Button 
          buttonStyle={styles.botonMenuHomeAzul} 
          onPress={handleSearch} 
          titleStyle={styles.botonTexto}
          title='Buscar'/>
      }
      
    </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    textSubtitulo:{
      color: "#00a7ba",
      fontSize: 35,
      paddingTop: "1%",
      paddingBottom: "1%",
      padding:'5%',
      textAlign: 'center',
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
  