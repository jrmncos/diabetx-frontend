import {URL_ROOT, USER} from 'services/settings'

const validate = apiResponse => {
    return apiResponse
}

export default function getUser({dni, accessToken}){
    console.log("Voy a pedir el usuario")
    const request = new Request(URL_ROOT+USER+String(dni), {
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