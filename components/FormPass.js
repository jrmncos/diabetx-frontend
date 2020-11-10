import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { Icon, Divider } from "react-native-elements";
import { RegistroContext } from 'context/RegistroContext'

export default function FormPass({ navigation }) {
  const {setPassword} = useContext(RegistroContext)
  const [pass, setPass] = useState('')
  const [confirmarPass, setConfirmarPass] = useState('')

  function mascaraPass(value){
    return new Array(value.length + 1).join('*');
  }
  //Llama a set dni del context

  return (
    <View style={styles.container}>
      <Text h2 style={styles.registrarse}>
        Seguridad </Text>
      
      <Text h2 style={styles.textSubtitulo}>
      Por favor, ingrese su contraseña </Text>
      
      <Text style={styles.encabezado}> Contraseña</Text>
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
          onChangeText={(value)=> {
            setPass(value)
            setPassword(value)
          }}
          value={pass}
        />
    </View>     

    <Text style={styles.encabezado}> Repetir contraseña</Text>
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
          onChangeText={(value)=> {
            setConfirmarPass(value)
          }}
          value={confirmarPass}
      />
    </View>     
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
