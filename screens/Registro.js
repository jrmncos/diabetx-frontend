import React, { useState, useContext } from "react";
import Stepper from "react-native-stepper-ui";
import { View, Alert, Text, StyleSheet, Image } from "react-native";
import { Header} from 'react-native-elements';

import FormDatosPersonales from '../components/FormDatosPersonales';
import GeoUsuario from '../components/GeoUsuario';
import FormECNT from '../components/FormECNT';

import { RegistroContext } from '../context/RegistroContext'


const RegistroMaestro = ({navegation}) => {

    const [active, setActive] = useState(0);
    const  context  = useContext(RegistroContext)

    const content = [
        <FormDatosPersonales title="Datos personales" />,
        <GeoUsuario title="Establecer ubicación" />,
        <FormECNT title="Asignar ECNT" />,
    ];
            /*
  const onSubmit = (data) => {
    http://api.positionstack.com/v1/forward
    ? access_key = YOUR_ACCESS_KEY
    & query = 1600 Pennsylvania Ave NW, Washington DC
    *
    .then( (usuario) => fetch('http://192.168.0.231:8000/api/users/',{
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    }) )
  
  }
  */

    const onSubmit = () => {
      console.log("El context: ")
      console.log(context)
      ecnts = []
      if(context.diabetes){
        ecnts.push({
          'nombre': 'diabetes',
          'descripcion':'nivel de glucemia elevado'
        })
      }
      if(context.hipertension){
        ecnts.push({
          'nombre':'hipertension',
          'descripcion':'nivel de presion elevado'
        })
      }
      user = {
        'dni': context.dni,
        'first_name': context.nombre,
        'last_name': context.apellido,
        'latitude': context.location.latitude,
        'longitude': context.location.longitude,
        'bod': '1990-05-05',
        'password':context.password,
        'paciente_profile': {
          'ultimo_autocontrol': 'hoy',
          'ecnts': ecnts
        }
      }
      console.log("Lo que mando: ")
      console.log(JSON.stringify(user))
      
      fetch('http://192.168.1.38:8000/api/users/',{
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(context)
      })
      .then(response => response.json())
      .then(data => console.log(data))
    } 

 return (
  <View style={{ flex:1, backgroundColor:"rgba(255,255,255,1)", marginHorizontal: 0 }}>
  <Header 
        barStyle="light-content" 
        centerComponent={ <Image
          style={{ width: 120, height: 40 }}
          source={require('../assets/mmplogo.png')} 
        />}
        containerStyle={{
          backgroundColor: '#5cc101',
          justifyContent: 'space-between',
        }}
        />
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