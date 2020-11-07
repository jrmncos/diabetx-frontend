import {URL_ROOT, PACIENTE_BY_DNI} from 'services/settings.js'

const validate = apiResponse => {
    console.log(apiResponse)
    return apiResponse
}

export default function getPaciente({dni, accessToken}){

    console.log("Voy a pedir el paciente con dni: " + String(dni))
    console.log("El token: " + accessToken)
    console.log(URL_ROOT+ PACIENTE_BY_DNI+String(dni))

    const request = new Request(URL_ROOT+ PACIENTE_BY_DNI +String(dni), {
        method: 'GET',
        headers: new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+ accessToken,
            }), 
    })

    return fetch(request)
    .then(res =>res.json())
    .then(validate)
}