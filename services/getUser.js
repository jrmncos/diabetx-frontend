import {URL_ROOT, USER_BY_DNI} from 'services/settings'

const validate = apiResponse => {
    console.log("El usuario del back")
    console.log(apiResponse)
    return apiResponse
}

export default function getUser({dni, accessToken}){
    console.log("Voy a pedir el usuario")
    console.log("Dni: "+ String(dni))
    console.log("Token: "+ accessToken)
    const request = new Request(URL_ROOT+USER_BY_DNI+String(dni), {
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