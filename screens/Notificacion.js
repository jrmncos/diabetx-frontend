import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import ImageUploader from 'components/ImageUploader'
import { Input, Icon } from "react-native-elements";
import RangeSlider from 'react-native-range-slider-expo';
import {CheckBox} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import getECNTS from 'services/getECNTS';
import sendNotificacion from 'services/sendNotificacion'

export default function Notificacion({ navigation }) {

  const [title, setTitle] = useState('')

  const [checkEdad, setCheckEdad] = useState(false)
  const [fromValue, setFromValue] = useState(0);
  const [toValue, setToValue] = useState(0);
  
  const [checkGeneroMujer, setCheckGeneroMujer] = useState(false)
  const [checkGeneroHombre, setCheckGeneroHombre] = useState(false)
  
  const [checkEcnt, setCheckEcnt] = useState(false)
  const [ checkedMap, setCheckedMap ] = useState([]);
  
  const [imageNotificacion, setImageNotificacion] = useState(null);
  
  //const {userToken} = useAuth()

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
    } 
    fetchECNT()
  },[])

  const handleChange = (id) => {
    let index = checkedMap.findIndex((elem) => elem.id == id)
    let newArray = [...checkedMap]
    newArray[index] = {...newArray[index], checked:!newArray[index].checked}
    setCheckedMap(newArray)
  }
  /*
  const handleSubmitSave = () => { 
    let ecnts = checkedMap.filter(ecnt=>ecnt.checked).map((ecnt) => {return {id: ecnt.id, nombre: ecnt.nombre}})
  }
  */
  const onSubmit = () => {
    console.log('Hola')
    let localUri = imageNotificacion;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);  // Infer the type of the image
    let type = match ? `image/${match[1]}` : `image`; // Upload the image using the fetch and FormData APIs
    let formData = new FormData();

    formData.append('imagen', { uri: localUri, name: filename, type });  // Assume "photo" is the name of the form field the server expects
    formData.append('titulo', title)

    if(checkEdad)
      formData.append('rangoEdad', {edadDesde: fromValue, edadHasta: toValue})
    else
      formData.append('edadTodas', true)

    if(checkGeneroMujer)
      formData.append('generoMujer', true)

    if(checkGeneroHombre)
      formData.append('generoHombre', true)
    
    let ecnts = {}
    for(let i=0; i<checkedMap.length; i++){
      if(checkedMap[i].checked || !checkEcnt)
        ecnts[checkedMap[i].nombre] = checkedMap[i].nombre
    }
    formData.append('ecnts', ecnts)
    sendNotificacion({notificacion: formData})
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: "row", alignSelf: "baseline" }}>
          <Input
            placeholder="Ingrese el titulo de la notificacion"
            style={styles.textoFormularioNA}
            leftIcon={
              <Icon name="user" type="font-awesome" color="#00a7ba" />
            }
            onChangeText={(value) => {
              setTitle(value)
            }}
            value={title}
          />
        </View>

        <Text>Edad</Text>
        <CheckBox 
          title={"Seleccionar rango de edad"}
          checked={checkEdad}
          onPress={() => setCheckEdad(!checkEdad)}
        />
        <CheckBox 
          title={"Todos"}
          checked={!checkEdad}
          onPress={() => setCheckEdad(!checkEdad)}
        />
        {checkEdad && 
        (<View>
            <Text>Seleccione un rango de edad... </Text>
            <RangeSlider min={8} max={100}
              fromValueOnChange={value => setFromValue(value)}
              toValueOnChange={value => setToValue(value)}
              initialFromValue={11} 
              styleSize={'small'}
              
            />
        </View>)}

        <Text>Genero</Text>
        <CheckBox 
          title={"Mujer"}
          checked={checkGeneroMujer}
          onPress={() => setCheckGeneroMujer(!checkGeneroMujer)}
        />
        <CheckBox 
          title={"Hombre"}
          checked={checkGeneroHombre}
          onPress={() => setCheckGeneroHombre(!checkGeneroHombre)}
        />  

        <Text>ECNTS</Text>
        <CheckBox 
          title={"Seleccionar ecnts"}
          checked={checkEcnt}
          onPress={() => setCheckEcnt(!checkEcnt)}
        />
        <CheckBox 
          title={"Todos"}
          checked={!checkEcnt}
          onPress={() => setCheckEcnt(!checkEcnt)}
        />
        {checkEcnt && <Text>Seleccione las ecnts...</Text> &&
            checkedMap.map(ecnt =>
              <CheckBox
                key={ecnt.id}
                name={ecnt.id}
                title={<Text style={styles.textoCheckBox}>{ecnt.nombre}</Text>}
                checked={ecnt.checked}
                onPress={() => handleChange(ecnt.id, ecnt.nombre, ecnt.checked)}
              />
        )}

        <View style={{ flexDirection: "row", alignSelf: "baseline" }}>
          <ImageUploader setImageNotificacion={setImageNotificacion} />
        </View>
        
        <Text>Separador...</Text>
        <Button title='Enviar notificacion'onPress={()=>onSubmit()}/>
      </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },

});
