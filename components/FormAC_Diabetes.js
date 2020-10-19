import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Alert, ScrollView } from "react-native";

import { Button, Input, Icon, Header, Divider, CheckBox } from "react-native-elements";

import * as Network from 'expo-network';


export default function FormECNT({ navigation }) {

  const [ diabetesMatutino, setDiabetesMatutino ] = useState(false)
  const [ diabetesComida, setDiabetesComida ] = useState(false)

  const [ diabetesMatutinoFalse, setDiabetesMatitunoFalse ] = useState(false)
  const [ diabetesMatutinoTrue, setDiabetesMatutinoTrue ] = useState(false)
  const [ glucoMatutino, setGlucoMatutino ] = useState('')

  const [ diabetesComidaFalse, setDiabetesComidaFalse ] = useState(false)
  const [ diabetesComidaTrue, setDiabetesComidaTrue ] = useState(false)
  const [ glucoComida, setGlucoComida ] = useState('')


  useEffect(() => {
    if(Network.getNetworkStateAsync() == Network.NetworkStateType.UNKNOWN || 
        Network.getNetworkStateAsync() == Network.NetworkStateType.NONE){

        console.log("No tengo acceso a internet! :c")
    }
    else{
      console.log("Tengo acceso a internet! c:")
    }
  })


  return (
    
    
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.registrarse}>
          Autocontrol Diabetes
        </Text>
        
        <View style={{flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#00a7ba'}}>
        <Image
          style={{ width: 70, height: 70, backgroundColor:"#00a7ba"}}
          source={require('../assets/desayuno.png')} 
        />
        <Text h2 style={styles.textoRol}>Matutino</Text> 
      </View>

        <Text style={styles.pregunta}>
          Su glucosa se encuentra entre 70 y 130?
        </Text>

        <View style={{ flexDirection: "row", alignSelf: "baseline", width: "50%" }}>
          <View style={styles.cajaCheckBox}>
            <CheckBox
              title={<Text style={styles.textoCheckBox}>Si</Text>}
              checked={diabetesMatutinoTrue}
              onPress={() => {
                setDiabetesMatutino(true);

                setDiabetesMatutinoTrue(true)
                setDiabetesMatitunoFalse(false)
              }}
            />
          </View> 
          <View style={styles.cajaCheckBox}>
            <CheckBox
              title={<Text style={styles.textoCheckBox}>No</Text>}
              checked={diabetesMatutinoFalse}
              onPress={() => {
                setDiabetesMatutino(false)

                setDiabetesMatutinoTrue(false)
                setDiabetesMatitunoFalse(true)
              }}
            />
          </View> 
        </View>

      <Input
            placeholder="Medida glucometro"
            style={styles.textoFormulario}
            keyboardType="numeric"
            leftIcon={
              <Icon name="heartbeat" color="#5cc101" type="font-awesome" />
            }
            onChangeText={(value) => {
              onChange(value);
              setGlucoMatutino(value)
            }}
      />

      <View style={{flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#00a7ba'}}>
        <Image
          style={{ width: 70, height: 70, backgroundColor:"#00a7ba"}}
          source={require('../assets/alimento.png')} 
        />
        <Text h2 style={styles.textoRol}>Luego de comida principal</Text> 
      </View>

      <Text style={styles.pregunta}>
        Su glucosa se encuentra entre 70 y 180?
      </Text>

      <View style={{ flexDirection: "row", alignSelf: "baseline", width: "50%" }}>
        <View style={styles.cajaCheckBox}>
          <CheckBox
            title={<Text style={styles.textoCheckBox}>Si</Text>}
            checked={diabetesComidaTrue}
            onPress={() => {
              setDiabetesComida(true)

              setDiabetesComidaFalse(false)
              setDiabetesComidaTrue(true)
            }}
          />
        </View> 
        <View style={styles.cajaCheckBox}>
          <CheckBox
            title={<Text style={styles.textoCheckBox}>No</Text>}
            checked={diabetesComidaFalse}
            onPress={() => {
              setDiabetesComida(false)
              
              setDiabetesComidaFalse(true)
              setDiabetesComidaTrue(false)
            }}
          />
        </View> 
      </View>

      <Input
            placeholder="Medida glucometro"
            style={styles.textoFormulario}
            keyboardType="numeric"
            leftIcon={
              <Icon name="heartbeat" color="#5cc101" type="font-awesome" />
            }
            onChangeText={(value) => {
              onChange(value);
              setGlucoComida(value)
            }}
      />
     
      <Divider style={styles.divisorInferior} />

      <Button   
          image={{ name: 'check-circle', color: '#fff' }}
          titleStyle={styles.botonTexto}    
          buttonStyle={styles.botonAzulMarino}
          title="Completar control" 
          onPress={()=> Alert.alert("Matutino: "+diabetesMatutino+", Comida: "+diabetesComida)}/> 

      </View></ScrollView>
 
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  textoRol:{
    paddingLeft:"3%",
    paddingTop:"4%",
    paddingBottom:"3%",
    color: "white",
    fontSize: 26,
  },

  scrollView: {
    backgroundColor:"#FFFFFF",
    marginRight: 0,
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

  subIndice: {
    color: "#00a7ba",
    textAlign:'center',
    fontSize: 30,
    paddingTop: "5%",
    paddingBottom: "5%",
  },

  pregunta: {
    color: "#000000",
    textAlign:"center",
    fontSize: 30,
    marginLeft:10,
    marginRight:10,
  },

  textoFormulario: {
    color: "#00a7ba",
    fontSize: 30,
  },

  textoFormularioNA: {
    color: "#00a7ba",
    fontSize: 40,
  },

  divisorSubIndice: {
    marginTop:"14%",
    marginLeft:"5%",
    backgroundColor: "#00a7ba",
    width: "100%",
    height: 1,
  },

    
  divisorInferior:{
    backgroundColor: "#00a7ba",
    width: "95%",
    height: 1,
  }

});
