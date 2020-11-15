import {URL_ROOT, PACIENTE} from 'services/settings.js'

const validate = apiResponse => {
    console.log(apiResponse)
    return apiResponse
}

export default function addECNT({id, accessToken, ecnts}){
    console.log("Voy agregarle una ecnt al paciente: " + String(id))
    console.log("El token: " + accessToken)
    console.log("Las ecnts: "+ ecnts)
    console.log(URL_ROOT+ PACIENTE +id+"/")
    const request = new Request(URL_ROOT+ PACIENTE +id+"/", {
        method: 'PATCH',
        headers: new Headers({ 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ accessToken,
            }), 
        body: JSON.stringify(ecnts)
    })

    return fetch(request)
    .then(res =>res.json())
    .then(validate)
}