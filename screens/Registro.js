import React, { useState, useContext, useEffect } from "react";
import Stepper from "react-native-stepper-ui";
import { View, Alert, Text, StyleSheet, Image } from "react-native";

import FormDatosPersonales from '../components/FormDatosPersonales';
import GeoUsuario from '../components/GeoUsuario';
import FormPass from '../components/FormPass';

import { RegistroContext, RegistroProvider }  from '../context/RegistroContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUser} from '../services/createUser'

const RegistroMaestro = ({navegation}) => {

    const [active, setActive] = useState(0);
    const context = useContext(RegistroContext)
    const [token, setToken] = useState('')

    const content = [
        <FormDatosPersonales title="Datos personales" />,
        <GeoUsuario title="Establecer ubicación" />,
        <FormPass title="Establecer contraseña" />,
    ];

    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('@token')
        if(value !== null) {
          console.log('hola!')
          setToken(value)
        }
      } catch(e) {
        // error reading value
      }
    }

    const onSubmit = () => {
      getToken()
      .then(() => createUser(context, token))
    } 

 return (
  <View style={{ flex:1, backgroundColor:"rgba(255,255,255,1)", marginHorizontal: 0 }}>

    <Stepper
      style={styles.stepperStyle}
      buttonStyle={styles.botonAzulMarino}
      buttonTextStyle={styles.botonTexto}
      active={active}
      content={content}
      onNext={() => {
        console.log(context)
        setActive((p) => p + 1)
      }}
      onBack={() =>{ 
        console.log(context)
        setActive((p) => p - 1)
      }}
      onFinish={() => {
        Alert.alert("Formulario finalizado")
        onSubmit()
      }}
    />
  </View>
);
};

export default function Registro({navegation}){
  return(
    <RegistroProvider>
      <RegistroMaestro navegation = {navegation}/>
    </RegistroProvider>
  )
}


const styles = StyleSheet.create({
  botonTexto:{
    textAlign:"center",
     color: "white",
     fontSize: 25,
   },

   stepperStyle:{
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  botonVerdeClaro:{
    width: '95%',
    padding: '5%',
    backgroundColor: '#5cc101',
    justifyContent: 'space-evenly',
    marginTop: "2%",
    marginBottom:"2%"
  },

  botonAzulMarino:{

    flexDirection: "row", 
    alignSelf: "baseline",
    width: '45%',
    backgroundColor: '#00a7ba',
    justifyContent: 'center',
    alignContent:"center",
    alignSelf:'center',
    marginTop: "2%",
    marginBottom:"2%",
    marginLeft:"2%"
  },

});