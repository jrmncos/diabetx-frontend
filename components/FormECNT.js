import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { Divider, CheckBox } from "react-native-elements";
import getECNTS from 'services/getECNT';

export default function FormECNT(paciente) {
  const [ diabetes, setDiabetes ] = useState(false);
  const [ hipertension, setHipertension ] = useState(false);
  const [ ecnts, setECNTS ] = useState()
  const [ loadingECNT, setLoadingECNT ] = useState(true)
 
  useEffect(()=> {
    console.log("ME LLEGA A ECNT EL PACIENTE: "+paciente.ecnts)
    async function fetchECNT() {
      const response = await getECNTS()
      setECNTS(response)
      setLoadingECNT(false)
    } 
  fetchECNT()
  },[])


  
  return (
    <View style={styles.container}>
     <View style={{flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#00a7ba'}}>
        <Image
          style={{ width: 70, height: 70}}
          source={require('../assets/archivo-medico.png')} 
        />
        <Text h2 style={styles.textoRol}>Enfermedades crónicas no transmisibles</Text> 
      </View>
      {/* <View style={styles.cajaCheckBox}>
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
          onPress={() => 
            setHipertension(!hipertension)}
        />
      </View> */}
      <>{!loadingECNT && 
      ecnts.map(ecnt => 
      <View style={styles.cajaCheckBox}>
        <CheckBox
          title={<Text style={styles.textoCheckBox}>{ecnt.nombre}</Text>}
          checked={hipertension}
          onPress={() => 
            setHipertension(!hipertension)}
        />
      </View>)}</>
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
  textoRol:{
    paddingLeft:"3%",
    color: "white",
    fontSize: 30,
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