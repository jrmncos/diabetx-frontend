import {URL_ROOT} from 'services/settings.js'

export default function getNotificacion({url}){
    console.log("Voy a pedir la imagen: " + String(url))
    return URL_ROOT.substring(0, URL_ROOT.length - 1 ) + String(url)
}