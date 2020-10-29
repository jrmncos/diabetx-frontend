import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View, Dimensions, Image, Alert, ScrollView, SafeAreaView } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import CheckBox from '@react-native-community/checkbox';

const ecnt = ['diabetes', 'hipertension', 'epoc']

export default function Geolocalizacion({navigation}){

    const [pacientes, setPacientes] = useState([])

    const [checkDiabetes, setCheckDiabetes] = useState(false)

    const [checkEpoc, setCheckEpoc] = useState(false)

    const [checkHipertension, setCheckHipertension] = useState(false)

    const checks = [checkEpoc, checkHipertension, checkDiabetes]

    let  filterEcnt = new Map();
    // asignando valores
    filterEcnt.set('diabetes', checkDiabetes);
    filterEcnt.set('epoc', checkEpoc);
    filterEcnt.set('hipertension', checkHipertension);

    let colores = new Map();
    colores.set('diabetes', '#50DC22');
    colores.set('epoc', '#DC4D22');
    colores.set('hipertension', '#D922DC');
    
    useEffect(()=>{
      fetch('http://192.168.1.38:8000/hospital/users/')
      .then(response => response.json())
      .then(data => {
        //console.log(data)
        //console.log(parseFloat(data[0].latitude))
        //console.log({latitude: parseFloat(data[0].latitude), longitude: parseFloat(data[0].longitude)})
        //console.log({latitude: -34.784509, longitude: -58.834529})
        //Hardcoding de ECNT
        let pacientesBackend = data.map((paciente) => {
          paciente.ecnt = ecnt[Math.floor(Math.random() * ecnt.length)] 
          return paciente
        })

        setPacientes(pacientesBackend)
        console.log(pacientes)
      })
      //getLocationPermissions()
    }, [])

  
    return(
      <View style={{flex: 1}}>

        <MapView style={styles.mapStyle} 
        initialRegion={{
          latitude: -34.558654,
          longitude: -58.744867,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
      }}
      >
        
        {pacientes && pacientes.map(paciente => {
          {console.log("HOLA")}
          {console.log(paciente)}
          return (<Circle
                  key={paciente.dni}
                  center = {{latitude: parseFloat(paciente.latitude), longitude: parseFloat(paciente.longitude)}}
                  radius = { 150 }
                  strokeWidth = { 1 }
                  strokeColor = { '#0000' }
                  fillColor = { filterEcnt.get(paciente.ecnt) ? colores.get(paciente.ecnt) : 'rgba(0,0,0,0)'  }
                  
                  />
            )  
        })}
        
      
      </MapView>
      <SafeAreaView style={styles.footerTop}>
        <View style={{ flexDirection: "row", alignSelf: "baseline", width: "50%" }}>
            <CheckBox
              title={<Text style={styles.textoCheckBox}>Diabetes</Text>}
              value={checkDiabetes}
              onValueChange={(newValue) => setCheckDiabetes(newValue)}
            />
            <Text style={styles.textoCheckBox}>Diabetes</Text>
        </View>

        <View style={{ flexDirection: "row", alignSelf: "baseline", width: "50%" }}>
          <CheckBox
            disabled={false}
            value={checkEpoc}
            onValueChange={(newValue) => setCheckEpoc(newValue)}
          />
          <Text style={styles.textoCheckBox}>Epoc</Text>
        </View>

        <View style={{ flexDirection: "row", alignSelf: "baseline", width: "80%" }}>
         
        <CheckBox
          disabled={false}
          value={checkHipertension}
          onValueChange={(newValue) => setCheckHipertension(newValue)}
        />
          <Text style={styles.textoCheckBox}>Hipertensión</Text>
        </View>

      </SafeAreaView>


      {/* <View
        style={{ flexDirection: "row", alignSelf: "baseline", width: "50%" }}
      >
        <Text>Diabetes</Text>
        <CheckBox
          disabled={false}
          value={checkDiabetes}
          onValueChange={(newValue) => setCheckDiabetes(newValue)}
        />
        <Text>Epoc</Text>
        <CheckBox
          disabled={false}
          value={checkEpoc}
          onValueChange={(newValue) => setCheckEpoc(newValue)}
        />
        <Text>Hipertension</Text>
        <CheckBox
          disabled={false}
          value={checkHipertension}
          onValueChange={(newValue) => setCheckHipertension(newValue)}
        />
      </View> */}
      </View>
    )

  }
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height -80,
    },
    textoCheckBox: { 
      color: "white",
      fontSize: 23,
      paddingLeft: 6,
    },
    footerTop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    top: 10,
    left:10,
    position: 'absolute',
    width: '50%'
    },
    
    footer: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      bottom: 0,
      position: 'absolute',
      width: '100%'
    },
  });
  