import 'react-native-gesture-handler';

import React, {useState, useRef, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {RootNavigation} from 'navigation/RootNavigation'
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthProvider} from 'context/AuthContext'
import {UserProvider} from 'context/UserContext'
import {usePushNotifications} from 'hooks/usePushNotifications'
import { navigationRef } from 'navigation/RootNavigation';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const {registerForPushNotificationsAsync, redirect} = usePushNotifications()
    
    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('@token', value)
      } catch (e) {
        // saving error
      }
    }
    
    useEffect(()=>{
      console.log(notification)
    }, [notification])

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
          setExpoPushToken(token)
          storeData(token)
        });
        
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          console.log('Llego una notification')
          setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          redirect(response.notification)
        });
        
        return () => {
          Notifications.removeNotificationSubscription(notificationListener);
          Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);

    return (
      <AuthProvider>
        <UserProvider>
          <NavigationContainer ref={navigationRef}>    
            <RootNavigation/>
          </NavigationContainer>
        </UserProvider>
      </AuthProvider>
    );
}
