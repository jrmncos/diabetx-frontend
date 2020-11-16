import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { useUser } from 'hooks/useUser'

export default function Panel({navigation}){
  const {user} = useUser()
  const {userToken} = useAuth()
  const [profesional, setProfesional] = useState(null)
  const [dni, setDni] = useState('')

  useEffect(()=>{
    async function getProfesional(){
      const prof = await getProfesional({dni: user.dni, accessToken: userToken })
      setProfesional(prof)      
    }
    getProfesional()
  },[])

  const handleAddPaciente = ()=>{
    addPaciente({id: profesional.id, dni:dni, accessToken: userToken})
    .then(resp=> console.log(resp))
  }

  return(
    <View>
      <Text>Agregar Paciente</Text>
      <Input
          placeholder='DNI' 
          keyboardType = 'numeric'         
          onChangeText={(value) => setDni(value)}
          value={dni}
      />
      <Button onPress={handleAddPaciente}>Agregar</Button>

      {profesional && profesional.pacientes.map((paciente) => {
        <Text>{paciente.user.first_name}</Text>
      }) }
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
  