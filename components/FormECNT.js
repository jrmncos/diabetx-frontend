import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { Divider, CheckBox, Button } from "react-native-elements";

import {useAuth} from 'hooks/useAuth'
import getECNTS from 'services/getECNTS';
import addECNT from 'services/addECNT'

export default function FormECNT(idPaciente) {
  const [ checkedMap, setCheckedMap ] = useState([]);
  const [ loadingECNT, setLoadingECNT ] = useState(true)
  const {accessToken} = useAuth()

  useEffect(()=> {
    async function fetchECNT() {
      const ecnts = await getECNTS()
      ecnts.map((ecnt) => {  
        setCheckedMap(prevState => [...prevState, {
          "id": ecnt.id,
          "checked": false,
          "nombre": ecnt.nombre,
        }])
      })
      setLoadingECNT(false)
    } 
    fetchECNT()
  },[])

  const handleChange = (id) => {
    let index = checkedMap.findIndex((elem) => elem.id == id)
    let newArray = [...checkedMap]
    newArray[index] = {...newArray[index], checked:!newArray[index].checked}
    setCheckedMap(newArray)
  }

  const handleSubmitSave = () => { 
    let ecnts = checkedMap.filter(ecnt=>ecnt.checked).map((ecnt) => {return {id: ecnt.id, nombre: ecnt.nombre}})
    addECNT( idPaciente, ecnts, accessToken)
  }
  
  return (
    <View style={styles.container}>
     <View style={{flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#00a7ba'}}>
        <Image
          style={{ width: 70, height: 70}}
          source={require('../assets/archivo-medico.png')} 
        />
        <Text h2 style={styles.textoRol}>Enfermedades crónicas no transmisibles</Text> 
      </View>
      
      <>
        {!loadingECNT && checkedMap.map(ecnt => 
          <View key={ecnt.id} style={styles.cajaCheckBox}>
            <CheckBox
              name={ecnt.id}
              title={<Text style={styles.textoCheckBox}>{ecnt.nombre}</Text>}
              checked={ecnt.checked}
              onPress={() => handleChange(ecnt.id, ecnt.nombre, ecnt.checked)}
            />
          </View>)
        }
      </>

      <View style={{alignContent:'center'}}>
          <Button 
              buttonStyle={styles.botonMenuHomeAzul}
              titleStyle={styles.botonTexto}
              title="Guardar cambios" 
              onPress={()=> handleSubmitSave() }
          /> 
      </View>
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