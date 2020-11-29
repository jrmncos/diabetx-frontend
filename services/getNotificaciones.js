import {URL_ROOT, NOTIFICACION} from 'services/settings.js'

const validate = apiResponse => {
    return apiResponse
}

export default function getNotificaciones({page, accessToken}){
    console.log("Page: " + String(page))
    console.log("Token: " + String(accessToken))
    console.log(URL_ROOT+ NOTIFICACION +"?page=" + String(page))
    const request = new Request(URL_ROOT+ NOTIFICACION +"?page=" + String(page), {
        method: 'GET',
        headers: new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded'
            }), 
    })

    return fetch(request)
    .then(res =>{
        if(res.ok)
            return res.json()
        return res.text()
    })
    .then(validate)
}