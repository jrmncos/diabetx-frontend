import { URL_ROOT, GROUPS } from './settings'

const validate = apiResponse => {
    return apiResponse
}

export default async function getGroups(){
    const request = new Request(URL_ROOT+ GROUPS, {
        method: 'GET',
        headers: new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded',
            }), 
    })

    return await fetch(request)
    .then(res =>res.json())
    .then(validate)
}