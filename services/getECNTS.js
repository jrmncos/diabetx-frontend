import { URL_ROOT, ECNTS } from './settings'

const validate = apiResponse => {
    return apiResponse
}

export default async function getECNTS(){
    const request = new Request(URL_ROOT+ ECNTS, {
        method: 'GET',
        headers: new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded',
            }), 
    })

    return await fetch(request)
    .then(res =>res.json())
    .then(validate)
}