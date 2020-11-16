import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Button} from 'react-native';
import { Input, SearchBar, ListItem} from 'react-native-elements'
import Paciente from 'components/Paciente'
import { useUser } from 'hooks/useUser'
import { useAuth } from 'hooks/useAuth'
import getProfesional from 'services/getProfesional'
import addPaciente from 'services/addPaciente'

export default function Panel({navigation}){
  const {user} = useUser()
  const {userToken} = useAuth()
  const [profesional, setProfesional] = useState(null)
  const [dni, setDni] = useState('')
  const [search, setSearch] = useState('')

  useEffect(()=>{
    async function getProf(){
      const prof = await getProfesional({dni: user.dni, accessToken: userToken })
      if(prof)
        setProfesional(prof)
    }
    getProf()
  },[])

  const handleAddPaciente = ()=> {
    addPaciente({id: profesional.id, dni:dni, accessToken: userToken})
    .then(resp=> console.log(resp))
  }

  const handleSearchBar = (value) => {
    setSearch(value)
  }

  return(
    <View>
      <SearchBar
        placeholder="Buscar por dni..."
        onChangeText={(value) => handleSearchBar(value)}
        value={search}
        containerStyle={{backgroundColor: "#00a7ba"}}
        inputContainerStyle={{backgroundColor: "#00a7ba"}}
        inputStyle={{color:"white"}}
        placeholderTextColor={"white"}
        searchIcon={{color:"white"}}
        
      />


      {profesional && profesional.pacientes.map((paciente) => {
        return(
            <Paciente key={paciente.user.dni} paciente={paciente}/>
        )
      })}

      <Text>Agregar Paciente</Text>
        <Input
            placeholder='DNI' 
            keyboardType = 'numeric'         
            onChangeText={(value) => setDni(value)}
            value={dni}
        />
        <Button onPress={handleAddPaciente} title='Agregar'/>
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
  