import {URL_ROOT, NOTIFICACION} from 'services/settings.js'

const validate = apiResponse => {
    console.log('hola!')
    console.log(apiResponse)
    return apiResponse
}

export default function sendNotificacion({notificacion, accessToken}){
    const request = new Request(URL_ROOT + NOTIFICACION, {
        method: 'POST',
        body: notificacion,
        headers: new Headers({ 
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer '+ accessToken
        }), 
    })

    return fetch(request)
    .then(res => res.ok)
    .then(validate)
}
