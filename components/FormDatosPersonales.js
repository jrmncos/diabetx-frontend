import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { TextInputMask } from 'react-native-masked-text'
import {Picker} from '@react-native-picker/picker';
import { Divider } from "react-native-elements";
import { RegistroContext } from 'context/RegistroContext'

import DniScanner from 'components/DniScanner'

export default function FormDatosPersonales({ navigation }) {
  const {dni, setDni, nombre, setNombre, apellido, setApellido, bod, setBod, genero, setGenero } = useContext(RegistroContext)
  const [isScanning, setIsScanning] = useState(false)
  
  return (
    <View style={styles.container}>

    {!isScanning && 
    <>
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
        <TextInput
          style={styles.textoFormulario}
          onChangeText={value => { 
            setNombre(value)
          }}
          value={nombre}
        />
     </View>   

    <Text style={styles.encabezado}> Apellidos</Text>
    <View style={styles.vistaTituloForm}>
      <Image
          style={{marginTop:"2%", marginLeft:"2%", width:"10%", height:"80%"}}
          source={require('../assets/Registro/name.png')}
        />
      <TextInput
        style={styles.textoFormulario}
        onChangeText={value => { 
          setApellido(value)}
        }
        value={apellido}
      />
    </View>

    <Text style={styles.encabezado}> Género que figura en tu DNI</Text>
    <View style={styles.vistaTituloForm}>
      <Image
          style={{marginTop:"2%", marginLeft:"2%", width:"10%", height:"80%"}}
          source={require('../assets/Registro/genero.png')}
        />

      <View style={{borderColor: 'gray', borderColor: 'rgba(0, 167, 186, 0.2)',
      borderWidth: 1, width: "86%" }}>
        <Picker
          selectedValue={genero}
          onValueChange={(value) => setGenero(value)}
        >
          <Picker.Item fontSize="20" label="Selecciona tu género" value="" />
          <Picker.Item label="Femenino" value="Femenino" />
          <Picker.Item label="Masculino" value="Masculino" />
        </Picker>
      </View>
    </View>    
    
    <Text style={styles.encabezado}> DNI</Text>
    <View style={styles.vistaTituloForm}>
      <Image
          style={{marginTop:"2%", marginLeft:"2%", width:"10%", height:"80%"}}
          source={require('../assets/Registro/dni.png')}
        />
        <TextInputMask
          type={'only-numbers'}
          style={styles.textoFormulario}
          value={dni}
          onChangeText={value => {
            setDni(value)
          }}
        />
    </View>    

    <Text style={styles.encabezado}> Día de nacimiento</Text>
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
          value={bod}
          style={styles.textoFormulario}
          onChangeText={input => {
            setBod(input)
          }}
        />
    </View>    
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