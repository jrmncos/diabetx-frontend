import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const pacientesBackend = [{dni: '40861249'}, {dni: '40861248'}]

export default function Panel({navigation}){

    const [pacientes, setPacientes] = useState(pacientesBackend)

    const PreviewPaciente = ({dniPaciente})=>(
      <>
        <Text onPress={()=> navigation.navigate('Paciente', {dni:"40861249"})}>{"German"}</Text>
        <Text>{dniPaciente}</Text>
      </>
      )

    const renderPacientePreview = ({paciente}) =>(
      <PreviewPaciente dni={paciente}/>
    )
    
    return(
        <View style={styles.container}>
        <Text>El Panel de control</Text>
        <FlatList
          data={pacientes}
          renderItem={renderPacientePreview}
          keyExtractor={paciente => paciente.dni}
        >
        </FlatList>
        <StatusBar style="auto" />
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
  });
  