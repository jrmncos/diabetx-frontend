import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample({setImageNotificacion}) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setImageNotificacion(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Elegir imagen desde el almacenamiento interno" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: Dimensions.get('window').width, height:Dimensions.get('window').height }} />}
    </View>
  );
}
