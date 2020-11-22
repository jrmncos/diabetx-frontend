import {URL_ROOT, PACIENTE_ECNT} from 'services/settings'

const validate = apiResponse => {
    return apiResponse
}

export default async function getPacientesECNT({accessToken}){
    console.log('hii')
    console.log("El token: " + accessToken)
    const request = new Request(URL_ROOT+ PACIENTE_ECNT , {
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