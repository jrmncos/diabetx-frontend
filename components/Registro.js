import React, { useState, useContext } from "react";
import Stepper from "react-native-stepper-ui";
import { View, Alert, Text } from "react-native";

import FormDatosPersonales from './FormDatosPersonales';
import GeoUsuario from './GeoUsuario';
import FormECNT from './FormECNT';

import { RegistroContext, RegistroProvider } from './RegistroContext'


const RegistroMaestro = ({navegation}) => {

    const [active, setActive] = useState(0);
    const cont = useContext(RegistroContext)

    const content = [
        <FormDatosPersonales title="Component 1" />,
        <GeoUsuario title="Component 2" />,
        <FormECNT title="Component 3" />,
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
  return (
        <View style={{ marginVertical: 10, marginHorizontal: 0 }}>
          <Stepper
            active={active}
            content={content}
            onNext={() => setActive((p) => p + 1)}
            onBack={() => setActive((p) => p - 1)}
            onFinish={() => Alert.alert("Finish")}
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