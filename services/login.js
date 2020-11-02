
export default function loginUserService({dni, password}){
    console.log("Estoy en la funcion login")
   
    let client_id = "dc4Q6Ecmlwo6WCdZkmwsNX8zr19EH1IhgyCaJbpo"
    
    let _data = "grant_type=password&username="+String(dni)
    +"&password="+String(password)
    +"&client_id="+ client_id
    console.log(_data)

    const request = new Request("http://192.168.1.38:8000/o/token/", {
        method: 'POST',
        headers: new Headers({ 
            'Content-Type': 'application/x-www-form-urlencoded',}),
        body : _data,
    })

    return fetch(request)
    .then(res => {
        return res.json()
    })
}