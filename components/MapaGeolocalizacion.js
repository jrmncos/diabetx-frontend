import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import MapView, { Circle } from 'react-native-maps';

import CheckBox from '@react-native-community/checkbox';
import getPacientesECNT from 'services/getPacientesECNT'
import getECNTS from 'services/getECNTS';
import { useAuth } from 'hooks/useAuth'

export default function Geolocalizacion({ navigation }) {
  const { userToken } = useAuth()
  const [pacientesEcnts, setPacientesEcnts] = useState([])
  const [pacientesEcntsFiltrados, setPacientesEcntsFiltrados] = useState([])
  const [checkedMap, setCheckedMap] = useState([]);

  let colores = new Map();
  colores.set('Diabetes', '#50DC22');
  colores.set('Epoc', '#DC4D22');
  colores.set('Epoc3', '#D922DC');

  useEffect(() => {
    getPacientesECNT({ accessToken: userToken })
      .then(pacientesEcnts => {
        setPacientesEcnts(pacientesEcnts)
        setPacientesEcntsFiltrados(pacientesEcnts)
      })
  }, [])

  useEffect(() => {
    async function fetchECNT() {
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
    <View style={{ flex: 1 }}>

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
              radius={150}
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
            <View key={checkbox.id} style={{ flexDirection: "row", alignSelf: "baseline", width: "50%" }}>
              <CheckBox
                name={checkbox.id}
                title={checkbox.nombre}
                value={checkbox.checked}
                onValueChange={() => handleChange(checkbox.id)}
              />
              <Text style={styles.textoCheckBox}>{checkbox.nombre}</Text>
            </View>
          )
        })
        }
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 80,
  },
  textoCheckBox: {
    color: "white",
    fontSize: 23,
    paddingLeft: 6,
  },
  footerTop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});
