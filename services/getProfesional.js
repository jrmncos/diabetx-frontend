import {URL_ROOT, PROFESIONAL_BY_DNI} from 'services/settings.js'

const validate = apiResponse => {
    console.log('hii')
    console.log(apiResponse)
    return apiResponse
}

export default function getProfesional({dni, accessToken}){
    const request = new Request(URL_ROOT+ PROFESIONAL_BY_DNI +String(dni)+"/", {
        method: 'GET',
        headers: new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+ accessToken,
            }), 
    })

    return fetch(request)
    .then(res => res.json())
    .then(validate)
}