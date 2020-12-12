import {URL_ROOT, PACIENTE} from 'services/settings.js'

const validate = apiResponse => {
    return apiResponse
}

export default function patchECNTS({id, accessToken, ecnts}){
    const request = new Request(URL_ROOT+ PACIENTE +id+"/ecnts/", {
        method: 'PATCH',
        headers: new Headers({ 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ accessToken,
            }), 
        body: JSON.stringify({"ecnts" : ecnts})
    })

    return fetch(request)
}