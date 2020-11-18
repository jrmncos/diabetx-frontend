import React, { useState, useContext } from "react";
import Stepper from "react-native-stepper-ui";
import { View, Alert, StyleSheet, ScrollView, Text } from "react-native";

import FormDatosPersonales from 'components/FormDatosPersonales';
import GeoUsuario from 'components/GeoUsuario';
import FormPass from 'components/FormPass';

import { RegistroContext, RegistroProvider }  from 'context/RegistroContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUser} from 'services/createUser'
import { useNavigation } from '@react-navigation/native';

const RegistroMaestro = () => {

    const [active, setActive] = useState(0);
    const context = useContext(RegistroContext)
    const navigation = useNavigation()

    const content = [
        <FormDatosPersonales title="Datos personales" />,
        <GeoUsuario title="Establecer ubicación" />,
        <FormPass title="Establecer contraseña" />,
    ];

    const onSubmit = async() => {
      const token = await AsyncStorage.getItem('@token')
      createUser(context, token)
      .then( response =>{
        if(response === 201){
          Alert.alert("La cuenta fue creada satisfactoriamente")
          navigation.navigate('Iniciar sesion')
        }
        else{
          Alert.alert("Error al crear usuario!")
          //Me gustaria tipo saber porque no se pudo crear el usuario (ej: dni repetido) y mostrarlo, eso se puede hacer con el fetch en general
        }
      })
    } 

 return (
    <ScrollView style={styles.scrollView}>
    <View style={{ height:'100%',backgroundColor:"rgba(255,255,255,1)", marginHorizontal: 0 }}>
      <Stepper
        style={styles.stepperStyle}
        buttonStyle={styles.botonAzulMarino}
        buttonTextStyle={styles.botonTexto}
        active={active}
        content={content}
        onNext={() => {
          console.log("active: "+active)
          console.log("hay error en el primer formulario? "+context.errorEnPrimerFormulario)
          console.log("condicion? "+active == 0 && context.errorEnPrimerFormulario)
          if(active == 0 && context.errorEnPrimerFormulario){
            Alert.alert("Por favor, verifique los datos ingresados")
            return
          }
          else{
          setActive((p) => p + 1)}
        }}
        onBack={() =>{ 
          setActive((p) => p - 1)
        }}
        onFinish={() => {
          if(active == 2 && context.errorEnPass){
            Alert.alert("Por favor, verifique las contraseñas ingresadas")
          }
          else{
            onSubmit()
          }
        }}
      />
    </View>
  </ScrollView>
  
);
};

export default function Registro({navegation}){
  return(
    <RegistroProvider>
      <RegistroMaestro/>
    </RegistroProvider>
  )
}


const styles = StyleSheet.create({
  scrollView: {
      backgroundColor:"#FFFFFF",
      marginRight: 0,
  },

  botonTexto:{
    textAlign:"center",
     color: "white",
     fontSize: 25,
   },

   stepperStyle:{
    height:'100%',
    width:'100%',
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