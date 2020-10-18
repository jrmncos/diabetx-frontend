import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View, Image, Alert, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Button, Input, Icon, Header, Divider, CheckBox } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { RegistroContext } from './RegistroContext'

export default function FormECNT({ navigation }) {

  const [ diabetesMatutinoFalse, setDiabetesMatitunoFalse ] = useState(false);
  const [ diabetesMatutinoTrue, setDiabetesMatutinoTrue ] = useState(false);
  const [ glucoMatutino, setGlucoMatutino ] = useState('');

  const [ diabetesComidaFalse, setDiabetesComidaFalse ] = useState(false);
  const [ diabetesComidaTrue, setDiabetesComidaTrue ] = useState(false);
  const [ glucoComida, setGlucoComida ] = useState('');

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
              <Icon name="heartbeat" color="#00a7ba" type="font-awesome" />
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
              <Icon name="heartbeat" color="#00a7ba" type="font-awesome" />
            }
            onChange={(value) => {
              onChange(value);
              setGlucoComida(value)
            }}
      />
     
      
      {/* <View style={styles.cajaCheckBox}>
        <CheckBox
          title={<Text style={styles.textoCheckBox}>Hipertensión</Text>}
          checked={context.hipertension}
          onPress={() => context.setHipertension(!context.hipertension)}
        />
      </View> */}
      <Divider style={styles.divisorInferior} />
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
