import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Button, Input, Icon, Header, Divider } from 'react-native-elements';

export default function Home({navigation}){

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

        {
        //Preguntar con qué rol está logeado
        
        //Profesional de la salud:
        }

        <View style={{flexDirection: 'row', alignSelf: 'center', width:"100%", backgroundColor: '#00a7ba'}}>
      
        <Image
          style={{ width: 70, height: 70, backgroundColor:"#00a7ba"}}
          source={require('../assets/doctor.png')} 
        />

        <Text h2 style={styles.textoRol}>Profesiona de la salud</Text> 

        </View>

        <Text h2 style={styles.textoBienvenida}>Bienvenido!</Text> 
        <Text h2 style={styles.textoNombreUsuario}>German Costilla</Text> 
        <Text h2 style={styles.textoBienvenida}>Selecciona una acción para continuar.</Text> 

        <Divider style={styles.divisorInferior} />

        <View style={{flexDirection: 'row', alignSelf: 'flex-start', width:"90%", padding: "2%"}}>
        <Image
          style={{ width: 70, height: 70, backgroundColor:"#5cc101"}}
          source={require('../assets/mapa.png')} 
        />
          <Button 
            titleStyle={styles.botonTexto}    
            buttonStyle={styles.botonVerdeClaro}
            title="Mapa interactivo" 
            onPress={()=> navigation.navigate('Geolocalizacion')}/> 
        </View>

        <View style={{flexDirection: 'row', alignSelf: 'flex-start', width:"90%", padding: "2%"}}>
        <Image
          style={{ width: 70, height: 70, backgroundColor:"#5cc101"}}
          source={require('../assets/mapa.png')} 
        />
          <Button 
            titleStyle={styles.botonTexto}    
            buttonStyle={styles.botonVerdeClaro}
            title="Enviar notificacion" 
            onPress={()=> navigation.navigate('Notificacion')}/> 
        </View>
        
        <View style={{flexDirection: 'row', alignSelf: 'flex-start', width:"90%", padding: "2%"}}>
        <Image
          style={{ width: 70, height: 70, backgroundColor:"#5cc101"}}
          source={require('../assets/mapa.png')} 
        />
          <Button 
            titleStyle={styles.botonTexto}    
            buttonStyle={styles.botonVerdeClaro}
            title="Perfil" 
            onPress={()=> navigation.navigate('Perfil')}/>
        </View>

        <View style={{flexDirection: 'row', alignSelf: 'baseline', width:"90%", padding: "2%" }}>
        <Image
          style={{ width: 70, height: 69, backgroundColor:"#5cc101" }}
          source={require('../assets/seo.png')} 
        />
          <Button   
            image={{ name: 'check-circle', color: '#fff' }}
            titleStyle={styles.botonTexto}    
            buttonStyle={styles.botonVerdeClaro}
            title="Panel de control" 
            onPress={()=> navigation.navigate('Panel')}/> 
        </View>

        <View style={{flexDirection: 'row', alignSelf: 'baseline', width:"90%", padding: "2%" }}>
        <Image
          style={{ width: 70, height: 69, backgroundColor:"#5cc101" }}
          source={require('../assets/archivo-medico.png')} 
        />
          <Button   
            image={{ name: 'check-circle', color: '#fff' }}
            titleStyle={styles.botonTexto}    
            buttonStyle={styles.botonVerdeClaro}
            title="Autocontrol (Diabetes)" 
            onPress={()=> navigation.navigate('FormAC_Diabetes')}/> 
        </View>

        <Button 
          image={{ name: 'check-circle', color: '#fff' }}
          buttonStyle={styles.botonAzulMarino}
          titleStyle={styles.botonTexto}
          title="Escanear DNI (test)" 
          onPress={()=> navigation.navigate('dniScanner')}/> 

        <StatusBar style="auto" />
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    botonAzulMarino:{
      width: '95%',
      padding: '5%',
      backgroundColor: '#00a7ba',
      justifyContent: 'space-evenly',
    },

    botonVerdeClaro:{
      width: '95%',
      padding: '5%',
      backgroundColor: '#5cc101',
      justifyContent: 'space-evenly',
    },

    botonTexto:{
      color: "white",
      fontSize: 30,
    },

    textoRol:{
      paddingLeft:"5%",
      paddingTop:"5%",
      color: "white",
      fontSize: 30,
    },

    textoBienvenida:{
      color: "#101010",
      textAlign:"center",
      fontSize: 30,
    },

    textoNombreUsuario:{
      color: "#00a7ba",
      textAlign:"center",
      fontSize: 30,
    },

    divisorInferior:{
      backgroundColor: "#00a7ba",
      width: "95%",
      height: 1,
    }

  });
  