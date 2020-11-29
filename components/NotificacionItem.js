import React from 'react'
import {Card, CardItem, Text, Body } from 'native-base';
import { Image } from 'react-native'
export default function NotificacionItem({notificacion}){
    return(
        <Card onPress={()=>alert("Dale que va")}>
            <CardItem >
              {console.log('plastic love')}
              {console.log(notificacion)}
              <Body>
                <Text>
                  {notificacion.fecha_creacion}
                </Text>
                <Text >
                  {notificacion.titulo}
                </Text>
                <Image source={{ uri: notificacion.imagen }} style={{ width: 100, height:100}} />
              </Body>
            </CardItem>

         </Card>
    )
}