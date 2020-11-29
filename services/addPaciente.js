import {URL_ROOT, PROFESIONAL} from 'services/settings.js'

const validate = apiResponse => {
    return apiResponse
}

export default function addPaciente({id, accessToken, dni}){
    const request = new Request(URL_ROOT+ PROFESIONAL +String(id)+ "/dni/"+String(dni) + "/", {
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