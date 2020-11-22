import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import {URL_ROOT, USERS} from 'services/settings.js'

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
    colores.set('diabetes', 'rgba(250, 229, 127,0.7)');
    colores.set('hipertension', 'rgba(0, 246, 252,0.7)');
    colores.set('epoc', 'rgba(217, 77, 245, 0.7)');
    
    useEffect(()=>{
      fetch(URL_ROOT+USERS)
      .then(response => response.json())
      .then(data => {
        let pacientesBackend = data.map((paciente) => {
          paciente.ecnt = ecnt[Math.floor(Math.random() * ecnt.length)] 
          return paciente
        })

        setPacientes(pacientesBackend)
        console.log(pacientes)
      })
    }, [])

    return(
      <View>
        <Text h2 style={styles.registrarse}>
          Mapa ECNT
        </Text>

        <Text h2 style={styles.textSubtitulo}>
          Use los filtros para ver los pacientes en el mapa
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
                    radius = { 80 }
                    strokeColor={'rgba(0,0, 0)'}
                    strokeWidth = { 1 }
                    strokeColor = { '#0000' }
                    fillColor = { filterEcnt.get(paciente.ecnt) ? colores.get(paciente.ecnt) : 'rgba(0,0,0,0)'  }
                    
                    />
              )  
          })}
          </MapView>
        </View>

      <SafeAreaView style={styles.footerTop}>
        <View style={{ alignContent:"center",flexDirection: "row", alignSelf: "baseline", width: "100%" }}>
          <TouchableOpacity 
            style={{width:"100%", paddingTop:"1%"}}       
            onPress={() => setCheckDiabetes(!checkDiabetes)}>
            <View style={checkDiabetes ? styles.botonFiltroECNTActivado : styles.botonFiltroECNTDesactivado}>
              <Image
                style={{ width: 30, height: 30, margin:"2%"}}
                source={require('recursos/sqAmarillo.png')} 
              />
              <Text h2 style={styles.textoBotonFiltroECNT}>Diabetes</Text> 
            </View>
          </TouchableOpacity>
        </View>        

        <View style={{ alignContent:"center",flexDirection: "row", alignSelf: "baseline", width: "100%" }}>
          <TouchableOpacity 
            style={{width:"100%", paddingTop:"1%"}}       
            onPress={() => setCheckHipertension(!checkHipertension)}>
            <View style={checkHipertension ? styles.botonFiltroECNTActivado : styles.botonFiltroECNTDesactivado}>
              <Image
                style={{ width: 30, height: 30, margin:"2%"}}
                source={require('recursos/sqCian.png')} 
              />
              <Text h2 style={styles.textoBotonFiltroECNT}>Hipertensión</Text> 
            </View>
          </TouchableOpacity>
        </View>   
        
        <View style={{ alignContent:"center",flexDirection: "row", alignSelf: "baseline", width: "100%" }}>
          <TouchableOpacity 
            style={{width:"100%", paddingTop:"1%"}}       
            onPress={() => setCheckEpoc(!checkEpoc)}>
            <View style={checkEpoc ? styles.botonFiltroECNTActivado : styles.botonFiltroECNTDesactivado}>
              <Image
                style={{ width: 30, height: 30, margin:"2%"}}
                source={require('recursos/sqVioleta.png')} 
              />
              <Text h2 style={styles.textoBotonFiltroECNT}>Epoc</Text> 
            </View>
          </TouchableOpacity>
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
    margin:1,
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
    margin:1,
    flexDirection: 'row', 
    alignSelf: 'center', 
    width:"100%", 
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
    backgroundColor: '#fcad03',
    borderColor: "#c28400",
  },

  textoBotonFiltroECNT:{
    paddingLeft:"5%",
    paddingTop:"4%",
    width:"100%",
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
    top: Dimensions.get('window').height -Dimensions.get('window').height*0.85,
    left:10,
    position: 'absolute',
    width: '45%',
    borderRadius: 10
  },
  
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
});
  