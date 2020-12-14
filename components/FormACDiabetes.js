import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, ScrollView, Alert, TouchableOpacity } from "react-native";

import { Button, Icon, Divider, CheckBox } from "react-native-elements";

import addACDiabetes from 'services/addACDiabetes'
import {useAuth} from 'hooks/useAuth'
import getPaciente from 'services/getPaciente';
import { useNavigation } from '@react-navigation/native';
import {useUser} from 'hooks/useUser'

import * as Network from 'expo-network';

export default function FormACDiabetes() {

  const [ diabetesMatutino, setDiabetesMatutino ] = useState(false)
  const [ diabetesComida, setDiabetesComida ] = useState(false)

  const [ diabetesMatutinoFalse, setDiabetesMatutinoFalse ] = useState(false)
  const [ diabetesMatutinoTrue, setDiabetesMatutinoTrue ] = useState(false)
  const [ glucoMatutino, setGlucoMatutino ] = useState('')

  const [ diabetesComidaFalse, setDiabetesComidaFalse ] = useState(false)
  const [ diabetesComidaTrue, setDiabetesComidaTrue ] = useState(false)
  const [ glucoComida, setGlucoComida ] = useState('')

  const {userToken} = useAuth()
  const {dni, user} = useUser()
  const [paciente, setPaciente] = useState()
  const [loadingPaciente, setLoadingPaciente] = useState(true)  
  
  const [ accionSeleccionada, setAccionSeleccionada ] = useState("")

  const [ ACdelDia, setACdelDia ] = useState(null)
  const navigation = useNavigation()

  const acdiabetes = {
    'id': null,
    'paciente_id': null,
    'glucemia_matutina': null,
    'opcional_glucemia_matutina': null,
    'glucemia_post_comida_principal': null,
    'opcional_glucemia_comida_principal': null
  }

  function cargarACdelDia(autocontroles) {
    let fecha_actual = new Date().toJSON().slice(0,10)
    autocontroles.map(ac => {  
        let fecha_ac = new Date(Date.parse(ac.fecha_hora_registro)).toJSON().slice(0,10)
        if(fecha_ac == fecha_actual){
          acdiabetes.id = ac.id
          acdiabetes.paciente_id = ac.paciente_id
          acdiabetes.glucemia_matutina = ac.glucemia_matutina
          acdiabetes.opcional_glucemia_matutina= ac.opcional_glucemia_matutina
          acdiabetes.glucemia_post_comida_principal = ac.glucemia_post_comida_principal
          acdiabetes.opcional_glucemia_comida_principal= ac.opcional_glucemia_comida_principal
          
          cargarDatosFormularioAC()
          setACdelDia(ac.id)
          return
        }
      }) 
  }

  function cargarDatosFormularioAC() { 
    (acdiabetes.glucemia_matutina) ? setDiabetesMatutinoTrue(true) : setDiabetesMatutinoFalse(true);
    (acdiabetes.glucemia_post_comida_principal) ? setDiabetesComidaTrue(true) : setDiabetesComidaFalse(true);

    setDiabetesMatutino(acdiabetes.glucemia_matutina)
    setGlucoMatutino(acdiabetes.opcional_glucemia_matutina)
    setDiabetesComida(acdiabetes.glucemia_post_comida_principal)
    setGlucoComida(acdiabetes.opcional_glucemia_comida_principal)
  }

  useEffect(()=> {
     async function fetchPaciente() {       
       const paciente = await getPaciente({dni, accessToken:userToken})
       setPaciente(paciente)
       cargarACdelDia(paciente.autocontrol_diabetes)
       setLoadingPaciente(false)

      if(Network.getNetworkStateAsync() == Network.NetworkStateType.UNKNOWN || 
        Network.getNetworkStateAsync() == Network.NetworkStateType.NONE){
      //hacer algo en caso de no tener internet
      }
      else{
        //en este caso tengo acceso a internet
      }
     } 
     fetchPaciente()
   },[])

  const handleSubmitSave = () => { 
    acdiabetes.id = ACdelDia
    acdiabetes.paciente_id = paciente.id
    acdiabetes.glucemia_matutina = diabetesMatutino
    acdiabetes.opcional_glucemia_matutina = (glucoMatutino == "") ?  0 : glucoMatutino
    acdiabetes.glucemia_post_comida_principal = diabetesComida
    acdiabetes.opcional_glucemia_comida_principal= (glucoComida == "") ?  0 : glucoComida

    addACDiabetes({accessToken: userToken, acdiabetes: acdiabetes})
    Alert.alert("Se ha cargado el autocontrol con satisfactoriamente")
    navigation.navigate('Inicio')
  }

  return (
    <>
    {loadingPaciente && 
    <Image
    style={{ width: 50, height: 50, margin:"2%"}}
    source={require('recursos/cargando.gif')} 
    />}

    {!loadingPaciente && accionSeleccionada == "" &&
      <>
        <Text style={styles.registrarse}>
          Menu Autocontrol
        </Text>
        <TouchableOpacity 
          style={{width:"100%", padding: "2%"}}       
          onPress={() => setAccionSeleccionada("cargar_autocontrol")}>
          <View style={styles.botonMenuHome}>
            <Image
              style={{ width: 50, height: 50, margin:"2%"}}
              source={require('recursos/agregarAC.png')} 
            />
            <Text h2 style={styles.textoRol}>Cargar autocontrol</Text> 
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{width:"100%", padding: "2%"}}       
          onPress={() => setAccionSeleccionada("ver_historial")}>
          <View style={styles.botonMenuHome}>
            <Image
              style={{ width: 50, height: 50, margin:"2%"}}
              source={require('recursos/listarAC.png')} 
            />
            <Text h2 style={styles.textoRol}>Visualizar historial</Text> 
          </View>
        </TouchableOpacity>
      </>
    }
    {!loadingPaciente && accionSeleccionada == "ver_historial" &&
    <>
      <Text style={styles.registrarse}>
          Historial autocontrol diabetes
      </Text>
      <View style={{flexDirection: 'row', width:"100%", backgroundColor: '#00a7ba'}}>
        <Image
          style={{ width: 70, height: 70, backgroundColor:"#00a7ba"}}
          source={require('recursos/listarAC.png')}
        />
         <Text h2 style={styles.textoBarraSuperior}>{user.first_name+" "+user.last_name}</Text> 
      </View>
      <ScrollView style={styles.scrollView}>
        {paciente.autocontrol_diabetes.map((ac) => 
        {return(
        <>
          <Text key={ac.fecha_hora_registro} style={(new Date(Date.parse(ac.fecha_hora_registro)).toJSON().slice(8,10))%2==0 ? styles.encabezado_uno : styles.encabezado_dos}> 
            {" • Fecha: "+new Date(Date.parse(ac.fecha_hora_registro)).toJSON().slice(0,10).split('-').reverse().join('-')} 
          </Text>
          <Text key={ac.fecha_hora_registro} style={styles.textoCheckBox}> 
            {" Matutino: "+(ac.glucemia_matutina ? "✔" : "✘")+(ac.opcional_glucemia_matutina != null ? ", Glucometro:"+ac.opcional_glucemia_matutina : "")+"\n"+
            " Post comida: "+(ac.glucemia_post_comida_principal ? "✔" : "✘")+(ac.opcional_glucemia_comida_principal != null ? ", Glucometro:"+ac.opcional_glucemia_comida_principal : "")
            } 
          </Text>

          <Divider key={ac.fecha_hora_registro} style={{marginBottom:"1%"}}/>
        </>)}
       )}
      </ScrollView>
    </>
    }
    {!loadingPaciente && accionSeleccionada == "cargar_autocontrol" &&
      <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
      <View style={{flexDirection: 'row', width:"100%", backgroundColor: '#00a7ba', marginBottom:"1%"}}>
      <Image
            style={{ width: 60, height: 60, margin:"1%"}}
            source={require('../assets/archivo-medico.png')} 
          />
        <Text style={styles.textoBarraSuperior}>
          Autocontrol Diabetes ({new Date().toJSON().slice(0,10).split('-').reverse().join('-')})
        </Text>
        </View>
        
        <View style={{flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#5cc101'}}>
        <Image
          style={{ width: 70, height: 70, backgroundColor:"#5cc101"}}
          source={require('../assets/desayuno.png')} 
        />
        <Text h2 style={styles.textoRol}>Matutino</Text> 
      </View>

        <Text style={styles.pregunta}>
        ¿Su glucosa se encuentra entre 70 y 130?
        </Text>

        <View style={{ flexDirection: "row", alignSelf: "baseline", width: "50%" }}>
          <View style={styles.cajaCheckBox}>
            <CheckBox
              title={<Text style={styles.textoCheckBox}>Si</Text>}
              checked={diabetesMatutinoTrue}
              onPress={() => {
                setDiabetesMatutino(true);

                setDiabetesMatutinoTrue(true)
                setDiabetesMatutinoFalse(false)
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
                setDiabetesMatutinoFalse(true)
              }}
            />
          </View> 
        </View>

        <View style={styles.vistaTituloForm}>
          <Image
              style={{ marginLeft:"2%", width:40, height:40}}
              source={require('recursos/glucometro.png')} 
            />
          <TextInput
            placeholder='Medida Glucometro (opcional)'
            style={styles.textoFormulario}
            keyboardType='numeric'
            onChangeText={value => { 
              setGlucoMatutino(value)
            }}
            value={glucoMatutino}
          />
        </View>  
      
      <View style={{flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#5cc101'}}>
        <Image
          style={{ width: 70, height: 70, backgroundColor:"#5cc101"}}
          source={require('../assets/alimento.png')} 
        />
        <Text h2 style={styles.textoRol}>Luego de comida principal</Text> 
      </View>

      <Text style={styles.pregunta}>
      ¿Su glucosa se encuentra entre 70 y 180?
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

      <View style={styles.vistaTituloForm}>
          <Image
              style={{ marginLeft:"2%", width:40, height:40}}
              source={require('recursos/glucometro.png')} 
            />
          <TextInput
            placeholder='Medida Glucometro (opcional)'
            style={styles.textoFormulario}
            keyboardType='numeric'
            onChangeText={value => { 
              setGlucoComida(value)
            }}
            value={glucoComida}
          />
        </View>  
     
      <Divider style={styles.divisorInferior} />

      <Button   
          titleStyle={styles.botonTexto}    
          buttonStyle={styles.botonSubmit}
          title="Completar control" 
          onPress={()=> handleSubmitSave() }/> 

      </View></ScrollView>
    }
    </>
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
    paddingTop:"5%",
    paddingBottom:"3%",
    color: "white",
    fontSize: 26,
  },

  vistaTituloForm: {
    width:"100%", 
    flexDirection:"row",
    marginBottom:"3%",
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

  botonMenuHome: {
    padding:"1%",
    borderRadius:10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    width:"97%", 
    backgroundColor: '#5cc101',
    borderWidth: 1,
    borderColor: "#479801",
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },

  botonSubmit: {
    margin: "2%",
    padding:"5%",
    borderRadius:10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    width:"97%", 
    backgroundColor: '#00a7ba',
    borderWidth: 1,
    borderColor: "#00707d",
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },

  botonTexto:{
    padding:"5%",
    width:"100%",
    textAlign:"center",
    color: "white",
    fontSize: 35,
  },

  textoBarraSuperior:{
    paddingLeft:"2%",
    width:"100%",
    color: "white",
    fontSize: 30,
  },
  
  registrarse: {
    color: "#00a7ba",
    textAlign:'center',
    fontSize: 30,
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

  encabezado_uno:{
    marginBottom:"1%",
    fontSize: 30,
    width:"100%",
    backgroundColor:"#00a7ba",
    alignSelf: "flex-start",
    color: "#FFFFFF",
  },

  encabezado_dos:{
    marginBottom:"1%",
    fontSize: 30,
    width:"100%",
    alignSelf: "flex-start",
    backgroundColor:"#00a7ba",
    color: "#FFFFFF",
  },

  textoFormulario: {
    width:"85%",
    marginLeft:"1%",
    color: "#00a7ba",
    fontSize: 25,
    textAlign: "left",
    padding:"1%",
    borderColor: 'rgba(0, 167, 186, 0.2)',
    borderWidth: 1,
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
