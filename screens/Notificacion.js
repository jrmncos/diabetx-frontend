import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import ImageUploader from '../components/ImageUploader'
import ImageSender from '../components/ImageSender'
import { useForm, Controller } from "react-hook-form";
import { Input, Icon, Header, Divider } from "react-native-elements";

export default function Notificacion({navigation}){

    const [imageNotificacion, setImageNotificacion] = useState(null);
    const [title, setTitle] = useState('')
    
    const onSubmit = () => {
      console.log('Hola')
      console.log(title)
      console.log(imageNotificacion)
    }

    return(
      <View style={styles.container}>
      
      <Text h2 style={styles.registrarse}>
        Enviar notificacion
      </Text>

      <View style={{ flexDirection: "row", alignSelf: "baseline"}}>
        <Input
          placeholder="Titulo"
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

      <View style={{ flexDirection: "row", alignSelf: "baseline"}}>
        <ImageUploader setImageNotificacion={setImageNotificacion}/>
      </View>

          
      <Button title={"Enviar notificacion"} onPress={onSubmit}/>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 40,
    paddingTop: "2%",
    paddingBottom: "2%",
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
