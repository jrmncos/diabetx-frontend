import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View, Dimensions, Image, Alert, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
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

      <View>
        <Text h2 style={styles.registrarse}>
          Mapa ECNTS
        </Text>

        <Text h2 style={styles.textSubtitulo}>
          Recuerda usar los filtros para ver los puntos en el mapa
        </Text>
        <View style={{margin:"1%", overflow: 'hidden' ,borderWidth:2, borderColor:"rgba(0, 204, 0, 0.5)", borderRadius: 10}}>
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
        </View>
      <SafeAreaView style={styles.footerTop}>
        
       {/*<View style={{ alignContent:"center",flexDirection: "row", alignSelf: "baseline", width: "100%" }}>
      <TouchableOpacity 
          style={{width:"100%", paddingTop:"5%"}}       
          onPress={(newValue) => setCheckDiabetes(newValue)}>
          {checkDiabetes && <View style={styles.botonFiltroECNTActivado}>
            <Image
              style={{ width: 30, height: 30, margin:"2%"}}
              source={require('recursos/cambiarRol.png')} 
            />
            <Text h2 style={styles.textoBotonFiltroECNT}>Diabetes</Text> 
          </View>}
          {!checkDiabetes && <View style={styles.botonFiltroECNTDesactivado}>
            <Image
              style={{ width: 30, height: 30, margin:"2%"}}
              source={require('recursos/cambiarRol.png')} 
            />
            <Text h2 style={styles.textoBotonFiltroECNT}>Diabetes</Text> 
          </View>}
        </TouchableOpacity>
        </View>         */}

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
  
  botonFiltroECNTActivado: {
    borderRadius:10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    width:"100%", 
    backgroundColor: '#5cc101',
    borderWidth: 1,
    borderColor: "#479801",
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },

  botonFiltroECNTDesactivado:{
    borderRadius:10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    width:"100%", 
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
    backgroundColor: '#5cc101',
    borderColor: "#479801",
  },

  textoBotonFiltroECNT:{
    paddingLeft:"5%",
    paddingTop:"4%",
    color: "white",
    fontSize: 20,
  },

  registrarse: {
    color: "#00a7ba",
    alignSelf:"center",
    fontSize: 35,
    paddingTop: "1%",
  },
  textSubtitulo:{
    fontSize: 22,
    textAlign: "center",
    marginTop: "2%",
    marginBottom: "2%",
    color: "#696969",
  },
  mapStyle: {
    alignSelf:"center",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height -Dimensions.get('window').height*0.25,
  },
  textoCheckBox: { 
    color: "white",
    fontSize: 23,
    paddingLeft: 6,
  },
  footerTop: {
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  top: Dimensions.get('window').height -Dimensions.get('window').height*0.25,
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
  