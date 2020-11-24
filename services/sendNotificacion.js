import {URL_ROOT, NOTIFICACION} from 'services/settings.js'

const validate = apiResponse => {
    console.log('hola!')
    console.log(apiResponse)
    return apiResponse
}

export default function sendNotificacion({notificacion, accessToken}){
    console.log("Voy a enviar una notificacion")
    console.log(notificacion)
    console.log(URL_ROOT+ NOTIFICACION)
    
    const request = new Request(URL_ROOT + NOTIFICACION, {
        method: 'POST',
        body: notificacion,
        headers: new Headers({ 
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+ accessToken
        }), 
    })

    return fetch(request)
    .then(res =>res.json())
    .then(validate)
}
