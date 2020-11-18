import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Divider } from 'react-native-elements';
import {useAuth} from 'hooks/useAuth'
import { useUser } from 'hooks/useUser';

import paciente_f from 'imgUsuario/paciente_mujer.png'
import paciente_m from 'imgUsuario/paciente_hombre.png'
import profds_f from 'imgUsuario/pds_hombre.png'
import profds_m from 'imgUsuario/pds_mujer.png'
import corazon from 'recursos/corazon.png'

export default function Home({navigation}){
  // const [opcionesRol, cambiarVistaOPCRol] = useState(true)
  // const [textoRol, setTextoRol] = useState("Profesional de la salud")
  // const [imagenRol, setImagenRol] = useState()
  const {logout, userToken} = useAuth()
  const {user} = useUser()

  const [ isSelectingRole, setIsSelectingRole ] = useState(true)
  const [ selectedRole, setSelectedRole ] = useState(null)
  const [ iconSelectedRole, setIconSelectedRole ] = useState(corazon) 

  const roles = [ "Paciente", "Profesional de Salud", "Promotor de Salud" ]

  const handleExit = () => {
    logout()
    navigation.navigate('Iniciar sesion')
  }

  const selectRole = (rol) => {
    console.log("Rol seleccionado: "+rol)
    setIcon()
    setSelectedRole(rol)
    setIsSelectingRole(false)
  }

  const setIcon = () => {
    console.log("genero: "+user.gender)
    console.log("groups: "+user.groups)
    console.log("selected rol"+selectedRole)
    if(selectedRole == "Paciente"){
      setIconSelectedRole((user.gender == "Femenino") ? paciente_f : paciente_m) 
      // setIconSelectedRole((user.genero == "Femenino") ? 'imgUser/paciente_mujer.png' : 'imgUser/paciente_hombre.png') 
    }
    else if(selectedRole == "Profesional de Salud"){
      setIconSelectedRole((user.gender == "Femenino") ? profds_f : profds_m) 
      //setIconSelectedRole((user.genero == "Femenino") ? 'imgUser/pds_mujer.png' : 'imgUser/pds_hombre.png')
    }
    else if(selectedRole == "Promotor de Salud"){
      setIconSelectedRole((user.gender == "Femenino") ? paciente_f : paciente_m) 
    }
    else
      return setIconSelectedRole(corazon)
  }

  return(

    <View style={styles.container}>
      <>
        {console.log(user)}
      </>
    
    {isSelectingRole && 
    <>
    <Text h2 style={styles.textoBienvenida}>Bienvenido!</Text>
      {user &&<Text h2 style={styles.textoNombreUsuario}>{user.first_name+" "+user.last_name}</Text>}
      {/* {user && <Text h2 style={styles.textoNombreUsuario}>{user.dni}</Text>}
      {userToken && <Text h2 style={styles.textoNombreUsuario}>{userToken}</Text>} */}
    <Text h2 style={styles.textoBienvenida}>Seleccione un rol para continuar</Text>
    {user && user.groups.map(rol => 
      {return (<TouchableOpacity 
        key={rol}
        style={{width:"100%", padding: "2%"}}       
        onPress={() => selectRole(rol)}>
        <View style={styles.botonMenuHome}>
          <Image
            style={{ width: 50, height: 50, margin:"2%"}}
            // source={require('../assets/locationGeo.png')} 
          />
          <Text h2 style={styles.textoRol}>{rol}</Text> 
        </View>
      </TouchableOpacity>)})}
      
    </>} 
    {!isSelectingRole && 
    <>
    <View style={{flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#00a7ba'}}>
          <Image
            style={{ width: 70, height: 70, backgroundColor:"#00a7ba"}}
            source={iconSelectedRole} 
          />
          <Text h2 style={styles.textoRol}>{selectedRole}</Text> 
      </View>
    <Text h2 style={styles.textoBienvenida}>Bienvenido!</Text>
      {user &&<Text h2 style={styles.textoNombreUsuario}>{user.first_name+" "+user.last_name}</Text>}
      {/* {user && <Text h2 style={styles.textoNombreUsuario}>{user.dni}</Text>}
      {userToken && <Text h2 style={styles.textoNombreUsuario}>{userToken}</Text>} */}
    <Text h2 style={styles.textoBienvenida}>Seleccione un rol para continuar</Text>
      {/* <View>
        <CheckBox
          title={<Text>Cambiar vista: Paciente/Profesional</Text>}
          checked={opcionesRol}
          onPress={() => {
            cambiarTextos()
            cambiarVistaOPCRol(!opcionesRol)}}
        />
      </View> */}
      <Divider style={styles.divisorInferior} />
      {
        selectedRole == "Profesional de Salud" && 
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
        selectedRole == "Paciente" &&
        <>
      <TouchableOpacity 
        style={{width:"100%", padding: "2%"}}       
        onPress={() => navigation.navigate('Perfil')}>
        <View style={styles.botonMenuHome}>
          {/*<Image
            style={{ width: 60, height: 60, margin:"1%"}}
            source={require('../assets/abuelos.png')} 
          />*/}
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
            source={require('../assets/cerrar-sesion.png')} 
          />
          <Text h2 style={styles.textoRol}>Salir</Text> 
        </View>
      </TouchableOpacity>
      
      <StatusBar style="auto" />
    </>}
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
      backgroundColor: '#00a7ba',
      borderWidth: 1,
      borderColor: "#00707d",
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
  