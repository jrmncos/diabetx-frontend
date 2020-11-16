import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { TextInputMask } from 'react-native-masked-text'
import {Picker} from '@react-native-picker/picker';
import { Divider } from "react-native-elements";
import { RegistroContext } from 'context/RegistroContext'

import validar from 'validator/formDP';

import DniScanner from 'components/DniScanner'

export default function FormDatosPersonales({ navigation }) {
  const {dni, setDni, nombre, setNombre, apellido, setApellido, bod, setBod, genero, setGenero, setErrorEnPrimerFormulario } = useContext(RegistroContext)
  const [ isScanning, setIsScanning ] = useState(false)

  const [ nombreError, setNombreError ] = useState("")
  const [ apellidoError, setApellidoError ] = useState("")
  const [ generoError, setGeneroError ] = useState("")
  const [ dniError, setDniError ] = useState("")
  const [ bodError, setBodError ] = useState("")
  const [ primerEjecucion, setprimerEjecucion ] = useState(true)

  function validarGenero(value) {
    validar('genero', value, setGeneroError)
    setGenero(value)
  }

  function validate(formInput, input, setter){
    switch (formInput) {
      case "nombre":    validar(formInput, input, setter)
      case "apellido":  validar(formInput, input, setter)
      case "dni":       validar(formInput, input, setter)
      case "bod":       validar(formInput, input, setter)
        
        break;
    
      default:
        break;
    }

    setErrorEnPrimerFormulario(
        nombreError != "" ||
        apellidoError != "" || 
        generoError != "" ||
        dniError != "" ||
        bodError != "")
  }

  return (
    <View style={styles.container}>
    {!isScanning && 
    <>
      <Text h2 style={styles.registrarse}>
        Registrarse
      </Text>

      <Text h2 style={styles.textSubtitulo}>
      Ingrese sus datos, o bien puede escanear su DNI
      </Text>
      
      {nombreError.length === 0 && <Text style={styles.encabezado}> Nombres</Text>}
      {nombreError.length > 0 && <Text style={styles.encabezadoError}> Nombres </Text>}
      <View style={styles.vistaTituloForm}>
        <Image
            style={{marginTop:"2%", marginLeft:"2%", width:"10%", height:"80%"}}
            source={require('../assets/archivo-medico.png')} 
          />
        <TextInput
          style={styles.textoFormulario}
          onBlur={()=>  validate('nombre', nombre, setNombreError)}
          onChangeText={value => { 
            validate('nombre', value, setNombreError)
            setNombre(value)
          }}
          value={nombre}
        />
     </View>   
    {nombreError.length > 0 && <Text style={styles.textoError}> {nombreError} </Text>}

    {apellidoError.length === 0 && <Text style={styles.encabezado}> Apellidos</Text>}
    {apellidoError.length > 0 && <Text style={styles.encabezadoError}> Apellidos </Text>}
    <View style={styles.vistaTituloForm}>
      <Image
          style={{marginTop:"2%", marginLeft:"2%", width:"10%", height:"80%"}}
          source={require('../assets/Registro/name.png')}
        />
      <TextInput
        style={styles.textoFormulario}
        onBlur={()=> validate('apellido', apellido, setApellidoError)}
        onChangeText={value => { 
          validate('apellido', value, setApellidoError)
          setApellido(value)}
        }
        value={apellido}
      />
    </View>
    {apellidoError.length > 0 && <Text style={styles.textoError}> {apellidoError} </Text>}

    {generoError.length === 0 && <Text style={styles.encabezado}> Género que figura en tu DNI</Text>}
    {generoError.length > 0 && <Text style={styles.encabezadoError}> Género que figura en tu DNI </Text>}
    <View style={styles.vistaTituloForm}>
      <Image
          style={{marginTop:"2%", marginLeft:"2%", width:"10%", height:"80%"}}
          source={require('../assets/Registro/genero.png')}
        />

      <View style={{borderColor: 'gray', borderColor: 'rgba(0, 167, 186, 0.2)',
      borderWidth: 1, width: "86%" }}>
        <Picker
          selectedValue={genero}
          onValueChange={ (value) => 
            validarGenero(value)
          }
        >
          <Picker.Item fontSize="20" label="Selecciona tu género" value="" />
          <Picker.Item label="Femenino" value="Femenino" />
          <Picker.Item label="Masculino" value="Masculino" />
        </Picker>
      </View>
    </View>    
    {generoError.length > 0 && <Text style={styles.textoError}> {generoError} </Text>}
    
    {dniError.length === 0 && <Text style={styles.encabezado}> DNI</Text>}
    {dniError.length > 0 && <Text style={styles.encabezadoError}> DNI</Text>}
    <View style={styles.vistaTituloForm}>
      <Image
          style={{marginTop:"2%", marginLeft:"2%", width:"10%", height:"80%"}}
          source={require('../assets/Registro/dni.png')}
        />
        <TextInputMask
          type={'only-numbers'}
          onBlur={()=> validate('dni', dni, setDniError)}
          style={styles.textoFormulario}
          value={dni}
          onChangeText={value => {
            validate('dni', value, setDniError)
            setDni(value)
          }}
        />
    </View>    
    {dniError.length > 0 && <Text style={styles.textoError}> {dniError} </Text>}
    
    {bodError.length === 0 && <Text style={styles.encabezado}> Fecha de nacimiento</Text>}
    {bodError.length > 0 && <Text style={styles.encabezadoError}> Fecha de nacimiento</Text>}
    <View style={styles.vistaTituloForm}>
      <Image
          style={{ marginLeft:"2%", width:"10%", height:"100%"}}
          source={require('../assets/Registro/nacimiento.png')}
        />
        <TextInputMask
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY'
          }}
          onBlur={()=> validate('bod', bod, setBodError)}
          value={bod}
          style={styles.textoFormulario}
          onChangeText={input => {
            validate('bod', input, setBodError)
            setBod(input)
          }}
        />
    </View>    
    {bodError.length > 0 && <Text style={styles.textoError}> {bodError} </Text>}
    
    <Divider style={styles.divisorInferior} />

    <View style={styles.botonEscanerDNI}>
        <TouchableOpacity
          onPress={() => setIsScanning(!isScanning)}> 
          <Image style={{height: 100, width: 100}} source={require('../assets/Registro/escanea.png')} />
        </TouchableOpacity>
    </View>
    </>  
    
    }
    <View style={styles.pantallaCompleta}>
      {isScanning && <DniScanner isScanning={setIsScanning}/>}
    </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  pantallaCompleta: {
    width:"100%"

  },
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
      margin: "3%",
      color: "#696969",
    },

    textoError:{
      fontSize: 18,
      marginLeft:"2%",
      marginBottom:"1%",
      alignSelf:'flex-start',
      textAlign: "center",
      color: 'red',
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