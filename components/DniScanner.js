import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import {Button} from 'react-native-elements'
import { BarCodeScanner } from 'expo-barcode-scanner';
import dniBordeScanner from 'recursos/dd.png'
import dniEjemplo from 'recursos/dniScannerExample.png'
import { RegistroContext } from 'context/RegistroContext'

export default function DniScanner({ isScanning, validador }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
 
  const {setDni, setNombre, setApellido, setBod, setGenero} = useContext(RegistroContext)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if(type == 2048){
        const datosDNI = data.split("@")
        
        console.log(datosDNI)
        setDni(datosDNI[4])
        setNombre(datosDNI[2])
        setApellido(datosDNI[1])
        setGenero(datosDNI[3] == 'F' ? 'Femenino' : 'Masculino')
        setBod(datosDNI[6])
        setScanned(true);
        isScanning(false);
    }
    else{
        Alert.alert("Debe escanear un DNI argentino.")
        setScanned(true)
    }

  };
  
  if (hasPermission === null) {
    return <Text>Solicitando permisos de cámara.</Text>;
  }
  if (hasPermission === false) {
    return <Text>No tengo acceso a la cámara, es necesario para escanear tu DNI.</Text>;
  }

  return (
    <View style={styles.container}>
      
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.container}
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
      <View style={styles.botonVolverAtras}>
        <Button title="Volver" buttonStyle={styles.botonMenuHomeAzul} onPress={()=>isScanning(false)}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height -80,
    backgroundColor: 'rgb(255,255,255)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonMenuHomeAzul: {
    margin: "2%",
    padding:"5%",
    borderRadius:10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    width:"100%", 
    backgroundColor: '#00a7ba',
    borderWidth: 1,
    borderColor: "#00707d",
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
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
  botonVolverAtras: {
    width:'90%',
    margin:'2%',
    position: 'absolute',
    top: '85%',
  },
    
});