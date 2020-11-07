import React, { useState, use} from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { Divider, CheckBox } from "react-native-elements";

export default function FormECNT({ navigation }) {

  const [ diabetes, setDiabetes ] = useState(false);
  const [ hipertension, setHipertension ] = useState(false);

  return (
    
    <View style={styles.container}>
     
      <Text h2 style={styles.registrarse}>
        Enfermedad crónica no transmisibles
      </Text>
      <View style={styles.cajaCheckBox}>
        <CheckBox
          title={<Text style={styles.textoCheckBox}>Diabetes</Text>}
          checked={diabetes}
          onPress={() => setDiabetes(!diabetes)}
        />
      </View>
      <View style={styles.cajaCheckBox}>
        <CheckBox
          title={<Text style={styles.textoCheckBox}>Hipertensión</Text>}
          checked={hipertension}
          onPress={() => setHipertension(!hipertension)}
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

  cajaCheckBox: { 
    width: "100%",  
    justifyContent: "space-evenly", 
  },

  textoCheckBox: { 
    color: "black",
    fontSize: 23,
    paddingLeft: 6,
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
    textAlign:'center',
    fontSize: 40,
    paddingTop: "5%",
    paddingBottom: "5%",
  },

  textoFormulario: {
    color: "#00a7ba",
    fontSize: 40,
  },

  textoFormularioNA: {
    color: "#00a7ba",
    fontSize: 40,
  },

  divisorInferior: {
    backgroundColor: "#00a7ba",
    width: "95%",
    height: 1,
  },
});
