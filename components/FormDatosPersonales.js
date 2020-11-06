import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { TextInputMask } from 'react-native-masked-text'
import {Picker} from '@react-native-picker/picker';
import { Button, Input, Icon, Header, Divider } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { RegistroContext } from 'context/RegistroContext'

export default function FormDatosPersonales({ navigation }) {
  const { control, handleSubmit, errors } = useForm();
  const context = useContext(RegistroContext)

  function mascaraPass(value){
    return new Array(value.length + 1).join('*');
  }
  //Llama a set dni del context

  return (
    <View style={styles.container}>
     

      <Text h2 style={styles.registrarse}>
        Registrarse
      </Text>

      <Text h2 style={styles.textSubtitulo}>
      Por favor, ingresá tus datos, también podes ingresarlos tocando en "Escanear DNI".
      </Text>
    

    <Text style={styles.encabezado}> Nombres</Text>
    <View style={styles.vistaTituloForm}>
    <Image
        style={{marginTop:"2%", marginLeft:"2%", width:"10%", height:"80%"}}
        source={require('../assets/archivo-medico.png')} 
      />
    <Controller
        control={control}
        name={"nombre"}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.textoFormulario}
            onBlur={onBlur}
            onChangeText={nombreInput => { 
              onChange(nombreInput)
              context.setNombre(nombreInput)}
            }
            value={value}
          />
        )}
      />
    </View>   

    <Text style={styles.encabezado}> Apellidos</Text>
    <View style={styles.vistaTituloForm}>
    <Image
        style={{marginTop:"2%", marginLeft:"2%", width:"10%", height:"80%"}}
        source={require('../assets/Registro/name.png')}
      />
    <Controller
        control={control}
        name={"apellido"}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.textoFormulario}
            onBlur={onBlur}
            onChangeText={apellidoInput => { 
              onChange(apellidoInput)
              context.setApellido(apellidoInput)}
            }
            value={value}
          />
        )}
      />
    </View>

    <Text style={styles.encabezado}> Género que figura en tu DNI</Text>
    <View style={styles.vistaTituloForm}>
    <Image
        style={{marginTop:"2%", marginLeft:"2%", width:"10%", height:"80%"}}
        source={require('../assets/Registro/genero.png')}
      />
    <Controller
        control={control}
        name={"genero"}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <View style={{borderColor: 'gray', borderColor: 'rgba(0, 167, 186, 0.2)',
          borderWidth: 1, width: "86%" }}>
          <Picker
            selectedValue={context.genero}
            onValueChange={(itemValue) => context.setGenero(itemValue)}
          >
            <Picker.Item fontSize="20" label="Selecciona tu género" value="" />
            <Picker.Item label="Femenino" value="Femenino" />
            <Picker.Item label="Masculino" value="Masculino" />
          </Picker>
    
        </View>
        )}
      />
    </View>    
    
   
    <Text style={styles.encabezado}> DNI</Text>
    <View style={styles.vistaTituloForm}>
    <Image
        style={{marginTop:"2%", marginLeft:"2%", width:"10%", height:"80%"}}
        source={require('../assets/Registro/dni.png')}
      />
    <Controller
        control={control}
        name={"dni"}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <TextInputMask
            type={'only-numbers'}
            onBlur={onBlur}
            style={styles.textoFormulario}
            value={context.dni}
          onChangeText={dniInput => {
            if(dniInput.length < 9){
              context.setDni(dniInput)
            }}}
          />
        )}
      />
    </View>    

    <Text style={styles.encabezado}> Día de nacimiento</Text>
    <View style={styles.vistaTituloForm}>
    <Image
        style={{ marginLeft:"2%", width:"10%", height:"100%"}}
        source={require('../assets/Registro/nacimiento.png')}
      />
    <Controller
        control={control}
        name={"bod"}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            style={styles.textoFormulario}
            value={context.bod}
            onBlur={onBlur}
          onChangeText={bodInput => {
              context.setBod(bodInput)
            }}
          />
        )}
      />
    </View>    

    {/* <Text style={styles.encabezado}> Contraseña</Text>
    <View style={{width:"100%", flexDirection:"row", marginBottom:"3%"}}>
    <Image
        style={{ marginLeft:"2%", width:"10%", height:"100%"}}
        source={require('../assets/Registro/clave.png')}
      />
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
    </View>     */}
    <Divider style={styles.divisorInferior} />

    <View style={styles.botonEscanerDNI}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DniScanner')}> 
          <Image style={{height: 100, width: 100}} source={require('../assets/Registro/escanea.png')} />
        </TouchableOpacity>
    </View>
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

  botonEscanerDNI: {
    left: '75%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '90%',
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

  botonAzulMarino: {
    width: "95%",
    padding: "5%",
    backgroundColor: "#00a7ba",
    justifyContent: "space-evenly",
    marginTop: "2%",
    marginBottom: "2%",
  },

  botonVerdeClaro: {
    width: "95%",
    padding: "5%",
    backgroundColor: "#5cc101",
    justifyContent: "space-evenly",
    marginTop: "2%",
    marginBottom: "2%",
  },

  botonTexto: {
    color: "white",
    fontSize: 30,
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
