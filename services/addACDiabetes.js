import {URL_ROOT, PACIENTE} from 'services/settings.js'

const validate = apiResponse => {
    console.log(apiResponse)
    return apiResponse
}

export default function addACDiabetes({id, accessToken, dni}){
    console.log("Voy a cargar un autocontrol al paciente: " + String(id))
    console.log("El token: " + accessToken)
    console.log("El dni: "+ dni)
    console.log(URL_ROOT+ PACIENTE +String(id)+ "/dni/"+String(dni) + "/")
    const request = new Request(URL_ROOT+ PACIENTE +String(id)+ "/dni/"+String(dni) + "/", {
        method: 'PATCH',
        headers: new Headers({ 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ accessToken,
            }), 
    })

    return fetch(request)
    .then(res =>res.json())
    .then(validate)
}