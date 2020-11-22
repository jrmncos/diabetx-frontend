
import {DEV_IP, CLIENT_ID} from 'services/settings'

export default function loginUserService({dni, password}){
    let client_id = CLIENT_ID
    let _data = "grant_type=password&username="+String(dni)+"&password="+String(password)+"&client_id="+ client_id
    const request = new Request("http://"+DEV_IP+":8000/o/token/", {
        method: 'POST',
        headers: new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded',}),
        body : _data,
    })

    return fetch(request)
    .then(res => {
        if(!res.ok) throw Error("Las credenciales no son correctas")
        return res.json()
    })
}