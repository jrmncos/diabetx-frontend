import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Divider } from 'react-native-elements';
import {useAuth} from 'hooks/useAuth'
import { useUser } from 'hooks/useUser';
import getPaciente from 'services/getPaciente';
import getAlertas from 'services/getAlertas';

import paciente_f from 'imgUsuario/paciente_mujer.png'
import paciente_m from 'imgUsuario/paciente_hombre.png'
import profds_f from 'imgUsuario/pds_mujer.png'
import profds_m from 'imgUsuario/pds_hombre.png'
import corazon from 'recursos/corazon.png'

import BarraAlerta from 'components/BarraAlerta'

export default function Home({navigation}){
  const {logout, userToken} = useAuth()
  const {user, dni} = useUser()
  const [paciente, setPaciente] = useState(null)

  const [ isSelectingRole, setIsSelectingRole ] = useState(true)
  const [ selectedRole, setSelectedRole ] = useState()
  const [ iconSelectedRole, setIconSelectedRole ] = useState(corazon) 
  const [ alertas, setAlertas ] = useState()
  
  const [ isLoadingUser, setLoadingUser ] = useState(true)
  const [ isLoadingPaciente, setLoadingPaciente ] = useState(true)
  const [ isLoadingAlertas, setLoadingAlertas ] = useState(true)
  
  useEffect(() => {
    async function inicializar() {    
      if(user !== null && user.groups !== undefined){
        setLoadingUser(false)
        if(user.groups.length == 1){
          selectRole(user.groups[0].name)
          setSelectedRole(user.groups[0].name)
          setIsSelectingRole(false)
        }
        if(isLoadingPaciente){
          const pacienteObtenido = await getPaciente({dni: user.dni, accessToken:userToken})
          setPaciente(pacienteObtenido)
          setLoadingPaciente(false)
          console.log("Tengo el paciente?")
          console.log(pacienteObtenido)
        }
        if(isLoadingAlertas){
          const alertaObtenida = await getAlertas({id: paciente.id, accessToken:userToken})
          setAlerta(alertaObtenida)
          setLoadingAlertas(false)
          console.log("Tengo las alertas?")
          console.log(alertaObtenida)
        }
    }
    
  }
    inicializar()
  }, [user])

  const handleExit = () => {
    logout()
  }

  const selectRole = (rol) => {
    setSelectedRole(rol)
    setIconSelectedRole(getIcon(rol))
    setIsSelectingRole(false)
  }

  function getIcon(rol) {
    if(rol == "Paciente"){
      return ((user.gender === "Femenino") ? paciente_f : paciente_m) 
    }
    else if(rol == "Profesional de Salud"){
      return ((user.gender === "Femenino") ? profds_f : profds_m) 
    }
    else if(rol == "Promotor de Salud"){
      return((user.gender === "Femenino") ? paciente_f : paciente_m) 
    }
    else
      return corazon
  }

  return(
    <View style={styles.container}>
    
    {isLoadingUser && 
    <>
      <Image
      style={{ width: 50, height: 50, margin:"2%"}}
      source={require('recursos/cargando.gif')} 
      />
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
    </>
    }
    


    {!isLoadingUser && isSelectingRole && 
    <>
    {user && <Text h2 style={styles.textoBienvenida}>{user.gender === "Femenino" ? "¡Bienvenida!" : "¡Bienvenido!"}</Text>}
    {user && <Text h2 style={styles.textoNombreUsuario}>{user.first_name+" "+user.last_name}</Text>}
    <Text h2 style={styles.textoBienvenida}>Seleccione un rol para continuar</Text>
    {user && user.groups.map(rol => 
      {return (<TouchableOpacity 
        key={rol.name}
        style={{width:"100%", padding: "2%"}}       
        onPress={() => selectRole(rol.name)}>
        <View style={styles.botonMenuHome}>
          <Image
            style={{ width: 50, height: 50, margin:"2%", marginBottom:"3%"}}
            source={getIcon(rol.name)} 
          />
          <Text h2 style={styles.textoRol}>{rol.name}</Text> 
        </View>
      </TouchableOpacity>)})}

    </>} 
    {!isSelectingRole && 
    <>
    <View style={{flexDirection: 'row', width:"100%", backgroundColor: '#00a7ba'}}>
        <Image
          style={{ width: 70, height: 70, backgroundColor:"#00a7ba"}}
          source={iconSelectedRole} 
        />
        {selectedRole !== "Paciente" && <Text h2 style={styles.textoBarraSuperior}>{selectedRole}</Text> }
        {selectedRole === "Paciente" && <Text h2 style={styles.textoBarraSuperiorPaciente}>{selectedRole}</Text> }
        {user && user.groups.length > 1 &&
        <TouchableOpacity 
          style={{width:"30%", paddingTop:"5%"}}       
          onPress={() => setIsSelectingRole(true)}>
          <View style={styles.botonMenuHome}>
            <Image
              style={{ width: 30, height: 30, margin:"2%"}}
              source={require('recursos/cambiarRol.png')} 
            />
            <Text h2 style={styles.textoCambiarRol}>Cambiar</Text> 
          </View>
        </TouchableOpacity>
        }
    </View>

    {selectedRole == "Paciente" && !isLoadingAlertas && <BarraAlerta alertas={alertas}/>}

    {user && <Text h2 style={styles.textoBienvenida}>{user.gender === "Femenino" ? "¡Bienvenida!" : "¡Bienvenido!"}</Text>}
    {user && <Text h2 style={styles.textoNombreUsuario}>{user.first_name+" "+user.last_name}</Text>}
    <Text h2 style={styles.textoBienvenida}>Seleccione una acción para continuar</Text>
    <Divider style={styles.divisorInferior} />

      {selectedRole == "Profesional de Salud" && 
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
      {selectedRole == "Paciente" && 
      <>
      <TouchableOpacity 
        style={{width:"100%", padding: "2%"}}       
        onPress={() => navigation.navigate('Perfil')}>
        <View style={styles.botonMenuHome}>
          <Image
            style={{ width: 60, height: 60, margin:"1%"}}
            source={iconSelectedRole} 
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
      
      <TouchableOpacity
        style={{width:"100%", padding: "2%"}}       
        onPress={() => navigation.navigate('Notificaciones')}>
          <View style={styles.botonMenuHome}>
          <Image
            style={{ width: 50, height: 50, margin:"2%"}}
            source={require('../assets/archivo-medico.png')} 
          />
          <Text h2 style={styles.textoRol}>Notificaciones</Text> 
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

    botonCambiarRol:{
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

    textoBarraSuperior:{
      paddingLeft:"2%",
      width:"50%",
      paddingTop:"1%",
      color: "white",
      fontSize: 30,
    },

    textoBarraSuperiorPaciente:{
      paddingLeft:"2%",
      width:"50%",
      paddingTop:"5%",
      color: "white",
      fontSize: 30,
    },

    textoCambiarRol:{
      width: "100%",
      paddingLeft:"5%",
      paddingTop:"4%",
      color: "white",
      fontSize: 20,
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
      margin:"2%",
    }

  });
  