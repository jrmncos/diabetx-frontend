import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { TextInputMask } from 'react-native-masked-text'
import {Picker} from '@react-native-picker/picker';
import { Button, Input, Icon, Divider } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { RegistroContext } from 'context/RegistroContext'

export default function FormPass({ navigation }) {
  const { control, handleSubmit, errors } = useForm();
  const context = useContext(RegistroContext)
  const [password, setPassword] = useState('')

  function mascaraPass(value){
    return new Array(value.length + 1).join('*');
  }
  //Llama a set dni del context

  return (
    <View style={styles.container}>
     

      <Text h2 style={styles.registrarse}>
        Contraseña
      </Text>

      <Text h2 style={styles.textSubtitulo}>
      Por favor, ingresá tu contraseña, como consejo podés anotala y guardarla para no olvidarte la próxima vez que quieras ingresar.
      </Text>
    

    <Text style={styles.encabezado}> Contraseña</Text>
    <View style={{width:"100%", flexDirection:"row", marginBottom:"3%"}}>
    <Image
        style={{ marginLeft:"2%", width:"10%", height:"100%"}}
        source={require('../assets/Registro/clave.png')}
      />
    {/*  
    <Controller
        control={control}
        name={"password"}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <TextInputMask
            type={'custom'}
            options={{
              mask: '************',
            }}
            style={styles.textoFormulario}
            value={mascaraPass(context.password)}
            onBlur={onBlur}
            onChangeText={passInput => {
              context.setPassword(passInput)
            }}
          />
        )}
      />
    */
    }
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
        onChangeText={(value)=> {
          context.setPassword(value)
          setPassword(value)
        }}
        value={password}
      />
    </View>     

    <Text style={styles.encabezado}> Repetir contraseña</Text>
    <View style={{width:"100%", flexDirection:"row", marginBottom:"3%"}}>
    <Image
        style={{ marginLeft:"2%", width:"10%", height:"100%"}}
        source={require('../assets/Registro/clave.png')}
      />
    {/*  
    <Controller
        control={control}
        name={"password"}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <TextInputMask
            type={'custom'}
            options={{
              mask: '************',
            }}
            style={styles.textoFormulario}
            value={mascaraPass(context.password)}
            onBlur={onBlur}
            onChangeText={passInput => {
              context.setPassword(passInput)
            }}
          />
        )}
      />
    */}
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
          onChangeText={(value)=> {
            context.setPassword(value)
            setPassword(value)
          }}
          value={password}
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
