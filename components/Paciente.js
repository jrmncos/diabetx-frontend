import React, {useState} from 'react'
import { Button, View, Text} from 'react-native'

export default function Paciente({ navigation, route}){
    
    const { dni } = route.params

    return(
        <View>
            <Text>{JSON.stringify(dni)}</Text>
            <Text>{"JRMNCOS"}</Text>
            <Button
        title="Volver al Home"
        onPress={() => navigation.popToTop()}
      />
        </View>
    )
}