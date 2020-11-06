import {URL_ROOT, USER} from './settings'

const validate = apiResponse => {
    return apiResponse
}

export default function getUser({token}){

    const request = new Request(URL_ROOT+USER, {
        method: 'GET',
        headers: new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer '+ token,
            }), 
    })

    return fetch(request)
    .then(res =>res.json())
    .then(validate)
}