import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button} from 'react-native-elements';

import dniBordeScanner from '../assets/dd.png'
import dniEjemplo from '../assets/dniScannerExample.png'

export default function dniScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
 
  const [dni, setDni] = useState()
  const [lastName, setLastName] = useState()
  const [name, setName] = useState()
  const [genero, setGenero] = useState()
  const [bod, setBod] = useState()

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(data)
    if(type == 2048){
        const datosDNI = data.split("@")
        console.log(datosDNI)

        setDni(datosDNI[4])
        setName(datosDNI[2])
        setLastName(datosDNI[1])
        setGenero(datosDNI[3])
        setBod(datosDNI[6])
        
        setScanned(true);
    }
    else{
        Alert.alert("Debe escanear un DNI argentino.")
        setScanned(true)
    }

    console.log("Documento Argentino escaneado: \n"+
    "DNI: "+dni+
    "\nApellido: "+lastName+
    "\nNombre: "+name+
    "\nGenero(estamos en los 90?): "+genero+
    "\nFecha de Nacimiento: "+bod
    )
  };

  if (hasPermission === null) {
    return <Text>Solicitando permisos de cámara.</Text>;
  }
  if (hasPermission === false) {
    return <Text>No tengo acceso a la cámara, es necesario para escanear tu DNI.</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.textoCam}>
        <Text h2 style={styles.informacion}>
            Apuntá con tu cámara a tu DNI
        </Text>
      </View>
      <View style={styles.ejemploCam}>
          <Image style={styles.dniEjemplo} source={dniEjemplo} />
      </View>
      <View style={styles.centroCam}>
          <Image style={styles.bordeCam} source={dniBordeScanner} />
      </View>
    
      {scanned && 
      <View style={styles.botonCentro}>
        <Button 
            buttonStyle={styles.botonAzulMarino}
            titleStyle={styles.botonTexto}
            title="Reintentar" 
            onPress={()=> setScanned(false)}/>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    botonCentro: {
        left:"8%",
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '90%'
      },
      botonTexto:{
        color: "white",
        fontSize: 30,
      },
    botonAzulMarino:{
        width: '95%',
        padding: '7%',
        backgroundColor: '#00a7ba',
        justifyContent: 'space-evenly',
        marginTop: "2%",
        marginBottom:"2%"
      },
    ejemploCam: {
        left: '30%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '10%'
      },
    dniEjemplo: {
    height: 100,
    width: 190
    },
    centroCam: {
      left: '11%',
      marginLeft: -24,
      marginTop: -48,
      position: 'absolute',
      top: '40%'
    },
    bordeCam: {
      height: 350,
      width: 350
    },

    textoCam: {
        left: '10%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '25%'
      },

    informacion: {
        color: "white",
        textAlign:'center',
        fontSize: 30,
        paddingTop: "5%",
        paddingBottom: "5%",
      },
    
});