import React, { useState, useEffect } from 'react'
import { Text, View, Image, Dimensions, StyleSheet} from 'react-native';
import getNotificacion from 'services/getNotificacion'

export default function NotificacionDetalle({ navigation, route }) {
    const { notificacion } = route.params;
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')
    
    useEffect(() => {
        setUrl(getNotificacion({url: notificacion.request.content.data.url }))
    }, [])

    return(
        <View>
            <Text h2 style={styles.titulo}>
                {notificacion.request.content.body}
            </Text>
            {console.log('Mirror')}
            {   console.log(url) }
            {console.log(url)}
            {   console.log(notificacion)  }
            { url!='' && <Image source={{ uri: url }} style={{ width: Dimensions.get('window').width, height:Dimensions.get('window').height }}/>  }
        </View>
    )
}
const styles = StyleSheet.create({
    titulo: {
        color: "#00a7ba",
        alignSelf:"center",
        fontSize: 35,
        paddingTop: "1%",
      },
})