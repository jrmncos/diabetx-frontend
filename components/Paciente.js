import React, {useState} from 'react'
import { Button, View, Text} from 'react-native'

export default function Paciente({nombre, domicilio, dni, navigation}){
    return(
        <View>
            <Text>{nombre}</Text>
            <Text>{dni}</Text>
            <Text>{domicilio}</Text>
            <Button
        title="Volver al Home"
        onPress={() => navigation.popToTop()}
      />
        </View>
    )
}