import React, { useState, useContext, useEffect} from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { Icon, Divider } from "react-native-elements";
import { RegistroContext } from 'context/RegistroContext'

import validar from 'validator/formPass';

export default function FormPass({ navigation }) {
  const {setPassword,setErrorEnPass} = useContext(RegistroContext)
  const [pass, setPass] = useState('')
  const [confirmarPass, setConfirmarPass] = useState('')

  const [ passError, setPassError ] = useState("")

  return (
    <View style={styles.container}>
      <Text h2 style={styles.registrarse}>
        Seguridad </Text>
      
      <Text h2 style={styles.textSubtitulo}>
      Por favor, ingrese su contraseña </Text>
      
      {passError.length === 0 && <Text style={styles.encabezado}> Contraseña</Text>}
      {passError.length > 0 && <Text style={styles.encabezadoError}> Contraseña </Text>}
      <View style={{width:"100%", flexDirection:"row", marginBottom:"3%"}}>
        <Image
            style={{ marginLeft:"2%", width:"10%", height:"100%"}}
            source={require('../assets/Registro/clave.png')}
        />
        <TextInput placeholder="Contraseña" 
          style={styles.textoFormulario}
          leftIcon={
            <Icon
            name='lock'
            type='font-awesome'
            color='#00a7ba'
          />
          }
          secureTextEntry={true}
          onBlur={()=> setErrorEnPass(!validar(pass, confirmarPass, setPassError))}
          onChangeText={(value)=> {
            setPass(value)
            setPassword(value)
            setErrorEnPass(!validar(value, confirmarPass, setPassError))
          }}
          value={pass}
        />
    </View>     

    {passError.length === 0 && <Text style={styles.encabezado}> Repetir contraseña</Text>}
    {passError.length > 0 && <Text style={styles.encabezadoError}> Repetir contraseña</Text>}
    <View style={{width:"100%", flexDirection:"row", marginBottom:"3%"}}>
    <Image
      style={{ marginLeft:"2%", width:"10%", height:"100%"}}
      source={require('../assets/Registro/clave.png')}
    />
    <TextInput placeholder="Repetir contraseña" 
      style={styles.textoFormulario}
        leftIcon={
          <Icon
          name='lock'
          type='font-awesome'
          color='#00a7ba'
        />
        }
        secureTextEntry={true}
        onBlur={()=> setErrorEnPass(!validar(pass, confirmarPass, setPassError))}
        onChangeText={(value)=> {
          setConfirmarPass(value)
          setErrorEnPass(!validar(pass, value, setPassError))
        }}
        value={confirmarPass}
    />
    </View>    
    {passError.length > 0 && <Text style={styles.textoError}> {passError} </Text>}
     
    <Divider style={styles.divisorInferior} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  
  vistaTituloForm: {
  width:"100%", 
  flexDirection:"row",
  marginBottom:"1%",
  },
 
  encabezado:{
    fontSize: 25,
    backgroundColor:"#00a7ba",
    width:"98%",
    alignSelf: "flex-start",
    color: "#FFFFFF",
  },
  encabezadoError:{
    fontSize: 25,
    backgroundColor:"#fcad03",
    width:"98%",
    alignSelf: "flex-start",
    color: "#FFFFFF",
  },
   textSubtitulo:{
      fontSize: 22,
      textAlign: "center",
      marginTop: "2%",
      marginBottom: "2%",
      color: "#696969",
    },

  registrarse: {
    color: "#00a7ba",
    fontSize: 35,
    paddingTop: "1%",
    paddingBottom: "1%",
  },

  textoFormulario: {
    width:"85%",
    marginLeft:"1%",
    color: "#00a7ba",
    fontSize: 35,
    textAlign: "left",
    padding:"1%",
    borderColor: 'rgba(0, 167, 186, 0.2)',
    borderWidth: 1,
  },
  textoError:{
    fontSize: 18,
    marginLeft:"2%",
    marginBottom:"1%",
    alignSelf:'flex-start',
    textAlign: "center",
    color: 'red',
  },

  textoFormularioNA: {
    color: "#00a7ba",
    fontSize: 35,
  },

  divisorInferior: {
    backgroundColor: "#00a7ba",
    width: "95%",
    height: 1,
  },

});
