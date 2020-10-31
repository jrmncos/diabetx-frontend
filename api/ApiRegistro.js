import baseurl from "../baseurl.json"

export function createUser(user, token){
    console.log(user)
    console.log(user.bod.split('/').reverse().join('-'))
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
    console.log(data)

    
    fetch('http://'+baseurl.config.ip+':8000/api/users/',{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
      
}