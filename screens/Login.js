import React , { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, TextInput, View, Image, Platform  } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Button, Input, Icon, Header, Divider } from 'react-native-elements';
import useUser from 'hooks/useUser';

export default function Login({navigation}){

    const [dni, setDni] = useState('')
    const [password, setPassword] = useState('')
    const {isLogged, login, isLoginLoading, hasLoginError} = useUser()

    useEffect(() => {
      console.log("Effect Login")
      console.log("Estoy logeado?: " +  String(isLogged))
      if(isLogged){
        navigation.navigate('Home')
      }
    }, [isLogged])
    
    const handleSubmit = () => {
      login({dni, password})
    }
    
    const loading = (<Text style = {styles.textSubtitulo}> Validando dni y password.... </Text>)
    const error = (<Text style = {styles.textSubtitulo}> Los datos ingresados no son correctos.... </Text>)
    
    return(
      <View style={styles.container}>
        <Text style = {styles.textSubtitulo}> Sistema de seguimiento de Enfermdades Cronicas no transmisibles</Text>

        <Text h2 style={styles.ingresar}>INGRESAR</Text> 
        
        <TextInput
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

        <TextInput placeholder="Password" 
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
            buttonStyle={styles.botonAzulMarino}
            titleStyle={styles.botonTexto}
            title="Ingresar" 
            onPress={()=> handleSubmit()}/> 

          <Divider style={styles.divisorInferior} />
          
          <Button 
            buttonStyle={styles.botonVerdeClaro}
            titleStyle={styles.botonTexto}
            title="Registrarse" 
            onPress={()=> navigation.navigate('Registro')}/> 

          <Button 
            buttonStyle={styles.botonVerdeClaro}
            titleStyle={styles.botonTexto}
            title="Recuperar Clave" 
          /> 
          </>
        }
        {
          hasLoginError && error
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
  