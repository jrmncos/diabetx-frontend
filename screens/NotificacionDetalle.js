import React, { useState, useEffect } from 'react'
import { Text, View, Image, Dimensions} from 'react-native';
import getNotificacion from 'services/getNotificacion'

export default function NotificacionDetalle({ navigation, route }) {
    const { notificacion } = route.params;
    const [url, setUrl] = useState('')
    
    useEffect(() => {
        setUrl(getNotificacion({url: notificacion.request.content.data.url }))
    }, [])

    return(
        <View>
            <Text>Holaa</Text>
            {console.log('Mirror')}
            {   console.log(url) }
            {console.log(url)}
            {   console.log(notificacion)  }
            { url!='' && <Image source={{ uri: url }} style={{ width: Dimensions.get('window').width, height:Dimensions.get('window').height }}/>  }
        </View>
    )
}