import React, { useState } from "react";
import Stepper from "react-native-stepper-ui";
import { View, Alert, Text } from "react-native";

import Registro from './Registro';
import GeoUsuario from './GeoUsuario';
import RegistroECNT from './RegistroECNT';

export default function StepperRegistro ({navegation}) {
    const [active, setActive] = useState(0);
    const content = [
        <Registro title="Component 1" />,
        <GeoUsuario title="Component 2" />,
        <RegistroECNT title="Component 3" />,
      ];
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
