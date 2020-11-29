import {URL_ROOT, USER_BY_DNI} from 'services/settings'

const validate = apiResponse => {
    return apiResponse
}

export default async function getUser({dni, accessToken}){
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