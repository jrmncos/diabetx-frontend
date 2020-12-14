import React, { useState } from 'react'
import { Modal, Dimensions, TouchableHighlight, Alert } from 'react-native';
import { Card, CardItem, Text, Body } from 'native-base';
import { Image } from 'react-native'

export default function NotificacionItem({ notificacion }) {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <Card onPress={() => alert("Redireccionando..")}>

      <CardItem >
        {console.log(new Date(notificacion.fecha_creacion).toLocaleDateString())}
        {console.log(notificacion)}
        <Body o1nPress={() => alert("Redireccionando..")}>
          <Text>
            {new Date(notificacion.fecha_creacion).toLocaleDateString()}
          </Text>
          <Text >
            {notificacion.titulo}
          </Text>

        </Body>
      </CardItem>
      <TouchableHighlight
          onPress={() => {
            setModalVisible(true);
          }}
      >
        <Image source={{ uri: notificacion.imagen }} style={{ width: 100, height: 100 }} onPress={()=> setModalVisible(true)} />
      </TouchableHighlight>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Presione el boton cerrar.");
        }}
      >
        <Image source={{ uri: notificacion.imagen }} style={{width:Dimensions.get('window').width, height: Dimensions.get('window').height - 200}} />
        <TouchableHighlight
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text> Cerrar </Text>
        </TouchableHighlight>
      </Modal>
    </Card>
  )
}