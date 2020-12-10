import { URL_ROOT, USER_BY_DNI } from './settings'

const validate = apiResponse => {
    return apiResponse
}

export default async function addUsertoGroup(dni, groups, accessToken){
    console.log("DNI DEL ADMIN: "+dni)
    console.log("GR: "+groups)

    groups.map()
    const data = {
        'groups': [{
            name
        }]
    }

    const request = new Request(URL_ROOT+USER_BY_DNI+String(dni), {
        method: 'PATCH',
        headers: new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded',
            }), 
        //body: JSON.stringify({"groups" : groups})
    })

    return await fetch(request)
    .then(res =>res.json())
    .then(validate)
}