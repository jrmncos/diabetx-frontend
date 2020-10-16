import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Button, Input, Icon, Header, Divider } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import * as Location from 'expo-location';




export default function Registro({ navigation }) {
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {

    /*
    http://api.positionstack.com/v1/forward
    ? access_key = YOUR_ACCESS_KEY
    & query = 1600 Pennsylvania Ave NW, Washington DC
    */
    
    console.log(('https://nominatim.openstreetmap.org/?addressdetails=1&q='+ data.location.replace(/\s/g, "+") +'&format=json&limit=1'))
    fetch('https://nominatim.openstreetmap.org/?addressdetails=1&q='+ data.location.replace(/\s/g, "+") +'&format=json&limit=1')
    .then(response =>  response.json())
    .then( resJson => {
      console.log(resJson)
      console.log(resJson[0].lat)
      console.log(resJson[0].lon)
      data.latitude = parseFloat(resJson[0].lat)
      data.longitude = parseFloat(resJson[0].lon)
      return data
    })
    .then( (usuario) => fetch('http://192.168.0.231:8000/api/users/',{
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    }) )
  
  }
    //.then(response => Alert.alert("Respuesta: ",response.json())))


    /*
    Location.geocodeAsync(data.location).then(response => {
      console.log(response)
      data.latitude = response.latitude
      data.longitude = response.longitude
      return data
    })/*
    .then( (usuario) => fetch('http://192.168.1.38:8000/hospital/users/',{
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    })
    .then(response => Alert.alert("Respuesta: ",response.json())))
*/
    //console.log(location.location)
    /*
    
    */

  //console.log(errors);
  /*
    useEffect(()=>{
      register("nombre")
      register("apellido")
      register("dni")
      register("password")
      register("domicilio")
      
    }, [register])
    */
  return (
    <View style={styles.container}>
      <Header
        barStyle="light-content"
        centerComponent={
          <Image
            style={{ width: 140, height: 40 }}
            source={require("../assets/mmplogo.png")}
          />
        }
        containerStyle={{
          backgroundColor: "#5cc101",
          justifyContent: "space-between",
        }}
      />

      <Text h2 style={styles.registrarse}>
        Registrarse
      </Text>

      <View
        style={{ flexDirection: "row", alignSelf: "baseline", width: "50%" }}
      >
        <Controller
          control={control}
          name={"first_name"}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <Input
              placeholder="Nombre"
              style={styles.textoFormularioNA}
              leftIcon={
                <Icon name="user" type="font-awesome" color="#00a7ba" />
              }
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
              }}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name={"last_name"}
          defaultValue=""
          render={({ onChange, onBlur, value }) => (
            <Input
              placeholder="Apellido"
              style={styles.textoFormularioNA}
              leftIcon={
                <Icon name="user" type="font-awesome" color="#00a7ba" />
              }
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
              }}
              value={value}
            />
          )}
        />
      </View>
      <Controller
        control={control}
        name={"dni"}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <Input
            placeholder="DNI"
            style={styles.textoFormulario}
            keyboardType="numeric"
            leftIcon={
              <Icon name="address-card" color="#00a7ba" type="font-awesome" />
            }
            onBlur={onBlur}
            onChangeText={(value) => {
              onChange(value);
            }}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name={"password"}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <Input
            placeholder="Password"
            style={styles.textoFormulario}
            leftIcon={<Icon name="lock" type="font-awesome" color="#00a7ba" />}
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={(value) => {
              onChange(value);
            }}
            value={value}
          />
        )}
      />
{/* 
      <Controller
        control={control}
        name={"location"}
        defaultValue=""
        render={({ onChange, onBlur, value }) => (
          <Input
            placeholder="Domicilio"
            style={styles.textoFormulario}
            leftIcon={<Icon name="home" color="#00a7ba" type="font-awesome" />}
            onBlur={onBlur}
            onChangeText={(value) => {
              onChange(value);
            }}
            value={value}
          />
        )}
      /> */}

      <Button 
          buttonStyle={styles.botonVerdeClaro}
          titleStyle={styles.botonTexto}
          title="Establecer ubicación" 
          onPress={()=> navigation.navigate('GeoUsuario')}/> 


      <Divider style={styles.divisorInferior} />

      <Button
        titleStyle={styles.botonTexto}
        buttonStyle={styles.botonAzulMarino}
        title="Siguiente"
        onPress={handleSubmit(onSubmit)}
      />
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
