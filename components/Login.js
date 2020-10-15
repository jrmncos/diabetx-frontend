import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Button, Input, Icon, Header, Divider } from 'react-native-elements';

export default function Login({navigation}){

    return(
      
        <View style={styles.container}>
          
        <Header 
        barStyle="light-content" 
        centerComponent={ <Image
          style={{ width: 140, height: 40 }}
          source={require('../assets/mmplogo.png')} 
        />}
        containerStyle={{
          backgroundColor: '#5cc101',
          justifyContent: 'space-between',
        }}
        />

        <Text
        style = {styles.textSubtitulo}>
          Sistema de seguimiento de Enfermdades Cronicas no transmisibles</Text>

        <Text h2 style={styles.ingresar}>INGRESAR</Text> 
        
        <Input
          placeholder='DNI' 
          style={styles.textoFormulario}
          keyboardType = 'numeric'
          leftIcon={
            <Icon
              name='address-card'  
              color='#00a7ba'
              type='font-awesome'
            />
          }
        />

        <Input placeholder="Password" 
        style={styles.textoFormulario}
          leftIcon={
            <Icon
            name='lock'
            type='font-awesome'
            color='#00a7ba'
          />
          }
          secureTextEntry={true} 
        />

        <StatusBar/>
        <Button 
          buttonStyle={styles.botonAzulMarino}
          titleStyle={styles.botonTexto}
          title="Ingresar" 
          onPress={()=> navigation.navigate('Home')}/> 

        <Divider style={styles.divisorInferior} />
        
        <Button 
          buttonStyle={styles.botonVerdeClaro}
          titleStyle={styles.botonTexto}
          title="Registrarse" 
          onPress={()=> navigation.navigate('Registro')}/> 

        <Button 
          buttonStyle={styles.botonVerdeClaro}
          titleStyle={styles.botonTexto}
          title="Recuperar Clave" 
          onPress={()=> navigation.navigate('Home')}/> 

        <Button 
          buttonStyle={styles.botonVerdeClaro}
          titleStyle={styles.botonTexto}
          title="ECNT" 
          onPress={()=> navigation.navigate('RegistroECNT')}/> 

        <Text
        style = {styles.textFirma}>
        Todos los derechos reservados 2020: Gerc0s, Dub.</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    ingresar: {
      color:"#00a7ba",
      fontSize: 40,
      paddingTop:"2%",
      paddingBottom:"2%",
    },

    textoFormulario: {
      color:"#00a7ba",
      fontSize: 40,
    },

    textSubtitulo:{
      fontSize: 15,
      textAlign: "center",
      marginTop: "10%",
      marginBottom: "10%",
      color: "#696969",
    },

    textFirma:{
      fontSize: 12,
      textAlign: "center",
      marginTop: "10%",
      marginBottom: "10%",
      color: "#909090",
    },

    botonVerdeClaro:{
      width: '95%',
      padding: '5%',
      backgroundColor: '#5cc101',
      justifyContent: 'space-evenly',
      marginTop: "2%",
      marginBottom:"2%"
    },

    botonAzulMarino:{
      width: '95%',
      padding: '5%',
      backgroundColor: '#00a7ba',
      justifyContent: 'space-evenly',
      marginTop: "2%",
      marginBottom:"2%"
    },

    botonTexto:{
      color: "white",
      fontSize: 30,
    },

    divisorInferior:{
      backgroundColor: "#00a7ba",
      width: "95%",
      height: 1,
    }
  });
  