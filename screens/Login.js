import React , { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, TextInput, View, Image, Platform, Alert  } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Button, Input, Icon, Header, Divider } from 'react-native-elements';
import {useAuth} from 'hooks/useAuth';

export default function Login({navigation}){

    const [dni, setDni] = useState('')
    const [password, setPassword] = useState('')
    const {status, login, isLoginLoading, hasLoginError} = useAuth()
    /*
    useEffect(() => {
      if(status == "signIn"){
        navigation.navigate('Inicio')
      }
    }, [status])
    */
    const handleSubmit = () => {
      login({dni, password})
    }
    
    const loading = 
    <>
      <Text style = {styles.textCargando}>Verificando datos, aguarde.. </Text>
      <Image
      style={{ width: 50, height: 50, margin:"2%"}}
      source={require('recursos/cargando.gif')} 
    />
    </>
    const error = <Text style = {styles.textError}>El DNI o la contraseña son incorrectos </Text>
    
    return(
      <View style={styles.container}>
        <Text style = {styles.textSubtitulo}> Sistema de Seguimiento de Enfermedades Crónicas No Transmisibles</Text>

        <Text h2 style={styles.ingresar}>INGRESAR</Text> 
        
        {hasLoginError && error}

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
          onChangeText={(value) => setDni(value)}
          value={dni}
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
          onChangeText={(value)=>setPassword(value)}
          value={password}
        />

        {isLoginLoading && loading }

        {!isLoginLoading &&
          <> 
          <StatusBar/>
          <Button 
            buttonStyle={styles.botonMenuHomeAzul}
            titleStyle={styles.botonTexto}
            title="Ingresar" 
            onPress={()=> handleSubmit()}/> 

          <Divider style={styles.divisorInferior} />
          
          <Button 
            buttonStyle={styles.botonMenuHomeVerde}
            titleStyle={styles.botonTexto}
            title="Registrarse" 
            onPress={()=> navigation.navigate('Registro')}/> 

          <Button 
            buttonStyle={styles.botonMenuHomeVerde}
            titleStyle={styles.botonTexto}
            title="Recuperar Clave" 
          /> 
          </>
        }
      <Text style = {styles.textFirma}> Todos los derechos reservados 2020: Gerc0s, Dub.</Text>
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
      margin: "2%",
      padding:"5%",
      borderRadius:10, 
      flexDirection: 'row', 
      alignSelf: 'center', 
      width:"97%", 
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
      margin: "2%",
      padding:"5%",
      borderRadius:10, 
      flexDirection: 'row', 
      alignSelf: 'center', 
      width:"97%", 
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
      paddingBottom:"5%",
    },

    textoFormulario: {
      color:"#00a7ba",
      fontSize: 40,
    },

    textCargando:{
      fontSize: 22,
      textAlign: "center",
      marginBottom: "5%",
      backgroundColor:"#00a7ba",
      borderRadius:2,
      padding:"1%",
      color: "#FFFFFF",
    },
    

    textSubtitulo:{
      fontSize: 15,
      textAlign: "center",
      marginTop: "10%",
      marginBottom: "5%",
      color: "#696969",
    },

    textError:{
      fontSize: 22,
      textAlign: "center",
      marginBottom: "5%",
      backgroundColor:"#fa6039",
      borderRadius:2,
      padding:"1%",
      color: "#FFFFFF",
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