import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import ImageUploader from 'components/ImageUploader'
import { Input, Icon, Header, Divider } from "react-native-elements";
export default function Notificacion({ navigation }) {

  const [imageNotificacion, setImageNotificacion] = useState(null);
  const [title, setTitle] = useState('')
  const [edades, setEdades] = useState('')
  const onSubmit = () => {
    console.log('Hola')
    console.log(title)
    console.log(imageNotificacion)

    let localUri = imageNotificacion;
    let filename = localUri.split('/').pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('imagen', { uri: localUri, name: filename, type });
    formData.append('texto', title)
    fetch('http://192.168.1.38:8000/api/notification/', {
      method: 'POST',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });

  }

  return (
    <View style={styles.container}>

      <Text h2 style={styles.registrarse}>
        Enviar notificacion
      </Text>

      <View style={{ flexDirection: "row", alignSelf: "baseline" }}>
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


      <View style={{ flexDirection: "row", alignSelf: "baseline" }}>
        <ImageUploader setImageNotificacion={setImageNotificacion} />
      </View>


      <Button title={"Enviar notificacion"} onPress={() => onSubmit()} />

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
