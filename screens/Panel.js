import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, Image} from 'react-native';
import { Input, SearchBar, Button} from 'react-native-elements'
import PacienteList from 'components/PacienteList'
import { useUser } from 'hooks/useUser'
import { useAuth } from 'hooks/useAuth'
import getProfesional from 'services/getProfesional'
import addPaciente from 'services/addPaciente'
import busqueda from 'recursos/busqueda.png'

export default function Panel({navigation}){
  const {user} = useUser()
  const {userToken} = useAuth()
  const [profesional, setProfesional] = useState(null)
  const [pacientesFiltered, setPacientesFiltered] = useState([])
  const [dni, setDni] = useState('')
  const [search, setSearch] = useState('')
  
  useEffect(()=>{
    async function getProf(){
      const prof = await getProfesional({dni: user.dni, accessToken: userToken })
      if(prof != undefined){
        setProfesional(prof)
        setPacientesFiltered(prof.pacientes)
      }
    }
    getProf()
  },[])

  const handleAddPaciente = ()=> {
    addPaciente({id: profesional.id, dni:dni, accessToken: userToken})
    .then(resp=> console.log(resp))
  }

  const handleSearchBar = (value) => {
    const filtered = profesional.pacientes.filter(paciente  => {
          return String(paciente.user.dni).toLowerCase().includes(value.toLowerCase())
     })
    setSearch(value)
    setPacientesFiltered(filtered)
  }

  return(
    <View>
      {/* <View style={{flexDirection: 'row', width:"100%", backgroundColor: '#00a7ba'}}>
      <Image
          style={{ width: 50, height: 50, backgroundColor:"#00a7ba", margin:"2%"}}
          source={busqueda} 
        />
        <SearchBar
          style={{alignSelf:'flex-start', marginRight:"70%"}}
          placeholder="Buscar por DNI"
          onChangeText={(value) => handleSearchBar(value)}
          value={search}
          keyboardType="numeric"
          containerStyle={{backgroundColor: "#aaaaaa"}}
          inputContainerStyle={{backgroundColor: "#00a7ba"}}
          inputStyle={styles.textoFiltro}
          searchIcon={null}
          placeholderTextColor={"white"}
        />
      </View> */}
      <SearchBar
          placeholder="Buscar por DNI"
          onChangeText={(value) => handleSearchBar(value)}
          value={search}
          keyboardType="numeric"
          containerStyle={{backgroundColor: "#00707d"}}
          inputContainerStyle={{backgroundColor: "#FFFFFF"}}
          inputStyle={styles.textfilter}
          placeholderTextColor={"gray"}
      />
      <PacienteList pacientesFiltered={ pacientesFiltered }/>

      <Text style={styles.textSubtitulo}>Agregar Paciente</Text>
        <Input
            placeholder='DNI' 
            keyboardType = 'numeric'         
            onChangeText={(value) => setDni(value)}
            value={dni}
        />
        <Button 
          titleStyle={styles.botonTexto}
          buttonStyle={styles.botonMenuHomeAzul} 
          onPress={handleAddPaciente} 
          title='Agregar'/>
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
    textSubtitulo:{
      color: "#00a7ba",
      fontSize: 35,
      paddingTop: "1%",
      paddingBottom: "1%",
      padding:'5%',
      textAlign: 'center',
    },
    titulo: {
      color:"#00a7ba",
      fontSize: 40,
      paddingTop:"2%",
      paddingBottom:"2%",
    },
    textoFiltro:{
      width:'100%',
      fontSize: 30,
    },

    botonMenuHomeAzul: {
      marginLeft:"5%",
      marginRight:"5%",
      margin:"2%",
      borderRadius:10, 
      flexDirection: 'row', 
      alignSelf: 'center', 
      width:"95%", 
      backgroundColor: '#00a7ba',
      borderWidth: 1,
      borderColor: "#00707d",
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOpacity: 1,
      elevation: 5,
      shadowRadius: 15 ,
      shadowOffset : { width: 1, height: 13},
    },
    
    botonTexto:{
      padding:"5%",
      width:"100%",
      textAlign:"center",
      color: "white",
      fontSize: 30,
    },
  });
  