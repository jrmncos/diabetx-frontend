import { URL_ROOT, USERS } from './settings'

const validate = apiResponse => {
    return apiResponse
}

export default async function patchGroups({user, groups}){
    let data = []
    groups.filter(g => g.state).map(p => 
            data.push({"name": p.name}))

    const request = new Request(URL_ROOT+USERS+user.id+"/groups/", {
        method: 'PATCH',
        headers: new Headers({ 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ user.accessToken,
            }), 
        body: JSON.stringify({"groups" : data})
    })

    return await fetch(request)
    .then(res =>res.json())
    .then(validate)
}