import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import dniBordeScanner from '../assets/dd.png'
import dniEjemplo from '../assets/dniScannerExample.png'

export default function dniScanner({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(type)
    console.log(data)
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
    
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
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