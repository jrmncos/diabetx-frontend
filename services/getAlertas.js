import {URL_ROOT, PACIENTE} from 'services/settings.js'

const validate = apiResponse => {
    console.log(apiResponse)
    return apiResponse
}

export default function getAlertas({id, accessToken}){
    const request = new Request(URL_ROOT+ PACIENTE+ id + "/alertadiabetes/", {
        method: 'GET',
        headers: new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+ accessToken,
            }), 
    })

    return fetch(request).then(res =>res.json())
}