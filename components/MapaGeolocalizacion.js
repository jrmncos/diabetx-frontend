import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import CheckBox from '@react-native-community/checkbox';
import getPacientesECNT from 'services/getPacientesECNT'
import getECNTS from 'services/getECNTS';
import { useAuth } from 'hooks/useAuth'
import helpers from '../helpers/getIcon'

export default function Geolocalizacion({ navigation }) {
  const { userToken } = useAuth()
  const [pacientesEcnts, setPacientesEcnts] = useState([])
  const [pacientesEcntsFiltrados, setPacientesEcntsFiltrados] = useState([])
  const [checkedMap, setCheckedMap] = useState([]);

  let colores = new Map();
  colores.set('Diabetes', 'rgba(217, 77, 245, 0.5)');
  colores.set('EPOC', 'rgba(255, 230, 121, 0.5)#');
  colores.set('Hipertensión', 'rgba(0, 246, 252, 0.5)');

  useEffect(() => {
    getPacientesECNT({ accessToken: userToken })
      .then(pacientesEcnts => {
        setPacientesEcnts(pacientesEcnts)
        setPacientesEcntsFiltrados(pacientesEcnts)
      })
  }, [])

  useEffect(() => {
    async function fetchECNT() {
      setCheckedMap([])
      const ecnts = await getECNTS()
      ecnts.map((ecnt) => {
        setCheckedMap(prevState => [...prevState, {
          "id": ecnt.id,
          "checked": false,
          "nombre": ecnt.nombre,
        }])
      })
    }
    fetchECNT()
  }, [])

  useEffect(() => {
    let filtered = pacientesEcnts.filter(paciente => {
      for (let i = 0; i < checkedMap.length; i++) {
        if (checkedMap[i].checked && paciente.ecnts.filter(ecnt => { ecnt.nombre == checkedMap[i].nombre }))
          return true
      }
      return false
    })
    setPacientesEcntsFiltrados(filtered)
  }, [checkedMap])

  const handleChange = (id) => {
    let index = checkedMap.findIndex((elem) => elem.id == id)
    let newArray = [...checkedMap]
    newArray[index] = { ...newArray[index], checked: !newArray[index].checked }
    setCheckedMap(newArray)
  }

  const getColor = (ecnts) =>{
    for(let i=0; i<ecnts.length; i ++){
      for(let j=0; j < checkedMap.length; j++){
        if(checkedMap[j].checked && checkedMap[j].nombre == ecnts[i].nombre)
          return colores.get(ecnts[i].nombre)
      }
    }
    return '#0000'
  }

  return (
    <>
      <Text h2 style={styles.titulo}>
      Mapa Interactivo
      </Text>
      <Text h2 style={styles.textSubtitulo}>
      Utilice los filtros para mostrar los pacientes en el mapa
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

          {pacientesEcntsFiltrados.map((paciente, idx) => {
            return (
              <Circle
                key={idx}
                center={{ latitude: parseFloat(paciente.latitude), longitude: parseFloat(paciente.longitude) }}
                radius={45}
                strokeWidth={1}
                strokeColor={'#0000'}
                fillColor={paciente.ecnts.length > 0? getColor(paciente.ecnts): '#0000'}
              />
            )
          })}

        </MapView>
        <SafeAreaView style={styles.footerTop}>
          {checkedMap.map(checkbox => {
            return (
              <TouchableOpacity 
                key={checkbox.id}
                style={{width:"100%", padding: "1%", paddingLeft:"5%", paddingRight:"5%"}}       
                onPress={() => handleChange(checkbox.id)}
                >
              <View style={checkbox.checked ? styles.rolEncendido: styles.rolApagado}>
                <Image 
                  style={{ width: 25, height: 25, margin:"2%", marginBottom:"3%"}}
                  source={helpers.getSquareECNT(checkbox.nombre)} 
                />
                <Text h2 style={styles.textoRol}>{checkbox.nombre}</Text> 
              </View>
        </TouchableOpacity> 
            )
          })
          }
        </SafeAreaView>

      </View>
    </>
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
    borderRadius:5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    top: 10,
    left: 10,
    position: 'absolute',
    width: '50%'
  },

  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  titulo: {
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

  rolEncendido: {
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

  rolApagado: {
    borderRadius:10, 
    flexDirection: 'row', 
    alignSelf: 'center', 
    width:"100%", 
    backgroundColor:"#fcad03",
    borderWidth: 1,
    borderColor: "#ad7600",
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13},
  },
  textoRol:{
    paddingTop:"1%",
    color: "white",
    fontSize: 25,
  },
});
