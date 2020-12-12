import paciente from 'recursos/latido-del-corazon.png'
import profesional from 'recursos/medico.png'
import promotor from 'recursos/altoparlante.png'
import admin from 'recursos/admin.png'

import paciente_f from 'imgUsuario/paciente_mujer.png'
import paciente_m from 'imgUsuario/paciente_hombre.png'
import profds_f from 'imgUsuario/pds_mujer.png'
import profds_m from 'imgUsuario/pds_hombre.png'
import corazon from 'recursos/corazon.png'

import cAmarillo from 'recursos/sqAmarillo.png'
import cCian from 'recursos/sqCian.png'
import cVioleta from 'recursos/sqVioleta.png'

import hipertension from 'recursos/presion-sanguinea.png'
import diabetes from 'recursos/glucometro.png'
import epoc from 'recursos/pulmon.png'

const helpers = {
    getIconPerson: function(genero, rol){
        if(rol == "Paciente"){
            return ((user.gender === "Femenino") ? paciente_f : paciente_m) 
        }
        else if(rol == "Profesional de Salud"){
            return ((user.gender === "Femenino") ? profds_f : profds_m) 
        }
        else if(rol == "Promotor de Salud"){
            return((user.gender === "Femenino") ? paciente_f : paciente_m) 
        }
        else
            return corazon
    },

    getIconRol:function(rol){
        if(rol == "Paciente"){
            return paciente 
        }
        else if(rol == "Profesional de Salud"){
            return profesional
        }
        else if(rol == "Promotor de Salud"){
            return promotor
        }
        else if(rol == "Administrador"){
            return admin
        }
        else
            return corazon
    },
    getSquareECNT:function(ecnt){
        if(ecnt == "Diabetes"){
            return cVioleta 
        }
        else if(ecnt == "EPOC"){
            return cAmarillo
        }
        else if(ecnt == "Hipertensión"){
            return cCian
        }
        else
            return corazon
    },
    getIconECNT:function(ecnt){
        if(ecnt == "Diabetes"){
            return diabetes 
        }
        else if(ecnt == "EPOC"){
            return epoc
        }
        else if(ecnt == "Hipertensión"){
            return hipertension
        }
        else
            return corazon
    }
}

export default helpers;