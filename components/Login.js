import React , { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, Platform  } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { Button, Input, Icon, Header, Divider } from 'react-native-elements';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { data: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function Login({navigation}){
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    }, []);

    return(
      
      <View style={styles.container}>

      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    
          
        <Header 
        barStyle="light-content" 
        centerComponent={ <Image
          style={{ width: 140, height: 40 }}
          source={require('../assets/mmplogo.png')} 
        />}
        containerStyle={{
          backgroundColor: '#5cc101',
          justifyContent: 'space-between',
        }}
        />

        <Text
        style = {styles.textSubtitulo}>
          Sistema de seguimiento de Enfermdades Cronicas no transmisibles</Text>

        <Text h2 style={styles.ingresar}>INGRESAR</Text> 
        
        <Input
          placeholder='DNI' 
          style={styles.textoFormulario}
          keyboardType = 'numeric'
          leftIcon={
            <Icon
              name='address-card'  
              color='#00a7ba'
              type='font-awesome'
            />
          }
        />

        <Input placeholder="Password" 
        style={styles.textoFormulario}
          leftIcon={
            <Icon
            name='lock'
            type='font-awesome'
            color='#00a7ba'
          />
          }
          secureTextEntry={true} 
        />

        <StatusBar/>
        <Button 
          buttonStyle={styles.botonAzulMarino}
          titleStyle={styles.botonTexto}
          title="Ingresar" 
          onPress={()=> navigation.navigate('Home')}/> 

        <Divider style={styles.divisorInferior} />
        
        <Button 
          buttonStyle={styles.botonVerdeClaro}
          titleStyle={styles.botonTexto}
          title="Registrarse" 
          onPress={()=> navigation.navigate('Registro')}/> 

        <Button 
          buttonStyle={styles.botonVerdeClaro}
          titleStyle={styles.botonTexto}
          title="Recuperar Clave" 
          onPress={()=> navigation.navigate('Home')}/> 

        <Text
        style = {styles.textFirma}>
        Todos los derechos reservados 2020: Gerc0s, Dub.</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    ingresar: {
      color:"#00a7ba",
      fontSize: 40,
      paddingTop:"2%",
      paddingBottom:"2%",
    },

    textoFormulario: {
      color:"#00a7ba",
      fontSize: 40,
    },

    textSubtitulo:{
      fontSize: 15,
      textAlign: "center",
      marginTop: "10%",
      marginBottom: "10%",
      color: "#696969",
    },

    textFirma:{
      fontSize: 12,
      textAlign: "center",
      marginTop: "10%",
      marginBottom: "10%",
      color: "#909090",
    },

    botonVerdeClaro:{
      width: '95%',
      padding: '5%',
      backgroundColor: '#5cc101',
      justifyContent: 'space-evenly',
      marginTop: "2%",
      marginBottom:"2%"
    },

    botonAzulMarino:{
      width: '95%',
      padding: '5%',
      backgroundColor: '#00a7ba',
      justifyContent: 'space-evenly',
      marginTop: "2%",
      marginBottom:"2%"
    },

    botonTexto:{
      color: "white",
      fontSize: 30,
    },

    divisorInferior:{
      backgroundColor: "#00a7ba",
      width: "95%",
      height: 1,
    }
  });
  