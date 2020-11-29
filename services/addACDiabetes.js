import {URL_ROOT, ACDIABETES} from 'services/settings.js'

const validate = apiResponse => {
    return apiResponse
}

export default function addACDiabetes({accessToken, acdiabetes}){
    const data = {
        'id':acdiabetes.id,
        'paciente_id': acdiabetes.paciente_id,
        'glucemia_matutina' : acdiabetes.glucemia_matutina,
        'opcional_glucemia_matutina': acdiabetes.opcional_glucemia_matutina,
        'glucemia_post_comida_principal': acdiabetes.glucemia_post_comida_principal,
        'opcional_glucemia_comida_principal': acdiabetes.opcional_glucemia_comida_principal,
    }
    
    let ruta = (data.id == null) ? URL_ROOT+ACDIABETES : URL_ROOT+ACDIABETES+data.id+"/" 
    let method = (data.id == null) ? 'POST' : 'PATCH'
    const request = new Request(ruta, {
        method: method,
        headers: new Headers({ 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ accessToken,
            }), 
        body: JSON.stringify(data)
    })

    return fetch(request)

}