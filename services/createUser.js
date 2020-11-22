import { Alert } from 'react-native';
import {DEV_IP} from 'services/settings'

export async function createUser(user, token)  {
    const data = {
        'first_name' : user.nombre,
        'last_name': user.apellido,
        'dni': user.dni,
        'gender': user.genero,
        'password': user.password,
        'latitude':user.location.latitude,
        'longitude':user.location.longitude,
        'bod':user.bod.split('/').reverse().join('-'),
        'expo_token':token
    }

    let res
    await fetch('http://'+DEV_IP+':8000/api/users/',{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
            res = 400
        }
        else{
            res = 201}
    })
   return res
}