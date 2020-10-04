import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Button, Input, Icon, Header, Divider } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
export default function Registro({ navigation }) {
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    Alert.alert("Form data", JSON.stringify(data));
    //navigation.navigate('AsignarECNT')
  };

  console.log(errors);
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
      />

      <Divider style={styles.divisorInferior} />

      <Button
        titleStyle={styles.botonTexto}
        buttonStyle={styles.botonAzulMarino}
        title="Registrarse"
        onPress={handleSubmit(onSubmit)}
      />

      <Button
        titleStyle={styles.botonTexto}
        buttonStyle={styles.botonVerdeClaro}
        title="Asignar ECNT"
        onPress={() => navigation.navigate("AsignarECNT")}
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
