import React, { useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from "react-native";
import { CheckBox, Button } from "react-native-elements";

import {useAuth} from 'hooks/useAuth'
import getECNTS from 'services/getECNTS';
import patchECNTS from 'services/patchECNTS'
import helpers from '../helpers/getIcon'


export default function FormECNT(paciente) {
  const [ checkedMap, setCheckedMap ] = useState([]);
  const [ loadingECNT, setLoadingECNT ] = useState(true)
  const { userToken } = useAuth()
 
  function pertenece(ec, ecnts) { 
    let x
    ecnts.forEach(ecnt => {
    if(ecnt.nombre == ec.nombre){ x = true }})

    return x
  }

  useEffect(()=> {
    async function fetchECNT() {
      const ecnts = await getECNTS()
      setCheckedMap([])
      ecnts.map((ecnt) => {   
        if(pertenece(ecnt, paciente.paciente.ecnts)){
        setCheckedMap(prevState => [...prevState, {
          "id": ecnt.id,
          "checked": true,
          "nombre": ecnt.nombre,
        }])
        }
        else{
          setCheckedMap(prevState => [...prevState, {
            "id": ecnt.id,
            "checked": false,
            "nombre": ecnt.nombre,
          }])
        }
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

  const handleResponse = res => {
    if(res.ok) {
      return res.json()
    }
    throw new Error('Network response was not ok.')
  }

  const handleSubmitSave = () => { 
    let ecnts = checkedMap.filter(ecnt=>ecnt.checked).map((ecnt) => {return {id: ecnt.id, nombre: ecnt.nombre}})
    patchECNTS( {id:paciente.paciente.id, accessToken: userToken, ecnts: ecnts})
    .then(handleResponse)
    .then((responseJson) => {
      if (responseJson.status === 500) {
          Alert.alert(responseJson.message);
      } else{
        Alert.alert("Se han modificado las ECNT satisfactoriamente")
      }
  })      
    .catch(err => console.error(err))
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
         <TouchableOpacity 
         key={ecnt.id}
         style={{width:"100%", padding: "1%", paddingLeft:"5%", paddingRight:"5%"}}       
         onPress={() => handleChange(ecnt.id)}
         >
         <View style={ecnt.checked ? styles.rolEncendido: styles.rolApagado}>
           <Image 
             style={{ width: 25, height: 25, margin:"2%", marginBottom:"3%"}}
             source={helpers.getIconECNT(ecnt.nombre)} 
           />
           <Text h2 style={styles.textoRol}>{ecnt.nombre}</Text> 
         </View>
       </TouchableOpacity> 
    
        )}
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
    paddingTop:"1%",
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

  botonMenuHomeAzul: {
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

  divisorInferior: {
    backgroundColor: "#00a7ba",
    width: "95%",
    height: 1,
  },

  rolEncendido: {
    borderRadius:10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    width:"100%", 
    backgroundColor: '#5cc101',
    borderWidth: 1,
    borderColor: "#479801",
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },

  rolApagado: {
    borderRadius:10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    width:"100%", 
    backgroundColor:"#fcad03",
    borderWidth: 1,
    borderColor: "#ad7600",
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },

});