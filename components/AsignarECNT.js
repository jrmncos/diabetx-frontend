import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Button, Input, Icon, Header, Divider, CheckBox } from 'react-native-elements';

export default function Registro({navigation}){

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

        <Text h2 style={styles.registrarse}>
          Asignar ECNT</Text>
          
        <Text style = {styles.textSubtitulo}>
          (Enfermdades Cronicas no transmisibles)</Text>

        <Text style = {styles.textIntroduccion}>
        Qué enfermedades padece?</Text>


        <Divider style={styles.divisorInferior} />

        <CheckBox
        textStyle={styles.checkText}
        title='Diabetes'
        checked={true}
        onValueChange={() => this.setState({ checked: !this.state.checked })} //this.state.checked
        />

        <CheckBox
        textStyle={styles.checkText}
        title='Hipertensión'
        checked={true}
        onValueChange={() => this.setState({ checked: !this.state.checked })} //this.state.checked
        />
        
        <Divider style={styles.divisorInferior} />

        <Button 
        titleStyle={styles.botonTexto}    
        buttonStyle={styles.botonAzulMarino}
          title="Guardar" 
          onPress={()=> navigation.navigate('Login')}/> 
          
    </View>
      
    )

  
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    checkText:{
      color: "#00a7ba",
      fontSize: 30,
    },

    textIntroduccion:{
      fontSize: 25,
      paddingTop: "2%",
      paddingBottom: "2%",
      color: "#111111",

    },
    textSubtitulo:{
      fontSize: 15,
      textAlign: "center",
      color: "#696969",
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
  